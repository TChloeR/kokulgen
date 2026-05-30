import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "İletişim" };

export default function IletisimPage() {
  return (
    <LegalLayout title="İletişim" lastUpdated="30.05.2026">
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Bize Ulaşın</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        {"Kök Ülgen, bireysel olarak işletilen bağımsız bir sosyal yardım rehberidir. Her türlü soru, bildirim ve talep için bize e-posta ile ulaşabilirsiniz: "}
        <a href="mailto:iletisim@kokulgen.com" className="text-emerald-700 underline">
          iletisim@kokulgen.com
        </a>
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Ne İçin Yazabilirsiniz</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
        <li>Hatalı veya güncelliğini yitirmiş bir bilgiyi bildirmek</li>
        <li>Çalışmayan (kırık) bir bağlantıyı bildirmek</li>
        <li>Hak sahibi olarak içerik veya logo kaldırma talebi iletmek</li>
        <li>KVKK kapsamındaki haklarınızı kullanmak</li>
        <li>Genel soru ve önerileriniz</li>
      </ul>
    </LegalLayout>
  );
}
