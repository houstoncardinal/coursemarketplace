import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BookOpen, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "login"
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 cf-hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg cf-gradient">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-primary-foreground">CourseForge</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4 leading-tight">
            Start building your online school today
          </h2>
          <p className="text-primary-foreground/60 leading-relaxed">
            Join 12,000+ creators who trust CourseForge to host, sell, and scale their online courses.
          </p>
        </div>
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-accent/20 animate-float" />
        <div className="absolute bottom-20 right-32 w-24 h-24 rounded-full border border-accent/10 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg cf-gradient">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">CourseForge</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Start your journey as a creator or student"}
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="John Doe" className="pl-10" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="you@example.com" className="pl-10" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full cf-gradient text-primary font-semibold h-12">
              {mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-accent font-medium hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
