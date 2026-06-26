/**
 * Somali Alphabet Curriculum Data (Standard Southern Dialect / Mogadishu compatible)
 * All translated to Somali Language - 100% Pure Somali.
 * @license Apache-2.0
 */

import { Lesson, LetterData, SyllableData, WordData, SentenceData, QuizQuestion, Badge } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'l1_consonants',
    title: 'Shibanayaal',
    somaliTitle: 'Shibanayaal',
    description: 'Baro shibanayaasha (consonants) ee Af-Soomaaliga adigoo isticmaalaya tusaalooyin dhaqameed caan ah!',
    category: 'alphabet',
    order: 1,
    unlockedAtStars: 0
  },
  {
    id: 'l2_vowels',
    title: 'Shaqal Gaab & Shaqal Dheer',
    somaliTitle: 'Shaqal Gaab & Dheer',
    description: 'Baro Shaqal Gaab (A, E, I, O, U) iyo Shaqal Dheer (AA, EE, II, OO, UU) ee Af-Soomaaliga iyadoo la raacayo dhawaaqooda.',
    category: 'vowels',
    order: 2,
    unlockedAtStars: 5
  },
  {
    id: 'l2_double_consonants',
    title: 'Xarfaha Labinlaabma',
    somaliTitle: 'Xarfaha Labinlaabma',
    description: 'Baro 7-da xaraf ee la labanlaabo ee Af-Soomaaliga (bb, dd, rr, gg, ll, mm, nn) iyo erayada ay ku jiraan.',
    category: 'alphabet',
    order: 3,
    unlockedAtStars: 10
  },
  {
    id: 'l3_combinations',
    title: 'Erayada Labada Xaraf & Isku-dhafka',
    somaliTitle: '2 Xaraf & Isku-dhafka',
    description: 'Ku tababaro isku-darka 1 shibane iyo 1 shaqal gaab si aad u dhisto erayo 2-xaraf ah (sida BA) iyo shaqal-shibane (sida AB).',
    category: 'combinations',
    order: 4,
    unlockedAtStars: 15
  },
  {
    id: 'l4_3_letter_long_vowels',
    title: 'Erayada 3-Xaraf ee Shaqalka Dheer',
    somaliTitle: '3 Xaraf (Shaqal Dheer)',
    description: 'Baro erayada 3-xaraf ah ee ku bilaawda hal shibane iyo shaqal dheer (sida BAA, GEE) iyo shaqal dheer oo lagu daray shibane (sida AAB, EEL).',
    category: 'words',
    order: 5,
    unlockedAtStars: 25
  },
  {
    id: 'l5_long_words',
    title: 'Erayada kale iyo kuwa Dhaadheer',
    somaliTitle: 'Erayada Dheer',
    description: 'Baro erayada saddex xaraf ee caadiga ah (sida CAB, KAB) iyo erayada ka kooban afar xaraf ama ka badan oo ay ku jiraan shaqal gaab iyo shaqal dheer.',
    category: 'words',
    order: 6,
    unlockedAtStars: 35
  },
  {
    id: 'l6_sentences',
    title: 'Weedho Fudud',
    somaliTitle: 'Dhisidda Weedhaha',
    description: 'Ku tababaro dhisidda iyo akhrinta weedho fudud oo ku saabsan qoyska, geela, iyo nolosha maalin laha ah.',
    category: 'sentences',
    order: 7,
    unlockedAtStars: 45
  }
];

