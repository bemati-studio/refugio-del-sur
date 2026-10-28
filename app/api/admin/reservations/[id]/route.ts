import { env } from "cloudflare:workers";
import { NextRequest, NextResponse } from "next/server";
import { currentAdminUser } from "../../../../lib/admin";
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) { const user=await currentAdminUser(); if(!user)return NextResponse.json({error:"No autorizado."},{status:401}); const {id}=await context.params; const {status}=await request.json() as {status?: unknown}; if(typeof status!=="string"||!["pending","confirmed","rejected"].includes(status))return NextResponse.json({error:"Estado no válido."},{status:400}); await env.DB.prepare("UPDATE reservations SET status=? WHERE id=?").bind(status,id).run(); return NextResponse.json({ok:true}); }
