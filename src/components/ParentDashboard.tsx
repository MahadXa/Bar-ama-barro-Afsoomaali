import React, { useState } from 'react';
import { 
  Lock, Settings, Mail, Shield, WifiOff, Bell, RefreshCw, BarChart2, Check, Cloud, Sparkles, 
  Volume2, Play, Save, RotateCcw, Search, Mic, CheckCircle2, Crown
} from 'lucide-react';
import { ParentSettings, UserProgress } from '../types';
import { playPop, playSuccessChime, speakSomali, SOMALI_SPEECH_MAP, getSoundStatus } from '../utils/audio';
import { AudioEditorModal } from './AudioEditorModal';

const SPEAKABLE_GROUPS = [
  {
    name: 'Shibanayaal (Consonants)',
    id: 'consonants',
    items: [
      { term: 'B', original: 'B', desc: 'Dhawaqa xarafka B (Baa)' },
      { term: 'T', original: 'T', desc: 'Dhawaqa xarafka T (Taa)' },
      { term: 'J', original: 'J', desc: 'Dhawaqa xarafka J (Jiim)' },
      { term: 'X', original: 'X', desc: 'Dhawaqa xarafka X (Xaa)' },
      { term: 'KH', original: 'KH', desc: 'Dhawaqa xarafka KH (Khaa)' },
      { term: 'D', original: 'D', desc: 'Dhawaqa xarafka D (Daal)' },
      { term: 'R', original: 'R', desc: 'Dhawaqa xarafka R (Raa)' },
      { term: 'S', original: 'S', desc: 'Dhawaqa xarafka S (Siin)' },
      { term: 'SH', original: 'SH', desc: 'Dhawaqa xarafka SH (Shiin)' },
      { term: 'DH', original: 'DH', desc: 'Dhawaqa xarafka DH (Dhaaf)' },
      { term: 'C', original: 'C', desc: 'Dhawaqa xarafka C (Cayn)' },
      { term: 'G', original: 'G', desc: 'Dhawaqa xarafka G (Gaaf)' },
      { term: 'F', original: 'F', desc: 'Dhawaqa xarafka F (Faa)' },
      { term: 'Q', original: 'Q', desc: 'Dhawaqa xarafka Q (Qaaf)' },
      { term: 'K', original: 'K', desc: 'Dhawaqa xarafka K (Kaaf)' },
      { term: 'L', original: 'L', desc: 'Dhawaqa xarafka L (Laam)' },
      { term: 'M', original: 'M', desc: 'Dhawaqa xarafka M (Miim)' },
      { term: 'N', original: 'N', desc: 'Dhawaqa xarafka N (Nuun)' },
      { term: 'W', original: 'W', desc: 'Dhawaqa xarafka W (Wow)' },
      { term: 'H', original: 'H', desc: 'Dhawaqa xarafka H (Haa)' },
      { term: 'Y', original: 'Y', desc: 'Dhawaqa xarafka Y (Yaa)' },
      { term: 'Bisad', original: 'Bisad', desc: 'Tusaalaha xarafka B' },
      { term: 'Tufaax', original: 'Tufaax', desc: 'Tusaalaha xarafka T' },
      { term: 'Jiir', original: 'Jiir', desc: 'Tusaalaha xarafka J' },
      { term: 'Xiddig', original: 'Xiddig', desc: 'Tusaalaha xarafka X' },
      { term: 'Khudaar', original: 'Khudaar', desc: 'Tusaalaha xarafka KH' },
      { term: 'Durbaan', original: 'Durbaan', desc: 'Tusaalaha xarafka D' },
      { term: 'Rati', original: 'Rati', desc: 'Tusaalaha xarafka R' },
      { term: 'Saacad', original: 'Saacad', desc: 'Tusaalaha xarafka S' },
      { term: 'Shabeel', original: 'Shabeel', desc: 'Tusaalaha xarafka SH' },
      { term: 'Dhiil', original: 'Dhiil', desc: 'Tusaalaha xarafka DH' },
      { term: 'Caano', original: 'Caano', desc: 'Tusaalaha xarafka C' },
      { term: 'Geel', original: 'Geel', desc: 'Tusaalaha xarafka G' },
      { term: 'Faras', original: 'Faras', desc: 'Tusaalaha xarafka F' },
      { term: 'Qorrax', original: 'Qorrax', desc: 'Tusaalaha xarafka Q' },
      { term: 'Kab', original: 'Kab', desc: 'Tusaalaha xarafka K' },
      { term: 'Libaax', original: 'Libaax', desc: 'Tusaalaha xarafka L' },
      { term: 'Moos', original: 'Moos', desc: 'Tusaalaha xarafka M' },
      { term: 'Nal', original: 'Nal', desc: 'Tusaalaha xarafka N' },
      { term: 'Waraabe', original: 'Waraabe', desc: 'Tusaalaha xarafka W' },
      { term: 'Hooyo', original: 'Hooyo', desc: 'Tusaalaha xarafka H' },
      { term: 'Yaxaas', original: 'Yaxaas', desc: 'Tusaalaha xarafka Y' }
    ]
  },
  {
    name: 'Shaqal Gaab & Dheer (Vowels)',
    id: 'vowels',
    items: [
      { term: 'A', original: 'A', desc: 'Shaqal gaab A' },
      { term: 'E', original: 'E', desc: 'Shaqal gaab E' },
      { term: 'I', original: 'I', desc: 'Shaqal gaab I' },
      { term: 'O', original: 'O', desc: 'Shaqal gaab O' },
      { term: 'U', original: 'U', desc: 'Shaqal gaab U' },
      { term: 'AA', original: 'AA', desc: 'Shaqal dheer AA' },
      { term: 'EE', original: 'EE', desc: 'Shaqal dheer EE' },
      { term: 'II', original: 'II', desc: 'Shaqal dheer II' },
      { term: 'OO', original: 'OO', desc: 'Shaqal dheer OO' },
      { term: 'UU', original: 'UU', desc: 'Shaqal dheer UU' },
      { term: 'Afar', original: 'Afar', desc: 'Tusaalaha shaqal gaab A' },
      { term: 'Eber', original: 'Eber', desc: 'Tusaalaha shaqal gaab E' },
      { term: 'Il', original: 'Il', desc: 'Tusaalaha shaqal gaab I' },
      { term: 'Oday', original: 'Oday', desc: 'Tusaalaha shaqal gaab O' },
      { term: 'Ul', original: 'Ul', desc: 'Tusaalaha shaqal gaab U' },
      { term: 'Aabbe', original: 'Aabbe', desc: 'Tusaalaha shaqal dheer AA' }
    ]
  },
  {
    name: '2 Xaraf & Isku-dhafka (2-Letter Words)',
    id: 'combinations',
    items: [
      { term: 'BA', original: 'BA', desc: 'Syllable / Erayga BA' },
      { term: 'BE', original: 'BE', desc: 'Syllable / Erayga BE' },
      { term: 'BI', original: 'BI', desc: 'Syllable / Erayga BI' },
      { term: 'BO', original: 'BO', desc: 'Syllable / Erayga BO' },
      { term: 'BU', original: 'BU', desc: 'Syllable / Erayga BU' },
      { term: 'GA', original: 'GA', desc: 'Syllable / Erayga GA' },
      { term: 'GE', original: 'GE', desc: 'Syllable / Erayga GE' },
      { term: 'GI', original: 'GI', desc: 'Syllable / Erayga GI' },
      { term: 'GO', original: 'GO', desc: 'Syllable / Erayga GO' },
      { term: 'GU', original: 'GU', desc: 'Syllable / Erayga GU' },
      { term: 'LA', original: 'LA', desc: 'Syllable / Erayga LA' },
      { term: 'LE', original: 'LE', desc: 'Syllable / Erayga LE' },
      { term: 'LI', original: 'LI', desc: 'Syllable / Erayga LI' },
      { term: 'LO', original: 'LO', desc: 'Syllable / Erayga LO' },
      { term: 'LU', original: 'LU', desc: 'Syllable / Erayga LU' },
      { term: 'AB', original: 'AB', desc: 'Syllable / Erayga AB' },
      { term: 'EB', original: 'EB', desc: 'Syllable / Erayga EB' },
      { term: 'IB', original: 'IB', desc: 'Syllable / Erayga IB' },
      { term: 'OB', original: 'OB', desc: 'Syllable / Erayga OB' },
      { term: 'UB', original: 'UB', desc: 'Syllable / Erayga UB' },
      { term: 'AL', original: 'AL', desc: 'Syllable / Erayga AL' },
      { term: 'EL', original: 'EL', desc: 'Syllable / Erayga EL' },
      { term: 'IL', original: 'IL', desc: 'Syllable / Erayga IL' },
      { term: 'OL', original: 'OL', desc: 'Syllable / Erayga OL' },
      { term: 'UL', original: 'UL', desc: 'Syllable / Erayga UL' },
      { term: 'KA', original: 'KA', desc: 'Erayga labada xaraf KA' },
      { term: 'KU', original: 'KU', desc: 'Erayga labada xaraf KU' },
      { term: 'HO', original: 'HO', desc: 'Erayga labada xaraf HO' },
      { term: 'IS', original: 'IS', desc: 'Erayga labada xaraf IS' },
      { term: 'AS', original: 'AS', desc: 'Erayga labada xaraf AS' }
    ]
  },
  {
    name: '3-Xaraf ee Shaqal Dheer (3-Letter Long Vowels)',
    id: 'long_vowels',
    items: [
      { term: 'BAA', original: 'BAA', desc: 'Erayga BAA (B + AA)' },
      { term: 'GEE', original: 'GEE', desc: 'Erayga GEE (G + EE)' },
      { term: 'SII', original: 'SII', desc: 'Erayga SII (S + II)' },
      { term: 'LOO', original: 'LOO', desc: 'Erayga LOO (L + OO)' },
      { term: 'BUU', original: 'BUU', desc: 'Erayga BUU (B + UU)' },
      { term: 'AAB', original: 'AAB', desc: 'Erayga AAB (AA + B)' },
      { term: 'EEL', original: 'EEL', desc: 'Erayga EEL (EE + L)' },
      { term: 'IID', original: 'IID', desc: 'Erayga IID (II + D)' },
      { term: 'OOD', original: 'OOD', desc: 'Erayga OOD (OO + D)' },
      { term: 'UUN', original: 'UUN', desc: 'Erayga UUN (UU + N)' }
    ]
  },
  {
    name: 'Erayada kale (Common & Long Words)',
    id: 'words',
    items: [
      { term: 'CAB', original: 'CAB', desc: 'Erayga CAB' },
      { term: 'WAN', original: 'WAN', desc: 'Erayga WAN' },
      { term: 'KAB', original: 'KAB', desc: 'Erayga KAB' },
      { term: 'XID', original: 'XID', desc: 'Erayga XID' },
      { term: 'GAL', original: 'GAL', desc: 'Erayga GAL' },
      { term: 'NAL', original: 'NAL', desc: 'Erayga NAL' }
    ]
  },
  {
    name: 'Weedho Fudud (Sentences)',
    id: 'sentences',
    items: [
      { term: 'Hooyo waa macaan', original: 'Hooyo waa macaan', desc: 'Weedha: Hooyo waa macaan' },
      { term: 'Aabbe waa geesi', original: 'Aabbe waa geesi', desc: 'Weedha: Aabbe waa geesi' },
      { term: 'Geela waa weyn yahay', original: 'Geela waa weyn yahay', desc: 'Weedha: Geela waa weyn yahay' },
      { term: 'Bisaddu waa yar tahay', original: 'Bisaddu waa yar tahay', desc: 'Weedha: Bisaddu waa yar tahay' },
      { term: 'Cab caano macaan', original: 'Cab caano macaan', desc: 'Weedha: Cab caano macaan' }
    ]
  }
];

