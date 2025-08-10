import React, { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Service } from "@/types/service.type";
import Image from "next/image";

interface CardServiceProps {
  service: Service;
  viewMode?: string;
}

const CardService: FC<CardServiceProps> = ({ service, viewMode }) => {
  return (
    <Card
      key={service._id}
      className={`group hover:shadow-xl transition-all py-0 duration-300`}
    >
      <div className={viewMode === "list" ? "flex" : ""}>
        <div
          className={`relative rounded-t-lg overflow-hidden ${
            viewMode === "list" ? "w-64 rounded-l-lg" : "aspect-[4/3] w-full"
          }`}
        >
          <Image
            src={service.thumbnail || "/placeholder.png"}
            alt={service.name}
            fill
            className={`object-cover ${
              viewMode === "list"
                ? "w-full h-32 rounded-l-lg"
                : "w-full h-48 rounded-t-lg"
            }`}
          />
        </div>

        <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
          <div>
            <div className={viewMode === "list" ? "flex-1" : ""}>
              <div className="mb-2">
                <span className="text-xs text-blue-600 font-medium">
                  {service.category_id.name}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                <Link href={`/service/${service._id}`}>{service.name}</Link>
              </h3>
              <p
                className="text-sm text-gray-600 mb-3 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: service.description || "",
                }}
              ></p>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">
                    {service.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({service.total_reviews})
                </span>
              </div>

              <div className={`text-sm text-gray-500 mb-3`}>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <div className="flex gap-x-3">
                    <span>{service.partner_id.district}</span>
                    <span>{service.partner_id.city}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                Teknisi:{" "}
                <span className="font-medium">{service.partner_id.name}</span>
              </div>
            </div>

            <div className="w-full">
              <div>
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    Rp {service.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">mulai dari</span>
                </div>
              </div>

              <Link
                href={`/service/${service._id}`}
                className="cursor-pointer w-full"
              >
                <Button
                  className={`cursor-pointer transition-colors w-full mt-4`}
                >
                  Lihat Detail
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CardService;
