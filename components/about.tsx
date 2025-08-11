"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "./magicui/number-ticker";
import { Fragment } from "react";

interface AboutProps {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string | number;
    value2?: number;
  }>;
}

const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Pelanggan Kami", value: 1000 },
  { label: "Teknisi Ahli", value: 800 },
  { label: "Rating Rata-rata", value: 4.8 },
  { label: "Layanan Darurat", value: 24, value2: 7 },
];

const About = ({
  title = "About Us",
  description = "RepairService hadir untuk memberikan layanan perbaikan yang praktis, cepat, dan berkualitas tinggi, memastikan perangkat dan kebutuhan Anda kembali berfungsi sempurna.",
  mainImage = {
    src: "/about1.jpg",
    alt: "placeholder",
  },
  secondaryImage = {
    src: "/about2.jpg",
    alt: "placeholder",
  },
  breakout = {
    src: "/logo.svg",
    alt: "logo",
    title: "Layanan Perbaikan Terpercaya di Ujung Jari Anda",
    description:
      "Dari peralatan rumah tangga hingga perangkat elektronik, kami siap membantu memperbaiki masalah Anda dengan cepat, profesional, dan bergaransi.",
    buttonText: "Pesan Layanan Sekarang",
    buttonUrl: "https://servease-ui.vercel.app/",
  },
  companiesTitle = "Valued by clients worldwide",
  companies = defaultCompanies,
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = defaultAchievements,
}: AboutProps = {}) => {
  return (
    <section className="py-32">
      <div className="w-full container px-4 mx-auto mt-6">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <div className="size-full max-h-[620px] object-cover lg:col-span-2 relative">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        <div className="py-32">
          <p className="text-center">{companiesTitle} </p>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {companies.map((company, idx) => (
                <div
                  className="flex items-center gap-3"
                  key={company.src + idx}
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    className="h-6 w-auto md:h-8"
                  />
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-600/60 text-white p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-xl text-white/80">{achievementsDescription}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p>{item.label}</p>
                <span className="text-4xl text-white font-semibold md:text-5xl">
                  {item.value2 ? (
                    <Fragment>
                      <NumberTicker
                        value={Number(item.value)}
                        className="text-white"
                      />
                      <span>/</span>
                      <NumberTicker
                        value={Number(item.value2)}
                        className="text-white"
                      />
                    </Fragment>
                  ) : (
                    <NumberTicker
                      value={Number(item.value)}
                      className="text-white"
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-15 md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
