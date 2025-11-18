Create a modern, interactive English teaching management web application for tracking a 10-year-old Thai student's English learning progress. This is for a teacher teaching online Monday-Friday, 7-8 PM.

REQUIREMENTS:

1. TECH STACK:

   - Nextjs with TypeScript
   - Tailwind CSS for styling
   - Shadcn UI for css libs
   - Local storage for data persistence (no backend needed)
   - Web Speech API for text-to-speech (browser native)
   - Responsive design (works on desktop and mobile, tablet)
   - Zustand for global management (if needed)
   - Server side first (don't just put "use client" randomly)
   - Use app folder for pages so it's easy and organize
   - Use Framer motion for animation (if needed)
   - Use Gsap for difficult animation (if needed)

2. MAIN FEATURES:

   A. DASHBOARD (Home Page):

   - Current week display with progress bar (Week X of 12)
   - Today's lesson quick view with agenda
   - Overall progress statistics:
     - Total lessons completed
     - Total vocabulary learned (count)
     - Average test scores
     - Speaking confidence trend chart (1-5 scale)
   - Quick access buttons: "Start Today's Lesson", "View Calendar", "Student Profile"
   - Motivational section: "Days in a row" streak counter

   B. LESSON PLANNER (Week View):

   - Calendar showing all 12 weeks
   - Each week expandable to show Monday-Friday lessons
   - Each day shows:
     - Lesson title
     - Learning goals (bullet points)
     - Grammar focus (displayed subtly)
     - Activities list (with timing)
     - Homework assignment
     - Status: Planned / In Progress / Completed
   - Color coding: Red (not started), Yellow (in progress), Green (completed)
   - Ability to add notes to each lesson
   - Checkbox to mark lesson as complete

   C. DAILY LESSON VIEW (Detailed):

   - Lesson title and date
   - Timer feature (countdown from 60 minutes with pause/resume)
   - Structured sections with collapsible panels:
     - Warm-up activities (5-10 min)
     - Main content (15-20 min)
     - Practice activities (20-25 min)
     - Production (10-15 min)
     - Wrap-up (5 min)
   - Checkbox for each activity
   - Quick notes section (typed notes saved automatically)
   - Vocabulary counter (add new words learned today)
   - Student engagement rating (1-5 stars) at end
   - Navigation: Previous/Next lesson buttons
   - 🔊 Text-to-speech button for all lesson content (read aloud in English)

   D. VOCABULARY TRACKER WITH TEXT-TO-SPEECH:

   - Searchable list of all vocabulary taught (grouped by week/topic)
   - Each vocabulary card displays:

     - English word (large, clear font)
     - 🔊 Speaker icon button - click to hear pronunciation (Web Speech API)
     - Thai translation (ภาษาไทย)
     - Phonetic pronunciation in Thai script (e.g., "hello" → "เฮลโล")
     - Category tag (food/animal/action/color/etc.)
     - Example sentence with 🔊 button
     - Week learned
     - Image icon (optional - can add image URL)

   - Add new vocabulary form includes:

     - English word (required)
     - Thai translation (required)
     - Thai phonetic pronunciation (required) - e.g., "apple" → "แอป-เพิล"
     - Category dropdown (required)
     - Example sentence (optional)
     - Image URL (optional)
     - Week number (auto-filled but editable)

   - Vocabulary card features:

     - Flip card animation (front: English, back: Thai translation)
     - Large 🔊 speaker button on both sides
     - Speed control for pronunciation (normal/slow)
     - Auto-repeat option (plays 3 times with pause)
     - Mark as "mastered" checkbox
     - Edit and delete options

   - Visual progress:

     - Total words learned displayed prominently
     - Mastered vs. Learning counters
     - Progress bar by category

   - Review modes:

     1. Flashcard mode with auto-play pronunciation
     2. Quiz mode (hear word, choose correct translation)
     3. Practice mode (hear word, student repeats)

   - Filters:

     - By week
     - By category
     - By mastery status (learning/mastered)
     - Search by English or Thai

   - Export list as PDF with phonetic pronunciations

   E. TEXT-TO-SPEECH SETTINGS:

   - Global TTS controls (gear icon in navbar):
     - Voice selection (choose from available English voices)
     - Speed: Slow (0.7x), Normal (1x), Fast (1.2x)
     - Pitch adjustment (if needed for clarity)
     - Volume control
     - Language: English (US) / English (UK) / English (AU)
   - Test button to preview settings
   - Save preferences to localStorage

   F. PRONUNCIATION PRACTICE FEATURE:

   - Dedicated pronunciation practice page (/practice)
   - Random word generator from vocabulary list
   - 🔊 Plays word automatically
   - Student repeats
   - Teacher marks: ✓ Good / ~ Okay / ✗ Try Again
   - Records correct/incorrect for progress tracking
   - Practice history log

   G. TEST TRACKER:

   - List of all weekly tests (12 total)
   - Each test shows:
     - Week number and topic
     - Test date
     - Scores by section: Speaking (40%), Listening (30%), Vocabulary (20%), Grammar/Writing (10%)
     - Overall percentage and pass/fail status (60% pass mark)
     - Notes field
   - Visual charts:
     - Line graph showing test score progression over 12 weeks
     - Bar chart comparing section scores
   - Add test results form with input fields for each section
   - 🔊 Test questions can be read aloud

   H. STUDENT PROFILE:

   - Student name, age, photo upload
   - Learning goals (text area)
   - Strengths and weaknesses (editable tags)
   - Parent contact information
   - Notes about student preferences/learning style
   - Emergency lesson ideas for different moods (tired/energetic/distracted)
   - Pronunciation progress tracking

   I. RESOURCES LIBRARY:

   - Categorized links/resources:
     - Songs (with YouTube embeds)
     - Games (descriptions and how to play)
     - Websites (external links)
     - Activity ideas bank
     - Printable materials (PDF links)
     - Pronunciation guides (phonetic charts)
   - Search and filter by category
   - Favorite/bookmark system
   - 🔊 All text content has TTS option

   J. SENTENCE BUILDER WITH TTS:

   - Interactive tool (/sentence-builder)
   - Drag and drop words to build sentences
   - 🔊 Hear each word individually
   - 🔊 Hear complete sentence
   - Shows Thai translation below
   - Save favorite sentences to practice list

   K. WEEKLY REPORT GENERATOR:

   - Auto-generates summary for parents:
     - This week's topics
     - Vocabulary learned (with Thai translations)
     - Test score (if applicable)
     - Attendance (days completed)
     - Teacher's observations/notes
     - Homework completion
     - Pronunciation improvement notes
     - Next week's preview
   - Export as PDF or copy to clipboard

3. DESIGN REQUIREMENTS:

   - Modern, clean, teacher-friendly interface
   - Color scheme: Calming blues and greens, accent yellow for motivation
   - 🔊 Speaker icons should be prominent and easy to click (especially during lessons)
   - Large, readable fonts (teacher will use while teaching)
   - Vocabulary cards should be visually appealing with clear hierarchy:
     - English word (largest)
     - Speaker icon (prominent, blue color)
     - Thai translation (medium size, gray)
     - Phonetic pronunciation (smaller, lighter gray, italic)
   - Mobile-friendly but optimized for desktop/tablet use
   - Dark mode option (TTS button should remain visible)
   - Icons from Lucide React (Volume2 for speaker icon)
   - Smooth animations (flip cards, fade-ins)
   - Print-friendly layouts for reports

4. TEXT-TO-SPEECH IMPLEMENTATION:
   - Use Web Speech API (window.speechSynthesis)
   - Fallback message if browser doesn't support TTS
   - Handle errors gracefully (no voice available, etc.)
   - Visual feedback when speaking (animated speaker icon, pulsing effect)
   - Stop button to interrupt speech if needed
   - Queue management (don't overlap multiple TTS)
   - Example implementation:

```typescript
const speak = (text: string, rate: number = 1) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate; // 0.7 for slow, 1 for normal
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
};
```

5. DATA STRUCTURE:
   - All data stored in browser localStorage
   - JSON structure for:
     - Student profile
     - 12 weeks of lessons (60 lessons total)
     - Vocabulary list (array of word objects):

```typescript
interface VocabularyWord {
  id: string;
  englishWord: string;
  thaiTranslation: string;
  thaiPronunciation: string; // e.g., "แอป-เพิล"
  category: string;
  exampleSentence?: string;
  imageUrl?: string;
  weekLearned: number;
  dateAdded: Date;
  mastered: boolean;
  practiceCount: number;
}
```

     * Test results (array of 12 tests)
     * Daily notes and observations
     * TTS preferences (voice, speed, volume)
     * Pronunciation practice history

- Export/Import functionality (download JSON backup, upload to restore)

6. SEED DATA:

   - Pre-populate with the 12-week curriculum structure from the teaching plan
   - Include all lesson titles, goals, activities (can be collapsed by default)
   - Pre-load Week 1 vocabulary with all fields filled:
     - hello - สวัสดี (sà-wàt-dii) - หวัดดี
     - goodbye - ลาก่อน (laa-gɔ̀ɔn) - กู๊ดบาย
     - thank you - ขอบคุณ (kɔ̀ɔp-kun) - แธงคิว
     - yes - ใช่ (châi) - เยส
     - no - ไม่ใช่ (mâi-châi) - โน
     - I am - ฉันเป็น/ฉันคือ (chǎn bpen/chǎn kʉʉ) - ไอ แอม
     - you are - คุณเป็น/คุณคือ (kun bpen/kun kʉʉ) - ยู อาร์
     - cat - แมว (mɛɛo) - แคท
     - dog - สุนัข (sù-nák) - ด็อก
     - red - สีแดง (sǐi-dɛɛng) - เรด
     - blue - สีน้ำเงิน (sǐi-náam-ngəən) - บลู
   - Empty fields for notes, completion status, test scores

7. PAGES/ROUTES:
   /dashboard - Main overview
   /calendar - 12-week calendar view
   /lesson/:weekNumber/:dayNumber - Individual lesson view
   /vocabulary - Vocabulary tracker with TTS
   /practice - Pronunciation practice mode
   /sentence-builder - Interactive sentence builder
   /tests - Test tracker and results
   /profile - Student profile
   /resources - Resources library
   /reports - Generate reports
   /settings - TTS and app settings

8. COMPONENTS TO BUILD:

   - NavBar with navigation links and TTS settings access
   - VocabularyCard component (flip card with TTS buttons)
   - TTSButton component (reusable speaker button with icon animation)
   - TTSSettings component (modal for voice/speed settings)
   - WeekCard component (reusable for calendar)
   - LessonCard component (shows lesson summary)
   - Timer component (countdown with controls)
   - ProgressBar component (visual progress indicator)
   - Chart components (for test scores - use recharts library)
   - Modal for adding vocabulary with all fields
   - Toast notifications for actions (saved, completed, word pronounced, etc.)
   - PronunciationPractice component (random word drill)
   - FlashcardMode component (auto-play TTS)

9. FUNCTIONALITY DETAILS:

   - Clicking 🔊 icon plays word/sentence immediately
   - Visual feedback: icon pulses/animates while speaking
   - Stop current speech if new TTS is triggered
   - Vocabulary cards: click card to flip, click speaker to hear
   - Slow mode: plays at 0.7x speed for better learning
   - Auto-repeat: plays word 3 times with 1-second pause between
   - Keyboard shortcuts:
     - Space = play/stop TTS
     - S = slow mode
     - R = repeat
   - Save TTS preferences across sessions
   - Track most-practiced words
   - Export vocabulary list includes phonetic pronunciations

10. ACCESSIBILITY & UX:

    - Large, touch-friendly speaker buttons (min 44x44px)
    - Clear visual states: default, hover, active, playing
    - Loading state while TTS is initializing
    - Error messages if TTS fails
    - Alternative text descriptions for screen readers
    - Keyboard navigation for all TTS controls
    - Volume warning for first-time users
    - Auto-pause TTS when switching pages/tabs

11. NICE-TO-HAVES (if time permits):
    - Record student's voice and compare to TTS (Web Audio API)
    - Pronunciation scoring (basic comparison)
    - Spaced repetition system for vocabulary
    - Gamification: earn points for practice sessions
    - Voice commands (teacher says "next word" to advance)
    - Offline mode with cached TTS voices
    - Multiple student profiles switching
    - Integration with Google Translate API for auto-translation
    - Printable flashcards with QR codes linking to audio

DELIVERABLES:

- Fully functional React app with all features including TTS
- Clean, organized code with TypeScript types
- Responsive design working on desktop/tablet
- Pre-loaded vocabulary with Thai translations and pronunciations
- Working TTS on all vocabulary and lessons
- Settings panel for TTS customization
- README with setup instructions and TTS troubleshooting
- No backend required - all client-side with localStorage

DESIGN INSPIRATION:

- Clean like Notion
- Organized like Trello
- Visual like Duolingo progress tracking
- TTS interaction like Google Translate
- Vocabulary cards like Quizlet
- Teacher-friendly like Google Classroom

CRITICAL TTS FEATURES:
✅ Every English word/phrase must have a clickable speaker icon
✅ Thai translation and phonetic pronunciation always visible
✅ Speed controls (slow/normal) easily accessible
✅ Visual feedback when audio is playing
✅ Works reliably without internet (Web Speech API is built-in)
✅ Optimized for use during live teaching (quick, responsive)

Please create the complete application with all components, routing, state management, styling, and full text-to-speech functionality. Make it production-ready and easy to use during live teaching sessions with seamless pronunciation practice.
