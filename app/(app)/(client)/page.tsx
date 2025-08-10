import ServiceCategories from "@/components/service-categories";
import PopularServices from "@/components/popular-services";
import Testimonials from "@/components/testimonials";
import { HeroBanner } from "@/components/hero-banner";
import SearchHome from "@/components/search-home";

export default function HomePage() {
  return (
    <div>
      <main>
        <HeroBanner />
        <SearchHome />
        <ServiceCategories />
        <PopularServices />
        <Testimonials />
      </main>
    </div>
  );
}
