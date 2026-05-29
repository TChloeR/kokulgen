import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const categories = [
  {
    slug: "ebeveyn-kaybi-yasayan-cocuklar",
    name: "Ebeveyn Kaybı Yaşayan Çocuklarımız",
    description:
      "Anne veya babasını kaybetmiş çocuklara yönelik eğitim, bakım ve maddi destek programları.",
    iconName: "child-care",
    orderIndex: 1,
    metaTitle: "Ebeveyn Kaybı Yaşayan Çocuklara Sosyal Yardım | Kök Ülgen",
    metaDescription:
      "Anne veya babasını kaybeden çocuklar için devlet, vakıf ve dernek destekleri tek sayfada.",
  },
  {
    slug: "destek-ihtiyaci-bulunan-anneler",
    name: "Destek İhtiyacı Bulunan Anneler",
    description:
      "Yalnız ebeveyn, dul ve maddi desteğe ihtiyaç duyan annelere yönelik yardım programları.",
    iconName: "mother",
    orderIndex: 2,
    metaTitle: "Destek İhtiyacı Bulunan Annelere Yardım | Kök Ülgen",
    metaDescription:
      "İhtiyaç sahibi anneler için nakdi, gıda ve eğitim destekleri burada listeleniyor.",
  },
  {
    slug: "sehit-ve-gazi-aileleri",
    name: "Şehit ve Gazi Aileleri",
    description:
      "Şehit yakınları ve gazilere yönelik devlet hakları, burslar ve özel destek programları.",
    iconName: "flag",
    orderIndex: 3,
    metaTitle: "Şehit ve Gazi Ailelerine Sosyal Destek | Kök Ülgen",
    metaDescription:
      "Şehit yakınları ve gaziler için sağlanan tüm hak ve yardımlara tek noktadan erişin.",
  },
  {
    slug: "ogrenciler",
    name: "Öğrenciler",
    description:
      "Burs, barınma ve eğitim malzemesi gibi öğrencilere yönelik destek programları.",
    iconName: "school",
    orderIndex: 4,
    metaTitle: "Öğrencilere Burs ve Eğitim Destekleri | Kök Ülgen",
    metaDescription:
      "Öğrenciler için burs, barınma ve eğitim yardımı programları tek listede.",
  },
  {
    slug: "ozel-gereksinimli-bireyler",
    name: "Özel Gereksinimli Bireyler",
    description:
      "Engelli bireyler ve ailelerine yönelik bakım, rehabilitasyon ve maddi destek programları.",
    iconName: "accessibility",
    orderIndex: 5,
    metaTitle: "Özel Gereksinimli Bireylere Destek | Kök Ülgen",
    metaDescription:
      "Engelli bireyler için bakım, rehabilitasyon ve nakdi destek programları burada.",
  },
  {
    slug: "genel-sosyal-destek-basvurulari",
    name: "Genel Sosyal Destek Başvuruları",
    description:
      "Tüm vatandaşların başvurabileceği genel nitelikli sosyal yardım ve destek programları.",
    iconName: "people",
    orderIndex: 6,
    metaTitle: "Genel Sosyal Destek Başvuruları | Kök Ülgen",
    metaDescription:
      "Genel sosyal yardım ve destek başvuruları için kurum ve programları keşfedin.",
  },
];

