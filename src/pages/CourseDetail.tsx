import { useParams, Link } from "react-router-dom";
import { Star, Users, Clock, BookOpen, Play, CheckCircle2, Download, FileText, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES, COURSE_CURRICULUM } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const lessonIcons = {
  video: Play,
  text: FileText,
  quiz: HelpCircle,
  assignment: FileText,
  download: Download,
};

export default function CourseDetail() {
  const { id } = useParams();
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];
  const [expandedSections, setExpandedSections] = useState<string[]>(["s1"]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((s) => s !== sectionId) : [...prev, sectionId]
    );
  };

  const totalLessons = COURSE_CURRICULUM.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="cf-hero-gradient">
        <div className="container py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-cf-amber-light mb-3">{course.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg mb-6 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-cf-amber text-cf-amber" />
                  <span className="font-semibold text-primary-foreground">{course.rating}</span>
                  ({course.reviewCount.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {course.studentCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" /> {course.lessonCount} lessons
                </span>
              </div>
              <p className="text-sm text-primary-foreground/50 mt-4">Created by <span className="text-cf-amber-light font-medium">{course.creator}</span></p>
            </div>

            {/* Purchase card */}
            <div className="bg-card rounded-xl border border-border p-6 cf-shadow-card self-start">
              <div className="aspect-video rounded-lg cf-hero-gradient flex items-center justify-center mb-5">
                <Play className="h-12 w-12 text-primary-foreground/40" />
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-3xl font-bold text-foreground">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                )}
              </div>
              <Link to={`/player/${course.id}`}>
                <Button size="lg" className="w-full cf-gradient text-primary font-semibold mb-3 h-12">
                  Enroll Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full h-12">
                Add to Wishlist
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="container py-12">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Course Curriculum
          <span className="text-sm font-normal text-muted-foreground ml-3">{totalLessons} lessons</span>
        </h2>
        <div className="space-y-3 max-w-3xl">
          {COURSE_CURRICULUM.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const completed = section.lessons.filter((l) => l.completed).length;
            return (
              <div key={section.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-semibold text-foreground text-sm">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {completed}/{section.lessons.length} completed
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                {isExpanded && (
                  <div className="border-t border-border">
                    {section.lessons.map((lesson) => {
                      const Icon = lessonIcons[lesson.type] || Play;
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-cf-success shrink-0" />
                          ) : (
                            <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span className={cn("text-sm flex-1", lesson.completed ? "text-muted-foreground" : "text-foreground")}>
                            {lesson.title}
                          </span>
                          {lesson.isFree && (
                            <span className="text-xs font-medium text-cf-success bg-cf-success/10 px-2 py-0.5 rounded-full">Free</span>
                          )}
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
