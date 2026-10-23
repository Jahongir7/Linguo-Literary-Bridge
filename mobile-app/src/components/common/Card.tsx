// ============================================================
// Card Component — Glassmorphism & Elevated containers
// ============================================================

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius, Shadow } from '../../constants/tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'glass' | 'solid' | 'highlight';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'glass',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'solid':
        return styles.solid;
      case 'highlight':
        return styles.highlight;
      default:
        return styles.glass;
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        style={[styles.card, getVariantStyle(), Shadow.md, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, getVariantStyle(), Shadow.md, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    overflow: 'hidden',
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  solid: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  highlight: {
    backgroundColor: 'rgba(108,99,255,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(108,99,255,0.4)',
  },
});
