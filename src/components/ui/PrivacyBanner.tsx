import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { Soft3DIcon } from './Soft3DIcon';

interface PrivacyBannerProps {
  label?: string;
  subtext?: string;
  variant?: 'pill' | 'card';
}

export function PrivacyBanner({
  label = 'Private & confidential',
  subtext,
  variant = 'pill',
}: PrivacyBannerProps) {
  const { colors, isDark } = useAppTheme();

  if (variant === 'card') {
    return (
      <GlassCard variant="tealTint" contentStyle={styles.cardContainer}>
        <Soft3DIcon name="lock-closed" accent="teal" size="sm" />
        <View style={styles.textContainer}>
          <Text style={[styles.cardTitle, { color: colors.navy }]}>{label}</Text>
          {subtext ? (
            <Text style={[styles.cardSubtext, { color: colors.textSecondary }]}>
              {subtext}
            </Text>
          ) : null}
        </View>
      </GlassCard>
    );
  }

  return (
    <View
      style={[
        styles.pillContainer,
        {
          backgroundColor: colors.surfaceGlassStrong,
          borderColor: isDark ? colors.borderGlass : colors.border,
        },
        !isDark && Shadows.subtle,
      ]}>
      <Ionicons name="shield-checkmark" size={13} color={colors.brandTeal} />
      <Text style={[styles.pillText, { color: colors.tealDark }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  pillText: {
    ...Typography.caption,
    fontSize: 11.5,
    fontFamily: 'Urbanist_700Bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.h3,
    fontSize: 15,
  },
  cardSubtext: {
    ...Typography.bodySmall,
    marginTop: 2,
    lineHeight: 18,
  },
});
