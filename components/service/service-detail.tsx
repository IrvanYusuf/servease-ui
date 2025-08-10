"use client";

import Link from "next/link";
import {
  Star,
  MapPin,
  Shield,
  Home,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceGallery from "../service-gallery";
import TechnicianProfile from "../technician-profile";
import ServiceReviews from "../service-reviews";
import { NumericFormat } from "react-number-format";
import RelatedServices from "../related-services";
import { useQuery } from "@tanstack/react-query";
import ServicesServices from "@/services/service.service";
import SkeletonTechnicianProfile from "./skeleton/skeleton-technician-profile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PATHS } from "@/lib/paths";

export default function ServiceDetail({ serviceId }: { serviceId: string }) {
  const { data: dataServiceDetail, isLoading } = useQuery({
    queryKey: ["service-detail", serviceId],
    queryFn: () => ServicesServices.getServiceDetail(serviceId),
  });

  const { data: dataSimilarService, isLoading: isLoadingDataSimilar } =
    useQuery({
      queryKey: ["similar-service", serviceId],
      queryFn: () =>
        ServicesServices.getAllServicesByCategory({
          categoryId: dataServiceDetail!.data.category_id._id || "",
          limit: 4,
        }),
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <div className="flex items-center">
                <Home className="w-4 h-4 mr-1" />
                <Link href="/">Beranda</Link>
              </div>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={PATHS.home.category.listServicesByCategory(
                  dataServiceDetail?.data.category_id._id ?? ""
                )}
              >
                {dataServiceDetail?.data.category_id.name || ""}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-900 font-medium">
              {dataServiceDetail?.data.name || ""}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Gallery */}
          <ServiceGallery
            images={dataServiceDetail?.data.gallery_images || []}
            thumbnail={dataServiceDetail?.data.thumbnail || ""}
          />

          {/* Service Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2 bg-blue-600">
                  {dataServiceDetail?.data.category_id.name || ""}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {dataServiceDetail?.data.name || ""}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium ml-1">
                      {dataServiceDetail?.data.rating || 0}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({dataServiceDetail?.data.total_reviews || 0} ulasan)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {dataServiceDetail?.data.partner_id.city || ""}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <p
              className="text-gray-700 leading-relaxed mb-6 text-justify"
              dangerouslySetInnerHTML={{
                __html: dataServiceDetail?.data.description || "",
              }}
            ></p>

            {/* Service Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Garansi</h4>
                  <p className="text-sm text-gray-600">30 hari</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Teknisi Bersertifikat</h4>
                  <p className="text-sm text-gray-600">Teknisi profesional</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Area Layanan</h4>
                  <p className="text-sm text-gray-600">
                    {dataServiceDetail?.data.partner_id.city || ""}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="technician" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="technician">Teknisi</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>
            <TabsContent value="technician">
              {isLoading ? (
                <SkeletonTechnicianProfile />
              ) : dataServiceDetail?.data ? (
                <TechnicianProfile service={dataServiceDetail.data} />
              ) : null}
            </TabsContent>
            <TabsContent value="reviews">
              <ServiceReviews />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Pesan Layanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-gray-900">
                    <NumericFormat
                      value={dataServiceDetail?.data.price || 0}
                      displayType="text"
                      prefix="Rp "
                      thousandSeparator={"."}
                      decimalSeparator=","
                    />
                  </span>
                  <span className="text-gray-500 ml-1">mulai dari</span>
                </div>

                <Link href={`/booking/${serviceId}`} className="cursor-pointer">
                  <Button className="w-full cursor-pointer" size="lg">
                    Pesan Sekarang
                  </Button>
                </Link>

                <div className="flex gap-2 mt-3">
                  <Link
                    href={`https://wa.me/${dataServiceDetail?.data.user_id.phone}`}
                    className="flex-1"
                    target="_blank"
                  >
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer bg-transparent"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Telepon
                    </Button>
                  </Link>
                  <Link
                    href={`https://wa.me/${dataServiceDetail?.data.user_id.phone}`}
                    className="flex-1"
                    target="_blank"
                  >
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">Call Center</p>
                      <p className="text-sm text-gray-600">+62 21 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">+62 812 3456 7890</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Services */}
      <div className="mt-16">
        <RelatedServices
          dataSimilarService={dataSimilarService?.data.data || []}
          isLoading={isLoadingDataSimilar}
        />
      </div>
    </div>
  );
}
