// ============================================================
// Mock Data — Linguo-Literary Bridge Mobile App
// Real literary text from E.L. Voynich's "The Gadfly"
// ============================================================

import {
  Work,
  Chapter,
  Paragraph,
  Annotation,
  VocabWord,
  ThesaurusEntry,
  QuizQuestion,
  FigureGameQuestion,
  CEFRLevel,
} from '../types';

export const MOCK_WORKS: Work[] = [
  {
    id: 'gf',
    title: 'The Gadfly',
    author: 'E.L. Voynich',
    description:
      '1840-yillar Italiyasidagi inqilobiy kurash, yosh Artur Byortonning sinovlari va uning sirli "Ovdosh" (Gadfly)ga aylanishi haqidagi shoh asar.',
    coverGradient: ['#6C63FF', '#3B82F6'],
    totalChapters: 26,
    status: 'published',
    year: 1897,
    genre: 'Klassik / Tarixiy roman',
  },
  {
    id: 'jr',
    title: 'Jack Raymond',
    author: 'E.L. Voynich',
    description:
      'Kornuoll tabiati, axloqiy mardlik, adolat va insonparvarlik mavzularini yorituvchi psixologik roman.',
    coverGradient: ['#EC4899', '#8B5CF6'],
    totalChapters: 12,
    status: 'coming_soon',
    year: 1901,
    genre: 'Psixologik drama',
  },
];

export const MOCK_CHAPTERS: Chapter[] = [
  {
    id: 'gf-p1-c01',
    workId: 'gf',
    partNumber: 1,
    chapterNumber: 1,
    title: 'Kutubxona va bog‘ suhbati',
    subtitle: 'The Library and Garden Conversation',
    availableLevels: ['A2', 'B1', 'B2', 'C1'],
    audioAvailable: true,
    estimatedMinutes: 6,
  },
  {
    id: 'gf-p1-c02',
    workId: 'gf',
    partNumber: 1,
    chapterNumber: 2,
    title: 'Alp tog‘lari sayohati',
    subtitle: 'The Alpine Journey',
    availableLevels: ['A2', 'B1', 'B2', 'C1'],
    audioAvailable: true,
    estimatedMinutes: 8,
  },
  {
    id: 'gf-p1-c03',
    workId: 'gf',
    partNumber: 1,
    chapterNumber: 3,
    title: 'Talabalar yig‘ini, Jemma va Yosh Italiya',
    subtitle: 'Student Meeting, Gemma & Young Italy',
    availableLevels: ['B1', 'B2', 'C1'],
    audioAvailable: false,
    estimatedMinutes: 10,
  },
  {
    id: 'gf-p1-c04',
    workId: 'gf',
    partNumber: 1,
    chapterNumber: 4,
    title: 'Padre Kardi va e’tirof siri',
    subtitle: 'Father Cardi and Confession',
    availableLevels: ['B2', 'C1'],
    audioAvailable: false,
    estimatedMinutes: 9,
  },
];

