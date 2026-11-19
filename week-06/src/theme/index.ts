// src/theme/index.ts — Paleta, tipografía y espaciado compartidos

import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#111827',
  card: '#1F2937',
  border: '#374151',
  accent: '#3B82F6',
  accentLight: '#93C5FD',
  text: '#F9FAFB',
  textMuted: '#6B7280',
  textSecondary: '#9CA3AF',
  error: '#EF4444',
  errorLight: '#FCA5A5',
  success: '#22C55E',
  warning: '#F59E0B',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
};

export const TYPOGRAPHY = StyleSheet.create({
  h2:      { fontSize: 20, fontWeight: '700', color: COLORS.text },
  h3:      { fontSize: 16, fontWeight: '700', color: COLORS.text },
  body:    { fontSize: 14, fontWeight: '400', color: COLORS.text },
  label:   { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  caption: { fontSize: 12, fontWeight: '400', color: COLORS.textMuted },
  error:   { fontSize: 12, fontWeight: '400', color: COLORS.errorLight },
});
