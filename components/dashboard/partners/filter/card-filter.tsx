"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CardFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil nilai awal dari URL jika ada
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    if (searchTerm === "") {
      params.delete("search");
    } else {
      params.set("search", searchTerm);
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    router.push("?");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters & Search</CardTitle>
          {searchTerm && (
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={clearFilters}
            >
              <Trash2 />
              Clear Filters & Search
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search nama perusahaan, kota, provinsi atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFilter;