// Multilevel paragraphs for Chapter 1
export const MOCK_PARAGRAPHS_BY_LEVEL: Record<CEFRLevel, Paragraph[]> = {
  A2: [
    {
      id: 'gf-p1-c01-p001-A2',
      sourceParagraphId: 'gf-p1-c01-p001',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: 'It was a warm evening in Italy. Arthur sat in the seminary garden. He was nineteen years old. He held a book in his hands, but he did not read it.',
      originalText:
        'Arthur sat in the library of the theological seminary at Pisa, looking through a manuscript of sacred music. It was a hot evening in June.',
    },
    {
      id: 'gf-p1-c01-p002-A2',
      sourceParagraphId: 'gf-p1-c01-p002',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: 'Father Montanelli came out of the library. He was a kind priest. When he saw Arthur, his face became very happy. His voice was always warm and soft.',
      originalText:
        'Father Montanelli came out of the inner study, carrying some papers. His voice was singularly low and sweet, and its note was always that of a caress.',
    },
    {
      id: 'gf-p1-c01-p003-A2',
      sourceParagraphId: 'gf-p1-c01-p003',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: '"Fragola! fragola!" a street seller shouted outside the gate. He was selling fresh red strawberries in the warm summer air.',
      originalText:
        '"Fragola! fragola!" a vendor shouted outside in the street, hawking fresh wild strawberries in the twilight.',
    },
    {
      id: 'gf-p1-c01-p004-A2',
      sourceParagraphId: 'gf-p1-c01-p004',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: 'Arthur was a slender boy with dreamy, deep blue eyes. People often thought he looked like a quiet poet or an artist from an old painting.',
      originalText:
        'Arthur was a slender little creature, looking more like an Italian in a sixteenth-century portrait, with dreamy, mystical eyes, deep blue under black lashes.',
    },
    {
      id: 'gf-p1-c01-p005-A2',
      sourceParagraphId: 'gf-p1-c01-p005',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: '"What should I do without you, Arthur?" Montanelli said gently. He sat down next to him on the stone bench.',
      originalText:
        '"What should I do without you, Arthur?" Montanelli murmured, resting his hand affectionately upon the lad\'s shoulder.',
    },
    {
      id: 'gf-p1-c01-p006-A2',
      sourceParagraphId: 'gf-p1-c01-p006',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: 'An old green vine was growing on the wall above them. It moved slowly in the wind, like it was shaking its head sadly.',
      originalText:
        'The old vine above them rustled in the faint breeze, shaking a leafy head mournfully in the dusk.',
    },
    {
      id: 'gf-p1-c01-p007-A2',
      sourceParagraphId: 'gf-p1-c01-p007',
      chapterId: 'gf-p1-c01',
      level: 'A2',
      text: 'Arthur was nervous. He squeezed purple foxglove flowers in his fingers until the small petals dropped to the ground.',
      originalText:
        'Arthur was unconsciously tearing the purple foxglove bells into shreds, scattering the bruised petals across the flags.',
    },
  ],

  B1: [
    {
      id: 'gf-p1-c01-p001-B1',
      sourceParagraphId: 'gf-p1-c01-p001',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: 'It was a warm evening in the seminary garden in Pisa. Arthur was sitting quietly under an ancient vine near the monastery wall. He held a manuscript, but his mind had drifted away from the sacred hymns.',
      originalText:
        'Arthur sat in the library of the theological seminary at Pisa, looking through a manuscript of sacred music. It was a hot evening in June.',
    },
    {
      id: 'gf-p1-c01-p002-B1',
      sourceParagraphId: 'gf-p1-c01-p002',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: 'Father Montanelli came out of the library study, holding several papers. He looked tired from his administrative duties, but when his eyes met Arthur, he smiled. His voice was gentle, and its note was always that of a caress.',
      originalText:
        'Father Montanelli came out of the inner study, carrying some papers. His voice was singularly low and sweet, and its note was always that of a caress.',
    },
    {
      id: 'gf-p1-c01-p003-B1',
      sourceParagraphId: 'gf-p1-c01-p003',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: '"Fragola! fragola!" a street vendor called out from beyond the heavy stone walls. His musical chant echoed faintly across the silent courtyard.',
      originalText:
        '"Fragola! fragola!" a vendor shouted outside in the street, hawking fresh wild strawberries in the twilight.',
    },
    {
      id: 'gf-p1-c01-p004-B1',
      sourceParagraphId: 'gf-p1-c01-p004',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: 'Arthur was a slender young man who resembled a noble figure from a sixteenth-century Italian portrait. He possessed dreamy, mystical eyes, deep blue under thick black lashes, looking like a tame panther without the claws.',
      originalText:
        'Arthur was a slender little creature, looking more like an Italian in a sixteenth-century portrait, with dreamy, mystical eyes, deep blue under black lashes, like a tame panther without the claws.',
    },
    {
      id: 'gf-p1-c01-p005-B1',
      sourceParagraphId: 'gf-p1-c01-p005',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: '"What should I do without you, Arthur?" Montanelli asked softly, sitting beside him on the weathered bench.',
      originalText:
        '"What should I do without you, Arthur?" Montanelli murmured, resting his hand affectionately upon the lad\'s shoulder.',
    },
    {
      id: 'gf-p1-c01-p006-B1',
      sourceParagraphId: 'gf-p1-c01-p006',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: 'The old vine hanging over the stone alcove swayed in the twilight air, as if shaking a leafy head in silent sorrow.',
      originalText:
        'The old vine above them rustled in the faint breeze, shaking a leafy head mournfully in the dusk.',
    },
    {
      id: 'gf-p1-c01-p007-B1',
      sourceParagraphId: 'gf-p1-c01-p007',
      chapterId: 'gf-p1-c01',
      level: 'B1',
      text: 'Arthur was nervously crushing foxglove flowers in his fingers, allowing the bruised purple petals to flutter onto the stone tiles — a restless habit whenever he felt deep agitation.',
      originalText:
        'Arthur was unconsciously tearing the purple foxglove bells into shreds, scattering the bruised petals across the flags.',
    },
  ],

  B2: [
    {
      id: 'gf-p1-c01-p001-B2',
      sourceParagraphId: 'gf-p1-c01-p001',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: 'Arthur sat in the cloisters of the theological seminary at Pisa, ostensibly examining an illuminated manuscript of liturgical chants. It was a sultry evening in late June, and the heavy atmosphere seemed burdened with unspoken forebodings.',
      originalText:
        'Arthur sat in the library of the theological seminary at Pisa, looking through a manuscript of sacred music. It was a hot evening in June.',
    },
    {
      id: 'gf-p1-c01-p002-B2',
      sourceParagraphId: 'gf-p1-c01-p002',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: 'Father Montanelli emerged from his inner study with a sheaf of correspondence. His bearing commanded reverence, yet his voice was singularly melodious; its note was always that of a caress, enveloping the youth in unconditional paternal warmth.',
      originalText:
        'Father Montanelli came out of the inner study, carrying some papers. His voice was singularly low and sweet, and its note was always that of a caress.',
    },
    {
      id: 'gf-p1-c01-p003-B2',
      sourceParagraphId: 'gf-p1-c01-p003',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: '"Fragola! fragola!" The rhythmic cadence of an itinerant fruit seller drifted past the barred gateway, puncturing the solemn tranquility of the monastic courtyard with the vitality of mundane life.',
      originalText:
        '"Fragola! fragola!" a vendor shouted outside in the street, hawking fresh wild strawberries in the twilight.',
    },
    {
      id: 'gf-p1-c01-p004-B2',
      sourceParagraphId: 'gf-p1-c01-p004',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: 'In his delicate poise, Arthur resembled an Italian aristocrat stepped out from a Renaissance canvas. He possessed dreamy, mystical eyes, sapphire-dark beneath arching lashes — an impression akin to a tame panther without the claws, harboring latent ferocity beneath frail elegance.',
      originalText:
        'Arthur was a slender little creature, looking more like an Italian in a sixteenth-century portrait, with dreamy, mystical eyes, deep blue under black lashes, like a tame panther without the claws.',
    },
    {
      id: 'gf-p1-c01-p005-B2',
      sourceParagraphId: 'gf-p1-c01-p005',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: '"What should I do without you, Arthur?" Montanelli murmured with tender solemnity, resting an affectionate hand upon the youth\'s shoulder.',
      originalText:
        '"What should I do without you, Arthur?" Montanelli murmured, resting his hand affectionately upon the lad\'s shoulder.',
    },
    {
      id: 'gf-p1-c01-p006-B2',
      sourceParagraphId: 'gf-p1-c01-p006',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: 'Above their heads, the gnarled vine rustled fitfully against the stone lintel, as though shaking a leafy head in melancholy contemplation of what the future concealed.',
      originalText:
        'The old vine above them rustled in the faint breeze, shaking a leafy head mournfully in the dusk.',
    },
    {
      id: 'gf-p1-c01-p007-B2',
      sourceParagraphId: 'gf-p1-c01-p007',
      chapterId: 'gf-p1-c01',
      level: 'B2',
      text: 'With unconscious anxiety, Arthur had been shredding purple foxglove blossoms into fragments, scattering the bruised petals across the paving slabs — revealing the profound spiritual turbulence beneath his composure.',
      originalText:
        'Arthur was unconsciously tearing the purple foxglove bells into shreds, scattering the bruised petals across the flags.',
    },
  ],

  C1: [
    {
      id: 'gf-p1-c01-p001-C1',
      sourceParagraphId: 'gf-p1-c01-p001',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: 'Arthur sat in the library of the theological seminary at Pisa, ostensibly cataloging an illuminated manuscript of sacred polyphony. It was a suffocating evening in late June, and the cloistered stillness seemed laden with ominous portents.',
      originalText:
        'Arthur sat in the library of the theological seminary at Pisa, looking through a manuscript of sacred music. It was a hot evening in June.',
    },
    {
      id: 'gf-p1-c01-p002-C1',
      sourceParagraphId: 'gf-p1-c01-p002',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: 'Father Montanelli emerged from the inner study, bearing a sheaf of diocesan papers. Though prematurely aged by ascetic discipline, his cadence remained singularly captivating; its note was always that of a caress, suffused with an almost maternal solicitousness.',
      originalText:
        'Father Montanelli came out of the inner study, carrying some papers. His voice was singularly low and sweet, and its note was always that of a caress.',
    },
    {
      id: 'gf-p1-c01-p003-C1',
      sourceParagraphId: 'gf-p1-c01-p003',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: '"Fragola! fragola!" the clarion hawking of a fruit seller pierced the courtyard from beyond the fortified gate, invoking the vibrant, secular pulse of Tuscany against the monastic austerity within.',
      originalText:
        '"Fragola! fragola!" a vendor shouted outside in the street, hawking fresh wild strawberries in the twilight.',
    },
    {
      id: 'gf-p1-c01-p004-C1',
      sourceParagraphId: 'gf-p1-c01-p004',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: 'Arthur was a slender creature whose physiognomy recalled a sixteenth-century Florentine patrician, endowed with dreamy, mystical eyes, cobalt under sable lashes — evoking a tame panther without the claws, concealing untamed passion beneath devotional fragility.',
      originalText:
        'Arthur was a slender little creature, looking more like an Italian in a sixteenth-century portrait, with dreamy, mystical eyes, deep blue under black lashes, like a tame panther without the claws.',
    },
    {
      id: 'gf-p1-c01-p005-C1',
      sourceParagraphId: 'gf-p1-c01-p005',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: '"What should I do without you, Arthur?" Montanelli murmured with poignant gravity, resting his consecrated hand upon the youth\'s shoulder.',
      originalText:
        '"What should I do without you, Arthur?" Montanelli murmured, resting his hand affectionately upon the lad\'s shoulder.',
    },
    {
      id: 'gf-p1-c01-p006-C1',
      sourceParagraphId: 'gf-p1-c01-p006',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: 'The venerable vine above them stirred fitfully in the nascent dusk, shaking a leafy head mournfully as though conscious of the tragic destiny in store.',
      originalText:
        'The old vine above them rustled in the faint breeze, shaking a leafy head mournfully in the dusk.',
    },
    {
      id: 'gf-p1-c01-p007-C1',
      sourceParagraphId: 'gf-p1-c01-p007',
      chapterId: 'gf-p1-c01',
      level: 'C1',
      text: 'Arthur had been unconsciously macerating the purple foxglove bells into shreds, scattering the bruised petals across the stone flags in an involuntary manifestation of acute psychic distress.',
      originalText:
        'Arthur was unconsciously tearing the purple foxglove bells into shreds, scattering the bruised petals across the flags.',
    },
  ],
};

