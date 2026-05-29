"use client";
import { useState, useTransition } from "react";
import { setMaintenanceMode } from "@/lib/actions/settings";

export default function MaintenanceToggle({ initial }: { initial: boolean }) {
  const [enabled, setEnabled] = useState(initial);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !enabled;
    const msg = next
      ? "Site bakım moduna alınacak. Ziyaretçiler bakım sayfası görecek. Emin misiniz?"
      : "Site bakım modundan çıkarılıp tekrar yayına alınacak. Onaylıyor musunuz?";
    if (!confirm(msg)) return;
    startTransition(async () => {
      const res = await setMaintenanceMode(next);
      setEnabled(res.enabled);
    });
  }

  return (
    <div className={`rounded-xl border p-5 ${enabled ? "border-red-300 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-800">Bakım Modu</h3>
          <p className="text-sm text-slate-600 mt-1">
            {enabled
              ? "Site şu anda BAKIMDA. Ziyaretçiler bakım sayfası görüyor."
              : "Site yayında ve herkese açık."}
          </p>
        </div>
        <button onClick={toggle} disabled={pending}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-60 ${enabled ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}>
          {pending ? "..." : enabled ? "Bakımdan Çıkar" : "Bakıma Al"}
        </button>
      </div>
    </div>
  );
}
