// ============================================================
// Badge Component — CEFR & Category indicators
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CEFRLevel } from '../../types';
import { CEFR_COLORS, FontSize, FontWeight, BorderRadius } from '../../constants/tokens';

interface CEFRBadgeProps {
  level: CEFRLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const CEFRBadge: React.FC<CEFRBadgeProps> = ({ level, size = 'md' }) => {
  const color = CEFR_COLORS[level] || '#6C63FF';

  const sizeStyles = {
    sm: { paddingHorizontal: 6, paddingVertical: 2, fontSize: FontSize.xs },
    md: { paddingHorizontal: 10, paddingVertical: 4, fontSize: FontSize.sm },
    lg: { paddingHorizontal: 14, paddingVertical: 6, fontSize: FontSize.md },
  }[size];

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }, sizeStyles]}>
      <Text style={[styles.text, { color, fontSize: sizeStyles.fontSize }]}>{level}</Text>
    </View>
  );
};

interface TagBadgeProps {
  label: string;
  color?: string;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, color = '#00D4FF' }) => (
  <View style={[styles.tag, { backgroundColor: `${color}18`, borderColor: `${color}40` }]}>
    <Text style={[styles.tagText, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
});