// Complete 14 Dissertation Annotations for Chapter 1
export const MOCK_ANNOTATIONS: Annotation[] = [
  {
    id: 'ann-01',
    paragraphId: 'gf-p1-c01-p003',
    sourceParagraphId: 'gf-p1-c01-p003',
    targetQuote: 'Fragola! fragola!',
    category: 'stylistic',
    categoryLabel: 'Leksik takror & Akustik tasvir',
    shortNote: {
      uz: 'Ko‘cha sotuvchisining ovozi orqali monastir sukunatiga real hayot sadosi kiritilgan.',
      en: 'Lexical repetition evoking the vibrant Tuscan street life invading monastic silence.',
      ru: 'Лексический повтор, вносящий голос реальной жизни в монастырскую тишину.',
    },
    longNote: {
      uz: 'E.L. Voynich bu yerda onomatopeya va leksik takror orqali kontrast yaratadi: ichkaridagi monastir sukunati va tashqaridagi erkin, qaynoq Italiya hayoti. Bu Artur qalbidagi dunyoviy kurash va diniy hayot o‘rtasidagi ziddiyatga ishora.',
      en: 'E.L. Voynich employs acoustic imagery and lexical repetition to establish a stark antithesis between the cloistered seminary and the pulsating vitality of 1840s Italy.',
      ru: 'Войнич использует акустический образ и повтор, чтобы противопоставить монастырский покой бурной уличной жизни Тосканы.',
    },
    thesaurusRef: 'th-repetition',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#00D4FF',
  },
  {
    id: 'ann-02',
    paragraphId: 'gf-p1-c01-p002',
    sourceParagraphId: 'gf-p1-c01-p002',
    targetQuote: 'its note was always that of a caress',
    category: 'trope',
    categoryLabel: 'Metafora',
    shortNote: {
      uz: 'Padre Montanellining ovozi erkalashga o‘xshatilgan metafora.',
      en: 'Metaphor portraying Montanelli’s voice as an affectionate caress.',
      ru: 'Метафора: голос падре звучит как нежная ласка.',
    },
    longNote: {
      uz: 'Montanellining ovozi eshitiladigan tovush emas, balki jismoniy mehr (caress) kabi his etiladi. Bu ota va o‘g‘il o‘rtasidagi yashirin qon-qardoshlik bog‘liqligi va cheksiz mehr-oqibatni ochib beradi.',
      en: 'The vocal tone is transformed into tactile warmth, foreshadowing the profound spiritual and paternal bond between Montanelli and Arthur.',
      ru: 'Тон голоса передан через тактильное ощущение ласки, что намекает на тайную отцовскую связь с Артуром.',
    },
    thesaurusRef: 'th-metaphor',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#6C63FF',
  },
  {
    id: 'ann-03',
    paragraphId: 'gf-p1-c01-p004',
    sourceParagraphId: 'gf-p1-c01-p004',
    targetQuote: 'an Italian in a sixteenth-century portrait',
    category: 'detail',
    categoryLabel: 'Portret detali',
    shortNote: {
      uz: 'Artur qiyofasining Uyg‘onish davri portretlariga qiyoslanishi.',
      en: 'Portrait detail comparing Arthur to a 16th-century Italian canvas.',
      ru: 'Портретная деталь: сходство Артура с картиной эпохи Возрождения.',
    },
    longNote: {
      uz: 'Muallif Arturga nozik, aristokratik va mumtoz go‘zallik bag‘ishlaydi. Bu uning fojiali qismatiga romantik ulug‘vorlik beradi.',
      en: 'Invests Arthur with aristocratic grace and romantic tragedy reminiscent of Renaissance martyrs.',
      ru: 'Подчеркивает аристократизм, хрупкость и романтический ореол героя.',
    },
    thesaurusRef: 'th-portrait',
    levels: ['B1', 'B2', 'C1'],
    color: '#FFB547',
  },
  {
    id: 'ann-04',
    paragraphId: 'gf-p1-c01-p004',
    sourceParagraphId: 'gf-p1-c01-p004',
    targetQuote: 'a tame panther without the claws',
    category: 'trope',
    categoryLabel: 'Taqqoslash (Simile)',
    shortNote: {
      uz: 'Tirnoqlari bo‘lmagan qo‘lga o‘rgatilgan pantera.',
      en: 'Simile: a domesticated predator stripped of its defenses.',
      ru: 'Сравнение: ручная пантера без когтей.',
    },
    longNote: {
      uz: 'Hozircha zararsiz, itoatkor Artur kelajakda shafqatsiz Ovdoshga (Gadfly) aylanadi. Uning ichida yirtqich energiyasi bor, ammo tirnoqlari hali o‘smagan.',
      en: 'Brilliant psychological foreshadowing: Arthur appears harmless now, but harbors the latent ferocity that will define his metamorphosis into the Gadfly.',
      ru: 'Психологическое предвосхищение: кроткий юноша в будущем превратится в язвительного Овода.',
    },
    thesaurusRef: 'th-simile',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#00E5A0',
  },
  {
    id: 'ann-05',
    paragraphId: 'gf-p1-c01-p004',
    sourceParagraphId: 'gf-p1-c01-p004',
    targetQuote: 'dreamy, mystical eyes, deep blue under black lashes',
    category: 'detail',
    categoryLabel: 'Epitet & Portret detali',
    shortNote: {
      uz: 'Xayolparast, sirli ko‘zlar — uning diniy va inqilobiy e’tiqodini ifodalaydi.',
      en: 'Epithet capturing Arthur’s idealism and religious mysticism.',
      ru: 'Эпитеты: мечтательные, мистические глаза, полные идеализма.',
    },
    longNote: {
      uz: 'Ko‘zlar — Arturdagi mutaassiblik va fidoyilik ramzi. Roman yakunida aynan shu ko‘zlar orqali Montanelli o‘g‘lini tanib oladi ("You have your mother\'s eyes!").',
      en: 'Crucial motif connecting the beginning of the novel with Part III Chapter 6, where Montanelli recognizes him by these eyes.',
      ru: 'Сквозной лейтмотив: в конце романа Монтанелли узнает сына именно по глазам матери.',
    },
    thesaurusRef: 'th-epithet',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#FF5757',
  },
  {
    id: 'ann-06',
    paragraphId: 'gf-p1-c01-p005',
    sourceParagraphId: 'gf-p1-c01-p005',
    targetQuote: 'What should I do without you, Arthur?',
    category: 'speech',
    categoryLabel: 'Ritorik savol & Nutqiy detal',
    shortNote: {
      uz: 'Padre Montanellining samimiy e’tirofi va fojiali folbinlik.',
      en: 'Rhetorical question emphasizing emotional dependence and tragic irony.',
      ru: 'Риторический вопрос, выражающий привязанность и трагическую иронию.',
    },
    longNote: {
      uz: 'Ritorik savol Montanellining Artursiz yashay olmasligini ko‘rsatadi. Bu so‘zlar roman fojiasini oldindan aytib beruvchi achchiq kinoyadir (irony).',
      en: 'Exposes Montanelli’s ultimate vulnerability. His life truly falls apart without Arthur.',
      ru: 'Трагическое предвестие: потеря Артура действительно разрушит жизнь священника.',
    },
    thesaurusRef: 'th-rhetorical',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#8B85FF',
  },
  {
    id: 'ann-07',
    paragraphId: 'gf-p1-c01-p006',
    sourceParagraphId: 'gf-p1-c01-p006',
    targetQuote: 'the old vine... shaking a leafy head',
    category: 'trope',
    categoryLabel: 'Personifikatsiya (Jonlantirish)',
    shortNote: {
      uz: 'Tok novdasi keksadek bosh chayqab g‘amgin turishi.',
      en: 'Personification: the venerable vine shaking its head in mourning.',
      ru: 'Олицетворение: лоза, словно живой старец, печально качает ветвями.',
    },
    longNote: {
      uz: 'Tabiat bo‘lajak qayg‘uli fojealardan ogohlantiruvchi tirik guvoh sifatida jonlantiriladi. Bu romantik adabiyotga xos "psixologik parallelizm" usulidir.',
      en: 'Classic Romantic pathetic fallacy: nature empathizes with human destiny and anticipates sorrow.',
      ru: 'Прием психологического параллелизма: природа сопереживает грядущей трагедии.',
    },
    thesaurusRef: 'th-personification',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#00D4FF',
  },
  {
    id: 'ann-08',
    paragraphId: 'gf-p1-c01-p007',
    sourceParagraphId: 'gf-p1-c01-p007',
    targetQuote: 'foxglove flowers... squeezing them tightly',
    category: 'detail',
    categoryLabel: 'Psixologik (Ruhiy) detal',
    shortNote: {
      uz: 'Gullarni asabiy ezg‘ilash orqali ichki iztirob va hayajon aks ettirilgan.',
      en: 'Psychological detail revealing suppressed agitation and internal struggle.',
      ru: 'Психологическая деталь: бессознательное сминание цветов выдает тревогу.',
    },
    longNote: {
      uz: 'Qahramon his-tuyg‘ularini so‘z bilan aytmaydi, lekin harakati orqali ichki larzasi oshkor bo‘ladi. Adabiyotda bu "bilvosita xarakteristika" (indirect characterization) deyiladi.',
      en: 'Mastery of physical gesture mirroring internal psychological turmoil before confession.',
      ru: 'Косвенная характеристика: жест раскрывает бурю чувств перед признанием.',
    },
    thesaurusRef: 'th-psych-detail',
    levels: ['A2', 'B1', 'B2', 'C1'],
    color: '#CA6F1E',
  },
];

