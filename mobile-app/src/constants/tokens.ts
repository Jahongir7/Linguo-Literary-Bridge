// ============================================================
// Design Tokens — React Native
// ============================================================

export const Colors = {
  // Brand
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#4A43CC',
  accent: '#00D4FF',
  accentLight: '#33DDFF',

  // Semantic
  success: '#00E5A0',
  warning: '#FFB547',
  danger: '#FF5757',
  info: '#54A0FF',

  // CEFR
  a2: '#00C9A7',
  b1: '#4A90E2',
  b2: '#9B59B6',
  c1: '#E67E22',

  // Backgrounds
  bgBase: '#0A0B1A',
  bgSurface: '#11122A',
  bgCard: '#181934',
  bgCardHover: '#1E2040',
  bgGlass: 'rgba(255,255,255,0.05)',
  bgGlassBorder: 'rgba(255,255,255,0.10)',

  // Text
  textPrimary: '#F0F2FF',
  textSecondary: 'rgba(240,242,255,0.65)',
  textMuted: 'rgba(240,242,255,0.35)',
  white: '#FFFFFF',
} as const;

export const Gradients = {
  primary: ['#6C63FF', '#00D4FF'] as const,
  success: ['#00E5A0', '#00B8D4'] as const,
  card: ['rgba(108,99,255,0.15)', 'rgba(0,212,255,0.08)'] as const,
  hero: ['#0A0B1A', '#141530'] as const,
  cefr: {
    A2: ['#00C9A7', '#00A88E'] as const,
    B1: ['#4A90E2', '#2980B9'] as const,
    B2: ['#9B59B6', '#7D3C98'] as const,
    C1: ['#E67E22', '#CA6F1E'] as const,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  primary: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const CEFR_COLORS = {
  A2: Colors.a2,
  B1: Colors.b1,
  B2: Colors.b2,
  C1: Colors.c1,
} as const;

export const CEFR_LABELS = {
  A2: 'Boshlang\'ich',
  B1: 'O\'rta-pastki',
  B2: 'O\'rta-yuqori',
  C1: 'Ilg\'or',
} as const;
