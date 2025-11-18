"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Flame, Play, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
  const weeks = useAppStore((state) => state.weeks);
  const vocabulary = useAppStore((state) => state.vocabulary);
  const tests = useAppStore((state) => state.tests);
  const streakDays = useAppStore((state) => state.streakDays);
  const updateStreak = useAppStore((state) => state.updateStreak);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Calculate statistics
  const totalLessons = weeks.reduce(
    (sum, week) => sum + week.lessons.length,
    0
  );
  const completedLessons = weeks.reduce(
    (sum, week) => sum + week.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const totalVocabulary = vocabulary.length;
  const masteredVocabulary = vocabulary.filter((v) => v.mastered).length;

  const averageTestScore =
    tests.length > 0
      ? tests.reduce((sum, test) => sum + test.overallPercentage, 0) /
        tests.length
      : 0;

  // Find today's lesson (Monday-Friday, Week 1-12)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
  const currentWeekNumber = 1; // You can make this dynamic

  let todayLesson = null;
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const dayNumber = dayOfWeek;
    const currentWeek = weeks.find((w) => w.weekNumber === currentWeekNumber);
    todayLesson = currentWeek?.lessons.find((l) => l.dayNumber === dayNumber);
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-5xl font-bold mb-2 gradient-text">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your teaching overview.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-glow border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Overall Progress</CardDescription>
            <CardTitle className="text-3xl">
              {Math.round(progressPercentage)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </CardContent>
        </Card>

        <Card className="card-glow border-secondary/20">
          <CardHeader className="pb-2">
            <CardDescription>Vocabulary</CardDescription>
            <CardTitle className="text-3xl">{totalVocabulary}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Mastered:</span>
              <span className="font-semibold text-secondary">
                {masteredVocabulary}
              </span>
            </div>
            <Progress
              value={(masteredVocabulary / totalVocabulary) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card className="card-glow border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Average Test Score</CardDescription>
            <CardTitle className="text-3xl">
              {averageTestScore > 0
                ? `${Math.round(averageTestScore)}%`
                : "N/A"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              {tests.length} tests completed
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow border-accent bg-linear-to-br from-accent/10 to-secondary/10">
          <CardHeader className="pb-2">
            <CardDescription>Streak</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              <Flame className="h-8 w-8 text-orange-500 mr-2" />
              {streakDays}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {streakDays === 0 ? "Start your streak today!" : "days in a row"}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Lesson */}
      {todayLesson && (
        <motion.div variants={item}>
          <Card className="card-glow border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Today&apos;s Lesson
                  </CardTitle>
                  <CardDescription>
                    Week {todayLesson.weekNumber}, Day {todayLesson.dayNumber}
                  </CardDescription>
                </div>
                <Link
                  href={`/lesson/${todayLesson.weekNumber}/${todayLesson.dayNumber}`}>
                  <Button className="bg-linear-to-r from-primary to-secondary hover:opacity-90">
                    <Play className="h-4 w-4 mr-2" />
                    Start Lesson
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">
                {todayLesson.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Grammar:</strong> {todayLesson.grammarFocus}
              </p>
              <div>
                <p className="text-sm font-medium mb-1">Learning Goals:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {todayLesson.learningGoals.map((goal, idx) => (
                    <li key={idx}>{goal}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold mb-4 gradient-text">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/calendar">
            <Card className="card-glow hover:border-primary transition-all cursor-pointer h-full group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <CardTitle className="text-lg">View Calendar</CardTitle>
                    <CardDescription>12-week lesson plan</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/vocabulary">
            <Card className="card-glow hover:border-secondary transition-all cursor-pointer h-full group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform" />
                  <div>
                    <CardTitle className="text-lg">Vocabulary</CardTitle>
                    <CardDescription>Manage word list</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/practice">
            <Card className="card-glow hover:border-accent transition-all cursor-pointer h-full group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Play className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                  <div>
                    <CardTitle className="text-lg">Practice</CardTitle>
                    <CardDescription>Pronunciation drills</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