// 15 Cognitive Thesaurus Entries (dissertation corpus)
export const MOCK_THESAURUS: ThesaurusEntry[] = [
  {
    id: 'th-metaphor',
    termEn: 'Metaphor',
    termUz: 'Metafora (Istiora)',
    termRu: 'Метафора',
    category: 'trope',
    categoryLabel: 'Troplar',
    cefrLevel: 'B1',
    definitions: {
      simple:
        'Biror narsaning xususiyatini ikkinchisiga to‘g‘ridan-to‘g‘ri ko‘chirish.',
      standard:
        'O‘xshashlik asosida bir narsa yoki hodisaning nomini ikkinchisiga ko‘chirish usuli.',
      academic:
        'Ikki denotat o‘rtasidagi semantik o‘xshashlikka asoslangan, yashirin qiyoslashni ifodalovchi stilistik trop.',
    },
    examples: [
      {
        quote: 'its note was always that of a caress',
        chapterRef: '1-bob, 2-paragraf',
        explanationUz:
          'Montanellining muloyim ovozi jismoniy erkalash (caress) kabi metaforik tasvirlangan.',
      },
    ],
    relatedTerms: ['Simile', 'Personification', 'Allegory'],
  },
  {
    id: 'th-simile',
    termEn: 'Simile',
    termUz: 'Taqqoslash (O‘xshatish)',
    termRu: 'Сравнение',
    category: 'trope',
    categoryLabel: 'Troplar',
    cefrLevel: 'A2',
    definitions: {
      simple:
        '"Kabi" yoki "go‘yo" so‘zlari yordamida ikki narsani solishtirish.',
      standard:
        'Ikki tushuncha yoki qiyofani o‘zaro solishtirib, obrazlilikni oshiruvchi badiiy vosita.',
      academic:
        'Eksplitsit komparativ bog‘lovchilar (like, as) vositasida amalga oshiriladigan semantik korrelyatsiya.',
    },
    examples: [
      {
        quote: 'a tame panther without the claws',
        chapterRef: '1-bob, 4-paragraf',
        explanationUz:
          'Artur ichki kuchi bor, ammo tajribasiz yoshligi tufayli tirnoqsiz panteraga taqqoslangan.',
      },
    ],
    relatedTerms: ['Metaphor', 'Analogy'],
  },
  {
    id: 'th-personification',
    termEn: 'Personification',
    termUz: 'Personifikatsiya (Jonlantirish)',
    termRu: 'Олицетворение',
    category: 'trope',
    categoryLabel: 'Troplar',
    cefrLevel: 'B1',
    definitions: {
      simple: 'Jonsiz narsa yoki tabiatga insoniy xususiyatlar berish.',
      standard:
        'Jonsiz tabiat yoki narsalarga tirik mavjudot sifatlari va harakatlarini yuklash.',
      academic:
        'Insoniy fe’l-atvor va emotsiyalarning tabiat hodisalariga proyeksiyasi (Pathetic fallacy).',
    },
    examples: [
      {
        quote: 'the old vine... shaking a leafy head',
        chapterRef: '1-bob, 6-paragraf',
        explanationUz:
          'Tok novdasi xuddi keksadek g‘amgin bosh chayqab turishi orqali bo‘lajak fojiaga ishora qilingan.',
      },
    ],
    relatedTerms: ['Metaphor', 'Anthropomorphism'],
  },
  {
    id: 'th-repetition',
    termEn: 'Lexical Repetition',
    termUz: 'Leksik takror',
    termRu: 'Лексический повтор',
    category: 'stylistic',
    categoryLabel: 'Stilistik figuralar',
    cefrLevel: 'A2',
    definitions: {
      simple: 'Ta’sirchanlikni oshirish uchun bir so‘zni bir necha bor qaytarish.',
      standard:
        'Matnda emotsional yuklama yoki ritmni ta’kidlash uchun so‘zlarni ataylab takrorlash.',
      academic:
        'Ekspressiv sintaktik mexanizm bo‘lib, matn to‘qimasida fonetik va semantik diqqat markazini hosil qiladi.',
    },
    examples: [
      {
        quote: 'Fragola! fragola!',
        chapterRef: '1-bob, 3-paragraf',
        explanationUz:
          'Qulupnay sotuvchisining takror ovozi monastir sukunatiga hayot nafasi kiritadi.',
      },
    ],
    relatedTerms: ['Anaphora', 'Epiphora', 'Refrain'],
  },
  {
    id: 'th-rhetorical',
    termEn: 'Rhetorical Question',
    termUz: 'Ritorik savol',
    termRu: 'Риторический вопрос',
    category: 'speech',
    categoryLabel: 'Nutq shakllari',
    cefrLevel: 'B1',
    definitions: {
      simple: 'Javob talab qilmaydigan, kuchli his-tuyg‘uni ifodalovchi savol.',
      standard:
        'Tinglovchidan javob kutmasdan, qat’iy fikr yoki ichki hayajonni ifodalash uchun qo‘llanadigan so‘roq jumla.',
      academic:
        'Kommunikativ maqsadi ma’lumot olish emas, balki mulohazani kuchaytirish bo‘lgan pragmatik sintaktik shakl.',
    },
    examples: [
      {
        quote: 'What should I do without you, Arthur?',
        chapterRef: '1-bob, 5-paragraf',
        explanationUz:
          'Montanelli Artursiz yashay olmasligini chuqur muhabbat bilan ritorik tarzda ifodalaydi.',
      },
    ],
    relatedTerms: ['Apostrophe', 'Exclamation'],
  },
  {
    id: 'th-portrait',
    termEn: 'Portrait Detail',
    termUz: 'Portret detali',
    termRu: 'Портретная деталь',
    category: 'detail',
    categoryLabel: 'Badiiy detal',
    cefrLevel: 'B1',
    definitions: {
      simple: 'Qahramonning tashqi ko‘rinishidagi o‘ziga xos chizgi.',
      standard:
        'Qahramonning qiyofasi, kiyinishi va gavda tuzilishiga oid individual xususiyat.',
      academic:
        'Personajning ichki olami, ruhiy holati va ijtimoiy maqomini vizual ko‘rsatuvchi badiiy mikrokod.',
    },
    examples: [
      {
        quote: 'dreamy, mystical eyes, deep blue under black lashes',
        chapterRef: '1-bob, 4-paragraf',
        explanationUz:
          'Arturning ko‘zlari uning idealist va diniy-romantik orzularini ifodalovchi markaziy detaldir.',
      },
    ],
    relatedTerms: ['Psychological Detail', 'Landscape Detail'],
  },
  {
    id: 'th-psych-detail',
    termEn: 'Psychological Detail',
    termUz: 'Psixologik (Ruhiy) detal',
    termRu: 'Психологическая деталь',
    category: 'detail',
    categoryLabel: 'Badiiy detal',
    cefrLevel: 'B2',
    definitions: {
      simple: 'Qahramonning ichki kechinmasini ko‘rsatadigan imo-ishora yoki xatti-harakat.',
      standard:
        'Personajning yashirin ruhiy holatini, iztirobi yoki xavotirini ochib beruvchi jismoniy harakat.',
      academic:
        'Badiiy asarda affektiv holatning motorik va somatik proyeksiyasi orqali personaj ichki dunyosini ochish.',
    },
    examples: [
      {
        quote: 'unconsciously tearing the purple foxglove bells into shreds',
        chapterRef: '1-bob, 7-paragraf',
        explanationUz:
          'Artur gul barglarini ezg‘ilab, o‘zining ichki bezovtaligi va e’tirof oldidagi xavotirini bildiradi.',
      },
    ],
    relatedTerms: ['Indirect Characterization', 'Gesture'],
  },
];

