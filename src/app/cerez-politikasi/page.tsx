import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Çerez Politikası" };

export default function CerezPolitikasiPage() {
  return (
    <LegalLayout title="Çerez Politikası" lastUpdated="30.05.2026">
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Çerez Nedir</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Çerezler, siteleri ziyaret ettiğinizde cihazınıza yerleştirilen küçük veri dosyalarıdır.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Bu Sitede Kullanılan Çerezler</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Zorunlu/teknik çerezler: Sitenin temel çalışması için gerekli olabilen, asgari düzeyde çerezlerdir.
      </p>
      <p className="mt-3 leading-relaxed text-slate-700">
        {'Analitik çerezler (Google Analytics – GA4): Site trafiğini ve kullanımını ölçmek için kullanılır. Bu çerezler "kesinlikle gerekli" değildir ve YALNIZCA açık onayınızla çalışır. Onay vermezseniz Google Analytics hiç yüklenmez.'}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Onay Yönetimi</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Siteye ilk girişte size bir çerez bildirimi gösterilir. Kabul Et ve Reddet seçenekleri eşit şekilde sunulur; herhangi bir çerez duvarı uygulanmaz, yani reddetseniz de siteyi kullanmaya devam edebilirsiniz. Onayınızı dilediğiniz zaman, sayfa altındaki Çerez ayarları bağlantısından değiştirebilir veya geri alabilirsiniz. Ayrıca tarayıcı ayarlarınızdan çerezleri silebilirsiniz.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Yurt Dışına Aktarım</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Google Analytics, Google tarafından işletildiği için toplanan veriler yurt dışında işlenebilir. Bu aktarım KVKK kapsamında açık rızanıza dayanır.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">İletişim</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Sorularınız için:{" "}
        <a href="mailto:iletisim@kokulgen.com" className="text-emerald-700 underline">
          iletisim@kokulgen.com
        </a>
      </p>
    </LegalLayout>
  );
}
