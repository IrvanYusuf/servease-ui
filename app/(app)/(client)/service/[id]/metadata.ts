import { Service } from "@/types/service.type";
import { Metadata } from "next";

export const generateServiceDetailMetadata = (service: Service): Metadata => ({
  title: `${service.name} - ${
    service.partner_id.name
  } | Mulai dari Rp${service.price.toLocaleString()} | RepairService`,
  description: `${service.description} Dilayani oleh ${service.partner_id.name} di ${service.partner_id.city}. Rating ${service.rating}/5 dari ${service.total_reviews} ulasan. Booking online mudah dan terpercaya.`,
  keywords: [
    service.name.toLowerCase(),
    `jasa ${service.category_id.name.toLowerCase()}`,
    `${service.name} ${service.partner_id.city}`,
    `service ${service.category_id.name} ${service.partner_id.city}`,
    service.partner_id.name.toLowerCase(),
    `perbaikan ${service.category_id.name.toLowerCase()}`,
    "booking service online",
  ],
  openGraph: {
    title: `${service.name} - ${service.partner_id.name}`,
    description: `⭐ ${
      service.rating
    }/5 | 💰 Mulai Rp${service.price.toLocaleString()} | 📍 ${
      service.partner_id.city
    } | ${service.total_reviews} Reviews`,
    images: [
      {
        url: service.thumbnail || "/ac-mechanic.png",
        width: 1200,
        height: 630,
        alt: `${service.name} - ${service.partner_id.name}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${service.name} - ${service.partner_id.name}`,
    description: `Rating ${
      service.rating
    }/5 ⭐ | Mulai dari Rp${service.price.toLocaleString()} | Booking sekarang!`,
  },
});

// JSON-LD untuk Service Detail
export const generateServiceDetailJsonLd = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://servease-ui.vercel.app/service/${service._id}`,
  name: service.name,
  description: service.description,
  image: service.thumbnail || ["/ac-mechanic.png"],
  url: `https://servease-ui.vercel.app/service/${service._id}`,
  category: service.category_id.name,
  provider: {
    "@type": "Organization",
    name: service.partner_id.name,
    url: `https://servease-ui.vercel.app/service/${service._id}`,
    telephone: service.user_id.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: service.partner_id.district,
      addressLocality: service.partner_id.city,
      addressRegion: service.partner_id.province,
      addressCountry: "ID",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: service.rating,
      reviewCount: service.total_reviews,
      bestRating: "5",
      worstRating: "1",
    },
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "IDR",
    price: service.price,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    validFrom: new Date().toISOString().split("T")[0],
    seller: {
      "@type": "Organization",
      name: service.partner_id.name,
    },
  },
  aggregateRating:
    service.total_reviews > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: service.rating,
          reviewCount: service.total_reviews,
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
  areaServed: {
    "@type": "City",
    name: service.partner_id.city,
  },
});
