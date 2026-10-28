import { env } from "cloudflare:workers";
import { getCabin } from "./cabins";

export function nightsBetween(checkIn: string, checkOut: string) { return Math.round((Date.parse(`${checkOut}T12:00:00Z`) - Date.parse(`${checkIn}T12:00:00Z`)) / 86400000); }
export function reservationId() { return `RDS-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`; }
export async function quote(cabinId: string, checkIn: string, checkOut: string) {
  const cabin = getCabin(cabinId); if (!cabin) throw new Error("Refugio no válido."); const nights = nightsBetween(checkIn, checkOut); if (!Number.isFinite(nights) || nights < 1) throw new Error("La salida debe ser posterior a la llegada."); if (Date.parse(checkIn) < Date.now() - 86400000) throw new Error("La fecha de llegada debe ser futura.");
  const conflict = await env.DB.prepare("SELECT id FROM reservations WHERE cabin_id = ? AND status IN ('pending','confirmed') AND check_in < ? AND check_out > ? LIMIT 1").bind(cabinId, checkOut, checkIn).first();
  const total = nights * cabin.price; return { available: !conflict, nights, total, deposit: Math.ceil(total / 2), cabin };
}
