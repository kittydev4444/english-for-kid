import { Week, VocabularyWord, StudentProfile, Resource, Lesson } from '@/types';

export const getInitialVocabulary = (): VocabularyWord[] => {
  const baseDate = new Date().toISOString();
  
  return [
    {
      id: '1',
      englishWord: 'hello',
      thaiTranslation: 'สวัสดี',
      thaiPronunciation: 'หวัดดี',
      category: 'greetings',
      exampleSentence: 'Hello, how are you?',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '2',
      englishWord: 'goodbye',
      thaiTranslation: 'ลาก่อน',
      thaiPronunciation: 'กู๊ดบาย',
      category: 'greetings',
      exampleSentence: 'Goodbye, see you tomorrow!',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '3',
      englishWord: 'thank you',
      thaiTranslation: 'ขอบคุณ',
      thaiPronunciation: 'แธงคิว',
      category: 'greetings',
      exampleSentence: 'Thank you for your help.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '4',
      englishWord: 'yes',
      thaiTranslation: 'ใช่',
      thaiPronunciation: 'เยส',
      category: 'basic',
      exampleSentence: 'Yes, I understand.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '5',
      englishWord: 'no',
      thaiTranslation: 'ไม่ใช่',
      thaiPronunciation: 'โน',
      category: 'basic',
      exampleSentence: 'No, I don\'t like that.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '6',
      englishWord: 'I am',
      thaiTranslation: 'ฉันเป็น/ฉันคือ',
      thaiPronunciation: 'ไอ แอม',
      category: 'basic',
      exampleSentence: 'I am a student.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '7',
      englishWord: 'you are',
      thaiTranslation: 'คุณเป็น/คุณคือ',
      thaiPronunciation: 'ยู อาร์',
      category: 'basic',
      exampleSentence: 'You are my teacher.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '8',
      englishWord: 'cat',
      thaiTranslation: 'แมว',
      thaiPronunciation: 'แคท',
      category: 'animals',
      exampleSentence: 'The cat is sleeping.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '9',
      englishWord: 'dog',
      thaiTranslation: 'สุนัข',
      thaiPronunciation: 'ด็อก',
      category: 'animals',
      exampleSentence: 'The dog is running.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '10',
      englishWord: 'red',
      thaiTranslation: 'สีแดง',
      thaiPronunciation: 'เรด',
      category: 'colors',
      exampleSentence: 'I like the red apple.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
    {
      id: '11',
      englishWord: 'blue',
      thaiTranslation: 'สีน้ำเงิน',
      thaiPronunciation: 'บลู',
      category: 'colors',
      exampleSentence: 'The sky is blue.',
      weekLearned: 1,
      dateAdded: baseDate,
      mastered: false,
      practiceCount: 0,
    },
  ];
};

const createLesson = (
  weekNumber: number,
  dayNumber: number,
  title: string,
  grammarFocus: string,
  goals: string[],
  homework: string
): Lesson => ({
  id: `w${weekNumber}-d${dayNumber}`,
  weekNumber,
  dayNumber,
  title,
  learningGoals: goals,
  grammarFocus,
  sections: [
    {
      id: `${weekNumber}-${dayNumber}-warmup`,
      title: 'Warm-up',
      duration: '5-10 min',
      activities: [
        {
          id: `${weekNumber}-${dayNumber}-warmup-1`,
          title: 'Greeting and small talk',
          duration: '3 min',
          description: 'Start with casual conversation to ease into the lesson',
          completed: false,
        },
        {
          id: `${weekNumber}-${dayNumber}-warmup-2`,
          title: 'Review previous lesson',
          duration: '5 min',
          description: 'Quick review of last session\'s vocabulary and concepts',
          completed: false,
        },
      ],
    },
    {
      id: `${weekNumber}-${dayNumber}-main`,
      title: 'Main Content',
      duration: '15-20 min',
      activities: [
        {
          id: `${weekNumber}-${dayNumber}-main-1`,
          title: 'Introduce new topic',
          duration: '10 min',
          description: 'Present new vocabulary and grammar concepts',
          completed: false,
        },
        {
          id: `${weekNumber}-${dayNumber}-main-2`,
          title: 'Examples and explanation',
          duration: '10 min',
          description: 'Provide clear examples and detailed explanations',
          completed: false,
        },
      ],
    },
    {
      id: `${weekNumber}-${dayNumber}-practice`,
      title: 'Practice',
      duration: '20-25 min',
      activities: [
        {
          id: `${weekNumber}-${dayNumber}-practice-1`,
          title: 'Guided practice',
          duration: '15 min',
          description: 'Student practices with teacher support',
          completed: false,
        },
        {
          id: `${weekNumber}-${dayNumber}-practice-2`,
          title: 'Interactive exercises',
          duration: '10 min',
          description: 'Games or activities to reinforce learning',
          completed: false,
        },
      ],
    },
    {
      id: `${weekNumber}-${dayNumber}-production`,
      title: 'Production',
      duration: '10-15 min',
      activities: [
        {
          id: `${weekNumber}-${dayNumber}-production-1`,
          title: 'Independent practice',
          duration: '10 min',
          description: 'Student applies learning independently',
          completed: false,
        },
      ],
    },
    {
      id: `${weekNumber}-${dayNumber}-wrapup`,
      title: 'Wrap-up',
      duration: '5 min',
      activities: [
        {
          id: `${weekNumber}-${dayNumber}-wrapup-1`,
          title: 'Review and summary',
          duration: '3 min',
          description: 'Recap key points of the lesson',
          completed: false,
        },
        {
          id: `${weekNumber}-${dayNumber}-wrapup-2`,
          title: 'Assign homework',
          duration: '2 min',
          description: 'Explain homework assignment',
          completed: false,
        },
      ],
    },
  ],
  homework,
  status: 'planned',
  notes: '',
  vocabularyCount: 0,
  engagementRating: 0,
  completed: false,
});

export const getInitialWeeks = (): Week[] => {
  const weeks: Week[] = [];

  for (let i = 1; i <= 12; i++) {
    const week: Week = {
      weekNumber: i,
      theme: `Week ${i} Theme`,
      lessons: [],
    };

    // Create 5 lessons (Monday-Friday) for each week
    for (let day = 1; day <= 5; day++) {
      week.lessons.push(
        createLesson(
          i,
          day,
          `Week ${i} - Day ${day}: Lesson Title`,
          'Grammar Focus',
          ['Learning goal 1', 'Learning goal 2', 'Learning goal 3'],
          'Complete practice exercises'
        )
      );
    }

    weeks.push(week);
  }

  // Customize Week 1 with specific content
  weeks[0].theme = 'Greetings and Basic Introduction';
  weeks[0].lessons[0].title = 'Hello! Nice to meet you';
  weeks[0].lessons[0].grammarFocus = 'Subject pronouns (I, you)';
  weeks[0].lessons[0].learningGoals = [
    'Learn basic greetings',
    'Introduce yourself',
    'Use "I am" and "you are"',
  ];
  
  weeks[0].lessons[1].title = 'Colors and Animals';
  weeks[0].lessons[1].grammarFocus = 'Articles (a, an, the)';
  weeks[0].lessons[1].learningGoals = [
    'Identify basic colors',
    'Name common animals',
    'Describe animals with colors',
  ];

  return weeks;
};

export const getInitialStudentProfile = (): StudentProfile => ({
  id: '1',
  name: 'Student Name',
  age: 10,
  learningGoals: 'Improve English conversation skills and build confidence in speaking',
  strengths: ['Good memory', 'Enthusiastic', 'Creative'],
  weaknesses: ['Shy when speaking', 'Grammar structure'],
  parentContact: {
    name: 'Parent Name',
    phone: '',
    email: '',
  },
  notes: '',
  emergencyLessonIdeas: {
    tired: [
      'Watch an educational video',
      'Read a simple story together',
      'Play a quiet word game',
    ],
    energetic: [
      'Physical games (Simon Says, TPR activities)',
      'Role-play scenarios',
      'Fast-paced vocabulary challenges',
    ],
    distracted: [
      'Interactive games with immediate rewards',
      'Short, varied activities',
      'One-on-one conversation practice',
    ],
  },
});

export const getInitialResources = (): Resource[] => [
  {
    id: '1',
    title: 'English Songs for Kids',
    category: 'song',
    description: 'Collection of educational English songs',
    url: 'https://www.youtube.com/playlist',
    favorite: false,
  },
  {
    id: '2',
    title: 'Phonics Games',
    category: 'game',
    description: 'Interactive phonics practice games',
    url: 'https://www.starfall.com',
    favorite: false,
  },
  {
    id: '3',
    title: 'British Council Kids',
    category: 'website',
    description: 'Free English learning resources for children',
    url: 'https://learnenglishkids.britishcouncil.org',
    favorite: true,
  },
];
