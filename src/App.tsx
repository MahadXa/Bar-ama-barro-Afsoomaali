import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Award, BookOpen, Heart, Volume2, Play, Check, X, 
  ChevronRight, Share2, CheckCircle2, Bell, Lock, Settings, User, 
  RefreshCw, Music, Menu, ArrowLeft, HelpCircle, Flame, LogIn, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom imports
import { 
  Lesson, LetterData, SyllableData, WordData, SentenceData, 
  QuizQuestion, Badge, UserProgress, ParentSettings 
} from './types';
import { 
  LESSONS, CONSONANTS, DOUBLE_CONSONANTS, VOWELS, COMBINATIONS, TWO_LETTER_WORDS, THREE_LETTER_LONG_VOWELS,
  THREE_LETTER_WORDS, LONG_WORDS, SENTENCES, QUIZZES, BADGES 
} from './data/somaliAlphabet';
import { 
  playPop, playSuccessChime, playLevelUpSound, playFailureBuzz, speakSomali 
} from './utils/audio';

// Subcomponents
import MobileFrame from './components/MobileFrame';
import ParentGate from './components/ParentGate';
import ParentDashboard from './components/ParentDashboard';

// Default initial state
const DEFAULT_PROGRESS: UserProgress = {
  studentName: 'Sahal',
  avatar: '🦁',
  stars: 0,
  streak: 1,
  lastActive: new Date().toISOString().split('T')[0],
  completedLessons: [],
  unlockedBadges: [],
  quizScores: {}
};

const DEFAULT_PARENT_SETTINGS: ParentSettings = {
  pin: '1234',
  parentEmail: 'hooyo@somaliacademy.so',
  notificationsEnabled: true,
  notificationTime: '18:00',
  syncEnabled: true,
  isLoggedIn: false,
  coppaConsent: true,
  lastSyncTime: '12:00 PM'
};

export default function App() {
  // Navigation & Screen states
  const [screen, setScreen] = useState<'dashboard' | 'lesson' | 'quiz' | 'badge-cabinet' | 'parent-portal'>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Core User states (loaded from localStorage or defaults)
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('somali_student_progress');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [parentSettings, setParentSettings] = useState<ParentSettings>(() => {
    try {
      const saved = localStorage.getItem('somali_parent_settings');
      return saved ? JSON.parse(saved) : DEFAULT_PARENT_SETTINGS;
    } catch {
      return DEFAULT_PARENT_SETTINGS;
    }
  });

  // Save progress states on change
  useEffect(() => {
    localStorage.setItem('somali_student_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('somali_parent_settings', JSON.stringify(parentSettings));
  }, [parentSettings]);

  // Modals & Push Notifications Simulation
  const [isParentGateOpen, setIsParentGateOpen] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [activeMilestoneBadge, setActiveMilestoneBadge] = useState<Badge | null>(null);

  // Lesson Specific Activity States
  // Lesson 1: Consonants explorer
  const [selectedLetter, setSelectedLetter] = useState<LetterData>(CONSONANTS[0]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<boolean>(false);

  // Lesson 2: Vowels toggles
  const [vowelType, setVowelType] = useState<'short' | 'long'>('short');
  const [selectedVowel, setSelectedVowel] = useState<any>(VOWELS.short[0]);
  const [vowelAnimationKey, setVowelAnimationKey] = useState<number>(0);

  // Lesson 2b: Double Consonants (Xarfaha Labinlaabma)
  const [selectedDoubleConsonant, setSelectedDoubleConsonant] = useState<LetterData>(DOUBLE_CONSONANTS[0]);

  // Lesson 3: Letter Blending Syllabary
  const [blendConsonant, setBlendConsonant] = useState<string>('B');
  const [blendVowel, setBlendVowel] = useState<string>('A');
  const [blendVowelType, setBlendVowelType] = useState<'short' | 'long'>('short');
  const [blendedResult, setBlendedResult] = useState<string>('BA');
  const [isBlending, setIsBlending] = useState<boolean>(false);
  const [blendOrder, setBlendOrder] = useState<'C-V' | 'V-C'>('C-V');

  // Lessons 4 & 5: Word Builder Spellers
  const [wordList, setWordList] = useState<WordData[]>(THREE_LETTER_WORDS);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [wordSpelledCorrectly, setWordSpelledCorrectly] = useState<boolean>(false);

  // Lesson 6: Sentence Builder
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [sentenceCorrect, setSentenceCorrect] = useState<boolean>(false);

  // Active Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizBuilderLetters, setQuizBuilderLetters] = useState<string[]>([]);
  const [quizCorrectAnswersCount, setQuizCorrectAnswersCount] = useState<number>(0);
  const [quizResultsOpen, setQuizResultsOpen] = useState<boolean>(false);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState<boolean>(false);
  const [quizAnswerIsCorrect, setQuizAnswerIsCorrect] = useState<boolean>(false);

  // Trigger simulated push reminder on load after 3 seconds
  useEffect(() => {
    if (parentSettings.notificationsEnabled) {
      const timer = setTimeout(() => {
        setActiveNotification(
          `🔔 Reminder: Hey ${progress.studentName}! Keep your ${progress.streak}-day streak burning! Maanta baro Alifba Soomaali! 🔥`
        );
        playPop();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [parentSettings.notificationsEnabled, progress.studentName, progress.streak]);

  // Check and unlock milestone achievements
  const checkMilestoneAchievements = (updatedStars: number, completedList: string[]) => {
    BADGES.forEach(badge => {
      // Avoid re-unlocking
      if (progress.unlockedBadges.includes(badge.id)) return;

      let meetsCriteria = false;
      if (badge.type === 'stars' && updatedStars >= badge.unlockedAt) {
        meetsCriteria = true;
      } else if (badge.type === 'alphabet' && completedList.includes('l1_consonants')) {
        meetsCriteria = true;
      } else if (badge.type === 'vowels' && completedList.includes('l2_vowels')) {
        meetsCriteria = true;
      } else if (badge.type === 'quizzes' && completedList.includes('l4_3_letter_words')) {
        meetsCriteria = true;
      } else if (badge.type === 'sentences' && completedList.includes('l6_sentences')) {
        meetsCriteria = true;
      } else if (badge.type === 'streak' && progress.streak >= badge.unlockedAt) {
        meetsCriteria = true;
      }

      if (meetsCriteria) {
        setProgress(prev => ({
          ...prev,
          unlockedBadges: [...prev.unlockedBadges, badge.id]
        }));
        setActiveMilestoneBadge(badge);
        playLevelUpSound();
      }
    });
  };

  const addStars = (amount: number) => {
    const updatedStars = progress.stars + amount;
    setProgress(prev => ({
      ...prev,
      stars: updatedStars
    }));
    checkMilestoneAchievements(updatedStars, progress.completedLessons);
  };

  // Trigger simulated day-passing to test streak mechanics!
  const simulateNextDay = () => {
    playPop();
    const nextStreak = progress.streak + 1;
    setProgress(prev => ({
      ...prev,
      streak: nextStreak
    }));
    addStars(5);
    setActiveNotification(`🔥 Awesome! Day simulated. Streak increased to ${nextStreak} Maalmood! +5 Bonus Stars!`);
    checkMilestoneAchievements(progress.stars + 5, progress.completedLessons);
  };

  // Action: Launch a Lesson
  const launchLesson = (lesson: Lesson) => {
    playPop();
    setActiveLesson(lesson);
    setScreen('lesson');

    // Reset lesson activity parameters
    if (lesson.id === 'l1_consonants') {
      setSelectedLetter(CONSONANTS[0]);
    } else if (lesson.id === 'l2_vowels') {
      setVowelType('short');
      setSelectedVowel(VOWELS.short[0]);
    } else if (lesson.id === 'l3_combinations') {
      setBlendConsonant('B');
      setBlendVowel('A');
      setBlendVowelType('short');
      setBlendedResult('BA');
      setBlendOrder('C-V');
    } else if (lesson.id === 'l4_3_letter_long_vowels') {
      setWordList(THREE_LETTER_LONG_VOWELS);
      setupWordSpeller(0, THREE_LETTER_LONG_VOWELS);
    } else if (lesson.id === 'l5_long_words') {
      setWordList(LONG_WORDS);
      setupWordSpeller(0, LONG_WORDS);
    } else if (lesson.id === 'l6_sentences') {
      setupSentenceBuilder(0);
    }
  };

  // Speller Setup
  const setupWordSpeller = (index: number, list: WordData[]) => {
    setActiveWordIndex(index);
    const word = list[index];
    setSpelledLetters([]);
    setWordSpelledCorrectly(false);
    
    // Scramble letters
    const letters = [...word.letters];
    // Add 1 random letter decoy to make it slightly challenging but fun
    const alphabet = 'BGLMNDT';
    const decoy = alphabet[Math.floor(Math.random() * alphabet.length)];
    letters.push(decoy);

    // Shuffle
    const shuffled = letters.sort(() => Math.random() - 0.5);
    setScrambledLetters(shuffled);
  };

  // Sentence Builder Setup
  const setupSentenceBuilder = (index: number) => {
    setActiveSentenceIndex(index);
    const sent = SENTENCES[index];
    setSelectedWords([]);
    setSentenceCorrect(false);

    // Shuffle sentence words
    const shuffled = [...sent.words].sort(() => Math.random() - 0.5);
    setScrambledWords(shuffled);
  };

  // Word building letter tapper
  const tapScrambledLetter = (letter: string, index: number) => {
    if (wordSpelledCorrectly) return;
    playPop();

    const currentWord = wordList[activeWordIndex];
    const nextSpelled = [...spelledLetters, letter];
    setSpelledLetters(nextSpelled);

    // Remove tapped index from scrambled
    const nextScrambled = [...scrambledLetters];
    nextScrambled.splice(index, 1);
    setScrambledLetters(nextScrambled);

    // Check if fully spelled
    if (nextSpelled.length === currentWord.letters.length) {
      const isCorrect = nextSpelled.join('') === currentWord.word;
      if (isCorrect) {
        setWordSpelledCorrectly(true);
        playSuccessChime();
        speakSomali(currentWord.word);
        addStars(2);
      } else {
        playFailureBuzz();
        // Reset after short delay
        setTimeout(() => {
          setupWordSpeller(activeWordIndex, wordList);
        }, 1200);
      }
    }
  };

  // Sentence words selector
  const tapScrambledWord = (word: string, index: number) => {
    if (sentenceCorrect) return;
    playPop();

    const currentSent = SENTENCES[activeSentenceIndex];
    const nextSelected = [...selectedWords, word];
    setSelectedWords(nextSelected);

    const nextScrambled = [...scrambledWords];
    nextScrambled.splice(index, 1);
    setScrambledWords(nextScrambled);

    if (nextSelected.length === currentSent.words.length) {
      const isCorrect = nextSelected.join(' ') === currentSent.sentence;
      if (isCorrect) {
        setSentenceCorrect(true);
        playSuccessChime();
        speakSomali(currentSent.sentence);
        addStars(4);
      } else {
        playFailureBuzz();
        setTimeout(() => {
          setupSentenceBuilder(activeSentenceIndex);
        }, 1500);
      }
    }
  };

  // Reset Speller
  const resetSpeller = () => {
    playPop();
    setupWordSpeller(activeWordIndex, wordList);
  };

  // Reset Sentence
  const resetSentence = () => {
    playPop();
    setupSentenceBuilder(activeSentenceIndex);
  };

  // Blending combination generator
  const triggerBlending = () => {
    if (isBlending) return;
    setIsBlending(true);
    playPop();

    // Custom Web Audio formant transition
    setTimeout(() => {
      let result = '';
      if (blendOrder === 'C-V') {
        result = blendConsonant + blendVowel;
      } else {
        result = blendVowel + blendConsonant;
      }
      setBlendedResult(result);
      setIsBlending(false);
      playSuccessChime();
      speakSomali(result);
      addStars(1);
    }, 800);
  };

  // Launch Practice Quiz
  const launchQuiz = (lesson: Lesson) => {
    playPop();
    const questions = QUIZZES.filter(q => q.lessonId === lesson.id);
    setQuizQuestions(questions);
    setActiveLesson(lesson);
    setActiveQuestionIndex(0);
    setQuizCorrectAnswersCount(0);
    setQuizResultsOpen(false);
    setQuizAnswerChecked(false);
    setSelectedQuizOption(null);
    setQuizBuilderLetters([]);
    setScreen('quiz');

    // If word-builder or sentence-builder quiz, load option scrambled lists
    if (questions.length > 0) {
      setupQuizQuestionDetails(0, questions);
    }
  };

  const setupQuizQuestionDetails = (index: number, list: QuizQuestion[]) => {
    const q = list[index];
    setSelectedQuizOption(null);
    setQuizAnswerChecked(false);
    setQuizBuilderLetters([]);
    if (q.type === 'word-builder' || q.type === 'sentence-builder') {
      setQuizBuilderLetters([]);
    }
  };

  // Quiz Option Selector
  const selectQuizOption = (opt: string) => {
    if (quizAnswerChecked) return;
    playPop();
    setSelectedQuizOption(opt);
  };

  // Quiz Word/Sentence Builders Tap options
  const selectBuilderQuizToken = (token: string, index: number) => {
    if (quizAnswerChecked) return;
    playPop();
    const updated = [...quizBuilderLetters, token];
    setQuizBuilderLetters(updated);
  };

  const clearQuizBuilder = () => {
    playPop();
    setQuizBuilderLetters([]);
  };

  // Quiz Answer Verification
  const verifyQuizAnswer = () => {
    if (quizAnswerChecked) return;
    const q = quizQuestions[activeQuestionIndex];
    let isCorrect = false;

    if (q.type === 'multiple-choice') {
      isCorrect = selectedQuizOption === q.correctAnswer;
    } else if (q.type === 'word-builder' || q.type === 'sentence-builder') {
      const correctArr = q.correctAnswer as string[];
      isCorrect = quizBuilderLetters.join('') === correctArr.join('');
    }

    setQuizAnswerChecked(true);
    setQuizAnswerIsCorrect(isCorrect);

    if (isCorrect) {
      playSuccessChime();
      setQuizCorrectAnswersCount(prev => prev + 1);
      // Speak the correct word/sentence out loud!
      const audioToSpeak = q.type === 'multiple-choice' ? q.correctAnswer as string : quizBuilderLetters.join(' ');
      speakSomali(audioToSpeak);
    } else {
      playFailureBuzz();
    }
  };

  const nextQuizQuestion = () => {
    playPop();
    const nextIndex = activeQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setActiveQuestionIndex(nextIndex);
      setupQuizQuestionDetails(nextIndex, quizQuestions);
    } else {
      // Quiz Finished! Save stats
      const finalPercent = Math.round((quizCorrectAnswersCount / quizQuestions.length) * 100);
      const isNewHighScore = finalPercent >= (progress.quizScores[activeLesson!.id] || 0);
      
      const updatedScores = {
        ...progress.quizScores,
        [activeLesson!.id]: Math.max(progress.quizScores[activeLesson!.id] || 0, finalPercent)
      };

      const updatedCompletedList = [...progress.completedLessons];
      if (!updatedCompletedList.includes(activeLesson!.id) && finalPercent >= 60) {
        updatedCompletedList.push(activeLesson!.id);
      }

      setProgress(prev => ({
        ...prev,
        quizScores: updatedScores,
        completedLessons: updatedCompletedList
      }));

      addStars(quizCorrectAnswersCount * 3); // 3 stars per correct answer
      setQuizResultsOpen(true);
      playLevelUpSound();
    }
  };

  // Parent Gate Validation
  const handleOpenParentPortal = () => {
    playPop();
    setIsParentGateOpen(true);
  };

  const handleParentGateSuccess = () => {
    setIsParentGateOpen(false);
    setScreen('parent-portal');
  };

  // Update parent portal states
  const handleUpdateParentSettings = (updated: Partial<ParentSettings>) => {
    setParentSettings(prev => ({ ...prev, ...updated }));
  };

  // Reset Child Progress
  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setParentSettings(prev => ({ ...prev, isLoggedIn: false }));
    setScreen('dashboard');
    playFailureBuzz();
  };

  // Simulated microphone audio recorder
  const triggerVoiceRecorder = () => {
    playPop();
    setIsRecording(true);
    setRecordedAudio(false);
    setTimeout(() => {
      setIsRecording(false);
      setRecordedAudio(true);
      playSuccessChime();
    }, 2500); // 2.5 seconds recording simulation
  };

  const playRecordedAudio = () => {
    playPop();
    // Replay with a fun high-pitch echo voice effect representation!
    speakSomali(selectedLetter.exampleWord);
  };

  return (
    <MobileFrame 
      activeTab={screen}
      onBackClick={() => {
        playPop();
        if (screen === 'parent-portal') {
          // Relock parent session
          handleUpdateParentSettings({ isLoggedIn: false });
        }
        setScreen('dashboard');
        setActiveLesson(null);
      }}
      showBackButton={screen !== 'dashboard'}
    >
      {/* 1. Android Simulated Push Notifications shade */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -80 }}
            className="absolute top-2 inset-x-3 bg-slate-900/95 backdrop-blur border border-slate-700 p-3.5 rounded-2xl shadow-xl z-50 flex items-start gap-3 select-none text-white cursor-pointer"
            onClick={() => setActiveNotification(null)}
          >
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-slate-900 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">OGEYSIIS</span>
                <span className="text-[9px] text-slate-400">Hada</span>
              </div>
              <p className="text-[11px] text-slate-100 font-medium leading-relaxed">
                {activeNotification}
              </p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveNotification(null); }}
              className="text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Badge Cabinet / Unlock Achievement modal */}
      <AnimatePresence>
        {activeMilestoneBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-xs z-50 flex items-center justify-center p-6 select-none"
          >
            <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl max-w-sm text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 animate-bounce">
                <Award className="w-12 h-12 text-slate-900" />
              </div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Bilad Cusub oo Furantay!</span>
              <h3 className="text-xl font-black text-white mt-1 mb-2">{activeMilestoneBadge.title}</h3>
              <h4 className="text-sm font-bold text-teal-300 italic mb-4">"{activeMilestoneBadge.somaliTitle}"</h4>
              
              <div className="bg-indigo-950/60 p-4 rounded-xl border border-indigo-800/80 mb-5">
                <p className="text-xs text-indigo-100 leading-relaxed">
                  {activeMilestoneBadge.description}
                </p>
              </div>

              <button
                onClick={() => { playPop(); setActiveMilestoneBadge(null); }}
                id="btn-dismiss-milestone"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs px-6 py-3 rounded-full shadow-lg hover:shadow-amber-400/20 transition-all uppercase tracking-wider"
              >
                MashaAllah!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Screen Views router */}
      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          /* ==================================== */
          /* SCREEN: CHILD DASHBOARD (HOME SCREEN) */
          /* ==================================== */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col p-5 space-y-5"
          >
            {/* User Profile Bar */}
            <div className="flex items-center justify-between bg-white/70 backdrop-blur rounded-2xl p-3 shadow-xs border border-rose-100 shrink-0">
              <div className="flex items-center gap-2.5">
                {/* Clickable Profile Avatar */}
                <button
                  onClick={() => {
                    playPop();
                    const avatars = ['🦁', '🐪', '🦊', '🐱', '🐆', '🦒', '🐘'];
                    const nextAvatar = avatars[(avatars.indexOf(progress.avatar) + 1) % avatars.length];
                    setProgress(prev => ({ ...prev, avatar: nextAvatar }));
                  }}
                  id="btn-toggle-avatar"
                  className="w-11 h-11 bg-rose-100 border border-rose-200 rounded-full flex items-center justify-center text-2xl hover:scale-105 active:scale-95 transition-all focus:outline-hidden"
                  title="Beddel astaanta ardayga"
                >
                  {progress.avatar}
                </button>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800 text-sm">Haye, {progress.studentName}!</span>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded-sm uppercase tracking-wide">HEERKA 1</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 uppercase font-mono">Dadaale Yar</span>
                </div>
              </div>

              {/* Stats pills */}
              <div className="flex items-center gap-2">
                {/* Streak */}
                <div 
                  onClick={simulateNextDay}
                  title="Simul dhisa maalin cusub (Dadaal dheeri)"
                  className="flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold px-2.5 py-1.5 rounded-full text-xs shadow-xs border border-orange-100 cursor-pointer active:scale-95 transition-all"
                >
                  <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span>{progress.streak}</span>
                </div>

                {/* Stars counter */}
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 font-extrabold px-2.5 py-1.5 rounded-full text-xs shadow-xs border border-amber-100">
                  <span>⭐ {progress.stars}</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Panel */}
            <div className="grid grid-cols-2 gap-2.5 shrink-0">
              <button
                onClick={() => { playPop(); setScreen('badge-cabinet'); }}
                id="btn-nav-cabinet"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl p-3.5 flex flex-col items-center justify-center text-center shadow-sm border border-indigo-700/50 transition-all hover:scale-102"
              >
                <Award className="w-7 h-7 text-amber-300 animate-bounce-slow mb-1" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Qolka Biladaha</span>
                <span className="text-[9px] text-indigo-200">Kabadhada Biladaha (La helay: {progress.unlockedBadges.length})</span>
              </button>

              <button
                onClick={handleOpenParentPortal}
                id="btn-nav-parents"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-3.5 flex flex-col items-center justify-center text-center shadow-sm border border-emerald-600/50 transition-all hover:scale-102"
              >
                <Lock className="w-7 h-7 text-white mb-1" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Aagga Waalidiinta</span>
                <span className="text-[9px] text-emerald-100">Geli Magaalada Waalidiinta</span>
              </button>
            </div>

            {/* Interactive Somali Alphabet Journey Road */}
            <div className="flex-1 flex flex-col min-h-0">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3.5 px-1 font-mono">DIIWAANKA CASHARRADA</h3>
              
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 pb-4">
                {LESSONS.map((lesson) => {
                  const isLocked = progress.stars < lesson.unlockedAtStars;
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const highestScore = progress.quizScores[lesson.id];

                  return (
                    <div 
                      key={lesson.id}
                      className={`relative bg-white rounded-2xl p-4 border shadow-sm flex flex-col gap-3 transition-all ${
                        isLocked 
                          ? 'border-slate-200 opacity-60' 
                          : 'border-rose-100 hover:border-rose-300 hover:shadow-md'
                      }`}
                    >
                      {/* Top Bar inside Roadmap item */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs ${
                            isLocked ? 'bg-slate-400' : isCompleted ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}>
                            {lesson.order}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Qaybta: {
                              lesson.category === 'alphabet' ? 'Shibanayaal' :
                              lesson.category === 'vowels' ? 'Shaqal Gaab & Dheer' :
                              lesson.category === 'combinations' ? 'Dhawaaqyada' :
                              lesson.category === 'words' ? 'Erayada' : 'Weedhaha'
                            }</span>
                            <h4 className="text-sm font-extrabold text-slate-800">{lesson.title}</h4>
                            <h5 className="text-xs font-semibold text-rose-500 italic mt-0.5">"{lesson.somaliTitle}"</h5>
                          </div>
                        </div>

                        {/* Status Checkmark or Locks */}
                        {isLocked ? (
                          <span className="text-[9px] bg-slate-100 text-slate-500 font-extrabold px-2 py-1 rounded-md uppercase border border-slate-200">
                            🔒 Qufulan ({lesson.unlockedAtStars} Xiddigood)
                          </span>
                        ) : isCompleted ? (
                          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">
                            <Check className="w-3.5 h-3.5" />
                            <span>DHAMMEYSTIRAN {highestScore ? `(${highestScore}%)` : ''}</span>
                          </div>
                        ) : (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-2 py-1 rounded-md uppercase border border-amber-200">
                            Furan
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 leading-normal">
                        {lesson.description}
                      </p>

                      {/* Direct Learn & Quiz Action Buttons */}
                      {!isLocked && (
                        <div className="flex items-center gap-2.5 mt-1 pt-3.5 border-t border-slate-100 shrink-0">
                          <button
                            onClick={() => launchLesson(lesson)}
                            id={`btn-learn-${lesson.id}`}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-97 uppercase tracking-wider"
                          >
                            Baro
                          </button>
                          <button
                            onClick={() => launchQuiz(lesson)}
                            id={`btn-quiz-${lesson.id}`}
                            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-97 uppercase tracking-wider"
                          >
                            Imtixaan
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'lesson' && activeLesson && (
          /* ==================================== */
          /* SCREEN: LESSON PLAYGROUND AREA       */
          /* ==================================== */
          <motion.div
            key="lesson-view"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            className="flex-1 flex flex-col p-5 space-y-4 bg-slate-50 min-h-0"
          >
            {/* Mini Lesson Header */}
            <div className="flex items-center justify-between shrink-0">
              <div>
                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest font-mono">CASHARKA FIRCOON</span>
                <h3 className="text-base font-black text-slate-800 leading-tight">{activeLesson.title}</h3>
                <h4 className="text-xs font-bold text-teal-600 italic">"{activeLesson.somaliTitle}"</h4>
              </div>
              <button
                onClick={() => { playPop(); setScreen('dashboard'); }}
                id="btn-lesson-exit"
                className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-2xs"
              >
                Ku laabo
              </button>
            </div>

            {/* Content selector depending on Lesson ID */}
            <div className="flex-1 overflow-y-auto pr-1">
              
              {activeLesson.id === 'l1_consonants' && (
                /* LESSON 1: CONSONANTS GRID */
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Taabo xaraf kasta si aad u maqasho dhawaqiisa. Baro erayada caanka ah!
                  </p>
                  
                  {/* Grid layout */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {CONSONANTS.map((c) => (
                      <button
                        key={c.letter}
                        onClick={() => {
                          playPop();
                          setSelectedLetter(c);
                          speakSomali(c.letter);
                        }}
                        id={`btn-letter-${c.letter}`}
                        className={`aspect-square rounded-2xl font-black text-lg flex items-center justify-center transition-all shadow-xs border ${
                          selectedLetter.letter === c.letter
                            ? 'bg-rose-500 text-white border-rose-600 scale-105'
                            : 'bg-white hover:bg-rose-50 text-slate-700 border-rose-100'
                        }`}
                      >
                        {c.letter}
                      </button>
                    ))}
                  </div>

                  {/* Detail Panel for chosen consonant */}
                  <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 shadow-sm text-center space-y-3">
                    <div className="flex items-center justify-around">
                      <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl font-black text-rose-500">{selectedLetter.letter}</span>
                      </div>
                      
                      <div className="text-5xl animate-bounce-slow">
                        {selectedLetter.emoji}
                      </div>

                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Eray Tusaale</span>
                        <h4 className="text-xl font-extrabold text-slate-800">{selectedLetter.exampleWord}</h4>
                        <h5 className="text-xs font-bold text-teal-600 italic">Dhawaqa: {selectedLetter.name}</h5>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-500 space-y-1 text-left font-sans">
                      <div>Dhawaqa xarafka: <strong>{selectedLetter.phonics}</strong></div>
                      <div>Sida loogu dhawaaqo: <span className="text-rose-600 font-semibold">{selectedLetter.pronunciationHint}</span></div>
                      {selectedLetter.funFact && (
                        <div className="mt-1.5 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-100">
                          💡 <strong>Ogow:</strong> {selectedLetter.funFact}
                        </div>
                      )}
                    </div>

                    {/* Speech Trigger Controls */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => { playPop(); speakSomali(selectedLetter.exampleWord); }}
                        id="btn-pronounce-word"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs"
                      >
                        <Volume2 className="w-4.5 h-4.5" /> Dhawaaji Erayga
                      </button>

                      {/* COPPA Safe Audio Recorder */}
                      <button
                        onClick={triggerVoiceRecorder}
                        id="btn-voice-recorder"
                        className={`flex-1 flex items-center justify-center gap-1.5 border font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs ${
                          isRecording 
                            ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isRecording ? 'Duubaya...' : '🎤 Duub Codkaaga'}
                      </button>

                      {recordedAudio && (
                        <button
                          onClick={playRecordedAudio}
                          id="btn-play-recorded"
                          className="bg-teal-500 hover:bg-teal-600 text-white p-2.5 rounded-xl transition-all shadow-xs"
                          title="Play recorded audio"
                        >
                          <Play className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>

                    {isRecording && (
                      <p className="text-[10px] text-rose-500 font-extrabold animate-pulse">
                        🔴 Hada hadal! Sahal wuxuu diyaar u yahay inuu ku dhageysto... Dheh "{selectedLetter.exampleWord}"!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeLesson.id === 'l2_vowels' && (
                /* LESSON 2: VOWELS COMPARISON */
                <div className="space-y-4">
                   <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Af-Soomaaligu wuxuu leeyahay 5 shaqal gaab iyo 5 shaqal dheer oo la fidinayo!
                  </p>

                  {/* Toggle Vowel Categories */}
                  <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shrink-0">
                    <button
                      onClick={() => { playPop(); setVowelType('short'); }}
                      id="btn-vowel-short"
                      className={`flex-1 text-center font-bold text-xs py-2 rounded-lg transition-colors ${vowelType === 'short' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                      Shaqal Gaab
                    </button>
                    <button
                      onClick={() => { playPop(); setVowelType('long'); }}
                      id="btn-vowel-long"
                      className={`flex-1 text-center font-bold text-xs py-2 rounded-lg transition-colors ${vowelType === 'long' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                      Shaqal Dheer
                    </button>
                  </div>

                  {/* Vowels cards list */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {(vowelType === 'short' ? VOWELS.short : VOWELS.long).map((v) => (
                      <button
                        key={v.letter}
                        onClick={() => {
                          playPop();
                          setSelectedVowel(v);
                          setVowelAnimationKey(prev => prev + 1);
                          speakSomali(v.letter);
                        }}
                        id={`btn-vowel-item-${v.letter}`}
                        className={`py-3.5 rounded-xl font-extrabold text-base flex flex-col items-center justify-center transition-all border ${
                          selectedVowel.letter === v.letter
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102'
                            : 'bg-white hover:bg-indigo-50 text-slate-700 border-indigo-100'
                        }`}
                      >
                        <span className="text-lg font-black">{v.letter}</span>
                        <span className="text-[10px] font-medium opacity-80 mt-0.5">({v.phonics})</span>
                      </button>
                    ))}
                  </div>

                  {/* High Quality comparison board */}
                  <div className="bg-white border-2 border-indigo-100 rounded-3xl p-5 shadow-sm text-center space-y-3">
                    <div className="flex justify-between items-center px-4">
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Dhawaqa Shaqalka</span>
                        <motion.h4 
                          key={vowelAnimationKey}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-black text-indigo-600"
                        >
                          {selectedVowel.letter}
                        </motion.h4>
                      </div>

                      <div className="text-5xl animate-bounce-slow">
                        {selectedVowel.emoji}
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Tusaale Eray</span>
                        <h4 className="text-lg font-extrabold text-slate-800">{selectedVowel.word}</h4>
                        <h5 className="text-xs font-semibold text-teal-600 italic">Micnaha: "{selectedVowel.translation}"</h5>
                      </div>
                    </div>

                    <div className="bg-indigo-50/50 rounded-2xl p-3 text-xs text-indigo-900 font-medium text-left">
                      💡 Marka shaqalka la labanlaabo wuxuu noqonayaa dhawaq dheer. Tusaale ahaan, "A" waa mid gaaban, laakiin "AA" waa mid dheer oo la fidinayo!
                    </div>

                    <button
                      onClick={() => { playPop(); speakSomali(selectedVowel.word); }}
                      id="btn-vowel-word-speak"
                      className="w-full flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs"
                    >
                      <Volume2 className="w-4.5 h-4.5" /> Dhawaaji "{selectedVowel.word}"
                    </button>
                  </div>
                </div>
              )}

              {activeLesson.id === 'l2_double_consonants' && (
                /* LESSON 2b: DOUBLE CONSONANTS (XARFAHA LABINLAABMA) */
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Af-Soomaaligu wuxuu leeyahay 7 shibane oo kaliya oo la labanlaabo (Xarfaha Labinlaabma). Baro dhawaaqooda culus iyo tusaalooyinka!
                  </p>

                  {/* Double Consonants Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {DOUBLE_CONSONANTS.map((dc) => (
                      <button
                        key={dc.letter}
                        onClick={() => {
                          playPop();
                          setSelectedDoubleConsonant(dc);
                          speakSomali(dc.letter);
                        }}
                        id={`btn-dc-${dc.letter}`}
                        className={`aspect-square rounded-2xl font-black text-lg flex items-center justify-center transition-all shadow-xs border ${
                          selectedDoubleConsonant.letter === dc.letter
                            ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                            : 'bg-white hover:bg-emerald-50 text-slate-700 border-emerald-100'
                        }`}
                      >
                        {dc.letter.toLowerCase()}
                      </button>
                    ))}
                  </div>

                  {/* Detail panel */}
                  <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-sm text-center space-y-3">
                    <div className="flex items-center justify-around">
                      <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-black text-emerald-600 font-mono">{selectedDoubleConsonant.letter.toLowerCase()}</span>
                      </div>
                      
                      <div className="text-5xl animate-bounce-slow">
                        {selectedDoubleConsonant.emoji}
                      </div>

                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tusaale Eray</span>
                        <h4 className="text-xl font-extrabold text-slate-800">{selectedDoubleConsonant.exampleWord}</h4>
                        <h5 className="text-xs font-bold text-teal-600 italic">Dhawaqa: {selectedDoubleConsonant.name}</h5>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-500 space-y-1 text-left font-sans">
                      <div>Dhawaqa xarafka: <strong>{selectedDoubleConsonant.phonics}</strong></div>
                      <div>Sida loogu dhawaaqo: <span className="text-emerald-600 font-semibold">{selectedDoubleConsonant.pronunciationHint}</span></div>
                      <div className="mt-1 text-slate-600 italic">
                        {selectedDoubleConsonant.description}
                      </div>
                      {selectedDoubleConsonant.funFact && (
                        <div className="mt-1.5 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-100">
                          💡 <strong>Ogow:</strong> {selectedDoubleConsonant.funFact}
                        </div>
                      )}
                    </div>

                    {/* Speech Trigger */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => { playPop(); speakSomali(selectedDoubleConsonant.exampleWord); }}
                        className="w-full flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        <Volume2 className="w-4.5 h-4.5" /> Dhawaaji "{selectedDoubleConsonant.exampleWord}"
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeLesson.id === 'l3_combinations' && (
                /* LESSON 3: LETTER BLENDING SYLLABLES */
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Dooro xaraf shibane ah iyo shaqal si aad isugu darto dhawaaqooda. Waxaad isku dari kartaa Shibane-Shaqal ama Shaqal-Shibane!
                  </p>

                  {/* Vowel Type Tabs Selector (Short vs. Double Vowels) */}
                  <div className="flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200">
                    <button
                      onClick={() => {
                        playPop();
                        setBlendVowelType('short');
                        setBlendVowel('A');
                        setBlendedResult('BA');
                      }}
                      className={`flex-1 text-center font-extrabold text-xs py-2 rounded-lg transition-all ${
                        blendVowelType === 'short'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Shaqal Gaaban (Single Vowels)
                    </button>
                    <button
                      onClick={() => {
                        playPop();
                        setBlendVowelType('long');
                        setBlendVowel('AA');
                        setBlendedResult('BAA');
                      }}
                      className={`flex-1 text-center font-extrabold text-xs py-2 rounded-lg transition-all ${
                        blendVowelType === 'long'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Shaqal Dheer (Double Vowels)
                    </button>
                  </div>

                  {/* Blending Direction Options */}
                  <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shrink-0">
                    <button
                      onClick={() => {
                        playPop();
                        setBlendOrder('C-V');
                        // Recalculate preview
                        setBlendedResult(blendOrder === 'C-V' ? blendConsonant + blendVowel : blendVowel + blendConsonant);
                      }}
                      id="btn-blend-cv"
                      className={`flex-1 text-center font-bold text-xs py-2 rounded-lg transition-colors ${
                        blendOrder === 'C-V' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      {blendVowelType === 'short'
                        ? 'Shibane + Shaqal (Tusaale: BA)'
                        : 'Shibane + Shaqal Dheer (Tusaale: BAA)'}
                    </button>
                    <button
                      onClick={() => {
                        playPop();
                        setBlendOrder('V-C');
                        // Recalculate preview
                        setBlendedResult(blendOrder === 'V-C' ? blendConsonant + blendVowel : blendVowel + blendConsonant);
                      }}
                      id="btn-blend-vc"
                      className={`flex-1 text-center font-bold text-xs py-2 rounded-lg transition-colors ${
                        blendOrder === 'V-C' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      {blendVowelType === 'short'
                        ? 'Shaqal + Shibane (Tusaale: AB)'
                        : 'Shaqal Dheer + Shibane (Tusaale: AAB)'}
                    </button>
                  </div>

                  {/* Dual Grid: Consonants + Vowels */}
                  <div className="space-y-3">
                    {/* Consonants Selection Grid - All 21 Consonants! */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dhammaan 21-ka Shibanayaal Soomaaliyeed</h4>
                        <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Dooro Xaraf</span>
                      </div>
                      <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
                        {['B', 'T', 'J', 'X', 'KH', 'D', 'R', 'S', 'SH', 'DH', 'C', 'G', 'F', 'Q', 'K', 'L', 'M', 'N', 'W', 'H', 'Y'].map((con) => (
                          <button
                            key={con}
                            onClick={() => {
                              playPop();
                              setBlendConsonant(con);
                              // Live update result preview
                              if (blendOrder === 'C-V') {
                                setBlendedResult(con + blendVowel);
                              } else {
                                setBlendedResult(blendVowel + con);
                              }
                            }}
                            id={`btn-blend-con-${con}`}
                            className={`py-2 rounded-lg font-black text-xs transition-all border ${
                              blendConsonant === con
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs scale-105'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {con}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vowels Selection Grid */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {blendVowelType === 'short' ? 'Shaqallada Gaagaaban' : 'Shaqallada Dheerdheer'}
                        </h4>
                        <span className="text-[9px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">Dooro Shaqal</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(blendVowelType === 'short'
                          ? ['A', 'E', 'I', 'O', 'U']
                          : ['AA', 'EE', 'II', 'OO', 'UU']
                        ).map((vow) => (
                          <button
                            key={vow}
                            onClick={() => {
                              playPop();
                              setBlendVowel(vow);
                              // Live update result preview
                              if (blendOrder === 'C-V') {
                                setBlendedResult(blendConsonant + vow);
                              } else {
                                setBlendedResult(vow + blendConsonant);
                              }
                            }}
                            id={`btn-blend-vow-${vow}`}
                            className={`py-2.5 rounded-lg font-black text-xs sm:text-sm transition-all border ${
                              blendVowel === vow
                                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs scale-105'
                                : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {vow}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Merging Playground */}
                  <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 shadow-sm text-center space-y-4">
                    <div className="flex items-center justify-center gap-4 py-2">
                      <motion.div 
                        animate={isBlending ? { x: blendOrder === 'C-V' ? 60 : -60, scale: 0.9 } : { x: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-14 h-14 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center font-black text-lg text-emerald-600 shadow-2xs"
                      >
                        {blendOrder === 'C-V' ? blendConsonant : blendVowel}
                      </motion.div>

                      <span className="text-2xl font-black text-slate-300 animate-pulse">+</span>

                      <motion.div 
                        animate={isBlending ? { x: blendOrder === 'C-V' ? -60 : 60, scale: 0.9 } : { x: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-14 h-14 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center font-black text-lg text-indigo-600 shadow-2xs"
                      >
                        {blendOrder === 'C-V' ? blendVowel : blendConsonant}
                      </motion.div>
                    </div>

                    <button
                      onClick={triggerBlending}
                      disabled={isBlending}
                      id="btn-blend-submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                    >
                      {isBlending ? 'Isku daraya...' : 'Isku dar xarfaha!'}
                    </button>

                    <AnimatePresence>
                      {blendedResult && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center"
                        >
                          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Dhawaqa Isku-dhafan</span>
                          <span className="text-3xl font-black text-emerald-700 tracking-wider mt-0.5">{blendedResult}</span>
                          <button
                            onClick={() => speakSomali(blendedResult)}
                            id="btn-speak-blended"
                            className="mt-2.5 p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full transition-colors flex items-center gap-1.5 px-4 font-bold text-xs"
                          >
                            <Volume2 className="w-4 h-4" /> Dhawaaji
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Section: Double Vowels Placement Board (Requested!) */}
                  {blendVowelType === 'long' && (
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 space-y-3">
                      <div className="text-center">
                        <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full">BARASHADA MEELAYNTA</span>
                        <h4 className="text-sm font-black text-slate-800 mt-1.5">Shaqallada Dheerdheer ee Erayada Soomaaliga</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto">
                          Erayada Soomaaliga waxay ka koobnaan karaan shaqal dheer oo ku yaalla <strong>bilaawga</strong>, <strong>dhexda</strong>, ama <strong>dhamaadka</strong> erayga. Guji erayada si aad u barato dhawaaqooda!
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* 1. Bilaawga (Beginning) */}
                        <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                            <h5 className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Bilaawga Erayga</h5>
                          </div>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {[
                              { word: 'Aabbe', emoji: '👨', trans: 'Father' },
                              { word: 'Aan', emoji: '🤝', trans: 'Let us' },
                              { word: 'Eel', emoji: '🕳️', trans: 'Well / misfortune' },
                              { word: 'Iid', emoji: '🌙', trans: 'Eid festival' },
                              { word: 'Ood', emoji: '🪵', trans: 'Fence / gate' },
                              { word: 'Uun', emoji: '🌌', trans: 'Universe / creation' }
                            ].map((item) => (
                              <button
                                key={item.word}
                                onClick={() => { playPop(); speakSomali(item.word); }}
                                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="text-base">{item.emoji}</span>
                                  <span className="text-xs font-extrabold text-slate-800 font-mono tracking-wider">{item.word}</span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-semibold italic">{item.trans}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Dhexda (Center) */}
                        <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            <h5 className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Dhexda Erayga</h5>
                          </div>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {[
                              { word: 'Geel', emoji: '🐪', trans: 'Camels' },
                              { word: 'Jiir', emoji: '🐭', trans: 'Mouse' },
                              { word: 'Duur', emoji: '🌳', trans: 'Forest / wild' },
                              { word: 'Hees', emoji: '🎵', trans: 'Song' },
                              { word: 'Boor', emoji: '💨', trans: 'Dust / soil' },
                              { word: 'Daar', emoji: '🏢', trans: 'Building / house' }
                            ].map((item) => (
                              <button
                                key={item.word}
                                onClick={() => { playPop(); speakSomali(item.word); }}
                                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="text-base">{item.emoji}</span>
                                  <span className="text-xs font-extrabold text-slate-800 font-mono tracking-wider">{item.word}</span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-semibold italic">{item.trans}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 3. Dhamaadka (End) */}
                        <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <h5 className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Dhamaadka Erayga</h5>
                          </div>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {[
                              { word: 'Baa', emoji: '💥', trans: 'Catastrophe' },
                              { word: 'Gee', emoji: '📐', trans: 'Take edge' },
                              { word: 'Sii', emoji: '👉', trans: 'Give / further' },
                              { word: 'Loo', emoji: '✉️', trans: 'For someone' },
                              { word: 'Buu', emoji: '🐝', trans: 'He / buzz' }
                            ].map((item) => (
                              <button
                                key={item.word}
                                onClick={() => { playPop(); speakSomali(item.word); }}
                                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="text-base">{item.emoji}</span>
                                  <span className="text-xs font-extrabold text-slate-800 font-mono tracking-wider">{item.word}</span>
                                </div>
                                <span className="text-[9px] text-slate-400 font-semibold italic">{item.trans}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Grid of 2-Letter Words with Emojis and Translations */}
                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3 mt-4">
                    <div className="text-center">
                      <span className="text-[10px] text-rose-500 font-extrabold uppercase tracking-widest">
                        {blendVowelType === 'short' ? 'Khasnadda Erayada Labada Xaraf' : 'Khasnadda Erayada Saddexda Xaraf ee Shaqal Dheer'}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 mt-0.5">
                        {blendVowelType === 'short' ? 'Baro Erayada Labada Xaraf' : 'Baro Erayada Shaqal Dheer'}
                      </h4>
                      <p className="text-[11px] text-slate-400">Guji eray kasta si aad u maqasho dhawaqa isku-dhafan ee saxda ah!</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1">
                      {(blendVowelType === 'short' ? TWO_LETTER_WORDS : THREE_LETTER_LONG_VOWELS).map((word) => (
                        <button
                          key={word.word}
                          onClick={() => {
                            playPop();
                            speakSomali(word.word);
                          }}
                          className="bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-100 rounded-2xl p-3 text-center transition-all flex flex-col items-center cursor-pointer group"
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform mb-1">{word.emoji}</span>
                          <span className="text-base font-black text-emerald-700 font-mono tracking-wider">{word.word}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{word.translation}</span>
                          <span className="text-[9px] text-rose-500 italic mt-0.5">({word.pronunciationHint})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(activeLesson.id === 'l4_3_letter_long_vowels' || activeLesson.id === 'l5_long_words') && (
                /* LESSONS 4 & 5: SPELLER WORD BUILDERS */
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Isku xir xarfaha ku dhex daadsan sanduuqa si aad u dhisto erayga saxda ah!
                  </p>

                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs text-center space-y-4 relative">
                    {/* Object Card */}
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Hadafka Sawirka</span>
                        <h4 className="text-lg font-black text-slate-800">{wordList[activeWordIndex].translation}</h4>
                        <span className="text-xs font-semibold text-rose-500 italic">Kaalmo: {wordList[activeWordIndex].pronunciationHint}</span>
                      </div>
                      <span className="text-5xl animate-bounce-slow">
                        {wordList[activeWordIndex].emoji}
                      </span>
                    </div>

                    {/* Slots Shelf */}
                    <div className="flex justify-center gap-2 py-4 border-b-2 border-slate-200 bg-amber-50/30 rounded-xl">
                      {wordList[activeWordIndex].letters.map((_, index) => (
                        <div
                          key={index}
                          className={`w-11 h-11 border-2 rounded-xl flex items-center justify-center font-black text-lg transition-all ${
                            wordSpelledCorrectly
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                              : spelledLetters[index]
                              ? 'bg-white border-slate-400 text-slate-800 shadow-2xs'
                              : 'bg-slate-100 border-dashed border-slate-300 text-transparent'
                          }`}
                        >
                          {spelledLetters[index] || ''}
                        </div>
                      ))}
                    </div>

                    {/* Scrambled selection row */}
                    <div className="flex justify-center gap-2 flex-wrap py-2">
                      {scrambledLetters.map((char, idx) => (
                        <button
                          key={idx}
                          onClick={() => tapScrambledLetter(char, idx)}
                          id={`btn-speller-char-${idx}`}
                          disabled={wordSpelledCorrectly}
                          className="w-11 h-11 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-black text-base flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                        >
                          {char}
                        </button>
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={resetSpeller}
                        id="btn-speller-reset"
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-2 px-4 rounded-xl transition-all"
                      >
                        Nadiifi Sanduuqa
                      </button>

                      {wordSpelledCorrectly && (
                        <button
                          onClick={() => {
                            const nextIndex = (activeWordIndex + 1) % wordList.length;
                            setupWordSpeller(nextIndex, wordList);
                          }}
                          id="btn-speller-next"
                          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
                        >
                          Erayga Xiga <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {wordSpelledCorrectly && (
                      <div className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center p-6 space-y-3 z-10">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                        </div>
                        <h4 className="text-xl font-black text-emerald-600">MashaAllah! Waad ku guuleysatay!</h4>
                        <p className="text-xs text-slate-500">
                          Waad ku guuleysatay qoridda erayga: <strong>{wordList[activeWordIndex].word}</strong>! Waxaad heshay +2 Xiddigood!
                        </p>
                        <button
                          onClick={() => {
                            const nextIndex = (activeWordIndex + 1) % wordList.length;
                            setupWordSpeller(nextIndex, wordList);
                          }}
                          id="btn-speller-correct-next"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all"
                        >
                          Erayga Xiga
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeLesson.id === 'l6_sentences' && (
                /* LESSON 6: SENTENCE BUILDER */
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Dhis weedho Soomaaliyeed! Taabo erayada ku dhex daadsan sanduuqa si ay u kala horreeyaan.
                  </p>

                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs text-center space-y-4 relative">
                    {/* Scene banner */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-around">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Macnaha Weedha</span>
                        <h4 className="text-base font-black text-slate-800 leading-snug">{SENTENCES[activeSentenceIndex].translation}</h4>
                        <p className="text-[10px] text-teal-600 font-semibold">{SENTENCES[activeSentenceIndex].hint}</p>
                      </div>
                      <span className="text-5xl">{SENTENCES[activeSentenceIndex].emoji}</span>
                    </div>

                    {/* Selected words bar */}
                    <div className="min-h-12 border-b-2 border-slate-200 bg-amber-50/20 rounded-xl p-2.5 flex flex-wrap justify-center gap-1.5">
                      {selectedWords.length === 0 ? (
                        <span className="text-xs text-slate-400 italic self-center">Taabo erayada hoose si aad u dhisto weedha...</span>
                      ) : (
                        selectedWords.map((word, index) => (
                          <div
                            key={index}
                            className="bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-2xs"
                          >
                            {word}
                          </div>
                        ))
                      )}
                    </div>

                    {/* Scrambled buttons */}
                    <div className="flex flex-wrap justify-center gap-2 py-2">
                      {scrambledWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => tapScrambledWord(word, idx)}
                          id={`btn-sentence-word-${idx}`}
                          disabled={sentenceCorrect}
                          className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95"
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={resetSentence}
                        id="btn-sentence-reset"
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-2.5 rounded-xl transition-all"
                      >
                        Dib u bilow
                      </button>

                      {sentenceCorrect && (
                        <button
                          onClick={() => {
                            const nextIndex = (activeSentenceIndex + 1) % SENTENCES.length;
                            setupSentenceBuilder(nextIndex);
                          }}
                          id="btn-sentence-next"
                          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
                        >
                          Weedha Xigta <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {sentenceCorrect && (
                      <div className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center p-6 space-y-3 z-10 animate-fade-in">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                        </div>
                        <h4 className="text-xl font-black text-emerald-600">Heer Sare! Waad ku guuleysatay!</h4>
                        <p className="text-xs text-slate-500">
                          Waxaad dhistay weedha: <strong>"{SENTENCES[activeSentenceIndex].sentence}"</strong>! Waxaad heshay +4 Xiddigood!
                        </p>
                        <button
                          onClick={() => {
                            const nextIndex = (activeSentenceIndex + 1) % SENTENCES.length;
                            setupSentenceBuilder(nextIndex);
                          }}
                          id="btn-sentence-correct-next"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all"
                        >
                          Weedha Xigta
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}

        {screen === 'quiz' && activeLesson && (
          /* ==================================== */
          /* SCREEN: QUIZ INTERACTIVE TESTS       */
          /* ==================================== */
          <motion.div
            key="quiz-view"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            className="flex-1 flex flex-col p-5 space-y-4 bg-slate-50 min-h-0 relative"
          >
            {/* Quiz Header Progress indicator */}
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-200 shrink-0">
              <div>
                <span className="text-[9px] text-teal-600 font-extrabold uppercase font-mono">TIJAABO FIRCOON</span>
                <h4 className="text-xs font-black text-slate-800 truncate max-w-[180px]">{activeLesson.title}</h4>
              </div>

              {/* Status indicators */}
              <div className="flex gap-1.5">
                {quizQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full transition-colors border ${
                      idx < activeQuestionIndex
                        ? 'bg-emerald-500 border-emerald-600'
                        : idx === activeQuestionIndex
                        ? 'bg-amber-400 border-amber-500 animate-pulse'
                        : 'bg-slate-200 border-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Questions area */}
            <div className="flex-1 overflow-y-auto pr-1">
              {quizQuestions.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xs text-slate-400">Loading quiz materials...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Current question card */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest font-mono">
                      Su'aasha {activeQuestionIndex + 1} ee ka kooban {quizQuestions.length}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-800 leading-relaxed">
                      {quizQuestions[activeQuestionIndex].questionText}
                    </h3>

                    {quizQuestions[activeQuestionIndex].somaliText && (
                      <p className="text-xs font-bold text-indigo-600 bg-indigo-50/50 py-1.5 px-3 rounded-lg border border-indigo-100 self-start inline-block">
                        Mawduuca: "{quizQuestions[activeQuestionIndex].somaliText}"
                      </p>
                    )}

                    {/* Render inputs depending on Quiz question types */}
                    {quizQuestions[activeQuestionIndex].type === 'multiple-choice' ? (
                      /* Category 1: MULTIPLE CHOICE OPTION BUBBLES */
                      <div className="flex flex-col gap-2.5 pt-1.5">
                        {quizQuestions[activeQuestionIndex].options?.map((option) => {
                          const isSelected = selectedQuizOption === option;
                          const showCorrect = quizAnswerChecked && option === quizQuestions[activeQuestionIndex].correctAnswer;
                          const showWrong = quizAnswerChecked && isSelected && option !== quizQuestions[activeQuestionIndex].correctAnswer;

                          return (
                            <button
                              key={option}
                              onClick={() => selectQuizOption(option)}
                              id={`btn-quiz-opt-${option}`}
                              disabled={quizAnswerChecked}
                              className={`w-full text-left font-bold text-xs py-3 px-4 rounded-xl border transition-all flex items-center justify-between ${
                                showCorrect
                                  ? 'bg-emerald-500 text-white border-emerald-600'
                                  : showWrong
                                  ? 'bg-rose-500 text-white border-rose-600'
                                  : isSelected
                                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              <span>{option}</span>
                              {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                              {showWrong && <X className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* Category 2: SPELLING / SENTENCE BUILDERS */
                      <div className="space-y-4 pt-1.5">
                        {/* Slots box */}
                        <div className="min-h-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 p-2 flex flex-wrap justify-center gap-1">
                          {quizBuilderLetters.length === 0 ? (
                            <span className="text-[11px] text-slate-400 italic self-center">Taabo xarfaha hoose si aad u qorto...</span>
                          ) : (
                            quizBuilderLetters.map((tok, index) => (
                              <div
                                key={index}
                                className={`font-bold text-xs py-1.5 px-3 rounded-lg border shadow-3xs ${
                                  quizAnswerChecked && quizAnswerIsCorrect
                                    ? 'bg-emerald-500 border-emerald-600 text-white'
                                    : quizAnswerChecked
                                    ? 'bg-rose-500 border-rose-600 text-white'
                                    : 'bg-white border-slate-200 text-slate-800'
                                }`}
                              >
                                {tok}
                              </div>
                            ))
                          )}
                        </div>

                        {/* Interactive tokens selection */}
                        <div className="flex flex-wrap justify-center gap-2">
                          {quizQuestions[activeQuestionIndex].options?.map((token, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectBuilderQuizToken(token, idx)}
                              id={`btn-quiz-token-${idx}`}
                              disabled={quizAnswerChecked || quizBuilderLetters.includes(token)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-full shadow-md transition-all disabled:opacity-30"
                            >
                              {token}
                            </button>
                          ))}
                        </div>

                        {!quizAnswerChecked && (
                          <button
                            onClick={clearQuizBuilder}
                            id="btn-quiz-builder-clear"
                            className="text-[10px] text-rose-500 font-bold hover:underline"
                          >
                            Nadiifi sanduuqa
                          </button>
                        )}
                      </div>
                    )}

                    {/* Hint description */}
                    <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100">
                      💡 <strong>Kaalmo:</strong> {quizQuestions[activeQuestionIndex].hint}
                    </p>

                    {/* Verify control panel */}
                    <div className="flex gap-2 pt-2">
                      {!quizAnswerChecked ? (
                        <button
                          onClick={verifyQuizAnswer}
                          id="btn-quiz-check-answer"
                          disabled={
                            quizQuestions[activeQuestionIndex].type === 'multiple-choice'
                              ? !selectedQuizOption
                              : quizBuilderLetters.length === 0
                          }
                          className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all uppercase tracking-wider"
                        >
                          Hubi Jawaabta
                        </button>
                      ) : (
                        <button
                          onClick={nextQuizQuestion}
                          id="btn-quiz-next-question"
                          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all uppercase tracking-wider flex items-center justify-center gap-1"
                        >
                          Xiga <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Quiz Results View Overlay */}
            {quizResultsOpen && (
              <div className="absolute inset-0 bg-white z-40 p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  <Award className="w-12 h-12 text-amber-500" />
                </div>

                <span className="text-[10px] bg-amber-50 text-amber-800 font-extrabold px-3 py-1 rounded-full uppercase border border-amber-200">
                  Tijaabadii Waa Dhamaatay!
                </span>

                <h3 className="text-xl font-black text-slate-800">
                  Shaqo Aad U Fiican, {progress.studentName}!
                </h3>

                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Waxaad si guul leh u dhamaysatay tijaabada casharka <strong>{activeLesson.title}</strong>. Waxaad heshay xiddigo aad ku fuusho darajooyin cusub!
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4 w-full max-w-xs font-mono text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Sax</span>
                    <span className="text-base font-extrabold text-teal-600">
                      {quizCorrectAnswersCount} / {quizQuestions.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Xiddigaha</span>
                    <span className="text-base font-extrabold text-amber-500">
                      ⭐ +{quizCorrectAnswersCount * 3}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playPop();
                    setScreen('dashboard');
                    setActiveLesson(null);
                  }}
                  id="btn-quiz-finish-home"
                  className="w-full max-w-xs bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs py-3 rounded-full shadow-lg transition-all uppercase tracking-wider"
                >
                  Ku laabo Dashboard
                </button>
              </div>
            )}
          </motion.div>
        )}

        {screen === 'badge-cabinet' && (
          /* ==================================== */
          /* SCREEN: TROPHY ROOM & BADGES CABINET */
          /* ==================================== */
          <motion.div
            key="badge-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col p-5 space-y-4 bg-amber-50/40 min-h-0"
          >
            <div className="flex items-center justify-between shrink-0">
              <div>
                <span className="text-[9px] text-amber-600 font-extrabold uppercase font-mono">BILADAHA & GUULAHA</span>
                <h3 className="text-base font-black text-slate-800">Kabadhada Biladaha (Trophies)</h3>
              </div>
              <button
                onClick={() => { playPop(); setScreen('dashboard'); }}
                id="btn-cabinet-exit"
                className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold text-xs px-3.5 py-1.5 rounded-full"
              >
                Ku laabo Map
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed text-center bg-white p-3 rounded-xl border border-rose-100 shadow-2xs">
              Uruuri xiddigaha oo dhamaystir casharrada Soomaaliga si aad u furto biladaha xayawaanka duurjoogta Soomaaliya! 🇸🇴
            </p>

            {/* Badges Grid shelf */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3.5 pb-4">
                {BADGES.map((badge) => {
                  const isUnlocked = progress.unlockedBadges.includes(badge.id);

                  return (
                    <div
                      key={badge.id}
                      className={`bg-white rounded-2xl p-4 border flex flex-col items-center text-center shadow-2xs transition-all relative ${
                        isUnlocked
                          ? 'border-rose-100 hover:shadow-md'
                          : 'border-slate-200 opacity-55'
                      }`}
                    >
                      {/* Badge badge circle */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xs mb-3 ${
                        isUnlocked ? badge.color : 'bg-slate-200'
                      }`}>
                        <Award className={`w-7 h-7 ${isUnlocked ? 'text-white' : 'text-slate-400'}`} />
                      </div>

                      <h4 className={`text-xs font-black ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                        {badge.title}
                      </h4>
                      <h5 className="text-[10px] font-bold text-teal-600 italic">
                        "{badge.somaliTitle}"
                      </h5>
                      <p className="text-[9px] text-slate-400 leading-normal mt-1.5">
                        {badge.description}
                      </p>

                      {!isUnlocked && (
                        <span className="text-[8px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.2 rounded-full border border-slate-200 mt-2">
                          Waa Xiran Yahay
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'parent-portal' && (
          /* ==================================== */
          /* SCREEN: PARENT SETTINGS PORTAL       */
          /* ==================================== */
          <motion.div
            key="parent-portal-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <ParentDashboard
              progress={progress}
              parentSettings={parentSettings}
              onUpdateSettings={handleUpdateParentSettings}
              onClose={() => {
                playPop();
                handleUpdateParentSettings({ isLoggedIn: false }); // Auto lock
                setScreen('dashboard');
              }}
              onResetProgress={handleResetProgress}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parental Gate Modal */}
      <ParentGate
        isOpen={isParentGateOpen}
        onClose={() => { playPop(); setIsParentGateOpen(false); }}
        onSuccess={handleParentGateSuccess}
      />
    </MobileFrame>
  );
}
