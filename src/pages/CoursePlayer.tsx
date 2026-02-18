import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, CheckCircle2, ChevronLeft, ChevronRight, FileText, HelpCircle, Download, BookOpen, Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES, COURSE_CURRICULUM, type LessonType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function CoursePlayer() {
  const { id } = useParams();
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState("l1");
  const [completedLessons, setCompletedLessons] = useState<string[]>(["l1", "l2", "l3"]);

  const allLessons = COURSE_CURRICULUM.flatMap((s) => s.lessons);
  const currentLesson = allLessons.find((l) => l.id === currentLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  const toggleComplete = () => {
    setCompletedLessons((prev) =>
      prev.includes(currentLessonId)
        ? prev.filter((id) => id !== currentLessonId)
        : [...prev, currentLessonId]
    );
  };

  const goTo = (dir: "prev" | "next") => {
    const newIndex = dir === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < allLessons.length) {
      setCurrentLessonId(allLessons[newIndex].id);
    }
  };

  const lessonIcons: Record<string, any> = { video: Play, text: FileText, quiz: HelpCircle, assignment: FileText, download: Download };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-border bg-card flex-shrink-0 overflow-y-auto transition-all duration-300",
          sidebarOpen ? "w-80" : "w-0"
        )}
      >
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-semibold text-foreground text-sm truncate">{course.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={progress} className="h-1.5 flex-1" />
            <span className="text-xs text-muted-foreground font-mono">{progress}%</span>
          </div>
        </div>
        {COURSE_CURRICULUM.map((section) => (
          <div key={section.id}>
            <div className="px-4 py-3 bg-secondary/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</p>
            </div>
            {section.lessons.map((lesson) => {
              const Icon = lessonIcons[lesson.type] || Play;
              const isActive = lesson.id === currentLessonId;
              const isDone = completedLessons.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonId(lesson.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border",
                    isActive ? "bg-accent/10" : "hover:bg-secondary/50"
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-cf-success shrink-0" />
                  ) : (
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm truncate", isActive ? "text-foreground font-medium" : "text-muted-foreground")}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <span className="text-sm font-medium text-foreground">{currentLesson.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={currentIndex === 0} onClick={() => goTo("prev")}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button variant="ghost" size="sm" disabled={currentIndex === allLessons.length - 1} onClick={() => goTo("next")}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Video area */}
        <div className="flex-1 flex items-center justify-center bg-primary/95 relative">
          <div className="text-center">
            <Play className="h-16 w-16 text-primary-foreground/30 mx-auto mb-4" />
            <p className="text-primary-foreground/50 text-sm">Video player placeholder</p>
            <p className="text-primary-foreground/30 text-xs mt-1">{currentLesson.title} · {currentLesson.duration}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card">
          <Button
            variant={completedLessons.includes(currentLessonId) ? "outline" : "default"}
            size="sm"
            onClick={toggleComplete}
            className={cn(!completedLessons.includes(currentLessonId) && "cf-gradient text-primary")}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {completedLessons.includes(currentLessonId) ? "Completed" : "Mark Complete"}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" /> Notes
          </Button>
        </div>
      </main>
    </div>
  );
}
