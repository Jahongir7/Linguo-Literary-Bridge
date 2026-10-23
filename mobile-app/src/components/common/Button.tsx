// ============================================================
// Button Component — Vibrant gradient and glass buttons
// ============================================================

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../../constants/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: FontSize.sm, height: 38 },
    md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: FontSize.md, height: 48 },
    lg: { paddingVertical: 15, paddingHorizontal: 26, fontSize: FontSize.lg, height: 56 },
  }[size];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.container, Shadow.primary, style]}
      >
        <LinearGradient
          colors={['#6C63FF', '#00D4FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            { height: sizeStyles.height, paddingHorizontal: sizeStyles.paddingHorizontal },
            disabled && styles.disabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <View style={styles.content}>
              {icon && <View style={styles.iconMargin}>{icon}</View>}
              <Text style={[styles.textPrimary, { fontSize: sizeStyles.fontSize }, textStyle]}>
                {title}
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'glass':
        return styles.glass;
      case 'outline':
        return styles.outline;
      case 'danger':
        return styles.danger;
      default:
        return styles.glass;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.baseButton,
        getVariantStyle(),
        { height: sizeStyles.height, paddingHorizontal: sizeStyles.paddingHorizontal },
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textPrimary} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconMargin}>{icon}</View>}
          <Text style={[styles.textDefault, { fontSize: sizeStyles.fontSize }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseButton: {
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: '#23254A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6C63FF',
  },
  danger: {
    backgroundColor: 'rgba(255,87,87,0.15)',
    borderWidth: 1,
    borderColor: '#FF5757',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
  textPrimary: {
    color: '#FFFFFF',
    fontWeight: FontWeight.bold,
  },
  textDefault: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold,
  },
  disabled: {
    opacity: 0.5,
  },
});
