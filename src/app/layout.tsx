import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: {
    default: "Kök Ülgen — Türkiye'de sosyal yardıma erişemeyen kalmasın",
    template: "%s | Kök Ülgen",
  },
  description:
    "Türkiye'deki sosyal yardım ağını tek bir merkezde topluyoruz. Vakıf, dernek, STK ve devlet desteklerine kolayca ulaşın.",
  keywords: ["sosyal yardım", "burs", "şehit gazi aileleri", "engelli yardımı", "sydv"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
            <a href="/" className="flex items-center">
              <Image src="/logo.png" alt="Kök Ülgen" width={293} height={160} priority className="h-16 w-auto" />
            </a>
            <span className="hidden text-sm text-slate-500 md:block">
              Türkiye'de sosyal yardıma erişemeyen kalmasın
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
              Türkiye'deki sosyal yardım ağını tek bir merkezde topluyoruz. Vakıf, dernek, STK ve devlet desteklerine kolayca ulaşın.
            </p>
            <p className="mt-6 text-xs text-slate-400">
              © {new Date().getFullYear()} Kök Ülgen. Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