export const CONSONANTS: LetterData[] = [
  {
    letter: 'B',
    name: 'Baa',
    type: 'consonant',
    exampleWord: 'Bisad',
    englishWord: 'Bisad',
    emoji: '🐱',
    pronunciationHint: 'Waxaa loogu dhawaaqaa si la mid ah xarafka "B" ee "Bad".',
    phonics: 'dhawaqa B',
    funFact: 'Bisaddu waa xayawaan la rabaayadeeyo oo aad looga jecelyahay guryaha Soomaaliyeed!'
  },
  {
    letter: 'T',
    name: 'Taa',
    type: 'consonant',
    exampleWord: 'Tufaax',
    englishWord: 'Tufaax',
    emoji: '🍎',
    pronunciationHint: 'Waxaa loogu dhawaaqaa marka caarada carrabka ay taabato ilkaha sare.',
    phonics: 'dhawaqa T'
  },
  {
    letter: 'J',
    name: 'Jiim',
    type: 'consonant',
    exampleWord: 'Jiir',
    englishWord: 'Jiir',
    emoji: '🐭',
    pronunciationHint: 'Waxaa loogu dhawaaqaa sida "J" ee "Jid" ama "Jiir".',
    phonics: 'dhawaqa J'
  },
  {
    letter: 'X',
    name: 'Xaa',
    type: 'consonant',
    exampleWord: 'Xiddig',
    englishWord: 'Xiddig',
    emoji: '⭐',
    pronunciationHint: 'Dhawaq qoto dheer oo dhuunta ka soo baxa oo ka xoog badan xarafka H.',
    phonics: 'dhawaqa X',
    funFact: 'Marka habeenkii la joogo, xiddigo badan oo qurux badan ayaa iftiima cirka Mogadishu!'
  },
  {
    letter: 'KH',
    name: 'Khaa',
    type: 'consonant',
    exampleWord: 'Khudaar',
    englishWord: 'Khudaar',
    emoji: '🥦',
    pronunciationHint: 'Dhawaq gariir leh oo ka soo baxa dhuunta sare, sida bilowga erayga Khudaar.',
    phonics: 'dhawaqa KH'
  },
  {
    letter: 'D',
    name: 'Daal',
    type: 'consonant',
    exampleWord: 'Durbaan',
    englishWord: 'Durbaan',
    emoji: '🥁',
    pronunciationHint: 'Dhawaq fudud oo carrabka iyo ciridka ilkaha sare isku taabtaan.',
    phonics: 'dhawaqa D',
    funFact: 'Durbaanka waxaa loo garaacaa ciyaaraha hidaha iyo dhaqanka Soomaaliyeed marka la dabbaaldegayo!'
  },
  {
    letter: 'R',
    name: 'Raa',
    type: 'consonant',
    exampleWord: 'Rati',
    englishWord: 'Rati',
    emoji: '🐫',
    pronunciationHint: 'Marka carrabku uu kor u gariiro si fudud (sida Rati).',
    phonics: 'dhawaqa R',
    funFact: 'Ratigu waa awrka weyn ee loo isticmaalo rraridda aqalka Soomaaliga!'
  },
  {
    letter: 'S',
    name: 'Siin',
    type: 'consonant',
    exampleWord: 'Saacad',
    englishWord: 'Saacad',
    emoji: '⌚',
    pronunciationHint: 'Dhawaq xis leh sida xarafka "S" ee "Sannad".',
    phonics: 'dhawaqa S'
  },
  {
    letter: 'SH',
    name: 'Shiin',
    type: 'consonant',
    exampleWord: 'Shabeel',
    englishWord: 'Shabeel',
    emoji: '🐆',
    pronunciationHint: 'Sida dhawaqa "Sh" ee "Shalay" ama "Shubid".',
    phonics: 'dhawaqa SH',
    funFact: 'Shabeelku waa xayawaan qurux badan oo ku dhex jira astaanta rasmiga ah ee dalka Soomaaliya!'
  },
  {
    letter: 'DH',
    name: 'Dhaaf',
    type: 'consonant',
    exampleWord: 'Dhiil',
    englishWord: 'Dhiil',
    emoji: '🏺',
    pronunciationHint: 'Marka carrabka dib loo laabo oo dhawaqa kor loo soo saaro (sida Dhiil).',
    phonics: 'dhawaqa DH',
    funFact: 'Dhiishu waa weel dhaqameed qurux badan oo lagu shubto caanaha geela si ay u qaboobaan!'
  },
  {
    letter: 'C',
    name: 'Cayn',
    type: 'consonant',
    exampleWord: 'Caano',
    englishWord: 'Caano',
    emoji: '🥛',
    pronunciationHint: 'Dhawaq xooggan oo dhuunta gudaheeda ka soo baxa (sida Caano).',
    phonics: 'dhawaqa C',
    funFact: 'Caanaha geela waa cabbitaanka ugu nafaqada badan ee carruurta Soomaaliyeed siiya xoog dabiici ah!'
  },
  {
    letter: 'G',
    name: 'Gaaf',
    type: 'consonant',
    exampleWord: 'Geel',
    englishWord: 'Geel',
    emoji: '🐪',
    pronunciationHint: 'Mar walba waa adag tahay dhawaqiisa, sida "G" ee "Guri" ama "Geel".',
    phonics: 'dhawaqa G',
    funFact: 'Dalkeenna Soomaaliya waa dalka ugu geela badan adduunka oo dhan!'
  },
  {
    letter: 'F',
    name: 'Faa',
    type: 'consonant',
    exampleWord: 'Faras',
    englishWord: 'Faras',
    emoji: '🐎',
    pronunciationHint: 'Dhawaq fudud oo dibinta hoose iyo ilkaha sare isku taabtaan.',
    phonics: 'dhawaqa F'
  },
  {
    letter: 'Q',
    name: 'Qaaf',
    type: 'consonant',
    exampleWord: 'Qorrax',
    englishWord: 'Qorrax',
    emoji: '☀️',
    pronunciationHint: 'Dhawaq qoto dheer oo dhuunta hoose ka soo baxa (sida Qorrax).',
    phonics: 'dhawaqa Q',
    funFact: 'Qorraxda dalkeenna aad bay u iftiantaa mar kasta oo ay bixiso diirimaad qurux badan!'
  },
  {
    letter: 'K',
    name: 'Kaaf',
    type: 'consonant',
    exampleWord: 'Kab',
    englishWord: 'Kab',
    emoji: '👟',
    pronunciationHint: 'Sida dhawaqa "K" ee "Kore" ama "Kalluun".',
    phonics: 'dhawaqa K'
  },
  {
    letter: 'L',
    name: 'Laam',
    type: 'consonant',
    exampleWord: 'Libaax',
    englishWord: 'Libaax',
    emoji: '🦁',
    pronunciationHint: 'Sida dhawaqa "L" ee "Laan" ama "Libaax".',
    phonics: 'dhawaqa L',
    funFact: 'Libaaxu waa boqorka duurka Soomaaliyeed oo caan ku ah geesinnimo iyo xoog!'
  },
  {
    letter: 'M',
    name: 'Miim',
    type: 'consonant',
    exampleWord: 'Moos',
    englishWord: 'Moos',
    emoji: '🍌',
    pronunciationHint: 'Sida dhawaqa "M" ee "Macaan" ama "Moos".',
    phonics: 'dhawaqa M',
    funFact: 'Mooska macaan ee ka baxa hareeraha Webiga Shabelle aad baa looga jecelyahay suuqyada dalka!'
  },
  {
    letter: 'N',
    name: 'Nuun',
    type: 'consonant',
    exampleWord: 'Nal',
    englishWord: 'Nal',
    emoji: '💡',
    pronunciationHint: 'Sida dhawaqa "N" ee "Nabad" ama "Nal".',
    phonics: 'dhawaqa N'
  },
  {
    letter: 'W',
    name: 'Wow',
    type: 'consonant',
    exampleWord: 'Waraabe',
    englishWord: 'Waraabe',
    emoji: '🐺',
    pronunciationHint: 'Sida dhawaqa "W" ee "Weyn" ama "Waraabe".',
    phonics: 'dhawaqa W'
  },
  {
    letter: 'H',
    name: 'Haa',
    type: 'consonant',
    exampleWord: 'Hooyo',
    englishWord: 'Hooyo',
    emoji: '👩‍👦',
    pronunciationHint: 'Sida dhawaqa "H" ee "Horta" ama "Hooyo".',
    phonics: 'dhawaqa H',
    funFact: 'Hooyo waa qofka ugu qaalisan uguna naxariista badan qoyska Soomaaliyeed!'
  },
  {
    letter: 'Y',
    name: 'Yaa',
    type: 'consonant',
    exampleWord: 'Yaxaas',
    englishWord: 'Yaxaas',
    emoji: '🐊',
    pronunciationHint: 'Sida dhawaqa "Y" ee "Yar" ama "Yaxaas".',
    phonics: 'dhawaqa Y',
    funFact: 'Yaxaasku waa xayawaan ku nool webiyada waaweyn ee dalkeenna Soomaaliya!'
  }
];

