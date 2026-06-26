/**
 * Interactive Audio Synthesizer and Text-to-Speech Engine
 * Generates real-time sound effects and phonetic pronunciation using Web Audio API and Speech Synthesis.
 * @license Apache-2.0
 */

// Safe AudioContext loader
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a bubbly pop sound, ideal for clicking on letter bubbles.
 */
export function playPop() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Bubbly pitch swipe up
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.warn('Web Audio Pop failed:', e);
  }
}

/**
 * Plays a sparkly success chime for matching letters or passing quizzes.
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major arpeggio
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.06);

      gain.gain.setValueAtTime(0.1, now + index * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.06);
      osc.stop(now + index * 0.06 + 0.34);
    });
  } catch (e) {
    console.warn('Success chime failed:', e);
  }
}

/**
 * Plays a gentle level up trumpet sound for milestones or badge unlocks.
 */
export function playLevelUpSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [349.23, 440.00, 523.25, 698.46]; // F4, A4, C5, F5
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0.08, now + index * 0.08);
      gain.gain.setValueAtTime(0.08, now + index * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);
      
      // Filter to make it warmer
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.4);
    });
  } catch (e) {
    console.warn('Level up sound failed:', e);
  }
}

/**
 * Plays a soft, non-intrusive buzz/boop for incorrect matching.
 */
export function playFailureBuzz() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.warn('Failure buzz failed:', e);
  }
}

/**
 * Phonetically map Somali consonants and words to sound optimal on default Speech Synthesis voices.
 * Somali orthography is highly phonetic, but standard English speech synthesizers mispronounce them.
 * We can map letters and key words to phonetic approximations or use Italian/Spanish voices
 * which handle Somali vowel values (a, e, i, o, u) and consonants much more natively.
 */
export const SOMALI_SPEECH_MAP: Record<string, string> = {
  // Consonant Phonetics
  'B': 'Baa',
  'T': 'Taa',
  'J': 'Jeem',
  'X': 'Haa', // Deep pharyngeal throat h
  'KH': 'Khaa', // Rasping h
  'D': 'Daal',
  'R': 'Raa',
  'S': 'Siin',
  'SH': 'Sheen',
  'DH': 'Dhaaf', // Retroflex d
  'C': 'Ayn', // Voiced throat Ayn
  'G': 'Gaaf',
  'F': 'Faa',
  'Q': 'Qaaf',
  'K': 'Kaaf',
  'L': 'Laam',
  'M': 'Meem',
  'N': 'Noon',
  'W': 'Wow',
  'H': 'Haa',
  'Y': 'Yaa',

  // Word pronunciations mapped for English engines to sound correct
  'Bisad': 'Bee-sahd',
  'Tufaax': 'Too-faah',
  'Jiir': 'Jeer',
  'Xiddig': 'Hid-dig',
  'Khudaar': 'Hoo-daahr',
  'Durbaan': 'Door-baahn',
  'Rati': 'Rah-tee',
  'Saacad': 'Saah-ahd',
  'Shabeel': 'Shah-beel',
  'Dhiil': 'Deel',
  'Caano': 'Ah-noh',
  'Geel': 'Gehl',
  'Faras': 'Fah-rahs',
  'Qorrax': 'Kor-rah',
  'Kab': 'Kahb',
  'Libaax': 'Lee-baah',
  'Moos': 'Mohs',
  'Nal': 'Nahl',
  'Waraabe': 'Wah-raah-beh',
  'Hooyo': 'Hoh-yoh',
  'Yaxaas': 'Yah-haahs',

  // Syllables
  'BA': 'Bah', 'BE': 'Beh', 'BI': 'Bee', 'BO': 'Boh', 'BU': 'Boo',
  'GA': 'Gah', 'GE': 'Geh', 'GI': 'Gee', 'GO': 'Goh', 'GU': 'Goo',
  'LA': 'Lah', 'LE': 'Leh', 'LI': 'Lee', 'LO': 'Loh', 'LU': 'Loo',
  'AB': 'Ahb', 'EB': 'Ehb', 'IB': 'Eeb', 'OB': 'Ohb', 'UB': 'Oob',
  'AL': 'Ahl', 'EL': 'Ehl', 'IL': 'Eel', 'OL': 'Ohl', 'UL': 'Ool',

  // Sentences
  'Hooyo waa macaan': 'Hoh-yoh wah mah-ahn',
  'Aabbe waa geesi': 'Aahb-beh wah geh-see',
  'Geela waa weyn yahay': 'Geh-lah wah weyn yah-hay',
  'Bisaddu waa yar tahay': 'Bee-sahd-doo wah yahr tah-hay',
  'Cab caano macaan': 'Ahb ah-noh mah-ahn',

  // Double Consonants & Words
  'BB': 'B-da Labanlaaban',
  'DD': 'D-da Labanlaaban',
  'RR': 'R-ta Labanlaaban',
  'GG': 'G-da Labanlaaban',
  'LL': 'L-ta Labanlaaban',
  'MM': 'M-ta Labanlaaban',
  'NN': 'N-ta Labanlaaban',
  'SADDEX': 'Sahd-dekh',
  'BARRE': 'Bahr-reh',
  'DEGGAN': 'Dehg-gahn',
  'KALLUUN': 'Kahl-loon',
  'AAMMUS': 'Aahm-moos',
  'XANNAANO': 'Hahn-naah-noh'
};