// Interactive Quiz Questions (Chapter 1)
export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    chapterId: 'gf-p1-c01',
    level: 'B1',
    type: 'figure',
    question:
      '"its note was always that of a caress" jumlasi qaysi badiiy vositaga misol bo‘ladi?',
    options: ['Metafora', 'Leksik takror', 'Ritorik savol', 'Jonlantirish'],
    correctAnswer: 0,
    explanation:
      'Padre ovozining mayinligi erkalash (caress) kabi metaforik tasvirlangan.',
  },
  {
    id: 'q2',
    chapterId: 'gf-p1-c01',
    level: 'B1',
    type: 'mcq',
    question:
      'Artur asabiylashganda qanday ruhiy detal bilan o‘z hayajonini namoyon etdi?',
    options: [
      'Kitob sahifalarini shoshilib varaqladi',
      'Foxglove gullarini ezg‘ilab maydaladi',
      'Tez-tez deraza tomon qaradi',
      'Yerga qarab jim o‘tirdi',
    ],
    correctAnswer: 1,
    explanation:
      'U barmoqlari orasida binafsharang foxglove gul yaproqlarini bilmasdan ezg‘ilab yirtadi.',
  },
  {
    id: 'q3',
    chapterId: 'gf-p1-c01',
    level: 'B1',
    type: 'mcq',
    question:
      '"What should I do without you, Arthur?" iborasi qanday nutqiy vosita hisoblanadi?',
    options: [
      'Ritorik savol',
      'Antiteza',
      'Ichki monolog',
      'O‘xshatish',
    ],
    correctAnswer: 0,
    explanation:
      'Bu ritorik savol bo‘lib, Montanellining Artursiz yashay olmasligini samimiy bildiradi.',
  },
  {
    id: 'q4',
    chapterId: 'gf-p1-c01',
    level: 'B1',
    type: 'figure',
    question:
      '"the old vine... shaking a leafy head" jumlasidagi stilistik usul nima?',
    options: ['Personifikatsiya', 'Metafora', 'Hiperbola', 'Epitet'],
    correctAnswer: 0,
    explanation:
      'Jonsiz tok novdasining xuddi tirik odamdek bosh chayqashi jonlantirishdir.',
  },
];