export const DOUBLE_CONSONANTS: LetterData[] = [
  {
    letter: 'BB',
    name: 'B-da Labanlaaban',
    type: 'consonant',
    exampleWord: 'Aabbe',
    englishWord: 'Aabbe',
    emoji: '👨‍👦',
    pronunciationHint: 'Labada "B" waxay bixiyaan dhawaq xooggan oo adag (sida Aabbe).',
    phonics: 'dhawaqa BB oo culus',
    funFact: 'Xarafka B marka la labanlaabo wuxuu bixiyaa dhawaaq aad u xooggan!'
  },
  {
    letter: 'DD',
    name: 'D-da Labanlaaban',
    type: 'consonant',
    exampleWord: 'Saddex',
    englishWord: 'Saddex',
    emoji: '3️⃣',
    pronunciationHint: 'Labada "D" waxay bixiyaan dhawaq istaag iyo xoog leh (sida Saddex).',
    phonics: 'dhawaqa DD oo culus',
    funFact: 'Xarafka D marka la labanlaabo carrabka wuxuu xoogaa ku nagaadaa ciridka sare!'
  },
  {
    letter: 'RR',
    name: 'R-ta Labanlaaban',
    type: 'consonant',
    exampleWord: 'Barre',
    englishWord: 'Barre',
    emoji: '👨‍🏫',
    pronunciationHint: 'Labada "R" waxay bixiyaan gariir dheeri ah oo dhawaqa adkeeya (sida Barre).',
    phonics: 'dhawaqa RR oo gariiraya',
    funFact: 'Barre waa macallinka wax ku baraya, naxariis iyo xushmad buuna inaga mudan yahay!'
  },
  {
    letter: 'GG',
    name: 'G-da Labanlaaban',
    type: 'consonant',
    exampleWord: 'Deggan',
    englishWord: 'Deggan',
    emoji: '🤫',
    pronunciationHint: 'Wuxuu leeyahay dhawaq adag oo ku xirma dhuunta ka hor shaqalka (sida Deggan).',
    phonics: 'dhawaqa GG oo culus',
    funFact: 'Deggan waxay la macno tahay qof xasilloon ama meel aan qaylo lahayn!'
  },
  {
    letter: 'LL',
    name: 'L-ta Labanlaaban',
    type: 'consonant',
    exampleWord: 'Kalluun',
    englishWord: 'Kalluun',
    emoji: '🐟',
    pronunciationHint: 'Labada "L" ee erayga Kalluun waxay dhawaqa ka dhigaan mid dheer oo cad.',
    phonics: 'dhawaqa LL oo culus',
    funFact: 'Kalluunka caafimaadka ayuu u fiican yahay, baddeena Soomaaliyana aad buu uga buuxaa!'
  },
  {
    letter: 'MM',
    name: 'M-ta Labanlaaban',
    type: 'consonant',
    exampleWord: 'Aammus',
    englishWord: 'Aammus',
    emoji: '🤐',
    pronunciationHint: 'Labada "M" waxay xiraan dibnaha muddo xoogaa ka dheer hal M (sida Aammus).',
    phonics: 'dhawaqa MM oo culus',
    funFact: 'Aammus waa marka qofku aamusan yahay si uu u dhagaysto casharka ama hadalka waalidka!'
  },
  {
    letter: 'NN',
    name: 'N-ta Labanlaaban',
    type: 'consonant',
    exampleWord: 'Xannaano',
    englishWord: 'Xannaano',
    emoji: '🍼',
    pronunciationHint: 'Labada "N" waxay bixiyaan dhawaq sanka ah oo xoogaa dheer (sida Xannaano).',
    phonics: 'dhawaqa NN oo culus',
    funFact: 'Xannaanadu waa daryeelka iyo jacaylka la siiyo carruurta yaryar ee quruxda badan!'
  }
];

export const VOWELS = {
  short: [
    { letter: 'A', name: 'A', emoji: '🐜', word: 'Afar', translation: 'Afar (4)', phonics: 'a-gaaban' },
    { letter: 'E', name: 'E', emoji: '0️⃣', word: 'Eber', translation: 'Eber (0)', phonics: 'e-gaaban' },
    { letter: 'I', name: 'I', emoji: '👁️', word: 'Il', translation: 'Isha lala arko', phonics: 'i-gaaban' },
    { letter: 'O', name: 'O', emoji: '👴', word: 'Oday', translation: 'Odayga oday', phonics: 'o-gaaban' },
    { letter: 'U', name: 'U', emoji: '🥢', word: 'Ul', translation: 'Usha birta ama qoriga', phonics: 'u-gaaban' }
  ],
  long: [
    { letter: 'AA', name: 'Aa', emoji: '👨', word: 'Aabbe', translation: 'Aabbaha qoyska', phonics: 'aa-dheer' },
    { letter: 'EE', name: 'Ee', emoji: '🐪', word: 'Geel', translation: 'Geela dalka', phonics: 'ee-dheer' },
    { letter: 'II', name: 'Ii', emoji: '🐭', word: 'Jiir', translation: 'Jiirka yar', phonics: 'ii-dheer' },
    { letter: 'OO', name: 'Oo', emoji: '👩', word: 'Hooyo', translation: 'Hooyada qaaliga ah', phonics: 'oo-dheer' },
    { letter: 'UU', name: 'Uu', emoji: '🌳', word: 'Duur', translation: 'Duurka iyo kaynta', phonics: 'uu-dheer' }
  ]
};

