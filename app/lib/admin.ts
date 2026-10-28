import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { verifyAdminIdentity } from "./access-identity.mjs";
export async function currentAdminUser() {
 const h = await headers();
 const email = await verifyAdminIdentity(h.get("cf-access-jwt-assertion"), env);
 return email ? { email, displayName: email } : null;
}
