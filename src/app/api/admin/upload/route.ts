import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED = [".docx", ".doc", ".pdf"];
const MAX = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const session = (await cookies()).get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED.includes(ext)) {
    return NextResponse.json({ error: "Sadece .docx, .doc veya .pdf" }, { status: 400 });
  }
  if (file.size > MAX) {
    return NextResponse.json({ error: "Dosya 10MB'tan büyük" }, { status: 400 });
  }

  const base = path.basename(file.name, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 50) || "dilekce";
  const fileName = `${base}-${Date.now()}${ext}`;
  const dir = path.join(process.cwd(), "public", "templates");
  await mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, fileName), bytes);

  return NextResponse.json({ url: `/templates/${fileName}`, name: file.name });
}