export const COMBINATIONS: SyllableData[] = [
  // Consonant + Vowel
  { consonant: 'B', vowel: 'A', syllable: 'BA', audioText: 'Bah' },
  { consonant: 'B', vowel: 'E', syllable: 'BE', audioText: 'Beh' },
  { consonant: 'B', vowel: 'I', syllable: 'BI', audioText: 'Bih' },
  { consonant: 'B', vowel: 'O', syllable: 'BO', audioText: 'Boh' },
  { consonant: 'B', vowel: 'U', syllable: 'BU', audioText: 'Buh' },

  { consonant: 'G', vowel: 'A', syllable: 'GA', audioText: 'Gah' },
  { consonant: 'G', vowel: 'E', syllable: 'GE', audioText: 'Geh' },
  { consonant: 'G', vowel: 'I', syllable: 'GI', audioText: 'Gih' },
  { consonant: 'G', vowel: 'O', syllable: 'GO', audioText: 'Goh' },
  { consonant: 'G', vowel: 'U', syllable: 'GU', audioText: 'Guh' },

  { consonant: 'L', vowel: 'A', syllable: 'LA', audioText: 'Lah' },
  { consonant: 'L', vowel: 'E', syllable: 'LE', audioText: 'Leh' },
  { consonant: 'L', vowel: 'I', syllable: 'LI', audioText: 'Lih' },
  { consonant: 'L', vowel: 'O', syllable: 'LO', audioText: 'Loh' },
  { consonant: 'L', vowel: 'U', syllable: 'LU', audioText: 'Luh' },

  // Vowel + Consonant
  { consonant: 'B', vowel: 'A', syllable: 'AB', audioText: 'Ab' },
  { consonant: 'B', vowel: 'E', syllable: 'EB', audioText: 'Eb' },
  { consonant: 'B', vowel: 'I', syllable: 'IB', audioText: 'Ib' },
  { consonant: 'B', vowel: 'O', syllable: 'OB', audioText: 'Ob' },
  { consonant: 'B', vowel: 'U', syllable: 'UB', audioText: 'Ub' },

  { consonant: 'L', vowel: 'A', syllable: 'AL', audioText: 'Al' },
  { consonant: 'L', vowel: 'E', syllable: 'EL', audioText: 'El' },
  { consonant: 'L', vowel: 'I', syllable: 'IL', audioText: 'Il' },
  { consonant: 'L', vowel: 'O', syllable: 'OL', audioText: 'Ol' },
  { consonant: 'L', vowel: 'U', syllable: 'UL', audioText: 'Ul' }
];

export const TWO_LETTER_WORDS: WordData[] = [
  // Consonant + Short Vowel
  {
    word: 'KA',
    translation: 'Ka (about / from)',
    emoji: '🎯',
    syllables: ['K', 'A'],
    letters: ['K', 'A'],
    type: '2-letter',
    pronunciationHint: 'Ka'
  },
  {
    word: 'KU',
    translation: 'Ku (in / into)',
    emoji: '📥',
    syllables: ['K', 'U'],
    letters: ['K', 'U'],
    type: '2-letter',
    pronunciationHint: 'Ku'
  },
  {
    word: 'LA',
    translation: 'La (with / someone)',
    emoji: '👥',
    syllables: ['L', 'A'],
    letters: ['L', 'A'],
    type: '2-letter',
    pronunciationHint: 'La'
  },
  {
    word: 'HO',
    translation: 'Ho (take / receive)',
    emoji: '🤲',
    syllables: ['H', 'O'],
    letters: ['H', 'O'],
    type: '2-letter',
    pronunciationHint: 'Ho'
  },
  {
    word: 'GE',
    translation: 'Ge (place / tree-ward)',
    emoji: '🌳',
    syllables: ['G', 'E'],
    letters: ['G', 'E'],
    type: '2-letter',
    pronunciationHint: 'Ge'
  },
  // Vowel + Consonant
  {
    word: 'AB',
    translation: 'Ab (ancestor)',
    emoji: '🧬',
    syllables: ['A', 'B'],
    letters: ['A', 'B'],
    type: '2-letter',
    pronunciationHint: 'Ab'
  },
  {
    word: 'IL',
    translation: 'Il (spring / eye)',
    emoji: '👁️',
    syllables: ['I', 'L'],
    letters: ['I', 'L'],
    type: '2-letter',
    pronunciationHint: 'Il'
  },
  {
    word: 'UL',
    translation: 'Ul (stick / staff)',
    emoji: '🥢',
    syllables: ['U', 'L'],
    letters: ['U', 'L'],
    type: '2-letter',
    pronunciationHint: 'Ul'
  },
  {
    word: 'IS',
    translation: 'Is (self / each other)',
    emoji: '🤝',
    syllables: ['I', 'S'],
    letters: ['I', 'S'],
    type: '2-letter',
    pronunciationHint: 'Is'
  },
  {
    word: 'AS',
    translation: 'As (bury / tomb)',
    emoji: '🪦',
    syllables: ['A', 'S'],
    letters: ['A', 'S'],
    type: '2-letter',
    pronunciationHint: 'As'
  }
];