/**
 * Speaks text out loud with custom phonetics or user/creator-recorded audio.
 * Plays user-recorded audio first, then creator-defined default sounds, then custom/system phonetics TTS.
 */
export function speakSomali(text: string) {
  const cleanText = text.trim();
  const upperText = cleanText.toUpperCase();

  // 1. Check for User Custom Recording
  try {
    const userAudios = localStorage.getItem('somali_custom_audio_blobs');
    if (userAudios) {
      const audioMap = JSON.parse(userAudios);
      const audioDataUrl = audioMap[upperText] || audioMap[cleanText];
      if (audioDataUrl) {
        const audio = new Audio(audioDataUrl);
        audio.play().catch(err => {
          console.warn('Failed to play user custom audio, falling back:', err);
          playTTS(text);
        });
        return;
      }
    }
  } catch (e) {
    console.error('Error parsing user custom audio:', e);
  }

  // 2. Check for Creator Default Recording
  try {
    const creatorAudios = localStorage.getItem('somali_creator_default_sounds');
    if (creatorAudios) {
      const audioMap = JSON.parse(creatorAudios);
      const audioDataUrl = audioMap[upperText] || audioMap[cleanText];
      if (audioDataUrl) {
        const audio = new Audio(audioDataUrl);
        audio.play().catch(err => {
          console.warn('Failed to play creator default audio, falling back:', err);
          playTTS(text);
        });
        return;
      }
    }
  } catch (e) {
    console.error('Error parsing creator default audio:', e);
  }

  // 3. Fallback to TTS (Text-to-Speech)
  playTTS(text);
}

/**
 * Dynamically compiles a Somali word into phonetic English representation
 * for standard fallback English voices, to prevent raw English spelling sounds (e.g. A as "ay", E as "ee").
 */
export function getSomaliPhoneticFallback(text: string): string {
  const clean = text.trim().toUpperCase();
  
  // 1. Direct static mappings
  if (SOMALI_SPEECH_MAP[clean]) return SOMALI_SPEECH_MAP[clean];
  if (SOMALI_SPEECH_MAP[text.trim()]) return SOMALI_SPEECH_MAP[text.trim()];

  // 2. Decode simple syllable blends (e.g. BA, BAA, AB, AAB, etc.)
  const consonants = ['KH', 'SH', 'DH', 'B', 'T', 'J', 'X', 'D', 'R', 'S', 'C', 'G', 'F', 'Q', 'K', 'L', 'M', 'N', 'W', 'H', 'Y'];
  const longVowels = ['AA', 'EE', 'II', 'OO', 'UU'];
  const shortVowels = ['A', 'E', 'I', 'O', 'U'];

  // Match Consonant at start
  let cons = '';
  for (const c of consonants) {
    if (clean.startsWith(c)) {
      cons = c;
      break;
    }
  }

  const consEngMap: Record<string, string> = {
    'B': 'b', 'T': 't', 'J': 'j', 'X': 'h', 'KH': 'h', 'D': 'd', 'R': 'r', 'S': 's',
    'SH': 'sh', 'DH': 'd', 'C': 'ah', 'G': 'g', 'F': 'f', 'Q': 'k', 'K': 'k', 'L': 'l',
    'M': 'm', 'N': 'n', 'W': 'w', 'H': 'h', 'Y': 'y'
  };

  const vowelEngMap: Record<string, string> = {
    'A': 'ah', 'E': 'eh', 'I': 'ee', 'O': 'oh', 'U': 'oo',
    'AA': 'aah', 'EE': 'ey', 'II': 'ee', 'OO': 'oh', 'UU': 'oo'
  };

  if (cons) {
    const remaining = clean.slice(cons.length);
    if (longVowels.includes(remaining)) {
      return (consEngMap[cons] || cons.toLowerCase()) + (vowelEngMap[remaining] || 'ee');
    }
    if (shortVowels.includes(remaining)) {
      return (consEngMap[cons] || cons.toLowerCase()) + (vowelEngMap[remaining] || 'eh');
    }
  }

  // Match Vowel at start
  let vow = '';
  for (const v of longVowels) {
    if (clean.startsWith(v)) {
      vow = v;
      break;
    }
  }
  if (!vow) {
    for (const v of shortVowels) {
      if (clean.startsWith(v)) {
        vow = v;
        break;
      }
    }
  }

  if (vow) {
    const remaining = clean.slice(vow.length);
    let remCons = '';
    for (const c of consonants) {
      if (remaining === c) {
        remCons = c;
        break;
      }
    }
    if (remCons) {
      return (vowelEngMap[vow] || 'ah') + (consEngMap[remCons] || remCons.toLowerCase());
    }
  }

  // Fallback if not standard syllable: map common letters
  return text
    .toLowerCase()
    .replace(/x/g, 'h')
    .replace(/kh/g, 'h')
    .replace(/dh/g, 'd')
    .replace(/c/g, 'a')
    .replace(/q/g, 'k')
    .replace(/aa/g, 'aah')
    .replace(/ee/g, 'ey')
    .replace(/ii/g, 'ee')
    .replace(/oo/g, 'oh')
    .replace(/uu/g, 'oo');
}

