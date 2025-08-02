// lib/verifyToken.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PRIVATE_JWT_SECRET!;

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) redirect("/qg");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") redirect("/qg");
    return decoded;
  } catch {
    redirect("/qg");
  }
}
