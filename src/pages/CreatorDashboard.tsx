import { DollarSign, Users, BookOpen, Star, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { CREATOR_STATS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const healthColors: Record<string, string> = {
  high: "text-cf-success bg-cf-success/10",
  medium: "text-cf-warning bg-cf-warning/10",
  low: "text-destructive bg-destructive/10",
};

function getHealthLabel(score: number) {
  if (score >= 85) return { label: "Excellent", color: healthColors.high };
  if (score >= 70) return { label: "Good", color: healthColors.medium };
  return { label: "Needs Work", color: healthColors.low };
}

export default function CreatorDashboard() {
  const stats = CREATOR_STATS;

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">Creator Dashboard</h1>
            <p className="text-muted-foreground">Overview of your school's performance</p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: "+18%", up: true },
            { icon: Users, label: "Total Students", value: stats.totalStudents.toLocaleString(), change: "+24%", up: true },
            { icon: BookOpen, label: "Published Courses", value: stats.publishedCourses, change: "+2", up: true },
            { icon: Star, label: "Avg Rating", value: stats.avgRating.toFixed(1), change: "+0.1", up: true },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border bg-card p-5 cf-shadow-card">
              <div className="flex items-center justify-between mb-3">
                <kpi.icon className="h-5 w-5 text-accent" />
                <span className={cn("flex items-center gap-0.5 text-xs font-medium", kpi.up ? "text-cf-success" : "text-destructive")}>
                  {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-border bg-card p-6 cf-shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Revenue Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(36, 95%, 54%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(36, 95%, 54%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(36, 95%, 54%)" fill="url(#revenueGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 cf-shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Enrollments</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip
                    contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Bar dataKey="enrollments" fill="hsl(222, 47%, 11%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Course Health */}
        <div className="rounded-xl border border-border bg-card p-6 cf-shadow-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Course Health Scores</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Students</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Health</th>
                </tr>
              </thead>
              <tbody>
                {stats.topCourses.map((course) => {
                  const health = getHealthLabel(course.health);
                  return (
                    <tr key={course.name} className="border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{course.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{course.students.toLocaleString()}</td>
                      <td className="py-3 px-4 text-muted-foreground">${course.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-cf-amber text-cf-amber" /> {course.rating}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", health.color)}>
                          {course.health}% — {health.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
