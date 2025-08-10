import { Metadata } from "next";

// SEO Metadata Configuration untuk RepairService
export const metadata: Metadata = {
  title: "RepairService - Platform Jasa Perbaikan Terpercaya Indonesia",
  description:
    "Platform terdepan yang menghubungkan Anda dengan penyedia jasa perbaikan profesional. Temukan teknisi AC, elektronik, kendaraan, dan jasa perbaikan lainnya di seluruh Indonesia dengan mudah dan terpercaya.",
  keywords: [
    "jasa perbaikan",
    "service ac",
    "perbaikan elektronik",
    "teknisi profesional",
    "service kendaraan",
    "perbaikan rumah",
    "maintenance",
    "repair service indonesia",
    "jasa service terdekat",
    "teknisi ac",
    "perbaikan kulkas",
    "service tv",
    "perbaikan laptop",
    "jasa handyman",
    "service motor",
    "perbaikan mobil",
    "medan repair service",
    "jakarta service center",
    "surabaya technician",
  ],
  authors: [{ name: "RepairService Team" }],
  creator: "RepairService Indonesia",
  publisher: "RepairService Platform",
  category: "Service Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://servease-ui.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "RepairService - Platform Jasa Perbaikan Terpercaya #1 di Indonesia",
    description:
      "Hubungkan diri Anda dengan ribuan teknisi profesional untuk semua kebutuhan perbaikan. Booking online, harga transparan, garansi service, dan rating terpercaya.",
    url: "https://servease-ui.vercel.app/",
    siteName: "RepairService Indonesia",
    images: [
      {
        url: "/ac-mechanic.png",
        width: 1200,
        height: 630,
        alt: "RepairService - Platform Jasa Perbaikan Terpercaya",
      },
      {
        url: "/logo.svg",
        width: 800,
        height: 800,
        alt: "RepairService App",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepairService - Platform Jasa Perbaikan Terpercaya",
    description:
      "Temukan teknisi profesional untuk semua kebutuhan perbaikan Anda",
    images: ["/twitter-repair-service.jpg"],
    creator: "@repairservice_id",
    site: "@repairservice_id",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data untuk Local Business
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://servease-ui.vercel.app/#organization",
  name: "RepairService Indonesia",
  alternateName: "RepairService",
  description:
    "Platform terpercaya yang menghubungkan pelanggan dengan penyedia jasa perbaikan profesional di seluruh Indonesia",
  url: "https://www.repairservice.id",
  logo: {
    "@type": "ImageObject",
    url: "https://servease-ui.vercel.app/logo.svg",
    width: 512,
    height: 512,
  },
  image: "https://servease-ui.vercel.app/ac-mechanic.png",
  telephone: "+62-21-12345678",
  email: "support@repairservice.id",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Sudirman No. 123",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    postalCode: "10220",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-6.2088",
    longitude: "106.8456",
  },
  foundingDate: "2024",
  numberOfEmployees: "50-100",
  slogan: "Solusi Perbaikan Terpercaya",
  areaServed: [
    {
      "@type": "Country",
      name: "Indonesia",
    },
  ],
  serviceArea: [
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "-6.2088",
        longitude: "106.8456",
      },
      geoRadius: "1000000",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+62-21-12345678",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
      areaServed: "ID",
    },
  ],
};

// JSON-LD untuk Website
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://servease-ui.vercel.app/#website",
  url: "https://www.repairservice.id",
  name: "RepairService Indonesia",
  description:
    "Platform jasa perbaikan terpercaya yang menghubungkan pelanggan dengan teknisi profesional",
  publisher: {
    "@id": "https://servease-ui.vercel.app/#organization",
  },
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://servease-ui.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  ],
  inLanguage: "id-ID",
};

// JSON-LD untuk Service
export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Platform Jasa Perbaikan RepairService",
  description:
    "Layanan platform yang menghubungkan pelanggan dengan penyedia jasa perbaikan profesional untuk berbagai kebutuhan maintenance dan repair",
  provider: {
    "@id": "https://servease-ui.vercel.app/#organization",
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Katalog Jasa Perbaikan",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Perbaikan AC",
          description: "Service dan perbaikan AC semua merk",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Perbaikan Elektronik",
          description:
            "Perbaikan TV, kulkas, mesin cuci, dan elektronik lainnya",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Perbaikan Kendaraan",
          description: "Service motor, mobil, dan kendaraan bermotor lainnya",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Handyman",
          description: "Perbaikan rumah, renovasi, dan maintenance properti",
        },
      },
    ],
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "IDR",
    lowPrice: "50000",
    highPrice: "5000000",
    offerCount: "1000+",
  },
};

// JSON-LD untuk FAQ
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara memesan jasa perbaikan di RepairService?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anda dapat memesan jasa perbaikan melalui website atau aplikasi RepairService. Pilih kategori service yang dibutuhkan, pilih teknisi, tentukan jadwal, dan lakukan pembayaran secara online.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah teknisi di RepairService sudah terverifikasi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, semua teknisi di platform RepairService telah melalui proses verifikasi keahlian, identitas, dan background check untuk memastikan kualitas service yang terbaik.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa biaya service di RepairService?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biaya service bervariasi tergantung jenis perbaikan dan kompleksitas masalah. Anda dapat melihat estimasi harga sebelum memesan, dan semua tarif sudah transparan tanpa biaya tersembunyi.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ada garansi untuk service yang dilakukan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, RepairService menyediakan garansi service sesuai dengan ketentuan masing-masing teknisi. Detail garansi akan dijelaskan sebelum service dimulai.",
      },
    },
  ],
};

// Breadcrumb JSON-LD
export const breadcrumbJsonLd = (
  items: Array<{ name: string; item: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

// Review JSON-LD
export const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Organization",
    name: "RepairService Users",
  },
  reviewBody:
    "Platform terpercaya dengan teknisi yang profesional dan berkualitas. Harga transparan dan service memuaskan.",
  itemReviewed: {
    "@type": "Service",
    name: "RepairService Platform",
  },
};