export const THREE_LETTER_LONG_VOWELS: WordData[] = [
  // Consonant + Long Vowel
  {
    word: 'BAA',
    translation: 'Baa (catastrophe)',
    emoji: '💥',
    syllables: ['B', 'AA'],
    letters: ['B', 'A', 'A'],
    type: '3-letter-long',
    pronunciationHint: 'Baa'
  },
  {
    word: 'GEE',
    translation: 'Gee (edge / side)',
    emoji: '📐',
    syllables: ['G', 'EE'],
    letters: ['G', 'E', 'E'],
    type: '3-letter-long',
    pronunciationHint: 'Gee'
  },
  {
    word: 'SII',
    translation: 'Sii (give / further)',
    emoji: '👉',
    syllables: ['S', 'II'],
    letters: ['S', 'I', 'I'],
    type: '3-letter-long',
    pronunciationHint: 'Sii'
  },
  {
    word: 'LOO',
    translation: 'Loo (to / for someone)',
    emoji: '✉️',
    syllables: ['L', 'OO'],
    letters: ['L', 'O', 'O'],
    type: '3-letter-long',
    pronunciationHint: 'Loo'
  },
  {
    word: 'BUU',
    translation: 'Buu (buzz / sound)',
    emoji: '🐝',
    syllables: ['B', 'UU'],
    letters: ['B', 'U', 'U'],
    type: '3-letter-long',
    pronunciationHint: 'Buu'
  },
  // Long Vowel + Consonant
  {
    word: 'AAB',
    translation: 'Aab (concept / origin)',
    emoji: '🧠',
    syllables: ['AA', 'B'],
    letters: ['A', 'A', 'B'],
    type: '3-letter-long',
    pronunciationHint: 'Aab'
  },
  {
    word: 'EEL',
    translation: 'Eel (well / misfortune)',
    emoji: '🕳️',
    syllables: ['EE', 'L'],
    letters: ['E', 'E', 'L'],
    type: '3-letter-long',
    pronunciationHint: 'Eel'
  },
  {
    word: 'IID',
    translation: 'Iid (Eid festival)',
    emoji: '🌙',
    syllables: ['II', 'D'],
    letters: ['I', 'I', 'D'],
    type: '3-letter-long',
    pronunciationHint: 'Iid'
  },
  {
    word: 'OOD',
    translation: 'Ood (fence / hedge)',
    emoji: '🚧',
    syllables: ['OO', 'D'],
    letters: ['O', 'O', 'D'],
    type: '3-letter-long',
    pronunciationHint: 'Ood'
  },
  {
    word: 'UUN',
    translation: 'Uun (universe / only)',
    emoji: '🌌',
    syllables: ['UU', 'N'],
    letters: ['U', 'U', 'N'],
    type: '3-letter-long',
    pronunciationHint: 'Uun'
  }
];

export const THREE_LETTER_WORDS: WordData[] = [
  {
    word: 'CAB',
    translation: 'Cab',
    emoji: '🥛',
    syllables: ['C', 'A', 'B'],
    letters: ['C', 'A', 'B'],
    type: '3-letter',
    pronunciationHint: 'Cab'
  },
  {
    word: 'WAN',
    translation: 'Wan',
    emoji: '🐏',
    syllables: ['W', 'A', 'N'],
    letters: ['W', 'A', 'N'],
    type: '3-letter',
    pronunciationHint: 'Wan'
  },
  {
    word: 'KAB',
    translation: 'Kab',
    emoji: '👟',
    syllables: ['K', 'A', 'B'],
    letters: ['K', 'A', 'B'],
    type: '3-letter',
    pronunciationHint: 'Kab'
  },
  {
    word: 'XID',
    translation: 'Xir',
    emoji: '🎀',
    syllables: ['X', 'I', 'D'],
    letters: ['X', 'I', 'D'],
    type: '3-letter',
    pronunciationHint: 'Xid'
  },
  {
    word: 'GAL',
    translation: 'Gal',
    emoji: '🚪',
    syllables: ['G', 'A', 'L'],
    letters: ['G', 'A', 'L'],
    type: '3-letter',
    pronunciationHint: 'Gal'
  },
  {
    word: 'NAL',
    translation: 'Nal',
    emoji: '💡',
    syllables: ['N', 'A', 'L'],
    letters: ['N', 'A', 'L'],
    type: '3-letter',
    pronunciationHint: 'Nal'
  }
];

export const LONG_WORDS: WordData[] = [
  {
    word: 'GEEL',
    translation: 'Geel',
    emoji: '🐪',
    syllables: ['GEE', 'L'],
    letters: ['G', 'E', 'E', 'L'],
    type: '4-letter-plus',
    pronunciationHint: 'Geel'
  },
  {
    word: 'MOOS',
    translation: 'Moos',
    emoji: '🍌',
    syllables: ['MOO', 'S'],
    letters: ['M', 'O', 'O', 'S'],
    type: '4-letter-plus',
    pronunciationHint: 'Moos'
  },
  {
    word: 'HOOYO',
    translation: 'Hooyo',
    emoji: '👩‍👦',
    syllables: ['HOO', 'YO'],
    letters: ['H', 'O', 'O', 'Y', 'O'],
    type: '4-letter-plus',
    pronunciationHint: 'Hooyo'
  },
  {
    word: 'AABBE',
    translation: 'Aabbe',
    emoji: '👨‍👦',
    syllables: ['AAB', 'BE'],
    letters: ['A', 'A', 'B', 'B', 'E'],
    type: '4-letter-plus',
    pronunciationHint: 'Aabbe'
  },
  {
    word: 'BISAD',
    translation: 'Bisad',
    emoji: '🐱',
    syllables: ['BI', 'SAD'],
    letters: ['B', 'I', 'S', 'A', 'D'],
    type: '4-letter-plus',
    pronunciationHint: 'Bisad'
  },
  {
    word: 'FARAS',
    translation: 'Faras',
    emoji: '🐎',
    syllables: ['FA', 'RAS'],
    letters: ['F', 'A', 'R', 'A', 'S'],
    type: '4-letter-plus',
    pronunciationHint: 'Faras'
  },
  {
    word: 'LIBAAX',
    translation: 'Libaax',
    emoji: '🦁',
    syllables: ['LI', 'BAAX'],
    letters: ['L', 'I', 'B', 'A', 'A', 'X'],
    type: '4-letter-plus',
    pronunciationHint: 'Libaax'
  }
];

