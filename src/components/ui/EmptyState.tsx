import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Typography, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { SecondaryButton } from './Buttons';
import { GlassCard } from './GlassCard';
import { Soft3DIcon } from './Soft3DIcon';

interface EmptyStateProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtext?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  iconName = 'chatbubble-ellipses-outline',
  title = 'Your private consultations will appear here.',
  subtext,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors } = useAppTheme();

  return (
    <GlassCard variant="elevated" contentStyle={styles.container}>
      <Soft3DIcon name={iconName} accent="teal" size="lg" style={styles.icon} />
      <Text style={[styles.title, { color: colors.navy }]}>{title}</Text>
      {subtext && (
        <Text style={[styles.subtext, { color: colors.textSecondary }]}>
          {subtext}
        </Text>
      )}
      {actionLabel && onAction && (
        <SecondaryButton
          label={actionLabel}
          onPress={onAction}
          style={styles.actionButton}
        />
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
  },
  icon: {
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h3,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtext: {
    ...Typography.bodySmall,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 19,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    minWidth: 190,
    height: 46,
    minHeight: 46,
  },
});
