// ============================================================
// Types — Linguo-Literary Bridge
// ============================================================

export type CEFRLevel = 'A2' | 'B1' | 'B2' | 'C1';
export type UserRole = 'admin' | 'teacher' | 'editor' | 'student';
export type AnnotationType =
  | 'metaphor'
  | 'simile'
  | 'personification'
  | 'repetition'
  | 'rhetorical_question'
  | 'anaphora'
  | 'antithesis'
  | 'portrait_detail'
  | 'object_detail'
  | 'landscape_detail'
  | 'psychological_detail'
  | 'speech_detail'
  | 'monologue'
  | 'inner_monologue'
  | 'social_humanism'
  | 'religious_humanism'
  | 'family_humanism'
  | 'historical_cultural';

export type ContentStatus = 'draft' | 'review' | 'published';
export type QuestionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'matching'
  | 'find_device';

// ── User ──────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  cefr?: CEFRLevel;
  interfaceLang: 'uz' | 'ru' | 'en';
  createdAt: string;
  lastActive: string;
  xp: number;
  streak: number;
  isActive: boolean;
}

// ── Work / Book ───────────────────────────────────────────────
export interface Work {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  totalChapters: number;
  status: ContentStatus;
}

// ── Chapter ───────────────────────────────────────────────────
export interface Chapter {
  id: string;
  workId: string;
  partNumber: number;
  chapterNumber: number;
  title: string;
  status: ContentStatus;
  versions: CEFRLevel[];
}

// ── Paragraph ─────────────────────────────────────────────────
export interface Paragraph {
  id: string; // e.g. gf-p1-c01-p001
  sourceParagraphId: string;
  chapterId: string;
  level: CEFRLevel | 'original';
  text: string;
  speakerName?: string;
}

// ── Annotation ────────────────────────────────────────────────
export interface Annotation {
  id: string;
  paragraphId: string;
  quote: string;
  type: AnnotationType;
  levels: CEFRLevel[];
  shortNote: Record<'uz' | 'ru' | 'en', string>;
  longNote: Record<'uz' | 'ru' | 'en', string>;
  thesaurusRef?: string;
}

// ── Thesaurus ─────────────────────────────────────────────────
export interface ThesaurusEntry {
  id: string;
  termEn?: string;
  termUz?: string;
  termRu?: string;
  term?: string;
  uzbek?: string;
  russian?: string;
  category?: string;
  categoryLabel?: string;
  cefrLevel?: CEFRLevel;
  cefr?: CEFRLevel;
  definitions?: {
    simple: string;
    standard: string;
    academic: string;
  };
  definitionSimple?: string;
  definitionStandard?: string;
  definitionAcademic?: string;
  examples: {
    quote: string;
    chapterRef?: string;
    paragraphId?: string;
    explanationUz?: string;
  }[];
  relatedTerms: string[];
}

// ── Vocab Word ───────────────────────────────────────────────
export interface VocabWord {
  id: string;
  word: string;
  ipa: string;
  pos: string;
  cefr: CEFRLevel;
  translation: {
    uz: string;
    ru: string;
  };
  example: string;
  dateAdded?: string;
}

// ── Figure Game ───────────────────────────────────────────────
export interface FigureGameQuestion {
  id: string;
  quote: string;
  correctDevice: string;
  options: string[];
  context: string;
}

// ── AI Message ────────────────────────────────────────────────
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

// ── Generated Book Adaptation ─────────────────────────────────
export interface GeneratedLevelVariant {
  level: CEFRLevel | 'original';
  text: string;
  paragraphs: Paragraph[];
  wordCount: number;
  sentenceCount: number;
  avgSentenceLength: number;
  cefrScore: string;
  readabilityGrade: string;
}

export interface GeneratedBookAdaptation {
  id: string;
  bookTitle: string;
  chapterTitle: string;
  author: string;
  createdAt: string;
  sourceText: string;
  variants: Record<'A2' | 'B1' | 'B2' | 'C1' | 'original', GeneratedLevelVariant>;
  detectedAnnotations: {
    id: string;
    quote: string;
    type: string;
    typeLabel: string;
    noteUz: string;
    noteEn: string;
    thesaurusRef?: string;
  }[];
  extractedVocabulary: VocabWord[];
}

// ── Quiz ──────────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  chapterId: string;
  level: CEFRLevel;
  type: QuestionType;
  skill: 'reading' | 'vocabulary' | 'literary_analysis';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

// ── Class / Assignment ────────────────────────────────────────
export interface Class {
  id: string;
  teacherId: string;
  name: string;
  inviteCode: string;
  studentCount: number;
  createdAt: string;
}

export interface Assignment {
  id: string;
  classId: string;
  chapterId: string;
  level: CEFRLevel;
  dueDate: string;
  status: 'active' | 'closed';
}

// ── Progress ──────────────────────────────────────────────────
export interface UserProgress {
  userId: string;
  chapterId: string;
  level: CEFRLevel;
  readPercent: number;
  quizScore?: number;
  xpEarned: number;
  completedAt?: string;
}

// ── Analytics ─────────────────────────────────────────────────
export interface DailyStats {
  date: string;
  dau: number;
  newUsers: number;
  sessionsAvgMin: number;
}

export interface ChapterCompletionStat {
  chapterId: string;
  chapterTitle: string;
  completionRate: number;
  avgScore: number;
}
