import { Link } from "react-router-dom";
import { BookOpen, Clock, Trophy, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { STUDENT_COURSES } from "@/lib/mock-data";

export default function StudentDashboard() {
  const totalProgress = Math.round(
    STUDENT_COURSES.reduce((acc, c) => acc + c.progress, 0) / STUDENT_COURSES.length
  );

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">My Learning</h1>
        <p className="text-muted-foreground mb-8">Pick up where you left off</p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Enrolled Courses", value: STUDENT_COURSES.length },
            { icon: Clock, label: "Hours Learned", value: "42h" },
            { icon: BarChart3, label: "Avg Progress", value: `${totalProgress}%` },
            { icon: Trophy, label: "Certificates", value: 1 },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 cf-shadow-card">
              <stat.icon className="h-5 w-5 text-accent mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Course list */}
        <div className="space-y-4">
          {STUDENT_COURSES.map((course) => (
            <Link
              key={course.id}
              to={`/player/${course.id}`}
              className="flex items-center gap-5 rounded-xl border border-border bg-card p-5 transition-all hover:cf-shadow-hover hover:-translate-y-0.5"
            >
              <div className="hidden sm:flex h-16 w-24 rounded-lg cf-hero-gradient items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6 text-primary-foreground/30" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-foreground truncate">{course.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">by {course.creator} · Last accessed {course.lastAccessed}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Progress value={course.progress} className="h-1.5 flex-1 max-w-xs" />
                  <span className="text-xs font-mono text-muted-foreground">{course.progress}%</span>
                  <span className="text-xs text-muted-foreground">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
