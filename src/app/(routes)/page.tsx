import { getShopItems } from "@/actions/shopItem";
import { FeaturesSection } from "@/components/home/sections/features-section";
import FooterSection from "@/components/home/sections/footer-section";
import { Header } from "@/components/home/sections/header-section";
import { HeroSection } from "@/components/home/sections/hero-section";
import { HowItWorksSection } from "@/components/home/sections/how-it-works-section";
import { PricingSection } from "@/components/home/sections/pricing-section";
import { StatsSection } from "@/components/home/sections/stats-section";
import { TestimonialsSection } from "@/components/home/sections/testimonial-section";
import { LearnMoreDialog } from "@/components/modal/learn-more-dialog";

export default async function Home() {
  const plans = await getShopItems();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      {plans && <PricingSection plans={plans} />}
      <FooterSection />
      <LearnMoreDialog />
    </div>
  );
}
