'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { TTSButton } from '@/components/TTSButton';
import { Check, ChevronLeft, ChevronRight, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const weekNumber = parseInt(params.weekNumber as string);
  const dayNumber = parseInt(params.dayNumber as string);

  const weeks = useAppStore((state) => state.weeks);
  const updateLesson = useAppStore((state) => state.updateLesson);
  const completeLesson = useAppStore((state) => state.completeLesson);
  const updateLessonEngagement = useAppStore((state) => state.updateLessonEngagement);

  const week = weeks.find((w) => w.weekNumber === weekNumber);
  const lesson = week?.lessons.find((l) => l.dayNumber === dayNumber);

  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [notes, setNotes] = useState(lesson?.notes || '');
  const [rating, setRating] = useState(lesson?.engagementRating || 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <Button onClick={() => router.push('/calendar')}>
          Back to Calendar
        </Button>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedActivities = lesson.sections.reduce(
    (sum, section) => sum + section.activities.filter((a) => a.completed).length,
    0
  );
  const totalActivities = lesson.sections.reduce(
    (sum, section) => sum + section.activities.length,
    0
  );
  const progressPercentage = (completedActivities / totalActivities) * 100;

  const handleToggleActivity = (sectionId: string, activityId: string) => {
    const updatedSections = lesson.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            activities: section.activities.map((activity) =>
              activity.id === activityId
                ? { ...activity, completed: !activity.completed }
                : activity
            ),
          }
        : section
    );

    updateLesson(weekNumber, dayNumber, { sections: updatedSections });
  };

  const handleSaveNotes = () => {
    updateLesson(weekNumber, dayNumber, { notes });
    alert('Notes saved!');
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
    updateLessonEngagement(weekNumber, dayNumber, newRating);
  };

  const handleCompleteLesson = () => {
    completeLesson(weekNumber, dayNumber);
    updateLesson(weekNumber, dayNumber, { notes });
    alert('Lesson completed!');
    router.push('/calendar');
  };

  const navigateLesson = (direction: 'prev' | 'next') => {
    let newDay = dayNumber + (direction === 'next' ? 1 : -1);
    let newWeek = weekNumber;

    if (newDay > 5) {
      newDay = 1;
      newWeek++;
    } else if (newDay < 1) {
      newDay = 5;
      newWeek--;
    }

    if (newWeek >= 1 && newWeek <= 12) {
      router.push(`/lesson/${newWeek}/${newDay}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Week {weekNumber} • Day {dayNumber}
          </div>
          <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Grammar: {lesson.grammarFocus}</span>
            <TTSButton
              text={`Today we are learning ${lesson.title}. The grammar focus is ${lesson.grammarFocus}.`}
              size="sm"
              variant="outline"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateLesson('prev')}
            disabled={weekNumber === 1 && dayNumber === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateLesson('next')}
            disabled={weekNumber === 12 && dayNumber === 5}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timer and Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center mb-4">
              {formatTime(timeRemaining)}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1"
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setTimeRemaining(60 * 60)}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Activities Completed</span>
                <span>
                  {completedActivities} / {totalActivities}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lesson.learningGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <span>{goal}</span>
                <TTSButton text={goal} size="sm" variant="ghost" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Lesson Sections */}
      {lesson.sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{section.title}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {section.duration}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {section.activities.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    'flex items-start gap-3 p-3 border rounded-lg transition-colors',
                    activity.completed && 'bg-green-50 border-green-200'
                  )}
                  onClick={() => handleToggleActivity(section.id, activity.id)}
                >
                  <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={() => {}}
                    className="mt-1 h-5 w-5 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {activity.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <TTSButton
                    text={`${activity.title}. ${activity.description}`}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Homework */}
      <Card>
        <CardHeader>
          <CardTitle>Homework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-2">
            <p className="flex-1">{lesson.homework}</p>
            <TTSButton text={lesson.homework} variant="outline" />
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            placeholder="Add notes about the lesson, student progress, observations..."
          />
          <Button onClick={handleSaveNotes} variant="outline">
            Save Notes
          </Button>
        </CardContent>
      </Card>

      {/* Engagement Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Student Engagement Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    'h-8 w-8 transition-colors',
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complete Lesson */}
      <Button
        onClick={handleCompleteLesson}
        size="lg"
        className="w-full"
        disabled={lesson.completed}
      >
        {lesson.completed ? 'Lesson Completed ✓' : 'Mark as Complete'}
      </Button>
    </div>
  );
}
