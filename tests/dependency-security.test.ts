import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Resolve the copy consumed by Blob's OIDC/config chain, not an unrelated Zod.
const blobRequire = createRequire(import.meta.resolve("@vercel/blob"));
const oidcRequire = createRequire(blobRequire.resolve("@vercel/oidc"));
const configRequire = createRequire(oidcRequire.resolve("@vercel/cli-config"));
const { z } = configRequire("zod");
const config = oidcRequire("@vercel/cli-config");

for (const collection of ["array", "set"] as const) {
  test(`Zod rejects an oversized bounded ${collection} before parsing its elements`, () => {
    let parsedElements = 0;
    const element = z.preprocess((value: unknown) => {
      parsedElements++;
      return value;
    }, z.number());
    const values = Array.from({ length: 1000 }, (_, i) => `invalid-${i}`);
    const schema = collection === "array" ? z.array(element).max(5) : z.set(element).max(5);
    const result = schema.safeParse(collection === "array" ? values : new Set(values));

    assert.equal(result.success, false);
    assert.equal(parsedElements, 0, "oversized input must stop before per-element validation");
    assert.equal(result.error.issues.length, 1);
    assert.equal(result.error.issues[0].code, "too_big");
  });
}

test("the patched Zod preserves Vercel config validation and auth-file round trips", () => {
  const directory = mkdtempSync(join(tmpdir(), "dar-config-test-"));
  try {
    const path = join(directory, "auth.json");
    const auth = { token: "synthetic-test-token", expiresAt: 1234567890 };
    config.writeAuthConfigFile(path, auth);
    const saved = config.readAuthConfigFile(path);
    assert.equal(saved.token, auth.token);
    assert.equal(saved.expiresAt, auth.expiresAt);
    assert.equal(config.parseGlobalConfig({ telemetry: { enabled: false } }).telemetry.enabled, false);
    assert.throws(() => config.parseAuthConfig({ expiresAt: [] }));
    assert.throws(() => config.parseGlobalConfig({ telemetry: { enabled: "false" } }));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
