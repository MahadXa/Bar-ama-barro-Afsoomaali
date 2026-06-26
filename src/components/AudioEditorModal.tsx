import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Mic, Square, Play, RotateCcw, Check, Trash2, Volume2, Info, Sparkles 
} from 'lucide-react';
import { 
  saveUserAudio, deleteUserAudio, 
  saveCreatorDefaultAudio, deleteCreatorDefaultAudio, 
  getSoundStatus, speakSomali 
} from '../utils/audio';

interface AudioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  isCreatorMode?: boolean; // If true, saves as default lesson audio
  onSave?: () => void;
}

export function AudioEditorModal({ 
  isOpen, 
  onClose, 
  word, 
  isCreatorMode = false,
  onSave 
}: AudioEditorModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [phoneticInput, setPhoneticInput] = useState('');
  
  // Status check state
  const [status, setStatus] = useState({ hasUser: false, hasCreator: false, hasPhonetic: false });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Load current statuses & existing phonetic custom text when word changes
  useEffect(() => {
    if (isOpen && word) {
      updateStatuses();
      
      // Load current phonetic override if any
      try {
        const savedPhonetics = localStorage.getItem('somali_custom_speech_map');
        if (savedPhonetics) {
          const map = JSON.parse(savedPhonetics);
          setPhoneticInput(map[word.trim().toUpperCase()] || map[word.trim()] || '');
        } else {
          setPhoneticInput('');
        }
      } catch (e) {
        setPhoneticInput('');
      }

      // Reset recording state
      setAudioUrl(null);
      setAudioBlob(null);
      setIsRecording(false);
      setRecordingDuration(0);
    }
  }, [isOpen, word]);

  const updateStatuses = () => {
    setStatus(getSoundStatus(word));
  };

  // Timer effect for recording duration
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  if (!isOpen) return null;

  // Recording Controls
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        // Clean up tracks
        stream.getTracks().forEach(track => track.stop());
      };

      setRecordingDuration(0);
      setIsRecording(true);
      mediaRecorder.start();
    } catch (err) {
      console.error('In-app media recording is not available:', err);
      alert('Ma suurtagalin in la furo makarafoonka. Fadlan hubi oggolaanshaha barowsarkaaga.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(e => console.warn('Audio playback failed:', e));
    }
  };

  // Save Audio (Base64)
  const saveRecordedAudio = () => {
    if (!audioBlob) return;

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      if (isCreatorMode) {
        saveCreatorDefaultAudio(word, base64data);
      } else {
        saveUserAudio(word, base64data);
      }
      updateStatuses();
      if (onSave) onSave();
      // Brief success buzz/play
      speakSomali(word);
    };
  };

  // Clear Audio Recording
  const clearAudio = () => {
    if (isCreatorMode) {
      deleteCreatorDefaultAudio(word);
    } else {
      deleteUserAudio(word);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    updateStatuses();
    if (onSave) onSave();
  };

  // Phonetic TTS Save
  const savePhoneticOverride = () => {
    try {
      const saved = localStorage.getItem('somali_custom_speech_map') || '{}';
      const map = JSON.parse(saved);
      const key = word.trim().toUpperCase();
      if (phoneticInput.trim()) {
        map[key] = phoneticInput.trim();
        map[word.trim()] = phoneticInput.trim();
      } else {
        delete map[key];
        delete map[word.trim()];
      }
      localStorage.setItem('somali_custom_speech_map', JSON.stringify(map));
      updateStatuses();
      if (onSave) onSave();
      // Test play immediately
      speakSomali(word);
    } catch (e) {
      console.error('Error saving speech override:', e);
    }
  };

  // Format recording timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const hasAudioRecording = isCreatorMode ? status.hasCreator : status.hasUser;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isCreatorMode 
                ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              <Sparkles className="w-2.5 h-2.5" />
              {isCreatorMode ? 'Habaynta Hal-abuuraha (Creator Defaults)' : 'Tifaftiraha Codka Waalidka (User Custom)'}
            </span>
            <h3 className="text-base font-black text-slate-800 mt-1 flex items-center gap-2">
              Tifaftiraha Dhawaqa: <span className="text-emerald-600 font-mono">"{word}"</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Section 1: Microphone recording */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-3.5">
            <div className="flex items-start gap-2.5">
              <Mic className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-800">Duub Cod Toos ah (Live Voice Recording)</h4>
                <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                  Duub codkaaga adoo ku dhawaaqaya eraygan si canugga u maqlo codkaaga gaarka ah mar kasta oo uu gujiyo.
                </p>
              </div>
            </div>

            {/* Visualizer and duration display */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 flex flex-col items-center justify-center space-y-2.5 shadow-2xs">
              {isRecording ? (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-rose-600">DUUBIDDA: {formatTime(recordingDuration)}</span>
                </div>
              ) : audioUrl ? (
                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Codkii waa diyaar!
                </div>
              ) : hasAudioRecording ? (
                <div className="text-xs font-bold text-teal-700 flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-lg">
                  🎵 Cod horay loo duubay ayaa kaydsan!
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium">Ma jiro cod diyaar ah. Riix badanka hoose si aad u duubto.</span>
              )}

              {/* Action Buttons for recorder */}
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3.5 transition-all hover:scale-105 shadow-md flex items-center justify-center cursor-pointer"
                    title="Start Recording"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="bg-rose-600 hover:bg-rose-700 text-white rounded-full p-3.5 transition-all hover:scale-105 shadow-md flex items-center justify-center cursor-pointer"
                    title="Stop Recording"
                  >
                    <Square className="w-5 h-5" />
                  </button>
                )}

                {(audioUrl || hasAudioRecording) && (
                  <>
                    <button
                      onClick={audioUrl ? playRecordedAudio : () => speakSomali(word)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full p-3 transition-colors cursor-pointer"
                      title="Play Audio"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={clearAudio}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full p-3 transition-colors cursor-pointer"
                      title="Delete Recorded Audio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Save New Recording Button */}
              {audioBlob && !isRecording && (
                <button
                  onClick={saveRecordedAudio}
                  className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Check className="w-4 h-4" /> Keydi Codkan Cusub
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Phonetic English TTS override */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3.5">
            <div className="flex items-start gap-2.5">
              <Volume2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-800">Higgaadda Dhawaqa TTS (Phonetics Engine)</h4>
                <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                  Qor higgaad Ingiriis ah oo dhawaqa saxda ah ee ereyga ku dhow si barowsharku ugu dhawaaqo si sax ah. (Tusaale 'Caano' loo qoro 'Ah-noh').
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneticInput}
                  onChange={(e) => setPhoneticInput(e.target.value)}
                  placeholder="Tusaale: Ah-noh"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
                <button
                  onClick={() => {
                    // Temporarily speak using current input value
                    if (!('speechSynthesis' in window)) return;
                    window.speechSynthesis.cancel();
                    const textToSpeak = phoneticInput.trim() || word;
                    const utterance = new SpeechSynthesisUtterance(textToSpeak);
                    utterance.rate = 0.85;
                    utterance.pitch = 1.15;
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 rounded-xl border border-indigo-100 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                  title="Tijaabi Dhawaqa"
                >
                  <Play className="w-3.5 h-3.5" /> Tijaabi
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={savePhoneticOverride}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Keydi Higgaadda
                </button>
                {status.hasPhonetic && (
                  <button
                    onClick={() => {
                      setPhoneticInput('');
                      // Clear in saved speech map
                      try {
                        const saved = localStorage.getItem('somali_custom_speech_map') || '{}';
                        const map = JSON.parse(saved);
                        delete map[word.trim().toUpperCase()];
                        delete map[word.trim()];
                        localStorage.setItem('somali_custom_speech_map', JSON.stringify(map));
                        updateStatuses();
                        if (onSave) onSave();
                      } catch (e) {}
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-2 rounded-xl border border-rose-100 transition-colors cursor-pointer"
                    title="Tirtir Higgaadda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info footer */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 leading-normal">
              <strong>Precedence:</strong> Haddii aad cod toos ah duubto, waxaa la maqli doonaa codkaaga. Haddii cod la duubay uusan jirin, barowsharka ayaa akhriyi doona higgaadda kor ku qoran.
            </p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Xir Tifaftiraha
          </button>
        </div>

      </div>
    </div>
  );
}
