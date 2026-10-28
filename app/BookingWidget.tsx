"use client";

import { FormEvent, useMemo, useState } from "react";
import { cabins, getCabin } from "./lib/cabins";

type Availability = { available: boolean; nights: number; total: number; deposit: number; message?: string };
type Reservation = Availability & { id: string };

export default function BookingWidget() {
  const tomorrow = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); }, []);
  const [cabinId, setCabinId] = useState("bosque"); const [checkIn, setCheckIn] = useState(""); const [checkOut, setCheckOut] = useState("");
  const [availability, setAvailability] = useState<Availability | null>(null); const [reservation, setReservation] = useState<Reservation | null>(null);
  const [checking, setChecking] = useState(false); const [submitting, setSubmitting] = useState(false); const [message, setMessage] = useState(""); const [uploadMessage, setUploadMessage] = useState("");



  async function checkAvailability() {
    if (!checkIn || !checkOut) { setMessage("Selecciona la fecha de llegada y salida."); return; }
    setChecking(true); setMessage(""); setAvailability(null);
    const response = await fetch(`/api/availability?cabinId=${cabinId}&checkIn=${checkIn}&checkOut=${checkOut}`); const data = await response.json() as Availability & { error?: string };
    setChecking(false); if (!response.ok) { setMessage(data.error ?? "No fue posible consultar."); return; } setAvailability(data);
  }

  async function createReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!availability?.available) { setMessage("Primero confirma la disponibilidad."); return; }
    setSubmitting(true); setMessage(""); const form = new FormData(event.currentTarget);
    const response = await fetch("/api/reservations", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ cabinId, checkIn, checkOut, guests: Number(form.get("guests")), guestName: form.get("guestName"), guestEmail: form.get("guestEmail"), guestPhone: form.get("guestPhone"), message: form.get("message") }) });
    const data = await response.json() as Reservation & { error?: string }; setSubmitting(false); if (!response.ok) { setMessage(data.error ?? "No fue posible crear la reserva."); return; } setReservation(data);
  }

  async function uploadReceipt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!reservation) return; setUploadMessage("Subiendo comprobante...");
    const response = await fetch(`/api/reservations/${reservation.id}/receipt`, { method: "POST", body: new FormData(event.currentTarget) }); const data = await response.json() as { error?: string };
    setUploadMessage(response.ok ? "Comprobante recibido. Te contactaremos para confirmar." : data.error ?? "No fue posible subir el archivo.");
  }

  const money = (value: number) => `$${value.toLocaleString("es-CL")}`;
  if (reservation) return <div className="booking-card booking-success"><span className="success-mark">✓</span><p className="eyebrow">Solicitud creada</p><h3>Gracias. Tu código es {reservation.id}</h3><p>Para completar la solicitud, transfiere <strong>{money(reservation.deposit)}</strong> (50% del total) y adjunta el comprobante.</p><div className="bank-box"><b>Datos de prueba</b><span>Banco Ejemplo · Cuenta corriente</span><span>00-000-000 · Refugio del Sur SpA</span></div><form onSubmit={uploadReceipt}><label>Comprobante de transferencia<input name="receipt" type="file" accept="image/jpeg,image/png,application/pdf" required /></label><button className="button dark" type="submit">Enviar comprobante</button></form>{uploadMessage && <p className="form-message">{uploadMessage}</p>}</div>;

  return <form className="booking-card" onSubmit={createReservation}>
    <div className="field full"><label>Refugio</label><select value={cabinId} onChange={e => { setCabinId(e.target.value); setAvailability(null); }}><>{cabins.map(c => <option value={c.id} key={c.id}>{c.name} · hasta {c.guests} huéspedes</option>)}</></select></div>
    <div className="field"><label>Llegada</label><input type="date" min={tomorrow} value={checkIn} onChange={e => { setCheckIn(e.target.value); setAvailability(null); }} required /></div>
    <div className="field"><label>Salida</label><input type="date" min={checkIn || tomorrow} value={checkOut} onChange={e => { setCheckOut(e.target.value); setAvailability(null); }} required /></div>
    <button className="availability-button full" type="button" onClick={checkAvailability} disabled={checking}>{checking ? "Consultando..." : "Revisar disponibilidad"}</button>
    {message && <p className="form-message full">{message}</p>}
    {availability && <div className={`availability-result full ${availability.available ? "available" : "unavailable"}`}>{availability.available ? <><b>Disponible · {availability.nights} {availability.nights === 1 ? "noche" : "noches"}</b><span>Total {money(availability.total)} · Abono {money(availability.deposit)}</span></> : <b>Estas fechas no están disponibles.</b>}</div>}
    {availability?.available && <><div className="field"><label>Nombre completo</label><input name="guestName" autoComplete="name" required /></div><div className="field"><label>Correo</label><input name="guestEmail" type="email" autoComplete="email" required /></div><div className="field"><label>Teléfono</label><input name="guestPhone" type="tel" autoComplete="tel" required /></div><div className="field"><label>Huéspedes</label><select name="guests" defaultValue="2">{Array.from({ length: getCabin(cabinId)?.guests ?? 2 }, (_, i) => <option value={i + 1} key={i}>{i + 1}</option>)}</select></div><div className="field full"><label>Mensaje (opcional)</label><textarea name="message" rows={3} placeholder="Cuéntanos si celebras algo especial..." /></div><button className="button dark full" disabled={submitting} type="submit">{submitting ? "Creando solicitud..." : "Solicitar reserva"}</button><p className="privacy full">No realizamos cobros en línea. La reserva se confirma después de revisar el comprobante.</p></>}
  </form>;
}
