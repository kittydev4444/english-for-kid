import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Week,
  VocabularyWord,
  TestScore,
  StudentProfile,
  TTSSettings,
  PronunciationPractice,
  Resource,
  Lesson,
} from '@/types';
import { getDefaultTTSSettings } from '@/lib/tts';
import { getInitialWeeks, getInitialVocabulary, getInitialStudentProfile, getInitialResources } from '@/lib/seed-data';

interface AppStore {
  // State
  weeks: Week[];
  vocabulary: VocabularyWord[];
  tests: TestScore[];
  studentProfile: StudentProfile;
  ttsSettings: TTSSettings;
  pronunciationHistory: PronunciationPractice[];
  resources: Resource[];
  streakDays: number;
  lastAccessDate: string;
  darkMode: boolean;

  // Actions - Lessons
  updateLesson: (weekNumber: number, dayNumber: number, lesson: Partial<Lesson>) => void;
  completeLesson: (weekNumber: number, dayNumber: number) => void;
  addLessonNote: (weekNumber: number, dayNumber: number, note: string) => void;
  updateLessonEngagement: (weekNumber: number, dayNumber: number, rating: number) => void;

  // Actions - Vocabulary
  addVocabulary: (word: Omit<VocabularyWord, 'id' | 'dateAdded' | 'practiceCount'>) => void;
  updateVocabulary: (id: string, word: Partial<VocabularyWord>) => void;
  deleteVocabulary: (id: string) => void;
  toggleMastered: (id: string) => void;
  incrementPracticeCount: (id: string) => void;

  // Actions - Tests
  addTest: (test: Omit<TestScore, 'id'>) => void;
  updateTest: (id: string, test: Partial<TestScore>) => void;
  deleteTest: (id: string) => void;

  // Actions - Student Profile
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;

  // Actions - TTS Settings
  updateTTSSettings: (settings: Partial<TTSSettings>) => void;

  // Actions - Pronunciation History
  addPronunciationPractice: (practice: Omit<PronunciationPractice, 'id'>) => void;

  // Actions - Resources
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  toggleResourceFavorite: (id: string) => void;

  // Actions - App Settings
  toggleDarkMode: () => void;
  updateStreak: () => void;
  resetAllData: () => void;
  importData: (data: string) => void;
  exportData: () => string;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial State
      weeks: getInitialWeeks(),
      vocabulary: getInitialVocabulary(),
      tests: [],
      studentProfile: getInitialStudentProfile(),
      ttsSettings: getDefaultTTSSettings(),
      pronunciationHistory: [],
      resources: getInitialResources(),
      streakDays: 0,
      lastAccessDate: new Date().toISOString().split('T')[0],
      darkMode: false,

      // Lesson Actions
      updateLesson: (weekNumber, dayNumber, lessonUpdate) =>
        set((state) => ({
          weeks: state.weeks.map((week) =>
            week.weekNumber === weekNumber
              ? {
                  ...week,
                  lessons: week.lessons.map((lesson) =>
                    lesson.dayNumber === dayNumber
                      ? { ...lesson, ...lessonUpdate }
                      : lesson
                  ),
                }
              : week
          ),
        })),

      completeLesson: (weekNumber, dayNumber) =>
        set((state) => ({
          weeks: state.weeks.map((week) =>
            week.weekNumber === weekNumber
              ? {
                  ...week,
                  lessons: week.lessons.map((lesson) =>
                    lesson.dayNumber === dayNumber
                      ? { ...lesson, status: 'completed', completed: true }
                      : lesson
                  ),
                }
              : week
          ),
        })),

      addLessonNote: (weekNumber, dayNumber, note) =>
        set((state) => ({
          weeks: state.weeks.map((week) =>
            week.weekNumber === weekNumber
              ? {
                  ...week,
                  lessons: week.lessons.map((lesson) =>
                    lesson.dayNumber === dayNumber
                      ? { ...lesson, notes: lesson.notes + '\n' + note }
                      : lesson
                  ),
                }
              : week
          ),
        })),

      updateLessonEngagement: (weekNumber, dayNumber, rating) =>
        set((state) => ({
          weeks: state.weeks.map((week) =>
            week.weekNumber === weekNumber
              ? {
                  ...week,
                  lessons: week.lessons.map((lesson) =>
                    lesson.dayNumber === dayNumber
                      ? { ...lesson, engagementRating: rating }
                      : lesson
                  ),
                }
              : week
          ),
        })),

