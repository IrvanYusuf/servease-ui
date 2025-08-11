"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "/review1.avif",
    rating: 5,
    date: "2 minggu lalu",
    comment:
      "Pelayanan sangat memuaskan! Teknisi datang tepat waktu, profesional, dan AC saya kembali dingin seperti baru. Harga juga sangat reasonable.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    name: "Sari Dewi",
    avatar: "/review2.avif",
    rating: 5,
    date: "1 minggu lalu",
    comment:
      "AC saya yang rusak sudah 3 bulan akhirnya bisa diperbaiki dengan sempurna. Teknisinya sangat ahli dan menjelaskan masalahnya dengan detail.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    name: "Ahmad Rahman",
    avatar: "/review3.avif",
    rating: 4,
    date: "3 hari lalu",
    comment:
      "Service bagus, cuma agak lama prosesnya. Tapi hasilnya memuaskan dan teknisinya ramah.",
    helpful: 5,
    verified: false,
  },
  {
    id: 4,
    name: "Linda Wijaya",
    avatar: "/review4.avif",
    rating: 5,
    date: "1 bulan lalu",
    comment:
      "Sangat puas dengan layanannya. AC jadi dingin lagi dan teknisinya memberikan tips maintenance yang berguna.",
    helpful: 15,
    verified: true,
  },
];

const ratingStats = {
  average: 4.8,
  total: 1250,
  distribution: [
    { stars: 5, count: 950, percentage: 76 },
    { stars: 4, count: 200, percentage: 16 },
    { stars: 3, count: 75, percentage: 6 },
    { stars: 2, count: 15, percentage: 1 },
    { stars: 1, count: 10, percentage: 1 },
  ],
};

export default function ServiceReviews() {
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {ratingStats.average}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">{ratingStats.total} ulasan</p>
            </div>
            <div className="space-y-2">
              {ratingStats.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm w-8">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="highest">Rating Tertinggi</SelectItem>
            <SelectItem value="lowest">Rating Terendah</SelectItem>
            <SelectItem value="helpful">Paling Membantu</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterRating} onValueChange={setFilterRating}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Rating</SelectItem>
            <SelectItem value="5">5 Bintang</SelectItem>
            <SelectItem value="4">4 Bintang</SelectItem>
            <SelectItem value="3">3 Bintang</SelectItem>
            <SelectItem value="2">2 Bintang</SelectItem>
            <SelectItem value="1">1 Bintang</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative shrink-0 w-10 h-10">
                  <Image
                    width={40}
                    height={40}
                    src={review.avatar || "/placeholder.png"}
                    alt={review.name}
                    className="rounded-full object-cover shrink-0 h-full w-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.name}</span>
                      {review.verified && (
                        <Badge className="text-xs bg-green-100 text-green-800 hover:bg-green-100">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {review.comment}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Membantu ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Muat Lebih Banyak</Button>
      </div>
    </div>
  );
}