// "Figurani top" Mini-game questions
export const MOCK_FIGURE_GAME: FigureGameQuestion[] = [
  {
    id: 'fg-1',
    quote: '"its note was always that of a caress"',
    correctDevice: 'Metafora',
    options: ['Metafora', 'Taqqoslash', 'Leksik takror', 'Epitet'],
    context: 'Padre Montanellining samimiy ovoz ohangi haqida',
  },
  {
    id: 'fg-2',
    quote: '"a tame panther without the claws"',
    correctDevice: 'Taqqoslash (Simile)',
    options: ['Taqqoslash (Simile)', 'Personifikatsiya', 'Metafora', 'Antiteza'],
    context: 'Arturning tashqi ko‘rinishi va ichki tabiati haqida',
  },
  {
    id: 'fg-3',
    quote: '"Fragola! fragola!"',
    correctDevice: 'Leksik takror',
    options: ['Leksik takror', 'Ritorik savol', 'Metafora', 'Inversiya'],
    context: 'Piza ko‘chasidagi qulupnay sotuvchisining sadolari',
  },
  {
    id: 'fg-4',
    quote: '"the old vine... shaking a leafy head mournfully"',
    correctDevice: 'Personifikatsiya',
    options: ['Personifikatsiya', 'Leksik takror', 'Epitet', 'Taqqoslash'],
    context: 'Seminariya bog‘idagi qari tok daraxti tasviri',
  },
  {
    id: 'fg-5',
    quote: '"What should I do without you, Arthur?"',
    correctDevice: 'Ritorik savol',
    options: ['Ritorik savol', 'Anafora', 'Gradatsiya', 'Paralellizm'],
    context: 'Padre Montanellining Artirga aytgan samimiy so‘zlari',
  },
];

