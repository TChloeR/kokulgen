import { prisma } from "@/lib/prisma";

const MAINTENANCE_KEY = "maintenance_mode";

export async function getMaintenanceMode(): Promise<boolean> {
  const row = await prisma.siteSetting.findUnique({ where: { key: MAINTENANCE_KEY } });
  return row?.value === "on";
}

export async function setMaintenanceModeValue(enabled: boolean): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key: MAINTENANCE_KEY },
    update: { value: enabled ? "on" : "off" },
    create: { key: MAINTENANCE_KEY, value: enabled ? "on" : "off" },
  });
}
