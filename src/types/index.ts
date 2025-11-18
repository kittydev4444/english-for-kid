export interface VocabularyWord {
  id: string;
  englishWord: string;
  thaiTranslation: string;
  thaiPronunciation: string; // e.g., "แอป-เพิล"
  category: string;
  exampleSentence?: string;
  imageUrl?: string;
  weekLearned: number;
  dateAdded: string;
  mastered: boolean;
  practiceCount: number;
}

export type LessonStatus = 'planned' | 'in-progress' | 'completed';

export interface Activity {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  duration: string;
  activities: Activity[];
}

export interface Lesson {
  id: string;
  weekNumber: number;
  dayNumber: number; // 1-5 (Monday-Friday)
  title: string;
  date?: string;
  learningGoals: string[];
  grammarFocus: string;
  sections: LessonSection[];
  homework: string;
  status: LessonStatus;
  notes: string;
  vocabularyCount: number;
  engagementRating: number; // 1-5
  completed: boolean;
}

export interface Week {
  weekNumber: number;
  theme: string;
  lessons: Lesson[];
}

export interface TestScore {
  id: string;
  weekNumber: number;
  topic: string;
  date: string;
  speaking: number; // out of 40
  listening: number; // out of 30
  vocabulary: number; // out of 20
  grammar: number; // out of 10
  overallPercentage: number;
  passed: boolean;
  notes: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  photoUrl?: string;
  learningGoals: string;
  strengths: string[];
  weaknesses: string[];
  parentContact: {
    name: string;
    phone: string;
    email: string;
  };
  notes: string;
  emergencyLessonIdeas: {
    tired: string[];
    energetic: string[];
    distracted: string[];
  };
}

export interface TTSSettings {
  voice: string;
  speed: number; // 0.7, 1, 1.2
  pitch: number;
  volume: number; // 0-1
  language: string; // 'en-US', 'en-UK', 'en-AU'
}

export interface PronunciationPractice {
  id: string;
  wordId: string;
  date: string;
  rating: 'good' | 'okay' | 'try-again';
}

export interface Resource {
  id: string;
  title: string;
  category: 'song' | 'game' | 'website' | 'activity' | 'printable' | 'pronunciation';
  description: string;
  url: string;
  youtubeId?: string;
  favorite: boolean;
}

export interface WeeklyReport {
  weekNumber: number;
  topics: string[];
  vocabularyLearned: VocabularyWord[];
  testScore?: TestScore;
  attendance: number; // days completed out of 5
  observations: string;
  homeworkCompletion: string;
  pronunciationNotes: string;
  nextWeekPreview: string;
}

export interface AppState {
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
}
