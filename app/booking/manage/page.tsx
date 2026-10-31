import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BookingAdmin } from "@/components/booking-admin";
import { bookingCookieName, bookingSecret, verifyBookingSession } from "@/lib/booking-security";
import "../booking.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "إدارة طلبات المواعيد", robots: { index: false, follow: false }, alternates: { canonical: "/booking/manage" } };

export default async function BookingManagementPage() {
  let authenticated = false;
  try { authenticated = verifyBookingSession((await cookies()).get(bookingCookieName)?.value, bookingSecret()); } catch { /* Show the login form without exposing configuration. */ }
  return <main id="main" className="appointment-page appointment-management"><div className="container"><BookingAdmin authenticated={authenticated} /></div></main>;
}
