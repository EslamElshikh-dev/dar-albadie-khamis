import { BlobError, BlobNotFoundError, BlobPreconditionFailedError, get, list, put } from "@vercel/blob";
import { createHash } from "node:crypto";
import { bookingReference, type BookingInput, type BookingRecord, type BookingStatus } from "./booking";
import { bookingSecret, privateFingerprint } from "./booking-security";

export class BookingRateLimitError extends Error {}
export class BookingConflictError extends Error {}

async function readDocument<T>(path: string): Promise<{ value: T; etag: string } | null> {
  try {
    const blob = await get(path, { access: "private", useCache: false });
    if (!blob || blob.statusCode !== 200) return null;
    return { value: await new Response(blob.stream).json() as T, etag: blob.blob.etag };
  } catch (error) {
    if (error instanceof BlobNotFoundError) return null;
    throw error;
  }
}

async function writeDocument(path: string, value: unknown, etag?: string) {
  return put(path, JSON.stringify(value), {
    access: "private", addRandomSuffix: false, contentType: "application/json",
    ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
  });
}

function isWriteConflict(error: unknown) {
  return error instanceof BlobPreconditionFailedError || (error instanceof BlobError && /already exists/i.test(error.message));
}

export async function checkBookingRateLimit(scope: string, identity: string, limit: number, windowMs: number, now = Date.now()) {
  const bucket = Math.floor(now / windowMs);
  const key = privateFingerprint(`${scope}:${identity}:${bucket}`, bookingSecret());
  const path = `booking-limits/${scope}/${bucket}-${key}.json`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const current = await readDocument<{ count: number }>(path);
    if ((current?.value.count ?? 0) >= limit) throw new BookingRateLimitError();
    try {
      await writeDocument(path, { count: (current?.value.count ?? 0) + 1 }, current?.etag);
      return;
    } catch (error) { if (!isWriteConflict(error) || attempt === 3) throw error; }
  }
}

const bookingPath = (id: string) => `booking-requests/${id}.json`;
const payloadHash = (input: BookingInput) => createHash("sha256").update(JSON.stringify(input)).digest("hex");

export async function findBooking(input: BookingInput) {
  const saved = await readDocument<BookingRecord>(bookingPath(input.idempotencyKey));
  if (!saved) return null;
  const { reference: _reference, createdAt: _createdAt, updatedAt: _updatedAt, status: _status, ...original } = saved.value;
  if (payloadHash(original) !== payloadHash(input)) throw new BookingConflictError();
  return saved.value;
}

export async function saveBooking(input: BookingInput) {
  const now = new Date().toISOString();
  const record: BookingRecord = { ...input, reference: bookingReference(input), createdAt: now, updatedAt: now, status: "new" };
  try { await writeDocument(bookingPath(input.idempotencyKey), record); }
  catch (error) {
    if (!isWriteConflict(error)) throw error;
    const existing = await findBooking(input);
    if (!existing) throw error;
    return existing;
  }
  return record;
}

export async function listBookings(cursor?: string) {
  const page = await list({ prefix: "booking-requests/", limit: 100, cursor });
  const records = await Promise.all(page.blobs.map(async (blob) => (await readDocument<BookingRecord>(blob.pathname))?.value ?? null));
  return { bookings: records.filter((record): record is BookingRecord => record !== null).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), cursor: page.hasMore ? page.cursor : null };
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const current = await readDocument<BookingRecord>(bookingPath(id));
    if (!current) return null;
    const record = { ...current.value, status, updatedAt: new Date().toISOString() };
    try { await writeDocument(bookingPath(id), record, current.etag); return record; }
    catch (error) { if (!isWriteConflict(error) || attempt === 2) throw error; }
  }
  return null;
}
