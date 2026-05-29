"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { setMaintenanceModeValue } from "@/lib/settings";

async function assertAdmin() {
  const store = await cookies();
  const session = store.get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_SESSION_SECRET) {
    throw new Error("Yetkisiz");
  }
}

export async function setMaintenanceMode(enabled: boolean) {
  await assertAdmin();
  await setMaintenanceModeValue(enabled);
  revalidatePath("/admin");
  return { ok: true, enabled };
}