export const SENTENCES: SentenceData[] = [
  {
    sentence: 'Hooyo waa macaan',
    words: ['Hooyo', 'waa', 'macaan'],
    translation: 'Hooyo waa macaan',
    emoji: '👩‍👦❤️',
    hint: 'Dhis weedh ku saabsan naxariista iyo macaanka hooyadaa!'
  },
  {
    sentence: 'Aabbe waa geesi',
    words: ['Aabbe', 'waa', 'geesi'],
    translation: 'Aabbe waa geesi',
    emoji: '👨‍👦🛡️',
    hint: 'Dhis weedh geesinnimo ku ammaanaysa aabbahaa!'
  },
  {
    sentence: 'Geela waa weyn yahay',
    words: ['Geela', 'waa', 'weyn', 'yahay'],
    translation: 'Geela waa weyn yahay',
    emoji: '🐪⭐',
    hint: 'Dhis weedh muujinaysa sida uu u weyn yahay geela Soomaaliyeed!'
  },
  {
    sentence: 'Bisaddu waa yar tahay',
    words: ['Bisaddu', 'waa', 'yar', 'tahay'],
    translation: 'Bisaddu waa yar tahay',
    emoji: '🐱🌸',
    hint: 'Dhis weedh fudud oo ku saabsan bisadda yar ee guriga!'
  },
  {
    sentence: 'Cab caano macaan',
    words: ['Cab', 'caano', 'macaan'],
    translation: 'Cab caano macaan',
    emoji: '🥛😋',
    hint: 'Dhis weedh ku dhiirrigelinaysa carruurta inay cabaan caano caafimaad leh!'
  },
  {
    sentence: 'Hooyo iyo Aabbe aad baan u jecelahay',
    words: ['Hooyo', 'iyo', 'Aabbe', 'aad', 'baan', 'u', 'jecelahay'],
    translation: 'Waan jecelahay hooyaday iyo aabbahay aad iyo aad',
    emoji: '👨‍👩‍👧‍👦💖',
    hint: 'Dhis weedh dhererkeedu dhexeeyo oo ku saabsan jaceylka qoyskaaga!'
  },
  {
    sentence: 'Ardaydu waxay aadaan dugsiga maalin kasta',
    words: ['Ardaydu', 'waxay', 'aadaan', 'dugsiga', 'maalin', 'kasta'],
    translation: 'Ardayda yaryar waxay iskuulka aadaan maalin kasta',
    emoji: '🎒🏫',
    hint: 'Dhis weedh ku saabsan ardayda aadaysa dugsiga si ay wax u bartaan!'
  },
  {
    sentence: 'Geela wuxuu cabbaa biyo badan webiga',
    words: ['Geela', 'wuxuu', 'cabbaa', 'biyo', 'badan', 'webiga'],
    translation: 'Geela xoogga badan wuxuu cabbaa biyo badan webiga dhexdiisa',
    emoji: '🐪🌊',
    hint: 'Dhis weedh weyn oo muujinaysa geela oo biyo badan ka cabbaya webiga!'
  },
  {
    sentence: 'Carruurtu waxay ku ciyaaraan garoonka weyn',
    words: ['Carruurtu', 'waxay', 'ku', 'ciyaaraan', 'garoonka', 'weyn'],
    translation: 'Carruurtu waxay ku ciyaaraan garoonka weyn ee magaalada',
    emoji: '🏃‍♂️⚽',
    hint: 'Dhis weedh dheer oo qeexaysa ciyaarta carruurta ee garoonka weyn!'
  },
  {
    sentence: 'Waan ku faraxsanahay inaan barto Af-Soomaali',
    words: ['Waan', 'ku', 'faraxsanahay', 'inaan', 'barto', 'Af-Soomaali'],
    translation: 'Aad baan ugu faraxsanahay inaan barto luuqadda qaniga ah ee Af-Soomaaliga',
    emoji: '🇸🇴📚',
    hint: 'Dhis weedh dhiirrigelinaysa barashada iyo akhrinta Af-Soomaaliga!'
  }
];