async function main() {
  console.log("🌱 Seed başlıyor...");

  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: c, create: c });
  }
  console.log(`✅ ${categories.length} kategori eklendi.`);

  // ---- SYDV (Devlet Kurumu) ----
  const sydv = await prisma.organization.upsert({
    where: { slug: "ankara-sydv" },
    update: {},
    create: {
      slug: "ankara-sydv",
      name: "Ankara Sosyal Yardımlaşma ve Dayanışma Vakfı (Örnek)",
      type: "DEVLET_KURUMU",
      description:
        "Sosyal yardım başvurularının ilk durağı olan il/ilçe SYDV'leri. (Örnek/test verisidir.)",
      websiteUrl: "https://www.aile.gov.tr",
      phone: "0312 000 00 00",
      address: "Örnek Mah. Örnek Cad. No:1, Çankaya/Ankara",
      city: "Ankara",
      district: "Çankaya",
      latitude: 39.9208,
      longitude: 32.8541,
      isVerified: true,
      status: "YAYINDA",
      metaTitle: "Ankara SYDV — Sosyal Yardım Başvurusu | Kök Ülgen",
      metaDescription:
        "Ankara Sosyal Yardımlaşma ve Dayanışma Vakfı üzerinden başvurulabilecek sosyal yardım programları.",
    },
  });

  const sydvProgram = await prisma.aidProgram.upsert({
    where: { slug: "sydv-genel-nakdi-yardim" },
    update: {},
    create: {
      slug: "sydv-genel-nakdi-yardim",
      title: "Genel Amaçlı Nakdi Yardım (Örnek Program)",
      summary: "İhtiyaç sahibi hanelere yönelik düzenli/bir defaya mahsus nakdi destek.",
      details:
        "Hane geliri belirli bir eşiğin altında olan ailelere sosyal inceleme sonrası nakdi yardım sağlanır. (Örnek metin.)",
      conditions:
        "Muhtaçlık durumu olan, sosyal güvencesi bulunmayan veya geliri yetersiz haneler başvurabilir.",
      applicationMethod: "YUZ_YUZE",
      applicationAddress: "Bağlı bulunduğunuz ilçe SYDV'sine şahsen başvurulur.",
      isAlwaysOpen: true,
      status: "YAYINDA",
      organizationId: sydv.id,
      metaTitle: "SYDV Nakdi Yardım Başvurusu | Kök Ülgen",
      metaDescription: "SYDV üzerinden nakdi yardım başvurusu şartları ve gerekli belgeler.",
    },
  });

  for (const slug of ["genel-sosyal-destek-basvurulari", "destek-ihtiyaci-bulunan-anneler"]) {
    const cat = await prisma.category.findUnique({ where: { slug } });
    if (cat) {
      await prisma.programCategory.upsert({
        where: { programId_categoryId: { programId: sydvProgram.id, categoryId: cat.id } },
        update: {},
        create: { programId: sydvProgram.id, categoryId: cat.id },
      });
    }
  }

  await prisma.requiredDocument.deleteMany({ where: { programId: sydvProgram.id } });
  for (const d of [
    {
      name: "Nüfus Kayıt Örneği",
      description: "E-Devlet'ten alınabilir.",
      sourceLinks: [
        { label: "E-Devlet'ten al", url: "https://www.turkiye.gov.tr/nvi-nufus-kayit-ornegi-belgesi-sorgulama" },
      ],
      orderIndex: 1,
    },
    {
      name: "İkametgah Belgesi",
      description: "E-Devlet'ten alınabilir.",
      sourceLinks: [
        { label: "E-Devlet'ten al", url: "https://www.turkiye.gov.tr/nvi-yerlesim-yeri-ve-diger-adres-belgesi-sorgulama" },
      ],
      orderIndex: 2,
    },
    {
      name: "Gelir Durumunu Gösterir Belge",
      description: "Maaş bordrosunu işvereninizden, SGK kaydınızı E-Devlet'ten alabilirsiniz:",
      sourceLinks: [
        { label: "SGK Tescil ve Hizmet Dökümü", url: "https://www.turkiye.gov.tr/sgk-tescil-ve-hizmet-dokumu" },
        { label: "4A Hizmet Dökümü (Son 6 ay)", url: "https://www.turkiye.gov.tr/4a-hizmet-dokumu" },
      ],
      orderIndex: 3,
    },
  ]) {
    await prisma.requiredDocument.create({
      data: { ...d, isMandatory: true, programId: sydvProgram.id },
    });
  }

  await prisma.petitionTemplate.upsert({
    where: { id: "seed-sydv-dilekce" },
    update: {},
    create: {
      id: "seed-sydv-dilekce",
      title: "Sosyal Yardım Başvuru Dilekçesi (Örnek Matbu)",
      description: "Boşlukları doldurularak SYDV'ye teslim edilebilen başvuru dilekçesi.",
      format: "HER_IKISI",
      wordFileUrl: "/templates/sydv-basvuru-dilekce.docx",
      pdfFileUrl: "/templates/sydv-basvuru-dilekce.pdf",
      version: "1.0",
      programId: sydvProgram.id,
    },
  });

  // ---- Burs (Vakıf) ----
  const burs = await prisma.organization.upsert({
    where: { slug: "ornek-egitim-vakfi" },
    update: {},
    create: {
      slug: "ornek-egitim-vakfi",
      name: "Örnek Eğitim Vakfı",
      type: "VAKIF",
      description: "Öğrencilere burs ve eğitim desteği sağlayan örnek vakıf kaydı. (Test verisidir.)",
      websiteUrl: "https://ornek-vakif.org",
      email: "burs@ornek-vakif.org",
      city: "İstanbul",
      district: "Kadıköy",
      latitude: 40.9901,
      longitude: 29.0282,
      isVerified: false,
      status: "YAYINDA",
      metaTitle: "Örnek Eğitim Vakfı Bursları | Kök Ülgen",
      metaDescription: "Öğrencilere yönelik burs programları ve başvuru şartları.",
    },
  });

  const bursProgram = await prisma.aidProgram.upsert({
    where: { slug: "ornek-vakif-egitim-bursu" },
    update: {},
    create: {
      slug: "ornek-vakif-egitim-bursu",
      title: "Üniversite Eğitim Bursu (Örnek)",
      summary: "Maddi imkânı kısıtlı üniversite öğrencilerine yönelik karşılıksız burs.",
      details: "Akademik başarı ve ihtiyaç durumuna göre değerlendirilen aylık burs programı. (Örnek metin.)",
      conditions: "Türkiye'deki bir üniversiteye kayıtlı, maddi desteğe ihtiyacı olan öğrenciler başvurabilir.",
      applicationMethod: "ONLINE",
      onlineApplicationUrl: "https://ornek-vakif.org/burs-basvuru",
      isAlwaysOpen: false,
      status: "YAYINDA",
      organizationId: burs.id,
      metaTitle: "Örnek Vakıf Üniversite Bursu Başvurusu | Kök Ülgen",
      metaDescription: "Üniversite öğrencilerine karşılıksız burs başvurusu, şartlar ve belgeler.",
    },
  });

  for (const slug of ["ogrenciler", "sehit-ve-gazi-aileleri"]) {
    const cat = await prisma.category.findUnique({ where: { slug } });
    if (cat) {
      await prisma.programCategory.upsert({
        where: { programId_categoryId: { programId: bursProgram.id, categoryId: cat.id } },
        update: {},
        create: { programId: bursProgram.id, categoryId: cat.id },
      });
    }
  }

  await prisma.requiredDocument.deleteMany({ where: { programId: bursProgram.id } });
  for (const d of [
    {
      name: "Öğrenci Belgesi",
      description: "E-Devlet'ten alabilirsiniz:",
      sourceLinks: [
        { label: "Üniversite (YÖK)", url: "https://www.turkiye.gov.tr/yok-ogrenci-belgesi-sorgulama" },
        { label: "Lise/Ortaokul (MEB)", url: "https://www.turkiye.gov.tr/milli-egitim-ogrencilik-belgesi-sorgulama" },
      ],
      orderIndex: 1,
    },
    {
      name: "Transkript",
      description: "Güncel not dökümü, E-Devlet'ten alınabilir:",
      sourceLinks: [
        { label: "Transkript Belgesi (YÖK)", url: "https://www.turkiye.gov.tr/yuksekogretim-kurulu-transkript-belgesi-sorgulama" },
      ],
      orderIndex: 2,
    },
    {
      name: "Gelir Beyanı",
      description: "Aile gelir durumu belgesi. SGK kaydı E-Devlet'ten alınabilir:",
      sourceLinks: [
        { label: "SGK Tescil ve Hizmet Dökümü", url: "https://www.turkiye.gov.tr/sgk-tescil-ve-hizmet-dokumu" },
        { label: "4A Hizmet Dökümü (Son 6 ay)", url: "https://www.turkiye.gov.tr/4a-hizmet-dokumu" },
      ],
      orderIndex: 3,
    },
  ]) {
    await prisma.requiredDocument.create({
      data: { ...d, isMandatory: true, programId: bursProgram.id },
    });
  }

  console.log("✅ Kurumlar, programlar, belgeler (linkli) ve dilekçe eklendi.");
  console.log("🌱 Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error("❌ Seed hatası:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });