"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";

interface ServiceGalleryProps {
  images: string[];
  thumbnail: string;
}

export default function ServiceGallery({
  images,
  thumbnail,
}: ServiceGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const galleryImage = [thumbnail, ...images];

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 w-full">
          <Image
            src={galleryImage[currentImage] || "/placeholder.png"}
            alt="Service image"
            fill
            className="object-cover cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />

          {galleryImage.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Grid */}
        {galleryImage.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {galleryImage.map((image, index) => (
              <button
                key={index}
                className={`aspect-video w-full relative rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImage
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={image || "/placeholder.png"}
                  alt={`Service image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute p-0 cursor-pointer -top-2 -right-2 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <IoIosCloseCircle className="w-8 h-8" />
            </div>
            <Image
              src={images[currentImage] || "/placeholder.png"}
              alt="Service image"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
