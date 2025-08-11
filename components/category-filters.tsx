"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function CategoryFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setPriceRange([0, 1000000]);
  };

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Filter Aktif</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Hapus Semua
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {filter}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Rentang Harga</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000000}
              step={50000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
              <span>Rp {priceRange[1].toLocaleString("id-ID")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addFilter(`${rating} bintang ke atas`);
                    } else {
                      removeFilter(`${rating} bintang ke atas`);
                    }
                  }}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm cursor-pointer"
                >
                  {rating} bintang ke atas
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
