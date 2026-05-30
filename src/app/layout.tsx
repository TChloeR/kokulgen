import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kokulgen.com"),
  title: {
    default: "Kök Ülgen — Türkiye'de sosyal yardıma erişemeyen kalmasın",
    template: "%s | Kök Ülgen",
  },
  description:
    "Türkiye'deki sosyal yardım ağını tek bir merkezde topluyoruz. Vakıf, dernek, STK ve devlet desteklerine kolayca ulaşın.",
  keywords: ["sosyal yardım", "burs", "şehit gazi aileleri", "engelli yardımı", "sydv"],
  openGraph: {
    title: "Kök Ülgen — Türkiye'de sosyal yardıma erişemeyen kalmasın",
    description:
      "Türkiye'deki sosyal yardım ağını tek bir merkezde topluyoruz. Vakıf, dernek, STK ve devlet desteklerine kolayca ulaşın.",
    url: "https://kokulgen.com",
    siteName: "Kök Ülgen",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kök Ülgen",
    description: "Türkiye'de sosyal yardıma erişemeyen kalmasın",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Kök Ülgen" width={293} height={160} priority className="h-16 w-auto" />
            </Link>
            <span className="hidden text-sm text-slate-500 md:block">
              {"Türkiye'de sosyal yardıma erişemeyen kalmasın"}
            </span>
            <a href="/ara" className="ml-auto rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
              Program Ara
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <Image src="/logo.png" alt="Kök Ülgen" width={220} height={120} className="h-10 w-auto" />
            <p className="mt-2 max-w-md text-sm text-slate-500">
              {"Türkiye'deki sosyal yardım ağını tek bir merkezde topluyoruz. Vakıf, dernek, STK ve devlet desteklerine kolayca ulaşın."}
            </p>
            <p className="mt-6 max-w-2xl text-xs text-slate-500">
              Bu platform yalnızca bilgilendirme amaçlıdır ve hiçbir kurumun resmi kanalı, temsilcisi veya iş ortağı değildir.
              Kurumların başvuru şartlarında, tarihlerinde veya bağlantılarında yapacağı değişikliklerden sitemiz sorumlu değildir.
              Kesin ve güncel bilgi için ilgili kurumun resmi kanalları esas alınmalıdır.
            </p>
            <nav aria-label="Yasal bağlantılar" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/iletisim" className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600">İletişim</Link>
              <Link href="/kullanim-kosullari" className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600">Kullanım Koşulları</Link>
              <Link href="/gizlilik-politikasi" className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600">Gizlilik Politikası</Link>
              <Link href="/cerez-politikasi" className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600">Çerez Politikası</Link>
              <Link href="/aydinlatma-metni" className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600">Aydınlatma Metni</Link>
              <CookieSettingsButton />
            </nav>
            <p className="mt-6 text-xs text-slate-400">
              © {new Date().getFullYear()} Kök Ülgen. Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
