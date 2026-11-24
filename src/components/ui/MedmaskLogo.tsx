import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { Typography, Spacing, Shadows } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface MedmaskLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'full' | 'horizontal' | 'icon';
  style?: ViewStyle;
}

export function MedmaskLogo({
  size = 'md',
  showTagline = false,
  variant = 'horizontal',
  style,
}: MedmaskLogoProps) {
  const { colors, isDark } = useAppTheme();

  const config = {
    sm: { iconSize: 32, textMed: 18, textMask: 18, logoWidth: 100, logoHeight: 30 },
    md: { iconSize: 40, textMed: 22, textMask: 22, logoWidth: 130, logoHeight: 38 },
    lg: { iconSize: 52, textMed: 26, textMask: 26, logoWidth: 170, logoHeight: 50 },
    xl: { iconSize: 84, textMed: 34, textMask: 34, logoWidth: 220, logoHeight: 70 },
  }[size];

  if (variant === 'full') {
    return (
      <View style={[styles.container, { alignItems: 'center' }, style]}>
        <View
          style={[
            styles.fullLogoOrb,
            {
              backgroundColor: isDark ? '#172533' : '#FFFFFF',
              borderColor: isDark ? colors.borderGlass : colors.border,
            },
            !isDark && Shadows.neumorphic,
          ]}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={{
              width: config.logoWidth * 0.9,
              height: config.logoWidth * 0.9,
              resizeMode: 'contain',
            }}
            accessibilityLabel="Medmask Logo"
          />
        </View>
        {showTagline && (
          <Text
            style={[
              styles.tagline,
              { textAlign: 'center', color: colors.textSecondary },
            ]}>
            Anonymous healthcare for the questions you're afraid to ask.
          </Text>
        )}
      </View>
    );
  }

  if (variant === 'icon') {
    return (
      <View
        style={[
          styles.iconBox,
          !isDark && Shadows.neumorphic,
          {
            width: config.iconSize + 10,
            height: config.iconSize + 10,
            borderRadius: (config.iconSize + 10) / 2,
            backgroundColor: isDark ? '#172533' : '#FFFFFF',
            borderColor: isDark ? colors.borderGlass : colors.border,
          },
          style,
        ]}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={{
            width: config.iconSize,
            height: config.iconSize,
            resizeMode: 'contain',
          }}
          accessibilityLabel="Medmask Emblem"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.horizontalRow}>
        <View
          style={[
            styles.iconFrame,
            !isDark && Shadows.subtle,
            {
              width: config.iconSize,
              height: config.iconSize,
              borderRadius: config.iconSize * 0.34,
              backgroundColor: isDark ? '#172533' : '#FFFFFF',
              borderColor: isDark ? colors.borderGlass : colors.border,
            },
          ]}>
          <Image
            source={require('@/assets/images/medmask-spark.png')}
            style={{
              width: config.iconSize * 0.72,
              height: config.iconSize * 0.72,
              resizeMode: 'contain',
            }}
            accessibilityLabel="Medmask"
          />
        </View>

        <View style={styles.wordmarkRow}>
          <Text
            style={[
              styles.wordmarkMed,
              { fontSize: config.textMed, color: colors.navy },
            ]}>
            Med
          </Text>
          <Text
            style={[
              styles.wordmarkMask,
              { fontSize: config.textMask, color: colors.brandTeal },
            ]}>
            mask
          </Text>
        </View>
      </View>

      {showTagline && (
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Anonymous healthcare for the questions you're afraid to ask.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  fullLogoOrb: {
    width: 112,
    height: 112,
    borderRadius: 34,
    borderWidth: 1.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFrame: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.25,
    overflow: 'hidden',
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordmarkMed: {
    fontFamily: 'Urbanist_800ExtraBold',
    letterSpacing: -0.6,
  },
  wordmarkMask: {
    fontFamily: 'Urbanist_800ExtraBold',
    letterSpacing: -0.6,
  },
  tagline: {
    ...Typography.bodySmall,
    marginTop: Spacing.xs,
    maxWidth: 320,
    lineHeight: 18,
  },
});
