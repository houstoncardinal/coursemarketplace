import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { MOCK_COURSES, CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = MOCK_COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.creator.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCategory || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container py-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Course Marketplace</h1>
          <p className="text-muted-foreground mb-6">Discover courses from world-class creators</p>
          <div className="flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses or creators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={cn(selectedCategory === null && "cf-gradient text-primary")}
          >
            All
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.name)}
              className={cn(selectedCategory === cat.name && "cf-gradient text-primary")}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} courses found</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
