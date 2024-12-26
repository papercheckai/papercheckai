import { getShopItems } from "@/actions/shopItem";
import Navbar from "@/components/layouts/navbar";
import PricingCard from "@/components/shop/pricing-card";

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <br />
  </section>
);

export default async function ShopPage() {
  const shopItems = await getShopItems();

  const plans = shopItems?.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    features: item.features,
    actionLabel: item.actionLabel,
    popular: item.popular,
    exclusive: item.exclusive,
  }));

  return (
    <div className="space-y-4">
      <Navbar title="Shop" />
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans?.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />;
        })}
      </section>
    </div>
  );
}