interface ParentDashboardProps {
  progress: UserProgress;
  parentSettings: ParentSettings;
  onUpdateSettings: (settings: Partial<ParentSettings>) => void;
  onClose: () => void;
  onResetProgress: () => void;
}

export default function ParentDashboard({ 
  progress, 
  parentSettings, 
  onUpdateSettings, 
  onClose,
  onResetProgress
}: ParentDashboardProps) {
  // Login / Auth State
  const [emailInput, setEmailInput] = useState<string>(parentSettings.parentEmail);
  const [pinInput, setPINInput] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'settings' | 'privacy' | 'sounds'>('analytics');
  const [reminderSaved, setReminderSaved] = useState<boolean>(false);

  // Sound Editor State
  const [soundCategory, setSoundCategory] = useState<string>('consonants');
  const [soundSearch, setSoundSearch] = useState<string>('');
  const [customPronunciations, setCustomPronunciations] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('somali_custom_speech_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [tempInputs, setTempInputs] = useState<Record<string, string>>({});
  const [successTerm, setSuccessTerm] = useState<string>('');

  // Audio recording & creator states
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [soundChangeTrigger, setSoundChangeTrigger] = useState(0);

  // Authenticate or Create Account
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@') && pinInput.length === 4) {
      onUpdateSettings({
        isLoggedIn: true,
        parentEmail: emailInput,
        pin: pinInput,
        coppaConsent: true
      });
      playSuccessChime();
    }
  };

  const handleLogout = () => {
    playPop();
    onUpdateSettings({ isLoggedIn: false });
  };

  // Trigger simulated cloud syncing
  const triggerSync = () => {
    if (!parentSettings.isLoggedIn) return;
    playPop();
    setIsSyncing(true);
    setSyncStatus('Waxaa lagu xirayaa Server-ka sugan ee Baro Afsoomaali...');
    
    setTimeout(() => {
      setSyncStatus('Xogta horumarka ayaa si ammaan ah loo rarayaa...');
      setTimeout(() => {
        setSyncStatus('Xogta waa la isku-dubbariday si guul leh!');
        setIsSyncing(false);
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        onUpdateSettings({ lastSyncTime: nowStr });
        playSuccessChime();
        setTimeout(() => setSyncStatus(''), 3000);
      }, 1200);
    }, 1000);
  };

  const handleReminderSave = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2500);
  };

  // Pre-calculate score metrics
  const quizEntries = Object.entries(progress.quizScores);
  const averageScore = quizEntries.length > 0 
    ? Math.round(quizEntries.reduce((acc, [_, score]) => acc + score, 0) / quizEntries.length)
    : 0;

  // Custom SVG Bar Chart calculation
  const chartData = [
    { label: 'Shibane', score: progress.quizScores['l1_consonants'] || 0, color: '#f59e0b' },
    { label: 'Shaqal', score: progress.quizScores['l2_vowels'] || 0, color: '#6366f1' },
    { label: 'Labinlaab', score: progress.quizScores['l2_double_consonants'] || 0, color: '#8b5cf6' },
    { label: 'Isku-dhafka', score: progress.quizScores['l3_combinations'] || 0, color: '#10b981' },
    { label: '3-Xaraf', score: progress.quizScores['l4_3_letter_long_vowels'] || 0, color: '#f97316' },
    { label: 'Dhaadheer', score: progress.quizScores['l5_long_words'] || 0, color: '#ec4899' },
    { label: 'Weedhaha', score: progress.quizScores['l6_sentences'] || 0, color: '#f43f5e' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-0 select-none">
      {/* Header bar inside Parent Dashboard */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600 animate-spin-slow" />
          <h2 className="text-base font-bold text-slate-800">Bogga Waalidiinta</h2>
        </div>
        <button
          onClick={onClose}
          id="btn-close-parents"
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors"
        >
          Ku laabo Bogga Hore
        </button>
      </div>

      {!parentSettings.isLoggedIn ? (
        /* Secure Parental Login Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-sm mx-auto">
          <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 text-center">Habeeynta Koontada Waalidka</h3>
          <p className="text-xs text-slate-500 text-center mb-5 leading-relaxed">
            Abuur borofayl waalid oo sugan. Isku-dubbarid horumarka ilmaha ee qalabka kala duwan oo dib u eeg xogta waxbarashada.
          </p>

          <form onSubmit={handleAuth} className="w-full flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Iimaylka Waalidka
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="hooyo_macaan@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Deji PIN Amni oo 4 God ah
              </label>
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPINInput(e.target.value.replace(/\D/g, ''))}
                placeholder="● ● ● ●"
                className="w-full text-center tracking-[0.4em] py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-hidden font-bold"
                required
              />
            </div>

            <div className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
              <Shield className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 leading-normal">
                <strong>Oggolaanshaha Amniga:</strong> Markaad koonto samaysato, waxaad oggolaanaysaa in la kaydiyo horumarka ilmahaaga (ma jiraan xayeysiis, xog-wadaag, waana 100% ammaan).
              </p>
            </div>

            <button
              type="submit"
              id="btn-parent-register"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm"
            >
              Gali / Sameyso Koonto
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Dashboard Tabs */
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Tabs Bar */}
          <div className="bg-white border-b border-slate-200 px-6 flex justify-around text-xs font-bold text-slate-500 shrink-0 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => { playPop(); setActiveTab('analytics'); }}
              id="tab-analytics"
              className={`py-3 border-b-2 px-3 transition-all ${activeTab === 'analytics' ? 'border-indigo-600 text-indigo-600 font-black' : 'border-transparent hover:text-slate-700'}`}
            >
              <span className="flex items-center gap-1"><BarChart2 className="w-3.5 h-3.5" /> Warbixinta</span>
            </button>
            <button
              onClick={() => { playPop(); setActiveTab('sounds'); }}
              id="tab-sounds"
              className={`py-3 border-b-2 px-3 transition-all ${activeTab === 'sounds' ? 'border-indigo-600 text-indigo-600 font-black' : 'border-transparent hover:text-slate-700'}`}
            >
              <span className="flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Dhawaaqyada</span>
            </button>
            <button
              onClick={() => { playPop(); setActiveTab('settings'); }}
              id="tab-settings"
              className={`py-3 border-b-2 px-3 transition-all ${activeTab === 'settings' ? 'border-indigo-600 text-indigo-600 font-black' : 'border-transparent hover:text-slate-700'}`}
            >
              <span className="flex items-center gap-1"><Bell className="w-3.5 h-3.5" /> Isku-dubbaridka</span>
            </button>
            <button
              onClick={() => { playPop(); setActiveTab('privacy'); }}
              id="tab-privacy"
              className={`py-3 border-b-2 px-3 transition-all ${activeTab === 'privacy' ? 'border-indigo-600 text-indigo-600 font-black' : 'border-transparent hover:text-slate-700'}`}
            >
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Asturnaanta</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeTab === 'analytics' && (
              /* TAB 1: ANALYTICS WITH GRAPH */
              <div className="space-y-4">
                {/* Micro Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Xiddigaha Guud</span>
                    <span className="text-lg font-bold text-amber-500">⭐ {progress.stars}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Dadaalka Joogtada ah</span>
                    <span className="text-lg font-bold text-orange-500">🔥 {progress.streak} Maalmood</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Casharrada la Dhammeeyey</span>
                    <span className="text-lg font-bold text-teal-600">📚 {progress.completedLessons.length} / 6</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Natiijada Imtixaannada</span>
                    <span className="text-lg font-bold text-indigo-600">🎯 {averageScore}%</span>
                  </div>
                </div>

                {/* Custom Interactive SVG Graph */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">Natiijada Imtixaannada ee Cashar kasta</h4>
                  
                  <div className="relative h-44 w-full flex items-end justify-between border-b border-slate-200 pb-2">
                    {/* Y Axis Guide lines */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-slate-100" />
                    <div className="absolute inset-x-0 top-1/3 h-[1px] bg-slate-100" />
                    <div className="absolute inset-x-0 top-2/3 h-[1px] bg-slate-100" />
                    
                    {chartData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        {/* Hover Score Badge */}
                        <span className="text-[10px] font-bold text-slate-600 opacity-90 transition-all mb-1 group-hover:scale-110">
                          {item.score > 0 ? `${item.score}%` : '0%'}
                        </span>
                        {/* Interactive Bar */}
                        <div 
                          className="w-8 rounded-t-md transition-all duration-700 group-hover:brightness-95" 
                          style={{ 
                            height: `${Math.max(item.score * 1.2, 4)}px`, 
                            backgroundColor: item.score > 0 ? item.color : '#e2e8f0' 
                          }}
                        />
                        {/* X Axis Label */}
                        <span className="text-[9px] font-bold text-slate-400 mt-2 text-center truncate w-full px-1">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Study Log */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">Diiwaanka Casharrada</h4>
                  <div className="space-y-2">
                    {progress.completedLessons.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">Ma jiraan casharro weli la dhammeeyey. Aan baranno!</p>
                    ) : (
                      progress.completedLessons.map((lesId) => (
                        <div key={lesId} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="font-semibold text-slate-700 capitalize">
                              {lesId === 'l1_consonants' ? 'Shibanayaal' :
                               lesId === 'l2_vowels' ? 'Shaqal Gaab & Shaqal Dheer' :
                               lesId === 'l2_double_consonants' ? 'Xarfaha Labinlaabma' :
                               lesId === 'l3_combinations' ? '2 Xaraf & Isku-dhafka' :
                               lesId === 'l4_3_letter_long_vowels' ? '3 Xaraf (Shaqal Dheer)' :
                               lesId === 'l5_long_words' ? 'Erayada Dhaadheer' : 'Dhisidda Weedhaha'}
                            </span>
                          </div>
                          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold text-[10px]">DHAMMEEYEY</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sounds' && (
              /* TAB 4: SOUND/PRONUNCIATION EDITOR FOR ALL LESSONS */
              <div className="space-y-4">
                <div className="bg-indigo-900 text-white p-5 rounded-2xl shadow-md">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
                    <h4 className="text-sm font-black uppercase tracking-wider">
                      Duubista & Habaynta Codadka
                    </h4>
                  </div>
                  <p className="text-[11px] text-indigo-100 mt-1 leading-relaxed">
                    Halkaan waxaad kaga beddeli kartaa sida loo dhawaaqo xaraf kasta, eray, ama weedh ku dhex jirta casharrada adoo isticmaalaya duubid cod ah ama higgaad gaar ah.
                  </p>
                </div>

                {/* ROLE / CREATOR TOGGLE */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-2xs">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5 text-indigo-600" />
                        Doorka Tifaftiraha (Editing Mode)
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Dooro <strong>Waalid</strong> si aad u duubto codkaaga (user custom), ama <strong>Hal-abuure</strong> si aad u samayso codadka caadiga ah ee cashar kasta (lesson defaults).
                      </p>
                    </div>

                    <div className="flex bg-slate-200/80 p-1 rounded-xl self-start md:self-center shrink-0">
                      <button
                        onClick={() => { playPop(); setIsCreatorMode(false); }}
                        className={`flex items-center gap-1.5 text-[11px] font-black px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                          !isCreatorMode 
                            ? 'bg-emerald-600 text-white shadow-2xs' 
                            : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" /> Waalidka (User Custom)
                      </button>
                      <button
                        onClick={() => { playPop(); setIsCreatorMode(true); }}
                        className={`flex items-center gap-1.5 text-[11px] font-black px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                          isCreatorMode 
                            ? 'bg-rose-600 text-white shadow-2xs' 
                            : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        <Crown className="w-3.5 h-3.5" /> Hal-abuure (Creator Default)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
                  {/* Category select dropdown */}
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Casharka / Qaybta
                    </label>
                    <select
                      value={soundCategory}
                      onChange={(e) => { playPop(); setSoundCategory(e.target.value); }}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:border-indigo-500 focus:outline-hidden font-bold text-slate-700"
                    >
                      {SPEAKABLE_GROUPS.map((grp) => {
                        let prefix = '';
                        if (grp.id === 'consonants') prefix = 'CASHARKA 1AAD: ';
                        if (grp.id === 'vowels') prefix = 'CASHARKA 2AAD: ';
                        if (grp.id === 'combinations') prefix = 'CASHARKA 3AAD: ';
                        if (grp.id === 'long_vowels') prefix = 'CASHARKA 4AAD: ';
                        if (grp.id === 'words') prefix = 'CASHARKA 5AAD: ';
                        if (grp.id === 'sentences') prefix = 'CASHARKA 6AAD: ';
                        return (
                          <option key={grp.id} value={grp.id}>
                            {prefix}{grp.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Search query input */}
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Raadi Eray / Xaraf
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={soundSearch}
                        onChange={(e) => setSoundSearch(e.target.value)}
                        placeholder="Tusaale: Bisad, B, Hooyo..."
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-hidden font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Sound Items List */}
                <div className="space-y-3">
                  {(() => {
                    const activeGroup = SPEAKABLE_GROUPS.find(g => g.id === soundCategory);
                    if (!activeGroup) return null;

                    const filteredItems = activeGroup.items.filter(item => 
                      item.term.toLowerCase().includes(soundSearch.toLowerCase()) ||
                      item.desc.toLowerCase().includes(soundSearch.toLowerCase())
                    );

                    if (filteredItems.length === 0) {
                      return (
                        <div className="bg-white p-8 text-center rounded-xl border border-slate-200 shadow-xs">
                          <p className="text-xs text-slate-400 italic">Ma jiraan dhawaaqyo ku habboon baaritaankaaga.</p>
                        </div>
                      );
                    }

                    return filteredItems.map((item) => {
                      const currentVal = customPronunciations[item.term] || customPronunciations[item.term.toUpperCase()] || '';
                      const defaultVal = SOMALI_SPEECH_MAP[item.term] || SOMALI_SPEECH_MAP[item.term.toUpperCase()] || item.term;
                      const hasCustom = !!currentVal;

                      // Check detailed recording and phonetic status
                      const { hasUser, hasCreator, hasPhonetic } = getSoundStatus(item.term);

                      const handleSave = (termKey: string) => {
                        const val = (tempInputs[termKey] || '').trim();
                        if (!val) return;

                        playPop();
                        const updated = { ...customPronunciations, [termKey]: val };
                        setCustomPronunciations(updated);
                        localStorage.setItem('somali_custom_speech_map', JSON.stringify(updated));
                        setSuccessTerm(termKey);
                        setTimeout(() => setSuccessTerm(''), 2000);
                        speakSomali(termKey);
                      };

                      const handleReset = (termKey: string) => {
                        playPop();
                        const updated = { ...customPronunciations };
                        delete updated[termKey];
                        delete updated[termKey.toUpperCase()];
                        setCustomPronunciations(updated);
                        localStorage.setItem('somali_custom_speech_map', JSON.stringify(updated));
                        setTempInputs(prev => {
                          const next = { ...prev };
                          delete next[termKey];
                          return next;
                        });
                        speakSomali(termKey);
                      };

                      return (
                        <div 
                          key={item.term} 
                          className={`bg-white p-4 rounded-2xl border transition-all ${
                            hasUser ? 'border-emerald-200 bg-emerald-50/10' : 
                            hasCreator ? 'border-rose-200 bg-rose-50/5' :
                            hasCustom ? 'border-amber-200 bg-amber-50/10' : 'border-slate-200'
                          } shadow-2xs space-y-3.5`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg font-mono">
                                  {item.term}
                                </span>
                                <span className="text-xs font-medium text-slate-500 italic">
                                  {item.desc}
                                </span>
                              </div>

                              {/* STATUS INDICATORS */}
                              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                {hasUser && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                                    <Mic className="w-2.5 h-2.5" /> Cod Waalid
                                  </span>
                                )}
                                {hasCreator && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-full uppercase border border-rose-200">
                                    <Crown className="w-2.5 h-2.5" /> Default Creator
                                  </span>
                                )}
                                {hasPhonetic && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded-full uppercase border border-indigo-200">
                                    📝 Higgaad Custom
                                  </span>
                                )}
                                {!hasUser && !hasCreator && !hasPhonetic && (
                                  <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full uppercase">
                                    🔊 Codka System-ka
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                              <button
                                onClick={() => {
                                  playPop();
                                  setSelectedWord(item.term);
                                  setIsAudioModalOpen(true);
                                }}
                                className="flex items-center gap-1 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                                title="Wax ka beddel codka ama higgaadda"
                              >
                                <Mic className="w-3.5 h-3.5" /> Tifaftir Codka
                              </button>

                              <button
                                onClick={() => speakSomali(item.term)}
                                className="flex items-center gap-1 text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                                title="Dhagayso"
                              >
                                <Play className="w-3 h-3 fill-white" /> Dhegeyso
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2.5 pt-1 border-t border-slate-100">
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder={`Default: "${defaultVal}" (Representation for speech engine)`}
                                value={tempInputs[item.term] !== undefined ? tempInputs[item.term] : currentVal}
                                onChange={(e) => setTempInputs(prev => ({ ...prev, [item.term]: e.target.value }))}
                                className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:border-indigo-500 focus:outline-hidden font-mono bg-slate-50 font-bold"
                              />
                            </div>

                            <div className="flex gap-2 justify-end shrink-0">
                              <button
                                onClick={() => handleSave(item.term)}
                                disabled={(tempInputs[item.term] || '').trim() === '' && !currentVal}
                                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs py-2 px-3.5 rounded-lg transition-colors cursor-pointer"
                              >
                                <Save className="w-3.5 h-3.5" /> Kaydi
                              </button>
                              
                              {hasCustom && (
                                <button
                                  onClick={() => handleReset(item.term)}
                                  className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs py-2 px-2.5 rounded-lg transition-colors cursor-pointer border border-rose-200"
                                  title="Dib u deji dhawaaqii hore"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" /> Deji
                                </button>
                              )}
                            </div>
                          </div>

                          {successTerm === item.term && (
                            <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50/70 p-1.5 rounded-md text-center border border-emerald-100 animate-fade-in">
                              ✓ Dhawaaqa "{item.term}" waa la kaydiyey waana la cusboonaysiiyey!
                            </p>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              /* TAB 2: REMINDERS AND CLOUD SYNC */
              <div className="space-y-4">
                {/* Cloud Sync Section */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-5 h-5 text-indigo-600 animate-pulse" />
                      <h4 className="text-xs font-bold text-slate-700 uppercase">Heerka Isku-dubbaridka</h4>
                    </div>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase">
                      Koontada waa ku xirantahay
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Ugu isku-dubbarid casharrada si ammaan ah qalabka kala duwan ee guriga ama dugsiga.
                  </p>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600 font-mono">
                    <div>
                      <div>Iimaylka ku xiran: <strong>{parentSettings.parentEmail}</strong></div>
                      <div className="mt-1">Isku-dubbaridkii u dambeeyey: {parentSettings.lastSyncTime ? parentSettings.lastSyncTime : 'Weli'}</div>
                    </div>
                    <button
                      onClick={triggerSync}
                      disabled={isSyncing}
                      id="btn-sync-now"
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-3 rounded-md transition-colors disabled:bg-indigo-400"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      Isku-dubbarid
                    </button>
                  </div>

                  {syncStatus && (
                    <p className="text-[10px] text-teal-600 font-bold text-center bg-teal-50 py-1.5 rounded-md animate-pulse border border-teal-100">
                      {syncStatus}
                    </p>
                  )}
                </div>

                {/* Notifications Scheduler */}
                <form onSubmit={handleReminderSave} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xs font-bold text-slate-700 uppercase">Ogeysiiska Xusuusinta Barashada</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={parentSettings.notificationsEnabled}
                        onChange={(e) => onUpdateSettings({ notificationsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <p className="text-xs text-slate-500">
                    U deji ogeysiisyo toos ah qalabka ilmahaaga si ay u ilaashadaan dadaalkooda joogtada ah!
                  </p>

                  {parentSettings.notificationsEnabled && (
                    <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-600 font-semibold">Waqtiga Xusuusinta:</span>
                      <input 
                        type="time" 
                        value={parentSettings.notificationTime}
                        onChange={(e) => onUpdateSettings({ notificationTime: e.target.value })}
                        className="bg-white border border-slate-200 rounded-sm px-2 py-1 text-xs font-bold text-slate-700 font-mono"
                      />
                      <button
                        type="submit"
                        id="btn-save-reminder"
                        className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs py-1 px-3.5 rounded-md transition-colors"
                      >
                        Kaydi Waqtiga
                      </button>
                    </div>
                  )}

                  {reminderSaved && (
                    <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 text-center py-1 rounded-md">
                      ✓ Xusuusiyaha waa la kaydiyey si guul leh!
                    </p>
                  )}
                </form>

                {/* Reset Progress Panel */}
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 shadow-xs flex flex-col gap-2">
                  <h5 className="text-xs font-bold text-rose-700">Aagga Khatarta</h5>
                  <p className="text-[11px] text-rose-600">
                    Tani waxay gabi ahaanba tirtiri doontaa xiddigaha ilmaha, dadaalka, iyo biladaha. Tallaabadan dib looma soo celin karo.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("Ma hubtaa inaad rabto inaad tirtirto dhammaan horumarka ilmahaaga?")) {
                        onResetProgress();
                      }
                    }}
                    id="btn-reset-progress"
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-4 rounded-lg self-start transition-colors"
                  >
                    Dib u deji Horumarka Ardayga
                  </button>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  id="btn-parent-logout"
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all"
                >
                  Ka bax Koontada Waalidka
                </button>
              </div>
            )}

            {activeTab === 'privacy' && (
              /* TAB 3: COPPA PRIVACY STATEMENT */
              <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Shield className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <h4 className="text-sm font-bold text-slate-800">Badbaadada & Asturnaanta Carruurta</h4>
                </div>

                <div className="text-xs text-slate-600 space-y-3 leading-relaxed font-sans">
                  <p>
                    Codsigan wuxuu gabi ahaanba u hoggaansamaa shuruudaha badbaadada asturnaanta carruurta (COPPA). Waxaan u tixgelineynaa asturnaanta carruurta inay tahay muhiimaddayada ugu horreysa.
                  </p>

                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Eber Ururinta Xogta Shakhsiga ah:</strong> Ma weydiinno carruurta magacyo, iimaylo, lambaro taleefan, ama meesha ay joogaan.
                    </li>
                    <li>
                      <strong>Ma Jiraan Xayeysiisyo Dibadda Ah:</strong> Ma jiraan xayeysiisyo, kukisyo, ama xog raadraac oo dibadda ah gudaha app-kan.
                    </li>
                    <li>
                      <strong>Kaydka Qalabka dhexdiisa:</strong> Horumarka ardayga (xiddigaha, dadaalka joogtada ah) waxaa lagu kaydiyaa qalabka dhexdiisa si ammaan ah.
                    </li>
                    <li>
                      <strong>Xakamaynta Waalidka:</strong> Koontooyinka isku-dubbaridan waxay u baahan yihiin iimayl sugan iyo PIN amni, oo kaliya laga geli karo xaqiijinta waalidka.
                    </li>
                    <li>
                      <strong>Mawduucyo Dhaqameed oo Sugan:</strong> Mawduucyada iyo tusaalooyinka waxay u hoggaansamaan halbeegga dhaqanka iyo barashada carruurta Soomaaliyeed.
                    </li>
                  </ul>

                  <p className="text-[10px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-400 text-center font-mono uppercase">
                    Waxaa loo qaabeeyey si kalgacal leh oo loogu talagalay carruurta Soomaaliyeed meel kasta oo ay joogaan.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio Editor Modal */}
      <AudioEditorModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        word={selectedWord}
        isCreatorMode={isCreatorMode}
        onSave={() => {
          setSoundChangeTrigger(prev => prev + 1);
          try {
            const saved = localStorage.getItem('somali_custom_speech_map');
            setCustomPronunciations(saved ? JSON.parse(saved) : {});
          } catch (e) {}
        }}
      />
    </div>
  );
}
