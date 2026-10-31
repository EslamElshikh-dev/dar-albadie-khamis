import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const scryptOptions = { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 };

function derivePassword(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, Buffer.from(salt, "hex"), 64, scryptOptions, (error, key) => error ? reject(error) : resolve(key));
  });
}

export async function hashBookingPassword(password: string) {
  if (!password || Buffer.byteLength(password, "utf8") > 512) throw new Error("Invalid password input");
  const salt = randomBytes(16).toString("hex");
  const hash = await derivePassword(password, salt);
  return `scrypt:v1:${salt}:${hash.toString("hex")}`;
}

export async function verifyBookingCredentials(
  username: unknown,
  password: unknown,
  credentials = { username: process.env.BOOKING_ADMIN_USERNAME, passwordHash: process.env.BOOKING_ADMIN_PASSWORD_HASH },
) {
  if (!credentials.username || !credentials.passwordHash) throw new Error("Booking login is not configured");
  if (typeof username !== "string" || typeof password !== "string" || username.length > 80 || !password || Buffer.byteLength(password, "utf8") > 512) return false;
  const match = /^scrypt:v1:([0-9a-f]{32}):([0-9a-f]{128})$/.exec(credentials.passwordHash);
  if (!match) throw new Error("Invalid booking password configuration");
  const key = await derivePassword(password, match[1]);
  const correctPassword = timingSafeEqual(key, Buffer.from(match[2], "hex"));
  const hashUsername = (value: string) => createHash("sha256").update(value).digest();
  const correctUsername = timingSafeEqual(hashUsername(username.trim()), hashUsername(credentials.username));
  return correctUsername && correctPassword;
}