// Placement Test questions
export const MOCK_PLACEMENT_TEST = [
  {
    id: 'pt-1',
    question: 'Choose the best word: "Arthur sat quietly ___ the seminary garden."',
    options: ['in', 'at', 'on', 'with'],
    correct: 0,
    levelWeight: 'A2',
  },
  {
    id: 'pt-2',
    question: 'Complete: "He was nineteen years old and ___ a book."',
    options: ['was reading', 'has read', 'is reading', 'readed'],
    correct: 0,
    levelWeight: 'A2',
  },
  {
    id: 'pt-3',
    question: 'What is the meaning of "caress" in the text?',
    options: [
      'A gentle, loving touch or tone',
      'A loud, sharp noise',
      'A strict command',
      'A heavy wooden box',
    ],
    correct: 0,
    levelWeight: 'B1',
  },
  {
    id: 'pt-4',
    question: 'Identify the device: "a tame panther without the claws".',
    options: ['Simile / Comparison', 'Oxymoron', 'Hyperbole', 'Alliteration'],
    correct: 0,
    levelWeight: 'B1',
  },
  {
    id: 'pt-5',
    question: 'Choose the synonymous phrase for "suffused with maternal solicitousness":',
    options: [
      'Filled with caring, motherly concern',
      'Overwhelmed by violent anger',
      'Confused by religious ritual',
      'Exhausted from sleeplessness',
    ],
    correct: 0,
    levelWeight: 'B2',
  },
  {
    id: 'pt-6',
    question: 'Why does the author use the image of crushed foxglove petals?',
    options: [
      'To reveal inner anxiety through physical gesture',
      'To show Arthur hated flowers',
      'To indicate it was raining',
      'To introduce a medical treatment',
    ],
    correct: 0,
    levelWeight: 'B2',
  },
  {
    id: 'pt-7',
    question: 'In literary analysis, what does "pathetic fallacy" describe?',
    options: [
      'Attributing human emotions to nature and the surroundings',
      'A grammatical error made by a character',
      'A sudden plot reversal',
      'The death of an antagonist',
    ],
    correct: 0,
    levelWeight: 'C1',
  },
  {
    id: 'pt-8',
    question: 'Analyze the tone: "What should I do without you, Arthur?"',
    options: [
      'Poignant dramatic irony anticipating their tragic divergence',
      'Superficial anger at Arthur\'s tardiness',
      'Formal academic inquiry',
      'Sarcastic dismissal of theological studies',
    ],
    correct: 0,
    levelWeight: 'C1',
  },
];

