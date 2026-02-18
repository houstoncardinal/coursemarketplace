import { Link } from "react-router-dom";
import { Star, Users, Clock, BookOpen, Badge } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  creator: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  lessonCount: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  tags: string[];
  description: string;
  isBestseller?: boolean;
  className?: string;
}

const levelColors = {
  Beginner: "bg-cf-success/10 text-cf-success",
  Intermediate: "bg-cf-info/10 text-cf-info",
  Advanced: "bg-cf-amber/10 text-cf-amber",
};

export function CourseCard({
  id, title, creator, price, originalPrice, rating, reviewCount,
  studentCount, lessonCount, duration, level, category, tags,
  description, isBestseller, className,
}: CourseCardProps) {
  return (
    <Link
      to={`/course/${id}`}
      className={cn(
        "group block rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:cf-shadow-hover hover:-translate-y-1",
        className
      )}
    >
      {/* Thumbnail placeholder */}
      <div className="relative aspect-video cf-hero-gradient flex items-center justify-center overflow-hidden">
        <BookOpen className="h-12 w-12 text-primary-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        {isBestseller && (
          <span className="absolute top-3 left-3 cf-gradient text-primary text-xs font-bold px-2.5 py-1 rounded-full">
            Bestseller
          </span>
        )}
        <span className={cn("absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full", levelColors[level])}>
          {level}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-accent mb-1.5">{category}</p>
        <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">by {creator}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-cf-amber text-cf-amber" />
            <span className="font-semibold text-foreground">{rating}</span>
            <span>({reviewCount.toLocaleString()})</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {studentCount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span>{lessonCount} lessons</span>
          <span>·</span>
          <span>{duration}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-foreground">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