/**
 * Internal helper to run the SpeechSynthesis TTS engine.
 */
function playTTS(text: string) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text.trim();

  // Load custom speech overrides from localStorage
  let customMap: Record<string, string> = {};
  try {
    const saved = localStorage.getItem('somali_custom_speech_map');
    if (saved) {
      customMap = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to parse custom speech map from localStorage:', e);
  }

  // Get current voice synthesis settings
  const usePureLatin = localStorage.getItem('somali_speech_prefer_latin') !== 'false';

  const voices = window.speechSynthesis.getVoices();
  const europeanVoice = voices.find(v => 
    v.lang.startsWith('it-') || 
    v.lang.startsWith('es-') || 
    v.lang.startsWith('pt-')
  );

  const utterance = new SpeechSynthesisUtterance();
  utterance.rate = 0.85; // Speak slightly slower and clearer for children
  utterance.pitch = 1.15; // Slightly higher pitch for a friendly, child-focused tone

  // IF custom parental transcription exists, always respect it first
  if (customMap[cleanText] || customMap[cleanText.toUpperCase()]) {
    utterance.text = customMap[cleanText] || customMap[cleanText.toUpperCase()];
    const englishVoice = voices.find(v => v.lang.startsWith('en-'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
  }
  // ELSE IF pure Latin voice preferred and available, speak RAW Somali (perfect vowels A=ah, E=eh, I=ee, O=oh, U=oo)
  else if (usePureLatin && europeanVoice) {
    utterance.voice = europeanVoice;
    utterance.text = cleanText; // Raw Somali sounds 100% natural and pure on Spanish/Italian voices
  }
  // ELSE, fallback to standard English voice but compiled with our dynamic Somali phonetic rules
  else {
    utterance.text = getSomaliPhoneticFallback(cleanText);
    const englishVoice = voices.find(v => v.lang.startsWith('en-'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Saves a user-recorded audio pronunciation to localStorage.
 */
export function saveUserAudio(text: string, base64DataUrl: string) {
  try {
    const key = text.trim().toUpperCase();
    const saved = localStorage.getItem('somali_custom_audio_blobs') || '{}';
    const map = JSON.parse(saved);
    map[key] = base64DataUrl;
    localStorage.setItem('somali_custom_audio_blobs', JSON.stringify(map));
  } catch (e) {
    console.error('Error saving user audio:', e);
  }
}

/**
 * Deletes a user-recorded audio pronunciation.
 */
export function deleteUserAudio(text: string) {
  try {
    const key = text.trim().toUpperCase();
    const saved = localStorage.getItem('somali_custom_audio_blobs');
    if (saved) {
      const map = JSON.parse(saved);
      delete map[key];
      localStorage.setItem('somali_custom_audio_blobs', JSON.stringify(map));
    }
  } catch (e) {
    console.error('Error deleting user audio:', e);
  }
}

/**
 * Saves an App Creator default sound to localStorage.
 */
export function saveCreatorDefaultAudio(text: string, base64DataUrl: string) {
  try {
    const key = text.trim().toUpperCase();
    const saved = localStorage.getItem('somali_creator_default_sounds') || '{}';
    const map = JSON.parse(saved);
    map[key] = base64DataUrl;
    localStorage.setItem('somali_creator_default_sounds', JSON.stringify(map));
  } catch (e) {
    console.error('Error saving creator audio:', e);
  }
}

/**
 * Deletes an App Creator default sound.
 */
export function deleteCreatorDefaultAudio(text: string) {
  try {
    const key = text.trim().toUpperCase();
    const saved = localStorage.getItem('somali_creator_default_sounds');
    if (saved) {
      const map = JSON.parse(saved);
      delete map[key];
      localStorage.setItem('somali_creator_default_sounds', JSON.stringify(map));
    }
  } catch (e) {
    console.error('Error deleting creator audio:', e);
  }
}

/**
 * Checks what sound methods exist for a word/letter.
 */
export function getSoundStatus(text: string) {
  const key = text.trim().toUpperCase();
  let hasUser = false;
  let hasCreator = false;
  let hasPhonetic = false;

  try {
    const userAudios = localStorage.getItem('somali_custom_audio_blobs');
    if (userAudios) {
      const map = JSON.parse(userAudios);
      hasUser = !!map[key] || !!map[text.trim()];
    }

    const creatorAudios = localStorage.getItem('somali_creator_default_sounds');
    if (creatorAudios) {
      const map = JSON.parse(creatorAudios);
      hasCreator = !!map[key] || !!map[text.trim()];
    }

    const savedSpeech = localStorage.getItem('somali_custom_speech_map');
    if (savedSpeech) {
      const map = JSON.parse(savedSpeech);
      hasPhonetic = !!map[key] || !!map[text.trim()];
    }
  } catch (e) {
    // Ignore errors
  }

  return { hasUser, hasCreator, hasPhonetic };
}

