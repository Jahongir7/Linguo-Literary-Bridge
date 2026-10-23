// ============================================================
// Book & Learning Store — Zustand with LocalStorage Persistence
// ============================================================
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CEFRLevel,
  Work,
  Chapter,
  Paragraph,
  Annotation,
  ThesaurusEntry,
  VocabWord,
  GeneratedBookAdaptation,
} from '@/types';
import {
  LITERARY_WORKS,
  LITERARY_CHAPTERS,
  CHAPTER_1_PARAGRAPHS,
  LITERARY_ANNOTATIONS,
  LITERARY_THESAURUS,
  LITERARY_VOCABULARY,
} from '@/data/literaryData';

interface BookState {
  works: Work[];
  chapters: Chapter[];
  paragraphsByLevel: Record<string, Record<CEFRLevel | 'original', Paragraph[]>>;
  activeLevel: CEFRLevel;
  activeChapterId: string;
  annotations: Annotation[];
  thesaurus: ThesaurusEntry[];
  vocabulary: VocabWord[];
  savedWordIds: string[];
  generatedBooks: GeneratedBookAdaptation[];
  xp: number;
  streak: number;
  readProgress: Record<string, number>; // chapterId -> percentage
  audioPlaying: boolean;
  audioCurrentSentence: number;

  // Actions
  setActiveLevel: (level: CEFRLevel) => void;
  setActiveChapterId: (id: string) => void;
  toggleSavedWord: (wordId: string) => void;
  addXP: (amount: number) => void;
  setReadProgress: (chapterId: string, percent: number) => void;
  setAudioPlaying: (playing: boolean) => void;
  setAudioCurrentSentence: (index: number) => void;
  addGeneratedBook: (adaptation: GeneratedBookAdaptation) => void;
  getChapterParagraphs: (chapterId: string, level: CEFRLevel | 'original') => Paragraph[];
}

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      works: LITERARY_WORKS,
      chapters: LITERARY_CHAPTERS,
      paragraphsByLevel: {
        'gf-p1-c01': CHAPTER_1_PARAGRAPHS,
      },
      activeLevel: 'B1',
      activeChapterId: 'gf-p1-c01',
      annotations: LITERARY_ANNOTATIONS,
      thesaurus: LITERARY_THESAURUS,
      vocabulary: LITERARY_VOCABULARY,
      savedWordIds: ['v1', 'v4'],
      generatedBooks: [],
      xp: 1450,
      streak: 12,
      readProgress: {
        'gf-p1-c01': 85,
        'gf-p1-c02': 20,
      },
      audioPlaying: false,
      audioCurrentSentence: 0,

      setActiveLevel: (level) => set({ activeLevel: level }),
      setActiveChapterId: (id) => set({ activeChapterId: id }),

      toggleSavedWord: (wordId) =>
        set((state) => ({
          savedWordIds: state.savedWordIds.includes(wordId)
            ? state.savedWordIds.filter((id) => id !== wordId)
            : [...state.savedWordIds, wordId],
          xp: state.savedWordIds.includes(wordId) ? state.xp : state.xp + 10,
        })),

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      setReadProgress: (chapterId, percent) =>
        set((state) => ({
          readProgress: { ...state.readProgress, [chapterId]: percent },
        })),

      setAudioPlaying: (playing) => set({ audioPlaying: playing }),
      setAudioCurrentSentence: (index) => set({ audioCurrentSentence: index }),

      addGeneratedBook: (adaptation) => {
        const bookSlug = adaptation.id;
        const chId = `${bookSlug}-c01`;

        const newWork: Work = {
          id: bookSlug,
          title: adaptation.bookTitle,
          author: adaptation.author,
          description: `AI yordamida A2, B1, B2, C1 darajalariga moslashtirilgan yangi asar: ${adaptation.chapterTitle}`,
          coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
          totalChapters: 1,
          status: 'published',
        };

        const newChapter: Chapter = {
          id: chId,
          workId: bookSlug,
          partNumber: 1,
          chapterNumber: 1,
          title: adaptation.chapterTitle,
          status: 'published',
          versions: ['A2', 'B1', 'B2', 'C1'],
        };

        const paragraphs: Record<CEFRLevel | 'original', Paragraph[]> = {
          original: adaptation.variants.original.paragraphs,
          C1: adaptation.variants.C1.paragraphs,
          B2: adaptation.variants.B2.paragraphs,
          B1: adaptation.variants.B1.paragraphs,
          A2: adaptation.variants.A2.paragraphs,
        };

        set((state) => ({
          works: [newWork, ...state.works],
          chapters: [newChapter, ...state.chapters],
          paragraphsByLevel: {
            ...state.paragraphsByLevel,
            [chId]: paragraphs,
          },
          generatedBooks: [adaptation, ...state.generatedBooks],
          activeChapterId: chId,
        }));
      },

      getChapterParagraphs: (chapterId, level) => {
        const state = get();
        const ch = state.paragraphsByLevel[chapterId];
        if (ch && ch[level]) {
          return ch[level];
        }
        // Fallback to Chapter 1
        return CHAPTER_1_PARAGRAPHS[level] || CHAPTER_1_PARAGRAPHS.B1;
      },
    }),
    {
      name: 'linguo-book-storage',
    }
  )
);
