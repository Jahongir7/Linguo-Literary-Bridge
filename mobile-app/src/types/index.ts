// ============================================================
// Types — Linguo-Literary Bridge Mobile App (Student)
// ============================================================

export type CEFRLevel = 'A2' | 'B1' | 'B2' | 'C1';

export type InterfaceLang = 'uz' | 'ru' | 'en';

export type ReaderTheme = 'dark' | 'light' | 'sepia';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cefr: CEFRLevel;
  interfaceLang: InterfaceLang;
  avatarUrl: string;
  xp: number;
  streak: number;
  completedChapters: string[];
  savedWordsCount: number;
}

export interface Work {
  id: string;
  title: string;
  author: string;
  description: string;
  coverGradient: [string, string];
  totalChapters: number;
  status: 'published' | 'coming_soon';
  year: number;
  genre: string;
}

export interface Chapter {
  id: string;
  workId: string;
  partNumber: number;
  chapterNumber: number;
  title: string;
  subtitle?: string;
  availableLevels: CEFRLevel[];
  audioAvailable: boolean;
  estimatedMinutes: number;
}

export interface Paragraph {
  id: string;
  sourceParagraphId: string;
  chapterId: string;
  level: CEFRLevel;
  text: string;
  originalText?: string;
  speaker?: string;
}

export type AnnotationCategory =
  | 'stylistic'
  | 'trope'
  | 'detail'
  | 'speech'
  | 'humanism'
  | 'cultural';

export interface Annotation {
  id: string;
  paragraphId: string;
  sourceParagraphId: string;
  targetQuote: string;
  category: AnnotationCategory;
  categoryLabel: string;
  shortNote: {
    uz: string;
    en: string;
    ru: string;
  };
  longNote: {
    uz: string;
    en: string;
    ru: string;
  };
  thesaurusRef?: string;
  levels: CEFRLevel[];
  color: string;
}

export interface VocabWord {
  id: string;
  word: string;
  ipa: string;
  pos: string; // Part of speech (noun, verb, adj...)
  cefr: CEFRLevel;
  translation: {
    uz: string;
    ru: string;
  };
  example: string;
  dateAdded?: string;
}

export interface ThesaurusEntry {
  id: string;
  termEn: string;
  termUz: string;
  termRu: string;
  category: AnnotationCategory;
  categoryLabel: string;
  cefrLevel: CEFRLevel;
  definitions: {
    simple: string;
    standard: string;
    academic: string;
  };
  examples: {
    quote: string;
    chapterRef: string;
    explanationUz: string;
  }[];
  relatedTerms: string[];
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  level: CEFRLevel;
  type: 'mcq' | 'cloze' | 'figure';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FigureGameQuestion {
  id: string;
  quote: string;
  correctDevice: string;
  options: string[];
  context: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'gadfly';
  text: string;
  timestamp: string;
  sourceCitation?: {
    paragraphId: string;
    chapterTitle: string;
    quote: string;
  };
  suggestedFollowUps?: string[];
}
