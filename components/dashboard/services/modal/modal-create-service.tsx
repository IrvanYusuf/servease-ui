"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, Fragment, useState } from "react";
import { toast } from "sonner";
import { PlusIcon, X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import DashboardPartnersServices from "@/services/dashboard/partner.service";
import queryClient from "@/lib/queryClient";
import {
  createServicePayload,
  createServiceSchema,
} from "@/schema/service.schema";
import { NumericFormat } from "react-number-format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoriesService from "@/services/category.service";
import Image from "next/image";
import DashboardPartnerServicesService from "@/services/dashboard/servicePartner.service";

export default function ModalCreateService() {
  const [open, setOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const form = useForm<createServicePayload>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      price: "0",
      description: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    const currentFiles = form.getValues("gallery_images") ?? [];

    // Gabungkan file yang lama + baru
    const allFiles = [...currentFiles, ...selectedFiles];

    // Batasi maksimal 6
    const limitedFiles = allFiles.slice(0, 6);

    form.setValue("gallery_images", limitedFiles);

    // Update preview juga
    const newPreviews = selectedFiles
      .slice(0, 6 - currentFiles.length) // hanya sisanya yang baru
      .map((file) => URL.createObjectURL(file));

    setGalleryPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteImage = (index: number) => {
    const deleteImages = galleryPreview.filter((value, idx) => idx !== index);
    setGalleryPreview(deleteImages);
    const currentFiles = form.getValues("gallery_images");
    const updatedFiles = currentFiles.filter((_, idx) => idx !== index);
    form.setValue("gallery_images", updatedFiles);
  };

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories-select"],
    queryFn: CategoriesService.getAllCategories,
  });

  const { data: partners, isLoading: isLoadingPartners } = useQuery({
    queryKey: ["partners-select"],
    queryFn: () => DashboardPartnersServices.getAllPartners({ limit: 20 }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: DashboardPartnerServicesService.mutationCreateService,
    onSuccess: () => {
      toast.success("Berhasi tambah layanan");
      queryClient.invalidateQueries({
        queryKey: ["dashboard-service-list"],
      });
      form.reset();
      setThumbnailPreview(null);
      setGalleryPreview([]);
    },
    onError: (error: any) => {
      console.log(error);

      toast.error(error.message);
    },
  });

  const onSubmit = (data: createServicePayload) => {
    const formData = new FormData();
    formData.append("thumbnail", data.thumbnail);
    formData.append("name", data.name);
    formData.append("category_id", data.category_id);
    formData.append("partner_id", data.partner_id);
    formData.append("price", data.price);
    formData.append("description", data.description);
    data.gallery_images.forEach((file, index) => {
      formData.append("gallery_images", file);
    });
    mutate(formData);
  };

  const dataPartners = partners?.data.data ?? [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          <PlusIcon />
          Tambah Layanan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Layanan</DialogTitle>
          <DialogDescription>
            Isi form dibawah untuk menambah layanan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/** Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Layanan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama layanan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <FormControl>
                    <NumericFormat
                      value={field.value}
                      customInput={Input}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp "
                      allowNegative={false}
                      placeholder="Rp 0"
                      getInputRef={field.ref}
                      onValueChange={(values) => {
                        form.setValue("price", values.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Category id */}
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingCategories ? (
                        <span>loading....</span>
                      ) : (
                        <Fragment>
                          {categories?.data.map((category) => (
                            <SelectItem value={category._id} key={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </Fragment>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Category id */}
            <FormField
              control={form.control}
              name="partner_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner/Perusahaan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih perusahaan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingPartners ? (
                        <span>loading....</span>
                      ) : (
                        <Fragment>
                          {dataPartners?.map((partner) => (
                            <SelectItem value={partner._id} key={partner._id}>
                              {partner.name}
                            </SelectItem>
                          ))}
                        </Fragment>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Profile Image */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          const url = URL.createObjectURL(file);
                          setThumbnailPreview(url);
                        }
                      }}
                    />
                  </FormControl>
                  {thumbnailPreview && (
                    <div className="grid grid-cols-2">
                      <div className="mt-2 relative w-full h-30">
                        <Image
                          src={thumbnailPreview}
                          alt="Preview Thumbnail"
                          fill
                          className="rounded w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* gallery images */}
            <FormField
              control={form.control}
              name="gallery_images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  {galleryPreview.length > 0 && (
                    <div>
                      <div className="grid grid-cols-2 w-full gap-4">
                        {galleryPreview.map((image, index) => (
                          <div
                            key={index}
                            className="mt-2 border border-emerald-400 relative w-full h-30 object-cover"
                          >
                            <Image
                              src={image}
                              alt="Preview gallery"
                              fill
                              className="rounded w-full h-full object-cover"
                            />
                            <div
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full cursor-pointer"
                              onClick={() => handleDeleteImage(index)}
                            >
                              <X size={18} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        Total files: {form.watch("gallery_images")?.length || 0}{" "}
                        / 6
                      </p>
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isPending}
                className="cursor-pointer"
              >
                {isPending ? "Memproses..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
