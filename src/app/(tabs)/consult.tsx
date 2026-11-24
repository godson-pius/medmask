import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppColors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { PrimaryButton } from '@/components/ui/Buttons';
import { ConsultationCard } from '@/components/ui/ConsultationCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { FadeSlideIn } from '@/components/ui/Motion';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ConsultationStatus } from '@/types';

type FilterType = 'all' | ConsultationStatus;

export default function ConsultTab() {
  const router = useRouter();
  const { consultations } = useConsultations();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredConsultations = consultations.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Consultations</Text>
            <Text style={styles.headerSubtext}>
              Private, judgment-free clinical guidance from verified professionals.
            </Text>
          </View>

          <PrimaryButton
            label="Start a consultation"
            icon={<Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />}
            onPress={() => router.push('/consultation/new')}
            style={styles.startButton}
          />

          <GlassCard
            variant="elevated"
            borderRadius={Radius.xl}
            style={styles.processOuter}
            contentStyle={styles.processCard}>
            <View style={styles.processStep}>
              <Soft3DIcon name="lock-closed" accent="teal" size="sm" />
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>1. Ask anonymously</Text>
                <Text style={styles.stepDesc}>No real name or identity shared</Text>
              </View>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.processStep}>
              <Soft3DIcon name="medical" accent="sky" size="sm" />
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>2. Clinical review</Text>
                <Text style={styles.stepDesc}>Evaluated by verified providers</Text>
              </View>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.processStep}>
              <Soft3DIcon name="navigate-circle" accent="lavender" size="sm" />
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>3. Clear next steps</Text>
                <Text style={styles.stepDesc}>Actionable testing & care path</Text>
              </View>
            </View>
          </GlassCard>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {(['all', 'submitted', 'under_review', 'responded'] as FilterType[]).map(
              (statusKey) => {
                const labelMap: Record<FilterType, string> = {
                  all: 'All',
                  submitted: 'Waiting',
                  under_review: 'Under review',
                  responded: 'Responded',
                };
                const isSelected = filter === statusKey;
                return (
                  <Pressable
                    key={statusKey}
                    onPress={() => setFilter(statusKey)}
                    style={[
                      styles.filterChip,
                      isSelected ? styles.filterChipActive : !isDark && Shadows.subtle,
                      isSelected && Shadows.tealGlow,
                    ]}>
                    <Text
                      style={[
                        styles.filterChipText,
                        isSelected && styles.filterChipTextActive,
                      ]}>
                      {labelMap[statusKey]}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </ScrollView>

          {filteredConsultations.length === 0 ? (
            <EmptyState
              title="No consultations found"
              subtext={
                filter === 'all'
                  ? 'Your private consultations will appear here once submitted.'
                  : `No consultations currently with "${filter}" status.`
              }
              actionLabel="Start a consultation"
              onAction={() => router.push('/consultation/new')}
            />
          ) : (
            <View style={styles.list}>
              {filteredConsultations.map((item, idx) => (
                <FadeSlideIn key={item.id} delay={idx * 55}>
                  <ConsultationCard
                    consultation={item}
                    onPress={() => router.push(`/consultation/${item.id}`)}
                  />
                </FadeSlideIn>
              ))}
            </View>
          )}

          <EmergencyNotice compact />
        </ScrollView>
      </SafeAreaView>
    </AmbientBackground>
  );
}

const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingBottom: 116,
    },
    header: {
      paddingTop: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    headerTitle: {
      ...Typography.display,
      fontSize: 27,
      color: colors.navy,
    },
    headerSubtext: {
      ...Typography.bodySmall,
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      lineHeight: 20,
    },
    startButton: {
      marginBottom: Spacing.xl,
    },
    processOuter: {
      marginBottom: Spacing.xl,
    },
    processCard: {
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    processStep: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      ...Typography.label,
      color: colors.navy,
      fontSize: 14,
    },
    stepDesc: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      fontSize: 12,
    },
    stepDivider: {
      height: 1,
      backgroundColor: colors.borderSubtle,
      marginLeft: 48,
    },
    filterRow: {
      gap: Spacing.sm,
      paddingBottom: Spacing.lg,
    },
    filterChip: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: Radius.pill,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1.25,
      borderColor: isDark ? colors.borderGlass : colors.border,
    },
    filterChipActive: {
      backgroundColor: colors.brandTeal,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    filterChipText: {
      ...Typography.caption,
      fontSize: 12.5,
      color: colors.textSecondary,
      fontFamily: 'Urbanist_700Bold',
    },
    filterChipTextActive: {
      color: '#FFFFFF',
    },
    list: {
      marginBottom: Spacing.xl,
    },
  });
