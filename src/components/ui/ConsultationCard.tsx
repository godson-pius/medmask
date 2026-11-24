import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Consultation } from '@/types';
import { StatusBadge } from './StatusBadge';
import { GlassCard } from './GlassCard';
import { Soft3DIcon } from './Soft3DIcon';
import { Typography, Spacing, Radius } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ConsultationCardProps {
  consultation: Consultation;
  onPress: () => void;
}

export function ConsultationCard({ consultation, onPress }: ConsultationCardProps) {
  const { colors } = useAppTheme();

  const dateFormatted = new Date(consultation.createdAt).toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
    }
  );

  const iconAccent =
    consultation.status === 'responded'
      ? 'teal'
      : consultation.status === 'under_review'
        ? 'sky'
        : 'amber';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Consultation about ${consultation.category}`}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <GlassCard variant="elevated" contentStyle={styles.cardContent}>
        <View style={styles.topRow}>
          <View style={styles.categoryGroup}>
            <Soft3DIcon
              name={
                consultation.status === 'responded'
                  ? 'checkmark-done'
                  : 'chatbubble-ellipses'
              }
              accent={iconAccent}
              size="sm"
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.categoryText, { color: colors.navy }]} numberOfLines={1}>
                {consultation.category}
              </Text>
              <View style={styles.metaRow}>
                <Ionicons name="lock-closed" size={11} color={colors.textMuted} />
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  {consultation.anonymousId}
                </Text>
                <Text style={[styles.metaDot, { color: colors.textMuted }]}>•</Text>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  {dateFormatted}
                </Text>
              </View>
            </View>
          </View>
          <StatusBadge status={consultation.status} showIcon={false} />
        </View>

        <Text style={[styles.description, { color: colors.textBody }]} numberOfLines={2}>
          {consultation.description}
        </Text>

        {consultation.symptoms.length > 0 && (
          <View style={styles.symptomsRow}>
            {consultation.symptoms.slice(0, 3).map((symp, i) => (
              <View
                key={i}
                style={[
                  styles.symptomTag,
                  {
                    backgroundColor: colors.brandTealBg,
                    borderColor: colors.tealBorder,
                  },
                ]}>
                <Text style={[styles.symptomText, { color: colors.tealDark }]}>
                  {symp}
                </Text>
              </View>
            ))}
            {consultation.symptoms.length > 3 && (
              <View
                style={[
                  styles.symptomTag,
                  {
                    backgroundColor: colors.brandTealBg,
                    borderColor: colors.tealBorder,
                  },
                ]}>
                <Text style={[styles.symptomText, { color: colors.tealDark }]}>
                  +{consultation.symptoms.length - 3} more
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={[styles.bottomRow, { borderTopColor: colors.borderSubtle }]}>
          <Text style={[styles.openText, { color: colors.tealDark }]}>
            {consultation.status === 'responded'
              ? 'View clinical guidance'
              : 'View status & details'}
          </Text>
          <View style={[styles.chevronPill, { backgroundColor: colors.brandTealBg }]}>
            <Ionicons name="chevron-forward" size={14} color={colors.tealDark} />
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.94,
  },
  cardContent: {
    padding: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  categoryGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  categoryText: {
    ...Typography.h3,
    fontSize: 15,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaText: {
    ...Typography.caption,
    fontSize: 11,
  },
  metaDot: {
    fontSize: 11,
  },
  description: {
    ...Typography.bodySmall,
    fontSize: 14,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  symptomsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.md,
  },
  symptomTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  symptomText: {
    ...Typography.caption,
    fontSize: 11,
    fontFamily: 'Urbanist_600SemiBold',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  openText: {
    ...Typography.caption,
    fontFamily: 'Urbanist_600SemiBold',
  },
  chevronPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