// 15 Essential vocabulary words from Chapter 1 with IPA and translations
export const MOCK_VOCABULARY: VocabWord[] = [
  {
    id: 'v1',
    word: 'caress',
    ipa: '/kəˈres/',
    pos: 'noun / verb',
    cefr: 'B1',
    translation: {
      uz: 'erkalash, mayin teginish',
      ru: 'ласка, нежное прикосновение',
    },
    example: 'His voice was always that of a caress.',
  },
  {
    id: 'v2',
    word: 'seminary',
    ipa: '/ˈsemɪnəri/',
    pos: 'noun',
    cefr: 'B2',
    translation: {
      uz: 'diniy madrasa, seminariya',
      ru: 'духовная семинария',
    },
    example: 'Arthur sat in the garden of the seminary.',
  },
  {
    id: 'v3',
    word: 'slender',
    ipa: '/ˈslendər/',
    pos: 'adjective',
    cefr: 'B1',
    translation: {
      uz: 'nozik, qaddi kelishgan',
      ru: 'стройный, тонкий',
    },
    example: 'He was a slender youth with refined features.',
  },
  {
    id: 'v4',
    word: 'mystical',
    ipa: '/ˈmɪstɪkl/',
    pos: 'adjective',
    cefr: 'B2',
    translation: {
      uz: 'sirli, ilohiy, mistik',
      ru: 'мистический, таинственный',
    },
    example: 'He had dreamy, mystical eyes.',
  },
  {
    id: 'v5',
    word: 'panther',
    ipa: '/ˈpænθər/',
    pos: 'noun',
    cefr: 'B1',
    translation: {
      uz: 'pantera, qoplon',
      ru: 'пантера',
    },
    example: 'He looked like a tame panther without claws.',
  },
  {
    id: 'v6',
    word: 'vine',
    ipa: '/vaɪn/',
    pos: 'noun',
    cefr: 'A2',
    translation: {
      uz: 'tok, uzum novdasi',
      ru: 'виноградная лоза',
    },
    example: 'The old vine swayed in the evening air.',
  },
  {
    id: 'v7',
    word: 'foxglove',
    ipa: '/ˈfɒksɡlʌv/',
    pos: 'noun',
    cefr: 'B2',
    translation: {
      uz: 'angishvonagul (dorivor o‘simlik)',
      ru: 'наперстянка (растение)',
    },
    example: 'Arthur unconsciously crushed purple foxglove flowers.',
  },
  {
    id: 'v8',
    word: 'mournfully',
    ipa: '/ˈmɔːnfəli/',
    pos: 'adverb',
    cefr: 'B2',
    translation: {
      uz: 'g‘amgin holda, motamsaro',
      ru: 'печально, скорбно',
    },
    example: 'The branches moved mournfully in the dusk.',
  },
];
