import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = { title: "Kullanım Koşulları" };

export default function KullanimKosullariPage() {
  return (
    <LegalLayout title="Kullanım Koşulları" lastUpdated="30.05.2026">
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Bu Platform Nedir</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        {"Kök Ülgen, Türkiye'deki sosyal yardım, burs ve destek programlarına erişimi kolaylaştırmak için bireysel olarak işletilen, bağımsız ve kâr amacı gütmeyen bir bilgilendirme rehberidir. Bu platform hiçbir kurumun resmi kanalı, temsilcisi veya iş ortağı değildir."}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Bilgilerin Doğruluğu</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        İçerikler iyi niyetle ve kamuya açık kaynaklardan derlenir; ancak doğruluğu, güncelliği veya eksiksizliği garanti edilmez. Kurumlar başvuru şartlarını, tarihlerini veya bağlantılarını her zaman değiştirebilir. Kesin ve güncel bilgi için ilgili kurumun resmi kanalları esas alınmalıdır. Başvuru süreçleri tamamen platformdan bağımsızdır.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Dış Bağlantılar</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Sitede, kurumların resmi sayfalarına yönlendiren bağlantılar bulunur. Bu sitelerin içeriğinden, gizlilik uygulamalarından veya doğruluğundan platformumuz sorumlu değildir.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Fikri Mülkiyet ve Telif</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Sitedeki açıklayıcı metinler özgün olarak derlenmiştir. Kurum adları ve logoları ilgili sahiplerine aittir; yalnızca hangi kuruma yönlendirildiğini göstermek amacıyla, tanıtıcı nitelikte kullanılır ve herhangi bir aidiyet, onay veya iş birliği iması taşımaz. Bir hak sahibi, kendisine ait bir içeriğin veya logonun kaldırılmasını isterse{" "}
        <a href="mailto:iletisim@kokulgen.com" className="text-emerald-700 underline">
          iletisim@kokulgen.com
        </a>{" "}
        adresine bildirebilir; talep makul süre içinde değerlendirilip kaldırılır.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Sorumluluğun Sınırı</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        {'Platform "olduğu gibi" sunulur. Sitenin kullanımından veya yönlendirilen sitelerdeki işlemlerden doğabilecek sonuçlardan platform sorumlu tutulamaz.'}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Değişiklikler ve Uygulanacak Hukuk</h2>
      <p className="mt-3 leading-relaxed text-slate-700">
        Bu koşullar zaman zaman güncellenebilir. Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır.
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
