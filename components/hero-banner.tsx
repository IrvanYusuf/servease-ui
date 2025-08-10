"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import Link from "next/link";
import { PATHS } from "@/lib/paths";

const banners = [
  {
    id: 1,
    title: "Perbaikan AC Profesional",
    subtitle: "Teknisi berpengalaman, garansi resmi",
    discount: "Diskon 30%",
    image: "/ac-mechanic.png",
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-800",
    categoryId: "6879b5bb8a6301eca1bf4bd2",
  },
  {
    id: 2,
    title: "Service Elektronik Terpercaya",
    subtitle: "TV, Kulkas, Mesin Cuci & Lainnya",
    discount: "Gratis Konsultasi",
    image: "/pc-service.jpg",
    bgColor: "bg-gradient-to-r from-green-600 to-green-800",
    categoryId: "6879c2eecaed8b685f3de4c3",
  },
  {
    id: 3,
    title: "Renovasi Rumah",
    subtitle: "Ubah tampilan rumah jadi lebih nyaman dan modern",
    discount: "Call 24/7",
    image: "/house-repair.jpg",
    bgColor: "bg-gradient-to-r from-orange-600 to-orange-800",
    categoryId: "6879c4eacaed8b685f3de4d9",
  },
];
export function HeroBanner() {
  return (
    <Carousel
      className="w-full container px-4 mx-auto mt-6"
      opts={{ loop: true }}
      plugins={[AutoPlay({ delay: 3000 })]}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.id}>
            <Card
              className={`w-full h-full transition-transform duration-500 ease-in-out ${banner.bgColor} `}
            >
              <div className={`h-full flex items-center`}>
                <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Text Content - Priority untuk LCP */}
                    <div className="text-white space-y-6 order-1">
                      <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
                        {banner.discount}
                      </div>

                      {/* H1 Tag untuk SEO dan LCP */}
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-slide-up">
                        {banner.title}
                      </h1>

                      <p className="text-lg md:text-xl text-white/90 animate-slide-up-delay">
                        {banner.subtitle}
                      </p>

                      <div className="flex flex-row gap-4 animate-fade-in-delay">
                        <Link
                          href={PATHS.home.category.listServicesByCategory(
                            banner.categoryId
                          )}
                        >
                          <Button
                            size="lg"
                            className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            aria-label="Pesan layanan sekarang"
                          >
                            Pesan Sekarang
                          </Button>
                        </Link>
                        <Link
                          href={PATHS.home.category.listServicesByCategory(
                            banner.categoryId
                          )}
                        >
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent transition-colors duration-200 cursor-pointer"
                            aria-label="Lihat semua layanan"
                          >
                            Lihat Layanan
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Image Section - Optimized untuk LCP */}
                    <div className="hidden md:block order-2">
                      <div className="relative">
                        <Image
                          src={banner.image ?? "/placehoder.png"}
                          alt={`${banner.title} - Layanan profesional`}
                          width={600}
                          height={350}
                          className="w-full h-[300px] md:h-[350px] object-cover rounded-lg shadow-xl"
                          priority={index === 0} // Hanya prioritas untuk slide pertama
                          loading={index === 0 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyugDY4gbTpvx6RWsKlMZgn8RtQAIRJNJQJJALPOWTNOCTiWlQrJ5V5+G4p1bOCnkpR2HsLJHGr/9k="
                        />

                        {/* Loading skeleton untuk gambar lazy */}
                        {index !== 0 && (
                          <div className="absolute inset-0 bg-white/10 animate-pulse rounded-lg" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
