// ============================================================
// Storage Service — AsyncStorage persistent storage
// ============================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CEFRLevel, VocabWord } from '../types';

const KEYS = {
  GEMINI_API_KEY: '@llb_gemini_api_key',
  USER_LEVEL: '@llb_user_level',
  USER_XP: '@llb_user_xp',
  USER_STREAK: '@llb_user_streak',
  SAVED_WORDS: '@llb_saved_words',
  COMPLETED_CHAPTERS: '@llb_completed_chapters',
  THEME: '@llb_theme',
  FONT_SIZE: '@llb_font_size',
  HAS_ONBOARDED: '@llb_has_onboarded',
};

export const StorageService = {
  // Gemini API Key
  async getGeminiApiKey(): Promise<string> {
    try {
      const customKey = await AsyncStorage.getItem(KEYS.GEMINI_API_KEY);
      if (customKey && customKey.trim().length > 0) {
        return customKey;
      }
      return process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
    } catch {
      return '';
    }
  },

  async setGeminiApiKey(apiKey: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.GEMINI_API_KEY, apiKey);
  },

  // Onboarding status
  async getHasOnboarded(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEYS.HAS_ONBOARDED);
    return val === 'true';
  },

  async setHasOnboarded(status: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.HAS_ONBOARDED, status ? 'true' : 'false');
  },

  // CEFR Level
  async getUserLevel(): Promise<CEFRLevel> {
    const val = await AsyncStorage.getItem(KEYS.USER_LEVEL);
    return (val as CEFRLevel) || 'B1';
  },

  async setUserLevel(level: CEFRLevel): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER_LEVEL, level);
  },

  // XP & Streak
  async getXP(): Promise<number> {
    const val = await AsyncStorage.getItem(KEYS.USER_XP);
    return val ? parseInt(val, 10) : 450;
  },

  async addXP(points: number): Promise<number> {
    const current = await this.getXP();
    const next = current + points;
    await AsyncStorage.setItem(KEYS.USER_XP, next.toString());
    return next;
  },

  async getStreak(): Promise<number> {
    const val = await AsyncStorage.getItem(KEYS.USER_STREAK);
    return val ? parseInt(val, 10) : 5;
  },

  // Saved Vocabulary
  async getSavedWords(): Promise<VocabWord[]> {
    try {
      const val = await AsyncStorage.getItem(KEYS.SAVED_WORDS);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  },

  async saveWord(word: VocabWord): Promise<void> {
    const words = await this.getSavedWords();
    if (!words.some((w) => w.id === word.id || w.word.toLowerCase() === word.word.toLowerCase())) {
      words.unshift({ ...word, dateAdded: new Date().toISOString() });
      await AsyncStorage.setItem(KEYS.SAVED_WORDS, JSON.stringify(words));
    }
  },

  async removeWord(wordId: string): Promise<void> {
    const words = await this.getSavedWords();
    const filtered = words.filter((w) => w.id !== wordId);
    await AsyncStorage.setItem(KEYS.SAVED_WORDS, JSON.stringify(filtered));
  },
};
