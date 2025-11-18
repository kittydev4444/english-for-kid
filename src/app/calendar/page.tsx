"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CalendarPage() {
  const weeks = useAppStore((state) => state.weeks);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Lesson Calendar</h1>
          <p className="text-muted-foreground">12-week curriculum overview</p>
        </div>
        <CalendarIcon className="h-12 w-12 text-primary" />
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeks.map((week) => {
              const totalLessons = week.lessons.length;
              const completedLessons = week.lessons.filter(
                (l) => l.completed
              ).length;
              const progress = (completedLessons / totalLessons) * 100;

              return (
                <div key={week.weekNumber}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      Week {week.weekNumber}: {week.theme}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons}/{totalLessons}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Week Details */}
      <div className="space-y-4">
        {weeks.map((week) => {
          const isExpanded = expandedWeek === week.weekNumber;
          const completedCount = week.lessons.filter((l) => l.completed).length;

          return (
            <Card key={week.weekNumber} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() =>
                  setExpandedWeek(isExpanded ? null : week.weekNumber)
                }>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      Week {week.weekNumber}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {week.theme}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {completedCount}/{week.lessons.length} lessons
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <CardContent>
                      <div className="space-y-3">
                        {week.lessons.map((lesson) => {
                          const dayName = [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                          ][lesson.dayNumber - 1];

                          return (
                            <div
                              key={lesson.id}
                              className={cn(
                                "border rounded-lg p-4 transition-all hover:shadow-md",
                                lesson.completed &&
                                  "border-green-200 bg-green-50/50"
                              )}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div
                                      className={cn(
                                        "w-3 h-3 rounded-full",
                                        getStatusColor(lesson.status)
                                      )}
                                    />
                                    <span className="font-semibold">
                                      {dayName} - Day {lesson.dayNumber}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {getStatusLabel(lesson.status)}
                                    </span>
                                  </div>
                                  <h4 className="font-medium mb-1">
                                    {lesson.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    <strong>Grammar:</strong>{" "}
                                    {lesson.grammarFocus}
                                  </p>
                                  <div className="text-sm">
                                    <p className="font-medium">
                                      Learning Goals:
                                    </p>
                                    <ul className="list-disc list-inside text-muted-foreground">
                                      {lesson.learningGoals.map((goal, idx) => (
                                        <li key={idx}>{goal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                <Link
                                  href={`/lesson/${week.weekNumber}/${lesson.dayNumber}`}>
                                  <Button size="sm" variant="outline">
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
