"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Search, Menu, X, User, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PATHS } from "@/lib/paths";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import CategoriesService from "@/services/category.service";
import { Badge } from "./ui/badge";
import { menuItems } from "@/components/profile/menu-items";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { useUserStore } from "@/store/useUserStore";
import { useBookingStatsStore } from "@/store/useBookingStatsStore";
import LocationUser from "./location-user";

export default function Header() {
  const { token, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const totalNotReviewed = useBookingStatsStore(
    (state) => state.totalNotReviewed
  );

  const { data: dataCategories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesService.getAllCategories,
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              RepairService
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer">
                    Kategori Layanan
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {isLoading
                        ? "loading..."
                        : dataCategories?.data.map((category) => (
                            <NavigationMenuLink key={category.name} asChild>
                              <Link
                                href={PATHS.home.category.listServicesByCategory(
                                  category._id
                                )}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {category.name}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Cari layanan perbaikan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Location & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <LocationUser />
            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name.split(" ")[0] ?? "John"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={PATHS.profile.root} className="w-full">
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  {user?.role !== "USER" && (
                    <DropdownMenuItem>
                      <Link href={PATHS.dashboard.root} className="w-full">
                        Dahsboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <Link href={PATHS.profile.booking.root} className="w-full">
                      Riwayat Pemesanan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="cursor-pointer" size="sm">
                  <Link href={PATHS.auth.login} className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Masuk
                  </Link>
                </Button>
                <Button size="sm" className="cursor-pointer">
                  <Link
                    href={PATHS.auth.register.choose}
                    className="flex items-center"
                  >
                    Daftar
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="hamburger-menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ScrollArea className="md:hidden py-4 border-t h-[calc(100vh-64px)]">
            <div className="space-y-4 overflow-y-auto">
              {token ? (
                <Fragment>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Cari layanan..."
                      className="pl-10"
                    />
                  </div>
                  <div className="space-y-2 overflow-y-auto">
                    <nav className="space-y-1">
                      {menuItems({ totalNotReviewed }).map((item) => {
                        const IconComponent = item.icon;
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                              isActive
                                ? "bg-blue-50 border-r-2 border-blue-600"
                                : ""
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent
                                className={`w-5 h-5 ${
                                  isActive ? "text-blue-600" : "text-gray-600"
                                }`}
                              />
                              <div>
                                <div
                                  className={`font-medium ${
                                    isActive ? "text-blue-600" : "text-gray-900"
                                  }`}
                                >
                                  {item.label}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                            {item.badge && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        );
                      })}

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex space-x-3 p-4 hover:bg-red-50 transition-colors text-red-600 items-center cursor-pointer"
                      >
                        <LogOut className="w-5 h-5" />
                        <div>
                          <div className="font-medium text-left">Keluar</div>
                          <div className="text-xs text-red-500">
                            Logout dari akun
                          </div>
                        </div>
                      </button>
                    </nav>
                  </div>
                </Fragment>
              ) : (
                <div className="flex space-x-2 pt-4">
                  <Link href={PATHS.auth.login} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Masuk
                    </Button>
                  </Link>
                  <Button size="sm" className="flex-1">
                    <Link
                      href={PATHS.auth.register.choose}
                      className="flex items-center"
                    >
                      Daftar
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </header>
  );
}
