import { Platform } from 'react-native';

export interface AppColors {
  // Primary Apple-inspired Medical Teal Palette
  brandTeal: string;
  brandTealLight: string;
  brandTealDark: string;
  brandTealBg: string;
  brandTealBorder: string;

  // Deep Slate-Navy for Crisp Minimalist Typography
  brandIndigo: string;
  brandIndigoLight: string;
  brandIndigoDark: string;
  brandIndigoBg: string;
  brandIndigoBorder: string;

  // Primary & Secondary Brand Tokens
  navy: string;
  navyDark: string;
  navyLight: string;
  teal: string;
  tealLight: string;
  tealDark: string;
  tealMuted: string;
  tealBorder: string;

  // Plain Minimalist Background & Ambient Tokens
  ambientBase: string;
  ambientMint: string;
  ambientMintSoft: string;
  ambientPeach: string;
  ambientPeachSoft: string;
  ambientSky: string;

  // Glassmorphism & Soft Neumorphism Surfaces
  background: string;
  surface: string;
  surfaceSolid: string;
  surfaceGlass: string;
  surfaceGlassStrong: string;
  surfaceSubtle: string;
  surfaceMuted: string;

  // Specular Borders & Dividers
  border: string;
  borderSubtle: string;
  borderGlass: string;
  borderOutline: string;
  borderFocus: string;

  // Refined Typography Colors
  text: string;
  textBody: string;
  textSecondary: string;
  textMuted: string;
  textLight: string;

  // 3D Icon Accent Tints
  coral: string;
  coralBg: string;
  sky: string;
  skyBg: string;
  lavender: string;
  lavenderBg: string;
  amber: string;
  amberBg: string;
  mint: string;
  mintBg: string;

  // Semantic Status
  success: string;
  successBg: string;
  successBorder: string;
  successText: string;

  // Warning
  warning: string;
  warningBg: string;
  warningBorder: string;
  warningText: string;

  // Error
  error: string;
  errorBg: string;
  errorBorder: string;
  errorText: string;

  // Subtle tints
  accentPill: string;
  neutralPill: string;
  cardShadow: string;

  // Legacy Theme support
  light: {
    text: string;
    background: string;
    backgroundElement: string;
    backgroundSelected: string;
    textSecondary: string;
  };
  dark: {
    text: string;
    background: string;
    backgroundElement: string;
    backgroundSelected: string;
    textSecondary: string;
  };
}

const LEGACY_SCHEMES = {
  light: {
    text: '#1B2A3D',
    background: '#F6F8FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E6FAF7',
    textSecondary: '#5A6E82',
  },
  dark: {
    text: '#F1F6FA',
    background: '#0B1218',
    backgroundElement: '#131F2A',
    backgroundSelected: '#163638',
    textSecondary: '#94A8B8',
  },
};

export const LightColors: AppColors = {
  brandTeal: '#12B5A6',
  brandTealLight: '#2DD4BF',
  brandTealDark: '#0D8A7E',
  brandTealBg: '#E6FAF7',
  brandTealBorder: 'rgba(18, 181, 166, 0.28)',

  brandIndigo: '#1B2A3D',
  brandIndigoLight: '#334863',
  brandIndigoDark: '#0F1B29',
  brandIndigoBg: '#EDF3FA',
  brandIndigoBorder: 'rgba(27, 42, 61, 0.14)',

  navy: '#1B2A3D',
  navyDark: '#0F1B29',
  navyLight: '#334863',
  teal: '#12B5A6',
  tealLight: '#2DD4BF',
  tealDark: '#0D8A7E',
  tealMuted: '#E6FAF7',
  tealBorder: 'rgba(18, 181, 166, 0.28)',

  ambientBase: '#F6F8FA',
  ambientMint: 'rgba(134, 232, 222, 0.42)',
  ambientMintSoft: 'rgba(178, 245, 237, 0.36)',
  ambientPeach: 'rgba(255, 198, 174, 0.38)',
  ambientPeachSoft: 'rgba(255, 220, 202, 0.34)',
  ambientSky: 'rgba(176, 222, 255, 0.30)',

  background: '#F6F8FA',
  surface: 'rgba(255, 255, 255, 0.90)',
  surfaceSolid: '#FFFFFF',
  surfaceGlass: 'rgba(255, 255, 255, 0.86)',
  surfaceGlassStrong: 'rgba(255, 255, 255, 0.94)',
  surfaceSubtle: '#F0F4F8',
  surfaceMuted: '#E6EDF2',

  border: 'rgba(27, 42, 61, 0.08)',
  borderSubtle: 'rgba(27, 42, 61, 0.07)',
  borderGlass: 'rgba(255, 255, 255, 0.92)',
  borderOutline: 'rgba(27, 42, 61, 0.10)',
  borderFocus: '#12B5A6',

  text: '#1B2A3D',
  textBody: '#334659',
  textSecondary: '#5A6E82',
  textMuted: '#7D90A3',
  textLight: '#F8FAFC',

  coral: '#F46A5E',
  coralBg: '#FFF0EE',
  sky: '#3B9EFF',
  skyBg: '#EDF6FF',
  lavender: '#8B74F9',
  lavenderBg: '#F3F0FF',
  amber: '#F59E0B',
  amberBg: '#FFF8EB',
  mint: '#12B5A6',
  mintBg: '#E6FAF7',

  success: '#12B5A6',
  successBg: 'rgba(230, 250, 247, 0.92)',
  successBorder: 'rgba(18, 181, 166, 0.32)',
  successText: '#0D8A7E',

  warning: '#F59E0B',
  warningBg: 'rgba(255, 248, 235, 0.94)',
  warningBorder: 'rgba(245, 158, 11, 0.32)',
  warningText: '#B45309',

  error: '#F46A5E',
  errorBg: 'rgba(255, 240, 238, 0.94)',
  errorBorder: 'rgba(244, 106, 94, 0.30)',
  errorText: '#C53030',

  accentPill: '#ECFBF8',
  neutralPill: '#FFFFFF',
  cardShadow: 'rgba(15, 76, 82, 0.09)',

  ...LEGACY_SCHEMES,
};

