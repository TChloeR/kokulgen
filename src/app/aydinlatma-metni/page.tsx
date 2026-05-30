import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni" };

export default function AydinlatmaMetniPage() {
  return (
    <LegalLayout title="KVKK Aydınlatma Metni" lastUpdated="30.05.2026">
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Veri Sorumlusu</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Bu site, bireysel olarak işletilen bağımsız bir bilgilendirme platformudur. Veri sorumlusuna{" "}
        <a href="mailto:iletisim@kokulgen.com" className="text-emerald-700 underline">
          iletisim@kokulgen.com
        </a>{" "}
        adresinden ulaşabilirsiniz.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">İşlenen Veriler ve Amaç</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Bu sitede üyelik veya form bulunmadığından kimlik/iletişim verisi toplanmaz. Açık rızanızı vermeniz hâlinde, yalnızca analitik çerezler (Google Analytics) aracılığıyla site kullanımına ilişkin veriler (ziyaret edilen sayfalar, yaklaşık coğrafi bölge, cihaz ve tarayıcı bilgisi) işlenir. Amaç, site trafiğini ölçmek ve içeriği iyileştirmektir.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Hukuki Sebep</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Bu işleme, KVKK m.5/1 uyarınca açık rızanıza dayanır. Rıza vermezseniz analitik çerezler çalışmaz.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Yurt Dışına Aktarım</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Analitik hizmeti yurt dışı merkezli (Google) olduğundan, veriler KVKK m.9 kapsamında yurt dışına aktarılabilir; bu da açık rızanıza dayanır.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Saklama Süresi</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        {"Çerez saklama süreleri "}
        <Link href="/cerez-politikasi" className="text-emerald-700 underline">
          {"Çerez Politikası'nda"}
        </Link>
        {" belirtilir. Bize ilettiğiniz e-postalar yalnızca talebin gerektirdiği süre boyunca saklanır."}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Haklarınız (KVKK m.11)</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme, rızanızı geri alma ve kanunda sayılan diğer haklarınızı kullanmak için{" "}
        <a href="mailto:iletisim@kokulgen.com" className="text-emerald-700 underline">
          iletisim@kokulgen.com
        </a>{" "}
        adresine başvurabilirsiniz.
      </p>
    </LegalLayout>
  );
}
