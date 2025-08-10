"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta Selatan",
    service: "Service AC Split",
    rating: 5,
    comment:
      "Pelayanan sangat memuaskan! Teknisi datang tepat waktu, profesional, dan AC saya kembali dingin seperti baru. Harga juga sangat reasonable.",
    avatar: "/review1.avif",
    date: "2 minggu lalu",
  },
  {
    id: 2,
    name: "Sari Dewi",
    location: "Jakarta Barat",
    service: "Perbaikan TV LED",
    rating: 5,
    comment:
      "TV saya yang rusak sudah 3 bulan akhirnya bisa diperbaiki dengan sempurna. Teknisinya sangat ahli dan menjelaskan masalahnya dengan detail.",
    avatar: "/review2.avif",
    date: "1 minggu lalu",
  },
  {
    id: 3,
    name: "Ahmad Rahman",
    location: "Jakarta Timur",
    service: "Perbaikan Pipa Bocor",
    rating: 5,
    comment:
      "Respon sangat cepat! Dalam 1 jam teknisi sudah datang dan langsung mengatasi masalah pipa bocor di kamar mandi. Terima kasih RepairService!",
    avatar: "/review3.avif",
    date: "3 hari lalu",
  },
  {
    id: 4,
    name: "Linda Wijaya",
    location: "Jakarta Utara",
    service: "Instalasi Listrik",
    rating: 5,
    comment:
      "Instalasi listrik untuk rumah baru saya dikerjakan dengan sangat rapi dan aman. Teknisinya berpengalaman dan memberikan garansi yang memuaskan.",
    avatar: "/review4.avif",
    date: "1 bulan lalu",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Pelanggan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testimoni dari ribuan pelanggan yang puas dengan layanan kami
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="p-8 text-center">
                      <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />

                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>

                      <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                        &quot;{testimonial.comment}&quot;
                      </blockquote>

                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={testimonial.avatar || "/placeholder.png"}
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.location}
                          </div>
                          <div className="text-sm text-blue-600">
                            {testimonial.service}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 mt-4">
                        {testimonial.date}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl"
            onClick={prevTestimonial}
            aria-label="prev-icon"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl"
            onClick={nextTestimonial}
            aria-label="next-icon"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-6 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label="dots-indicator"
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Teknisi Ahli</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
            <div className="text-gray-600">Rating Rata-rata</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Layanan Darurat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
