import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Search } from "lucide-react";

const SearchHome = () => {
  return (
    <div className="mt-4 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Apa yang perlu diperbaiki?"
              className="pl-12 h-12 text-lg w-full"
            />
          </div>
          <div className="flex-1 relative w-full">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Lokasi Anda"
              className="pl-12 h-12"
            />
          </div>
          <Button size="lg" className="h-12 px-8">
            Cari Layanan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
