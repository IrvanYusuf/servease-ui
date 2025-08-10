import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

const CardFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil nilai awal dari URL jika ada
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [ratingFilter, setRatingFilter] = useState(
    searchParams.get("rating") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("review_status") || ""
  );

  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    searchParams.get("from") ? new Date(searchParams.get("from")!) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    searchParams.get("to") ? new Date(searchParams.get("to")!) : undefined
  );
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleRatingFilter = (value: string) => {
    setRatingFilter(value);

    const params = new URLSearchParams(window.location.search);
    if (value === "all") {
      params.delete("rating");
    } else {
      params.set("rating", value);
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);

    const params = new URLSearchParams(window.location.search);
    if (value === "all") {
      params.delete("review_status");
    } else {
      params.set("review_status", value);
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const handleDateFromFilter = (value: Date) => {
    setDateFrom(value);

    const params = new URLSearchParams(window.location.search);
    params.set("from", value.toISOString().split("T")[0]);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleDateToFilter = (value: Date) => {
    setDateTo(value);

    const params = new URLSearchParams(window.location.search);
    params.set("to", value.toISOString().split("T")[0]);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

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
    setStatusFilter("");
    setSearchTerm("");
    setRatingFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
    router.push("?");
  };

  const exportBookings = () => {
    // Export logic here
    console.log("Exporting bookings...");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters & Search</CardTitle>
          {(statusFilter || ratingFilter || dateFrom || searchTerm) && (
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
                placeholder="Search booking numbers, customers, or services..."
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-full" aria-label="status-select-btn">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="reviewed">Sudah Direview</SelectItem>
              <SelectItem value="not_reviewed">Belum Direview</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ratingFilter} onValueChange={handleRatingFilter}>
            <SelectTrigger className="w-full" aria-label="rating-select-btn">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rating</SelectItem>
              {Array.from({ length: 5 }).map((_, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  <Star className="fill-yellow-400 text-yellow-400" />
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
              >
                {dateFrom ? format(dateFrom, "yyyy-MM-dd") : "Select date from"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateFrom}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    handleDateFromFilter(date);
                    setOpenFrom(false);
                  }
                }}
              />
            </PopoverContent>
          </Popover>

          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
              >
                {dateTo ? format(dateTo, "yyyy-MM-dd") : "Select date to"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateTo}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    handleDateToFilter(date);
                    setOpenTo(false);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFilter;