export const DarkColors: AppColors = {
  brandTeal: '#18C4B4',
  brandTealLight: '#2DD4BF',
  brandTealDark: '#2DD4BF',
  brandTealBg: 'rgba(24, 196, 180, 0.16)',
  brandTealBorder: 'rgba(45, 212, 191, 0.30)',

  brandIndigo: '#F1F6FA',
  brandIndigoLight: '#CBD8E4',
  brandIndigoDark: '#0B1218',
  brandIndigoBg: 'rgba(148, 168, 184, 0.14)',
  brandIndigoBorder: 'rgba(255, 255, 255, 0.12)',

  navy: '#F1F6FA',
  navyDark: '#FFFFFF',
  navyLight: '#CBD8E4',
  teal: '#18C4B4',
  tealLight: '#2DD4BF',
  tealDark: '#2DD4BF',
  tealMuted: 'rgba(24, 196, 180, 0.16)',
  tealBorder: 'rgba(45, 212, 191, 0.28)',

  ambientBase: '#0B1218',
  ambientMint: 'rgba(24, 196, 180, 0.12)',
  ambientMintSoft: 'rgba(24, 196, 180, 0.08)',
  ambientPeach: 'rgba(244, 106, 94, 0.08)',
  ambientPeachSoft: 'rgba(244, 106, 94, 0.06)',
  ambientSky: 'rgba(59, 158, 255, 0.08)',

  background: '#0B1218',
  surface: '#131F2A',
  surfaceSolid: '#131F2A',
  surfaceGlass: 'rgba(19, 31, 42, 0.86)',
  surfaceGlassStrong: '#172533',
  surfaceSubtle: '#1B2B3A',
  surfaceMuted: '#223446',

  border: 'rgba(255, 255, 255, 0.09)',
  borderSubtle: 'rgba(255, 255, 255, 0.07)',
  borderGlass: 'rgba(255, 255, 255, 0.12)',
  borderOutline: 'rgba(255, 255, 255, 0.14)',
  borderFocus: '#2DD4BF',

  text: '#F1F6FA',
  textBody: '#D1DDE6',
  textSecondary: '#94A8B8',
  textMuted: '#6E8394',
  textLight: '#F8FAFC',

  coral: '#FF7B70',
  coralBg: 'rgba(244, 106, 94, 0.18)',
  sky: '#5EB0FF',
  skyBg: 'rgba(59, 158, 255, 0.18)',
  lavender: '#A593FF',
  lavenderBg: 'rgba(139, 116, 249, 0.18)',
  amber: '#FBBF24',
  amberBg: 'rgba(245, 158, 11, 0.18)',
  mint: '#2DD4BF',
  mintBg: 'rgba(24, 196, 180, 0.18)',

  success: '#18C4B4',
  successBg: 'rgba(24, 196, 180, 0.16)',
  successBorder: 'rgba(45, 212, 191, 0.30)',
  successText: '#2DD4BF',

  warning: '#FBBF24',
  warningBg: 'rgba(245, 158, 11, 0.16)',
  warningBorder: 'rgba(251, 191, 36, 0.30)',
  warningText: '#FCD34D',

  error: '#F87171',
  errorBg: 'rgba(244, 106, 94, 0.16)',
  errorBorder: 'rgba(248, 113, 113, 0.30)',
  errorText: '#FCA5A5',

  accentPill: 'rgba(24, 196, 180, 0.15)',
  neutralPill: '#172533',
  cardShadow: 'rgba(0, 0, 0, 0.38)',

  ...LEGACY_SCHEMES,
};

export const Colors = LightColors;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const FontFamily = {
  regular: 'Urbanist_400Regular',
  medium: 'Urbanist_500Medium',
  semiBold: 'Urbanist_600SemiBold',
  bold: 'Urbanist_700Bold',
  extraBold: 'Urbanist_800ExtraBold',
} as const;

export const Fonts = {
  sans: FontFamily.regular,
  serif: FontFamily.regular,
  rounded: FontFamily.semiBold,
  mono: Platform.select({
    ios: 'ui-monospace',
    web: 'var(--font-mono)',
    default: 'monospace',
  }),
};

export const Typography = {
  fontFamily: FontFamily.regular,
  display: {
    fontFamily: FontFamily.bold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.15,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 19,
  },
  caption: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,

  // Legacy mappings
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 9999,
} as const;

export const Shadows = {
  subtle: {
    shadowColor: '#0E4F56',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  card: {
    shadowColor: '#0E4F56',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 22,
    elevation: 4,
  },
  neumorphic: {
    shadowColor: '#0E4F56',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  tealGlow: {
    shadowColor: '#12B5A6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.34,
    shadowRadius: 16,
    elevation: 6,
  },
  floating: {
    shadowColor: '#0E4F56',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 8,
  },
} as const;

export const BRAND_NAME = 'Medmask';
export const BRAND_TAGLINE = "Anonymous healthcare for the questions you're afraid to ask.";
