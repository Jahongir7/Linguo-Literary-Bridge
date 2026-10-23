// ============================================================
// Auth Store — Zustand
// ============================================================
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { MOCK_AUTH_CREDENTIALS, findUserById } from '@/data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  switchDemoRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const cred = MOCK_AUTH_CREDENTIALS[email];
        if (!cred || cred.password !== password) {
          return { success: false, error: 'Email yoki parol noto\'g\'ri' };
        }
        const user = findUserById(cred.userId);
        if (!user) return { success: false, error: 'Foydalanuvchi topilmadi' };
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      switchDemoRole: (role: UserRole) => {
        const roleUsers: Record<UserRole, string> = {
          admin: 'u1',
          teacher: 'u2',
          editor: 'u3',
          student: 'u4',
        };
        const user = findUserById(roleUsers[role]) || null;
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);

export function getRoleHomeRoute(role: UserRole): string {
  switch (role) {
    case 'admin':   return '/admin/dashboard';
    case 'teacher': return '/teacher/dashboard';
    case 'editor':  return '/editor/dashboard';
    case 'student': return '/library';
    default:        return '/library';
  }
}
