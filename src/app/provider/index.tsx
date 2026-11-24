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
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { MedmaskLogo } from '@/components/ui/MedmaskLogo';
import { FadeSlideIn } from '@/components/ui/Motion';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Consultation } from '@/types';

type ProviderFilter = 'all' | 'needs_response' | 'responded';

export default function ProviderDashboardScreen() {
  const router = useRouter();
  const { consultations, logout } = useConsultations();
  const { colors, isDark, toggleTheme } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [filter, setFilter] = useState<ProviderFilter>('all');

  const pendingCount = consultations.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review'
  ).length;
  const respondedCount = consultations.filter(
    (c) => c.status === 'responded'
  ).length;

  const filteredConsultations = consultations.filter((c) => {
    if (filter === 'needs_response') {
      return c.status === 'submitted' || c.status === 'under_review';
    }
    if (filter === 'responded') {
      return c.status === 'responded';
    }
    return true;
  });

  const handleSignOut = () => {
    logout();
    router.replace('/login');
  };

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Top Clinician Bar */}
        <View style={styles.navBar}>
          <MedmaskLogo size="sm" />

          <View style={styles.navActions}>
            <Pressable
              onPress={toggleTheme}
              accessibilityRole="button"
              accessibilityLabel="Toggle dark theme"
              hitSlop={10}
              style={[styles.iconBtn, !isDark && Shadows.subtle]}>
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={18}
                color={colors.navy}
              />
            </Pressable>

            <Pressable
              onPress={handleSignOut}
              accessibilityRole="button"
              accessibilityLabel="Sign out"
              hitSlop={10}
              style={[styles.signOutPill, !isDark && Shadows.subtle]}>
              <Ionicons name="log-out-outline" size={16} color={colors.errorText} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <FadeSlideIn delay={20}>
            <View style={styles.titleSection}>
              <Text style={styles.headerTitle}>Provider Portal</Text>
              <Text style={styles.headerSubtext}>
                Review anonymous patient inquiries and deliver verified clinical guidance.
              </Text>
            </View>

            {/* Queue Summary Bento */}
            <View style={styles.metricsRow}>
              <GlassCard
                variant="elevated"
                borderRadius={Radius.lg}
                style={styles.metricCol}
                contentStyle={styles.metricCard}>
                <View style={styles.metricTop}>
                  <Soft3DIcon name="time" accent="amber" size="sm" />
                  <Text style={styles.metricLabel}>Pending</Text>
                </View>
                <Text style={styles.metricValue}>{pendingCount}</Text>
                <Text style={styles.metricSub}>Awaiting clinical reply</Text>
              </GlassCard>

              <GlassCard
                variant="elevated"
                borderRadius={Radius.lg}
                style={styles.metricCol}
                contentStyle={styles.metricCard}>
                <View style={styles.metricTop}>
                  <Soft3DIcon name="checkmark-done" accent="teal" size="sm" />
                  <Text style={styles.metricLabel}>Responded</Text>
                </View>
                <Text style={styles.metricValue}>{respondedCount}</Text>
                <Text style={styles.metricSub}>Guidance delivered</Text>
              </GlassCard>
            </View>
          </FadeSlideIn>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {(['all', 'needs_response', 'responded'] as ProviderFilter[]).map(
              (tabKey) => {
                const labelMap: Record<ProviderFilter, string> = {
                  all: `All (${consultations.length})`,
                  needs_response: `Needs Response (${pendingCount})`,
                  responded: `Responded (${respondedCount})`,
                };
                const isSelected = filter === tabKey;
                return (
                  <Pressable
                    key={tabKey}
                    onPress={() => setFilter(tabKey)}
                    style={[
                      styles.filterTab,
                      isSelected ? styles.filterTabActive : !isDark && Shadows.subtle,
                      isSelected && Shadows.tealGlow,
                    ]}>
                    <Text
                      style={[
                        styles.filterTabText,
                        isSelected && styles.filterTabTextActive,
                      ]}>
                      {labelMap[tabKey]}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </ScrollView>

          {/* Consultations Queue */}
          <View style={styles.list}>
            {filteredConsultations.map((item: Consultation, idx: number) => (
              <FadeSlideIn key={item.id} delay={idx * 55}>
                <Pressable
                  onPress={() => router.push(`/provider/${item.id}`)}
                  style={({ pressed }) => [pressed && styles.cardPressed]}>
                  <GlassCard
                    variant="elevated"
                    borderRadius={Radius.xl}
                    contentStyle={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={styles.patientRow}>
                        <View style={styles.anonBadge}>
                          <Ionicons name="lock-closed" size={11} color={colors.tealDark} />
                          <Text style={styles.anonText}>{item.anonymousId}</Text>
                        </View>
                        <Text style={styles.categoryTitle} numberOfLines={1}>
                          {item.category}
                        </Text>
                      </View>
                      <StatusBadge status={item.status} showIcon={false} />
                    </View>

                    <Text style={styles.concernPreview} numberOfLines={2}>
                      {item.description}
                    </Text>

                    {item.symptoms.length > 0 && (
                      <View style={styles.symptomsRow}>
                        {item.symptoms.map((s, sIdx) => (
                          <View key={sIdx} style={styles.symptomTag}>
                            <Text style={styles.symptomTagText}>{s}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    <View style={styles.cardFooter}>
                      <Text style={styles.timestamp}>
                        Received:{' '}
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>

                      <View style={styles.respondAction}>
                        <Text style={styles.respondActionText}>
                          {item.status === 'responded' ? 'View Response' : 'Write Response'}
                        </Text>
                        <Ionicons name="chevron-forward" size={14} color={colors.tealDark} />
                      </View>
                    </View>
                  </GlassCard>
                </Pressable>
              </FadeSlideIn>
            ))}
          </View>
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
    navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
    },
    navActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    iconBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1,
      borderColor: isDark ? colors.borderGlass : colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signOutPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: Radius.pill,
      backgroundColor: colors.errorBg,
      borderWidth: 1,
      borderColor: colors.errorBorder,
    },
    signOutText: {
      ...Typography.caption,
      fontFamily: 'Urbanist_700Bold',
      color: colors.errorText,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xs,
      paddingBottom: Spacing.huge,
    },
    titleSection: {
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
    metricsRow: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
    metricCol: {
      flex: 1,
    },
    metricCard: {
      padding: Spacing.md,
    },
    metricTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    metricLabel: {
      ...Typography.caption,
      fontSize: 12,
      fontFamily: 'Urbanist_600SemiBold',
      color: colors.textSecondary,
    },
    metricValue: {
      ...Typography.h1,
      fontSize: 24,
      color: colors.navy,
      marginBottom: 2,
    },
    metricSub: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.textMuted,
    },
    filterRow: {
      gap: Spacing.sm,
      paddingBottom: Spacing.lg,
    },
    filterTab: {
      paddingHorizontal: 15,
      paddingVertical: 9,
      borderRadius: Radius.pill,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1.25,
      borderColor: isDark ? colors.borderGlass : colors.border,
    },
    filterTabActive: {
      backgroundColor: colors.brandTeal,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    filterTabText: {
      ...Typography.caption,
      color: colors.textSecondary,
      fontFamily: 'Urbanist_700Bold',
    },
    filterTabTextActive: {
      color: '#FFFFFF',
    },
    list: {
      gap: Spacing.md,
    },
    card: {
      padding: Spacing.lg,
    },
    cardPressed: {
      transform: [{ scale: 0.985 }],
      opacity: 0.94,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
      gap: Spacing.sm,
    },
    patientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    anonBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: Radius.pill,
    },
    anonText: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    categoryTitle: {
      ...Typography.label,
      fontSize: 13,
      color: colors.navy,
      flex: 1,
    },
    concernPreview: {
      ...Typography.bodySmall,
      color: colors.textBody,
      lineHeight: 19,
      marginBottom: Spacing.md,
    },
    symptomsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: Spacing.md,
    },
    symptomTag: {
      backgroundColor: colors.surfaceSubtle,
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
    },
    symptomTagText: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Urbanist_600SemiBold',
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: colors.borderSubtle,
      paddingTop: Spacing.sm,
    },
    timestamp: {
      ...Typography.caption,
      color: colors.textMuted,
      fontSize: 11,
    },
    respondAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    respondActionText: {
      ...Typography.caption,
      fontFamily: 'Urbanist_700Bold',
      color: colors.tealDark,
    },
  });
