import { NextRequest, NextResponse } from "next/server";
import { quote } from "../../lib/reservations";
export async function GET(request: NextRequest) { const p = request.nextUrl.searchParams; try { const result = await quote(p.get("cabinId") ?? "", p.get("checkIn") ?? "", p.get("checkOut") ?? ""); return NextResponse.json(result); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Consulta inválida." }, { status: 400 }); } }
