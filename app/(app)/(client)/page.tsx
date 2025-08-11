import ServiceCategories from "@/components/service-categories";
import PopularServices from "@/components/popular-services";
import Testimonials from "@/components/testimonials";
import { HeroBanner } from "@/components/hero-banner";
import SearchHome from "@/components/search-home";
import About from "@/components/about";

export default function HomePage() {
  return (
    <div>
      <main>
        <HeroBanner />
        <SearchHome />
        <ServiceCategories />
        <PopularServices />
        <About title="Tentang Kami" />
        <Testimonials />
      </main>
    </div>
  );
}