      // Vocabulary Actions
      addVocabulary: (word) =>
        set((state) => ({
          vocabulary: [
            ...state.vocabulary,
            {
              ...word,
              id: Date.now().toString(),
              dateAdded: new Date().toISOString(),
              practiceCount: 0,
            },
          ],
        })),

      updateVocabulary: (id, wordUpdate) =>
        set((state) => ({
          vocabulary: state.vocabulary.map((word) =>
            word.id === id ? { ...word, ...wordUpdate } : word
          ),
        })),

      deleteVocabulary: (id) =>
        set((state) => ({
          vocabulary: state.vocabulary.filter((word) => word.id !== id),
        })),

      toggleMastered: (id) =>
        set((state) => ({
          vocabulary: state.vocabulary.map((word) =>
            word.id === id ? { ...word, mastered: !word.mastered } : word
          ),
        })),

      incrementPracticeCount: (id) =>
        set((state) => ({
          vocabulary: state.vocabulary.map((word) =>
            word.id === id ? { ...word, practiceCount: word.practiceCount + 1 } : word
          ),
        })),

      // Test Actions
      addTest: (test) =>
        set((state) => ({
          tests: [
            ...state.tests,
            {
              ...test,
              id: Date.now().toString(),
            },
          ],
        })),

      updateTest: (id, testUpdate) =>
        set((state) => ({
          tests: state.tests.map((test) =>
            test.id === id ? { ...test, ...testUpdate } : test
          ),
        })),

      deleteTest: (id) =>
        set((state) => ({
          tests: state.tests.filter((test) => test.id !== id),
        })),

      // Student Profile Actions
      updateStudentProfile: (profileUpdate) =>
        set((state) => ({
          studentProfile: { ...state.studentProfile, ...profileUpdate },
        })),

      // TTS Settings Actions
      updateTTSSettings: (settingsUpdate) =>
        set((state) => ({
          ttsSettings: { ...state.ttsSettings, ...settingsUpdate },
        })),

      // Pronunciation History Actions
      addPronunciationPractice: (practice) =>
        set((state) => ({
          pronunciationHistory: [
            ...state.pronunciationHistory,
            {
              ...practice,
              id: Date.now().toString(),
            },
          ],
        })),

      // Resource Actions
      addResource: (resource) =>
        set((state) => ({
          resources: [
            ...state.resources,
            {
              ...resource,
              id: Date.now().toString(),
            },
          ],
        })),

      updateResource: (id, resourceUpdate) =>
        set((state) => ({
          resources: state.resources.map((resource) =>
            resource.id === id ? { ...resource, ...resourceUpdate } : resource
          ),
        })),

      deleteResource: (id) =>
        set((state) => ({
          resources: state.resources.filter((resource) => resource.id !== id),
        })),

      toggleResourceFavorite: (id) =>
        set((state) => ({
          resources: state.resources.map((resource) =>
            resource.id === id ? { ...resource, favorite: !resource.favorite } : resource
          ),
        })),

      // App Settings Actions
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const lastDate = new Date(state.lastAccessDate);
          const todayDate = new Date(today);
          const diffTime = todayDate.getTime() - lastDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          let newStreak = state.streakDays;
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }

          return {
            streakDays: newStreak,
            lastAccessDate: today,
          };
        }),

      resetAllData: () =>
        set({
          weeks: getInitialWeeks(),
          vocabulary: getInitialVocabulary(),
          tests: [],
          studentProfile: getInitialStudentProfile(),
          ttsSettings: getDefaultTTSSettings(),
          pronunciationHistory: [],
          resources: getInitialResources(),
          streakDays: 0,
          lastAccessDate: new Date().toISOString().split('T')[0],
          darkMode: false,
        }),

      importData: (data) => {
        try {
          const parsed = JSON.parse(data);
          set(parsed);
        } catch (error) {
          console.error('Failed to import data:', error);
        }
      },

      exportData: () => {
        const state = get();
        return JSON.stringify(state, null, 2);
      },
    }),
    {
      name: 'english-teaching-storage',
    }
  )
);
