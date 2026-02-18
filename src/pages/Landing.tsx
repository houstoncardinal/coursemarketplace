import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Globe, CreditCard, Star, Zap, Shield, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { MOCK_COURSES, STATS, CATEGORIES } from "@/lib/mock-data";
import heroBg from "@/assets/hero-bg.jpg";
import type { Easing } from "framer-motion";

const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: easeOut },
  }),
};

export default function Landing() {
  const featuredCourses = MOCK_COURSES.filter((c) => c.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-background" />
        <div className="relative container py-24 md:py-36">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-cf-amber-light">
                <Zap className="h-3.5 w-3.5" /> Now with AI-powered course analytics
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-foreground leading-[1.08] mb-6"
            >
              Build & sell courses{" "}
              <span className="cf-gradient-text">your way</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-8 leading-relaxed"
            >
              The all-in-one platform for creators to build world-class online schools, connect their own payments, and scale with powerful analytics.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="cf-gradient text-primary font-semibold text-base px-8 h-12">
                  Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="ghost" className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8">
                  <Play className="mr-2 h-4 w-4" /> Browse Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5 cf-shadow-card text-center"
            >
              <stat.icon className="h-5 w-5 text-accent mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Courses</h2>
            <p className="text-muted-foreground">Hand-picked by our team for quality and impact</p>
          </div>
          <Link to="/marketplace" className="hidden md:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/50 py-20">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
            Explore by Category
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Thousands of courses across every discipline
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/marketplace?category=${cat.name}`}
                  className="block rounded-xl border border-border bg-card p-6 text-center transition-all hover:cf-shadow-hover hover:-translate-y-1"
                >
                  <cat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <p className="font-display font-semibold text-foreground text-sm">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} courses</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator CTA */}
      <section className="container py-20">
        <div className="relative rounded-2xl overflow-hidden cf-hero-gradient p-10 md:p-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to teach the world?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
              Join thousands of creators earning a living by sharing their expertise. Set up your online school in minutes — no tech skills required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="cf-gradient text-primary font-semibold h-12 px-8">
                  Become a Creator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-accent animate-float" />
            <div className="absolute bottom-10 right-40 w-20 h-20 rounded-full border border-accent/50 animate-float" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
          Everything you need to succeed
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          From course creation to payment processing, we handle the infrastructure so you can focus on teaching.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Drag & Drop Builder", desc: "Create structured courses with videos, quizzes, assignments, and downloadable resources." },
            { icon: CreditCard, title: "Your Own Payments", desc: "Connect your Stripe or PayPal keys. You keep your revenue — we never touch your money." },
            { icon: Star, title: "AI Analytics", desc: "Course health scores, drop-off detection, revenue forecasting, and smart suggestions." },
            { icon: Users, title: "Student Management", desc: "Track enrollments, monitor progress, issue certificates, and engage your community." },
            { icon: Shield, title: "Secure by Design", desc: "Role-based access, webhook verification, signed URLs, and encrypted payment keys." },
            { icon: Globe, title: "Custom Branding", desc: "Your school, your brand. Custom subdomain, logo, colors, and white-label experience." },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:cf-shadow-hover"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 mb-4">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
