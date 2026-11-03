# Website design and development

This website was designed, programmed and developed by **Eng. Eslam Elshikh (المهندس إسلام الشيخ)**.

- Official profile: https://www.eslam-elshikh.com/
- Developer profile: https://github.com/EslamElshikh-dev
- Website: https://dar-albadie-khamis.vercel.app/
- Credit reviewed: 2026-11-03

The footer uses the approved ES signature with this website’s own colors. Website creator metadata describes the design and software implementation. Editorial authorship, business publishing identity, original contributor acknowledgements, and client copyright are retained. This credit does not relicense the repository or transfer the client’s rights.

Git history records the exact files and implementation revisions. Structured data describes the visible credit; it does not guarantee a Google rich result or constitute legal registration of authorship.

## Production dependency security

The scoped npm override for `@vercel/cli-config > zod` pins Zod to `4.6.7`
to address [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).
It preserves the existing Blob SDK, OIDC, Next.js, and React versions.
Remove the override only after the upstream dependency chain resolves a patched
Zod version (`>=4.6.6`) without it and a clean `npm ci`, production audit,
`npm test`, production build, and `npm run test:http` all pass.
The dependency-security tests cover bounded-collection early rejection and
Vercel configuration parsing. HTTP checks run without production credentials.
