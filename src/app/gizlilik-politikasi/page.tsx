import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Gizlilik Politikası" };

export default function GizlilikPolitikasiPage() {
  return (
    <LegalLayout title="Gizlilik Politikası" lastUpdated="30.05.2026">
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Genel İlke</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Kişisel verilerinizi mümkün olan en az düzeyde işleriz; verilerinizi satmayız ve pazarlama amacıyla paylaşmayız.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Topladığımız Veriler</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Bu site üyelik veya iletişim formu içermez; bu nedenle adınız, telefonunuz gibi kimlik bilgilerinizi toplamayız. Yalnızca, açık onayınızı vermeniz hâlinde, analitik çerezler (Google Analytics) aracılığıyla site kullanımına ilişkin veriler (ziyaret edilen sayfalar, yaklaşık coğrafi bölge, cihaz ve tarayıcı bilgisi gibi) toplanır. Onay vermezseniz bu çerezler çalışmaz. Ayrıca bize e-posta yazarsanız, yalnızca talebinizi yanıtlamak için o yazışmayı işleriz. Barındırma sağlayıcısı, güvenlik ve işletim amacıyla teknik kayıtları (IP adresi gibi) kısa süreli tutabilir.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Üçüncü Taraflar ve Yurt Dışı Aktarım</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Analitik için Google Analytics kullanılır; bu nedenle ilgili veriler yurt dışında işlenebilir. Bu işleme yalnızca açık rızanıza dayanır. Detaylar için{" "}
        <Link href="/cerez-politikasi" className="text-emerald-700 underline">
          Çerez Politikası
        </Link>{" "}
        sayfamıza bakınız.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Haklarınız</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        KVKK kapsamındaki haklarınızı (bilgi talebi, düzeltme, silme, rızanızı geri alma vb.) kullanmak için{" "}
        <a href="mailto:iletisim@kokulgen.com" className="text-emerald-700 underline">
          iletisim@kokulgen.com
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
    </LegalLayout>
  );
}
