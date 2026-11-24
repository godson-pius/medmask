import { Radius, Shadows } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  variant?: 'glass' | 'elevated' | 'tealTint' | 'neumorphic';
  intensity?: number;
  borderRadius?: number;
}

/**
 * Elevated Soft Neumorphic + Glassmorphic card container tuned for both light and dark modes.
 */
export function GlassCard({
  children,
  style,
  contentStyle,
  variant = 'glass',
  intensity = 30,
  borderRadius = Radius.lg,
}: GlassCardProps) {
  const { isDark } = useAppTheme();

  const surfaceBg = isDark
    ? {
      glass: 'rgba(19, 31, 42, 0.84)',
      elevated: '#131F2A',
      tealTint: '#10292D',
      neumorphic: '#162430',
    }[variant]
    : {
      glass: 'rgba(255, 255, 255, 0.86)',
      elevated: '#FFFFFF',
      tealTint: '#ECFBF8',
      neumorphic: '#FFFFFF',
    }[variant];

  const borderColor = isDark
    ? {
      glass: 'rgba(255, 255, 255, 0.08)',
      elevated: 'rgba(255, 255, 255, 0.08)',
      tealTint: 'rgba(45, 212, 191, 0.24)',
      neumorphic: 'rgba(255, 255, 255, 0.09)',
    }[variant]
    : {
      glass: 'rgba(27, 42, 61, 0.06)',
      elevated: 'rgba(27, 42, 61, 0.06)',
      tealTint: 'rgba(18, 181, 166, 0.22)',
      neumorphic: 'rgba(27, 42, 61, 0.05)',
    }[variant];

  const shadowStyle = isDark
    ? styles.darkShadow
    : variant === 'elevated'
      ? Shadows.card
      : variant === 'neumorphic'
        ? Shadows.neumorphic
        : Shadows.subtle;

  return (
    <View
      style={[
        styles.outerShadow,
        shadowStyle,
        { borderRadius },
        style,
      ]}>
      <View
        style={[
          styles.innerClip,
          {
            borderRadius,
            borderColor,
            backgroundColor: surfaceBg,
          },
        ]}>
        {Platform.OS !== 'android' && variant === 'glass' && (
          <BlurView
            intensity={intensity}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShadow: {
    backgroundColor: 'transparent',
  },
  darkShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 16,
    elevation: 4,
  },
  innerClip: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  content: {
    position: 'relative',
  },
});
