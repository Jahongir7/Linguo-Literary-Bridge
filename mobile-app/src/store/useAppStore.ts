// ============================================================
// Zustand Store — Student App Global State
// ============================================================

import { create } from 'zustand';
import { CEFRLevel, ReaderTheme, VocabWord, Annotation, InterfaceLang } from '../types';
import { StorageService } from '../services/storageService';
import { MOCK_VOCABULARY } from '../data/mockData';

export type ActiveScreen =
  | 'onboarding'
  | 'placement'
  | 'library'
  | 'reader'
  | 'thesaurus'
  | 'practice'
  | 'figure_game'
  | 'gadfly_chat'
  | 'profile';

interface AppState {
  // Navigation
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;

  // Student Profile
  name: string;
  cefrLevel: CEFRLevel;
  xp: number;
  streak: number;
  interfaceLang: InterfaceLang;
  savedWords: VocabWord[];
  setCefrLevel: (level: CEFRLevel) => void;
  addXP: (amount: number) => void;
  saveWord: (word: VocabWord) => void;
  removeWord: (wordId: string) => void;

  // Reader State
  currentChapterId: string;
  fontSize: number;
  readerTheme: ReaderTheme;
  parallelMode: boolean;
  selectedAnnotation: Annotation | null;
  selectedWord: VocabWord | null;
  gadflyContextPrompt: { quote?: string; paragraphId?: string } | null;

  setCurrentChapterId: (id: string) => void;
  setFontSize: (size: number) => void;
  setReaderTheme: (theme: ReaderTheme) => void;
  toggleParallelMode: () => void;
  setSelectedAnnotation: (ann: Annotation | null) => void;
  setSelectedWord: (word: VocabWord | null) => void;
  setGadflyContextPrompt: (ctx: { quote?: string; paragraphId?: string } | null) => void;

  // Init
  initFromStorage: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeScreen: 'onboarding',
  setActiveScreen: (activeScreen) => set({ activeScreen }),

  name: 'Alisher',
  cefrLevel: 'B1',
  xp: 450,
  streak: 7,
  interfaceLang: 'uz',
  savedWords: MOCK_VOCABULARY.slice(0, 3),

  setCefrLevel: async (level) => {
    set({ cefrLevel: level });
    await StorageService.setUserLevel(level);
  },

  addXP: async (amount) => {
    const newXP = get().xp + amount;
    set({ xp: newXP });
    await StorageService.addXP(amount);
  },

  saveWord: async (word) => {
    const words = get().savedWords;
    if (!words.some((w) => w.id === word.id || w.word.toLowerCase() === word.word.toLowerCase())) {
      const updated = [word, ...words];
      set({ savedWords: updated });
      await StorageService.saveWord(word);
    }
  },

  removeWord: async (wordId) => {
    const updated = get().savedWords.filter((w) => w.id !== wordId);
    set({ savedWords: updated });
    await StorageService.removeWord(wordId);
  },

  // Reader
  currentChapterId: 'gf-p1-c01',
  fontSize: 16,
  readerTheme: 'dark',
  parallelMode: false,
  selectedAnnotation: null,
  selectedWord: null,
  gadflyContextPrompt: null,

  setCurrentChapterId: (currentChapterId) => set({ currentChapterId }),
  setFontSize: (fontSize) => set({ fontSize }),
  setReaderTheme: (readerTheme) => set({ readerTheme }),
  toggleParallelMode: () => set((state) => ({ parallelMode: !state.parallelMode })),
  setSelectedAnnotation: (selectedAnnotation) => set({ selectedAnnotation }),
  setSelectedWord: (selectedWord) => set({ selectedWord }),
  setGadflyContextPrompt: (gadflyContextPrompt) => set({ gadflyContextPrompt }),

  initFromStorage: async () => {
    const level = await StorageService.getUserLevel();
    const xp = await StorageService.getXP();
    const streak = await StorageService.getStreak();
    const words = await StorageService.getSavedWords();
    const hasOnboarded = await StorageService.getHasOnboarded();

    set({
      cefrLevel: level,
      xp,
      streak,
      savedWords: words.length > 0 ? words : MOCK_VOCABULARY.slice(0, 3),
      activeScreen: hasOnboarded ? 'library' : 'onboarding',
    });
  },
}));
