import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APP_URL = process.env.APP_INTERNAL_URL || "http://localhost:3000";

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bakım Çalışması | Kök Ülgen</title><meta name="robots" content="noindex">
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;color:#1e293b;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}.card{max-width:460px;text-align:center}img{height:96px;width:auto;margin:0 auto 24px;display:block}h1{font-size:26px;font-weight:700;margin-bottom:12px;color:#0f172a}p{font-size:16px;line-height:1.6;color:#475569}.brand{margin-top:24px;font-size:14px;font-weight:600;color:#047857}</style></head>
<body><div class="card"><img src="/logo.png" alt="Kök Ülgen"><h1>Kısa bir bakımdayız</h1><p>Sitemizde kısa süreli bir bakım çalışması yapıyoruz. Çok yakında tekrar buradayız. Anlayışınız için teşekkür ederiz.</p><div class="brand">Kök Ülgen</div></div></body></html>`;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Admin koruması (admin paneli bakımda bile erişilebilir kalmalı)
  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/login") {
      const session = req.cookies.get("admin_session")?.value;
      if (!session || session !== process.env.ADMIN_SESSION_SECRET) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  // 2) Bakım modu kontrolü (genel sayfalar için)
  try {
    const res = await fetch(`${APP_URL}/api/maintenance`, { cache: "no-store" });
    const data = await res.json();
    if (data.maintenance) {
      const session = req.cookies.get("admin_session")?.value;
      const isAdmin = session && session === process.env.ADMIN_SESSION_SECRET;
      if (!isAdmin) {
        return new NextResponse(MAINTENANCE_HTML, {
          status: 503,
          headers: { "content-type": "text/html; charset=utf-8", "Retry-After": "3600" },
        });
      }
    }
  } catch {
    // kontrol başarısız olursa site açık kalsın (fail-open)
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|woff|woff2)).*)",
  ],
};