export const QUIZZES: QuizQuestion[] = [
  // Lesson 1 Quizzes
  {
    id: 'q_b_cat',
    lessonId: 'l1_consonants',
    type: 'multiple-choice',
    questionText: 'Waa kuwee xarafka uu ku bilaawdo erayga "Bisad"?',
    options: ['T', 'B', 'J', 'X'],
    correctAnswer: 'B',
    hint: 'Ka feker xarafka "Baa" ee ku jira Bisadda!',
    points: 10
  },
  {
    id: 'q_g_camel',
    lessonId: 'l1_consonants',
    type: 'multiple-choice',
    questionText: 'Waa kuwee xarafka saxda ah ee loo adeegsado erayga "Geel"?',
    options: ['L', 'M', 'G', 'C'],
    correctAnswer: 'G',
    hint: 'Waa dhawaqa adag ee xarafka "Gaaf" ee Geel!',
    points: 10
  },
  {
    id: 'q_l_lion',
    lessonId: 'l1_consonants',
    type: 'multiple-choice',
    questionText: 'Waa kuwee magaca xayawaanka sawirkan ku jira: 🦁?',
    options: ['Geel', 'Bisad', 'Libaax', 'Yaxaas'],
    correctAnswer: 'Libaax',
    hint: 'Libaaxu waa boqorka duurka Soomaaliyeed!',
    points: 10
  },

  // Lesson 2 Quizzes
  {
    id: 'q_vowel_short',
    lessonId: 'l2_vowels',
    type: 'multiple-choice',
    questionText: 'Waa kuwee shaqal gaab-ka ee hoos ku qoran?',
    options: ['AA', 'E', 'EE', 'UU'],
    correctAnswer: 'E',
    hint: 'Shaqal gaab-ku wuxuu ka kooban yahay hal xaraf oo kaliya!',
    points: 10
  },
  {
    id: 'q_vowel_long_mother',
    lessonId: 'l2_vowels',
    type: 'multiple-choice',
    questionText: 'Waa kuwee shaqalka dheer (Shaqal Dheer) ee ku jira erayga "Hooyo"?',
    options: ['AA', 'EE', 'II', 'OO'],
    correctAnswer: 'OO',
    hint: 'Erayga H-OO-Y-O wuxuu leeyahay laba O oo isku xiga si uu u noqdo shaqal dheer!',
    points: 10
  },

  // Lesson 2b Quizzes: Double Consonants (Xarfaha Labinlaabma)
  {
    id: 'q_double_consonant_1',
    lessonId: 'l2_double_consonants',
    type: 'multiple-choice',
    questionText: 'Waa kuwee xarfaha labanlaabma (double consonants) ee ku jira erayga "Aabbe"?',
    options: ['BB', 'DD', 'RR', 'GG'],
    correctAnswer: 'BB',
    hint: 'Erayga A-A-B-B-E wuxuu leeyahay laba B oo isku xiga!',
    points: 10
  },
  {
    id: 'q_double_consonant_2',
    lessonId: 'l2_double_consonants',
    type: 'multiple-choice',
    questionText: 'Waa kuwee xarafka la labanlaabay ee ku jira erayga "Kalluun" (Fish)?',
    options: ['BB', 'LL', 'MM', 'NN'],
    correctAnswer: 'LL',
    hint: 'K-A-L-L-U-U-N wuxuu leeyahay laba L oo isku xiga!',
    points: 10
  },
  {
    id: 'q_double_consonant_count',
    lessonId: 'l2_double_consonants',
    type: 'multiple-choice',
    questionText: 'Muxuu yahay tirada xarfaha la labanlaabo ee Af-Soomaaliga ee loo yaqaan Xarfaha Labinlaabma?',
    options: ['5 xaraf', '7 xaraf', '10 xaraf', '21 xaraf'],
    correctAnswer: '7 xaraf',
    hint: 'Kaliya toddoba xaraf oo shibane ah ayaa la labanlaabaa: b, d, r, g, l, m, n.',
    points: 10
  },
  {
    id: 'q_builder_barre',
    lessonId: 'l2_double_consonants',
    type: 'word-builder',
    questionText: 'U dhis erayga macnihiisu yahay "Barre" (Teacher) oo leh xarafka labanlaabma ee RR',
    somaliText: 'Barre',
    options: ['R', 'E', 'B', 'R', 'A'],
    correctAnswer: ['B', 'A', 'R', 'R', 'E'],
    hint: 'Baa (B), Afar (A), iyo laba Rati (R, R) iyo Eber (E).',
    points: 15
  },

  // Lesson 3 Quizzes: 2-Letter Words and Blends (C-V & V-C)
  {
    id: 'q_blend_ba',
    lessonId: 'l3_combinations',
    type: 'multiple-choice',
    questionText: 'Waa kuwee dhawaqa aad heleysid marka aad isku darto xarfaha "B" (Shibane) iyo "A" (Shaqal gaab)?',
    options: ['BE', 'BA', 'BI', 'BU'],
    correctAnswer: 'BA',
    hint: 'Wuxuu u dhawaaqayaa "Bah"!',
    points: 10
  },
  {
    id: 'q_blend_al',
    lessonId: 'l3_combinations',
    type: 'multiple-choice',
    questionText: 'Waa kuwee dhawaqa aad heleysid marka aad isku darto shaqal gaab-ka "A" iyo shibane "L" (vice versa)?',
    options: ['LA', 'EL', 'AL', 'UL'],
    correctAnswer: 'AL',
    hint: 'Shaqalka "A" oo lagu daray "L" wuxuu noqdaa "Al"!',
    points: 10
  },
  {
    id: 'q_builder_ka',
    lessonId: 'l3_combinations',
    type: 'word-builder',
    questionText: 'U dhis erayga labada xaraf ah ee "KA" (ka soo baxa)',
    somaliText: 'KA',
    options: ['A', 'K', 'L'],
    correctAnswer: ['K', 'A'],
    hint: 'Waa Kaaf (K) oo lagu daray shaqal gaab-ka A.',
    points: 15
  },
  {
    id: 'q_builder_il',
    lessonId: 'l3_combinations',
    type: 'word-builder',
    questionText: 'U dhis erayga labada xaraf ah ee "IL" (isha lala arko / il-biriqsi)',
    somaliText: 'IL',
    options: ['L', 'I', 'B'],
    correctAnswer: ['I', 'L'],
    hint: 'Waa shaqal gaab-ka I oo ay ku xigto shibane Laam (L).',
    points: 15
  },

  // Lesson 4 Quizzes: 3-Letter Long Vowel Words
  {
    id: 'q_builder_gee',
    lessonId: 'l4_3_letter_long_vowels',
    type: 'word-builder',
    questionText: 'U dhis erayga saddexda xaraf ee "GEE" (dhanka ama geeska)',
    somaliText: 'GEE',
    options: ['E', 'G', 'E'],
    correctAnswer: ['G', 'E', 'E'],
    hint: 'Wuxuu ka bilaawdaa shibane Gaaf (G) waxaana ku xiga shaqalka dheer ee EE.',
    points: 15
  },
  {
    id: 'q_builder_eel',
    lessonId: 'l4_3_letter_long_vowels',
    type: 'word-builder',
    questionText: 'U dhis erayga saddexda xaraf ee "EEL" (misfortune / ceelka ceelka)',
    somaliText: 'EEL',
    options: ['E', 'L', 'E'],
    correctAnswer: ['E', 'E', 'L'],
    hint: 'Wuxux ku bilaawdaa shaqalka dheer ee EE waxaana ku xiga shibane Laam (L).',
    points: 15
  },
  {
    id: 'q_builder_sii',
    lessonId: 'l4_3_letter_long_vowels',
    type: 'word-builder',
    questionText: 'U dhis erayga "SII" oo macnihiisu yahay wax bixinta (sii saaxiibkaa)',
    somaliText: 'SII',
    options: ['I', 'S', 'I'],
    correctAnswer: ['S', 'I', 'I'],
    hint: 'Wuxuu ku bilaawdaa Siin (S) waxaana xiga shaqal dheer-ka ee II.',
    points: 15
  },
  {
    id: 'q_builder_ood',
    lessonId: 'l4_3_letter_long_vowels',
    type: 'word-builder',
    questionText: 'U dhis erayga "OOD" ee macnihiisu yahay oodda deyrka laga dhiso',
    somaliText: 'OOD',
    options: ['O', 'D', 'O'],
    correctAnswer: ['O', 'O', 'D'],
    hint: 'Wuxuu ku bilaawdaa shaqalka dheer ee OO waxaana ku xiga shibane Daal (D).',
    points: 15
  },

  // Lesson 5 Quizzes: Common Words and Multi-syllables
  {
    id: 'q_builder_cab',
    lessonId: 'l5_long_words',
    type: 'word-builder',
    questionText: 'U dhis erayga macnihiisu yahay "Cab" (sida Cab Caano)',
    somaliText: 'Cab Caano!',
    options: ['B', 'C', 'A'],
    correctAnswer: ['C', 'A', 'B'],
    hint: 'Ugu horreyn waa Cayn (C), ka dibna A, ka dibna Baa (B).',
    points: 15
  },
  {
    id: 'q_builder_geel',
    lessonId: 'l5_long_words',
    type: 'word-builder',
    questionText: 'U dhis erayga macnihiisu yahay "Geel"',
    somaliText: 'Geel',
    options: ['E', 'L', 'G', 'E'],
    correctAnswer: ['G', 'E', 'E', 'L'],
    hint: 'Gaaf (G) oo ay ku xigaan laba E iyo Laam (L).',
    points: 15
  },
  {
    id: 'q_builder_hooyo',
    lessonId: 'l5_long_words',
    type: 'word-builder',
    questionText: 'U dhis erayga shanta xaraf ee macnihiisu yahay "Hooyo"',
    somaliText: 'Hooyo',
    options: ['O', 'Y', 'H', 'O', 'O'],
    correctAnswer: ['H', 'O', 'O', 'Y', 'O'],
    hint: 'Haa (H) - laba O - Yaa (Y) - O!',
    points: 20
  },

  // Lesson 6 Quizzes
  {
    id: 'q_sentence_hooyo',
    lessonId: 'l6_sentences',
    type: 'sentence-builder',
    questionText: 'Isku habee erayadan si ay u dhismaan "Hooyo waa macaan"',
    options: ['waa', 'macaan', 'Hooyo'],
    correctAnswer: ['Hooyo', 'waa', 'macaan'],
    hint: 'Ku billow erayga "Hooyo" si aad u bilowdo weedha!',
    points: 25
  },
  {
    id: 'q_sentence_geel',
    lessonId: 'l6_sentences',
    type: 'sentence-builder',
    questionText: 'Isku habee erayadan si ay u dhismaan "Geela waa weyn yahay"',
    options: ['weyn', 'waa', 'Geela', 'yahay'],
    correctAnswer: ['Geela', 'waa', 'weyn', 'yahay'],
    hint: 'Ku billow mowduuca ah "Geela"!',
    points: 25
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge_first_steps',
    title: 'Tallaabada Koowaad',
    somaliTitle: 'Tallaabada Koowaad',
    description: 'Ku guuleyso 10 xiddigood si aad u furto biladaada ugu horreysa ee barashada!',
    icon: 'Sparkles',
    color: 'bg-emerald-500',
    unlockedAt: 10,
    type: 'stars'
  },
  {
    id: 'badge_consonant_king',
    title: 'Geesiga Xarfaha',
    somaliTitle: 'Shibanayaasha',
    description: 'Dhammee casharka koowaad ee Shibanayaasha si aad u hesho Bilada Libaaxa!',
    icon: 'Lion',
    color: 'bg-amber-500',
    unlockedAt: 1,
    type: 'alphabet'
  },
  {
    id: 'badge_vowel_wizard',
    title: 'Khabiirka Shaqalka',
    somaliTitle: 'Fidiyaha Shaqalka',
    description: 'U soo dhammee casharka shaqal gaab iyo shaqal dheer si guul leh.',
    icon: 'Flame',
    color: 'bg-indigo-500',
    unlockedAt: 1,
    type: 'vowels'
  },
  {
    id: 'badge_word_builder_3',
    title: 'Dhisaha Erayada',
    somaliTitle: 'Dhisaha Erayada',
    description: 'Noqo khabiir ku dhisidda erayada fudud ee saddexda xaraf.',
    icon: 'Hammer',
    color: 'bg-orange-500',
    unlockedAt: 1,
    type: 'quizzes'
  },
  {
    id: 'badge_sentence_master',
    title: 'Qoraa Yar oo Soomaali',
    somaliTitle: 'Qoraa Yar',
    description: 'U dhammee casharka dhisidda weedhaha si aad u muujiso xirfadda naxwahaaga.',
    icon: 'BookOpen',
    color: 'bg-rose-500',
    unlockedAt: 1,
    type: 'sentences'
  },
  {
    id: 'badge_streak_3',
    title: 'Dadaale Joogto ah',
    somaliTitle: 'Dadaale',
    description: 'Dhammee 3 maalmood oo xiriir ah oo waxbarasho si aad u hesho biladan dadaalka ah.',
    icon: 'Award',
    color: 'bg-teal-500',
    unlockedAt: 3,
    type: 'streak'
  }
];
