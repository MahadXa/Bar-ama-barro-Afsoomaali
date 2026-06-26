/**
 * Types representing the Somali Alphabet Learner education curriculum and state management.
 * @license Apache-2.0
 */

export type LessonCategory = 'alphabet' | 'vowels' | 'combinations' | 'words' | 'sentences';

export interface Lesson {
  id: string;
  title: string;
  somaliTitle: string;
  description: string;
  category: LessonCategory;
  order: number;
  unlockedAtStars: number;
}

export interface LetterData {
  letter: string;
  name: string; // Phonetic name, e.g. "Baa"
  type: 'consonant' | 'vowel';
  exampleWord: string; // e.g. "Bisad"
  englishWord: string; // e.g. "Cat"
  emoji: string; // e.g. "🐱"
  pronunciationHint: string; // Mogadishu dialect friendly
  phonics: string; // Phonetic guide e.g. "b-sound"
  funFact?: string; // Kid-friendly context
}

export interface SyllableData {
  consonant: string;
  vowel: string;
  syllable: string;
  audioText: string;
}

export interface WordData {
  word: string;
  translation: string;
  emoji: string;
  syllables: string[];
  letters: string[]; // for C-V-C or word builder
  type: '2-letter' | '3-letter' | '3-letter-long' | '4-letter-plus';
  pronunciationHint: string;
}

export interface SentenceData {
  sentence: string;
  words: string[]; // For scrambled sentence games
  translation: string;
  emoji: string;
  hint: string;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  type: 'multiple-choice' | 'syllable-match' | 'word-builder' | 'sentence-builder';
  questionText: string;
  somaliText?: string;
  options?: string[]; // For multiple choice
  correctAnswer: string | string[]; // e.g., string for single choice, array for builders
  hint: string;
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  somaliTitle: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // CSS color class
  unlockedAt: number; // Stars or achievement type
  type: 'stars' | 'alphabet' | 'vowels' | 'quizzes' | 'sentences' | 'streak';
}

export interface UserProgress {
  studentName: string;
  avatar: string; // emoji or profile avatar ID
  stars: number;
  streak: number;
  lastActive: string; // YYYY-MM-DD
  completedLessons: string[]; // lesson IDs
  unlockedBadges: string[]; // Badge IDs
  quizScores: Record<string, number>; // quizId -> highest score (percent)
}

export interface ParentSettings {
  pin: string; // 4-digit PIN
  parentEmail: string;
  notificationsEnabled: boolean;
  notificationTime: string; // e.g., "18:00"
  syncEnabled: boolean;
  isLoggedIn: boolean;
  coppaConsent: boolean;
  lastSyncTime?: string;
}
