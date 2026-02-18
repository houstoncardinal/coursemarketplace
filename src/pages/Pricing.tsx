import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: ["1 published course", "Up to 50 students", "Basic analytics", "CourseForge branding", "Email support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For serious creators",
    features: ["Unlimited courses", "Unlimited students", "Advanced analytics & AI insights", "Custom branding", "Your own payment keys", "Coupons & promotions", "Priority support"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$149",
    period: "/mo",
    description: "For teams and enterprises",
    features: ["Everything in Pro", "Multiple team members", "White-label experience", "API access", "Custom integrations", "Dedicated account manager", "99.9% uptime SLA"],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <div className="container py-20">
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free, upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border p-8 transition-all",
                plan.featured
                  ? "border-accent cf-shadow-hover scale-[1.02] bg-card relative"
                  : "border-border bg-card hover:cf-shadow-card"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 cf-gradient text-primary text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-extrabold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
              </div>
              <Link to="/auth?mode=signup">
                <Button
                  size="lg"
                  className={cn(
                    "w-full h-12 font-semibold",
                    plan.featured ? "cf-gradient text-primary" : ""
                  )}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-cf-success shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
