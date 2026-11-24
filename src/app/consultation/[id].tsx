import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppColors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SecondaryButton } from '@/components/ui/Buttons';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';

export default function ConsultationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getConsultationById } = useConsultations();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const consultation = getConsultationById(id || '');

  if (!consultation) {
    return (
      <AmbientBackground>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.notFoundContainer}>
            <Soft3DIcon name="alert-circle" accent="amber" size="lg" />
            <Text style={styles.notFoundTitle}>Consultation not found</Text>
            <SecondaryButton
              label="Back to Home"
              onPress={() => router.replace('/(tabs)')}
            />
          </View>
        </SafeAreaView>
      </AmbientBackground>
    );
  }

  const userMessage = consultation.messages.find((m) => m.sender === 'user');
  const providerMessage = consultation.messages.find(
    (m) => m.sender === 'provider'
  );

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.navBar}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={12}
            style={[styles.backButton, !isDark && Shadows.subtle]}>
            <Ionicons name="arrow-back" size={20} color={colors.navy} />
          </Pressable>

          <View style={styles.navTitleContainer}>
            <Text style={styles.navTitle}>Private consultation</Text>
            <Text style={styles.navSubtitle}>{consultation.anonymousId}</Text>
          </View>

          <StatusBadge status={consultation.status} showIcon={false} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.metaHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>
                {consultation.category}
              </Text>
            </View>

            <View style={styles.symptomsBadgeRow}>
              {consultation.symptoms.map((s, idx) => (
                <View key={idx} style={styles.symptomPill}>
                  <Text style={styles.symptomPillText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          <GlassCard
            variant="elevated"
            borderRadius={Radius.xl}
            style={styles.cardOuter}
            contentStyle={styles.messageCard}>
            <View style={styles.messageHeaderRow}>
              <View style={styles.senderInfo}>
                <Soft3DIcon name="person" accent="slate" size="sm" solid />
                <Text style={styles.senderName}>
                  {userMessage?.senderTitle || 'You (Anonymous)'}
                </Text>
              </View>
              <Text style={styles.timestamp}>
                {userMessage ? formatTime(userMessage.timestamp) : ''}
              </Text>
            </View>

            <Text style={styles.userMessageContent}>
              {userMessage?.content || consultation.description}
            </Text>
          </GlassCard>

          {providerMessage ? (
            <GlassCard
              variant="tealTint"
              borderRadius={Radius.xl}
              style={styles.cardOuter}
              contentStyle={styles.providerCard}>
              <View style={styles.providerHeader}>
                <Soft3DIcon name="medical" accent="teal" size="md" solid />
                <View style={{ flex: 1 }}>
                  <View style={styles.providerTitleRow}>
                    <Text style={styles.providerName}>
                      Verified Healthcare Professional
                    </Text>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={colors.brandTeal}
                    />
                  </View>
                  <Text style={styles.providerSpecialty}>
                    Sexual Health & Preventive Care
                  </Text>
                </View>
              </View>

              <Text style={styles.providerMessageContent}>
                {providerMessage.content}
              </Text>

              {providerMessage.nextStepRecommendation && (
                <View style={styles.nextStepCard}>
                  <View style={styles.nextStepHeader}>
                    <Ionicons
                      name="navigate-circle"
                      size={18}
                      color={colors.brandTeal}
                    />
                    <Text style={styles.nextStepTitle}>
                      Recommended Next Step
                    </Text>
                  </View>
                  <Text style={styles.nextStepBody}>
                    {providerMessage.nextStepRecommendation}
                  </Text>
                </View>
              )}

              <Text style={styles.providerTimeFooter}>
                Replied {formatTime(providerMessage.timestamp)}
              </Text>
            </GlassCard>
          ) : (
            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              style={styles.cardOuter}
              contentStyle={styles.waitingCard}>
              <Soft3DIcon
                name="hourglass"
                accent="amber"
                size="lg"
                style={{ marginBottom: Spacing.md }}
              />
              <Text style={styles.waitingTitle}>Under Clinical Review</Text>
              <Text style={styles.waitingSubtext}>
                Your inquiry has been encrypted and assigned to a verified healthcare professional. You will be notified as soon as your response is ready.
              </Text>
            </GlassCard>
          )}

          <GlassCard
            variant="glass"
            borderRadius={Radius.lg}
            style={styles.disclaimerOuter}
            contentStyle={styles.disclaimerContainer}>
            <Ionicons
              name="shield-outline"
              size={16}
              color={colors.textSecondary}
              style={{ marginTop: 1 }}
            />
            <Text style={styles.disclaimerText}>
              Medmask provides health information and professional guidance. It does not replace emergency medical care.
            </Text>
          </GlassCard>

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
    navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1,
      borderColor: isDark ? colors.borderGlass : colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navTitleContainer: {
      alignItems: 'center',
    },
    navTitle: {
      ...Typography.h3,
      fontSize: 15,
      color: colors.navy,
    },
    navSubtitle: {
      ...Typography.caption,
      color: colors.textMuted,
      fontSize: 11,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.huge,
    },
    metaHeader: {
      marginBottom: Spacing.lg,
      gap: Spacing.sm,
    },
    categoryBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.brandTeal,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: Radius.pill,
    },
    categoryBadgeText: {
      ...Typography.caption,
      color: '#FFFFFF',
      fontFamily: 'Urbanist_700Bold',
    },
    symptomsBadgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    symptomPill: {
      backgroundColor: colors.surfaceGlassStrong,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.tealBorder,
    },
    symptomPillText: {
      ...Typography.caption,
      fontSize: 11.5,
      color: colors.tealDark,
      fontFamily: 'Urbanist_600SemiBold',
    },
    cardOuter: {
      marginBottom: Spacing.lg,
    },
    messageCard: {
      padding: Spacing.lg,
    },
    messageHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    senderInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    senderName: {
      ...Typography.label,
      fontSize: 13.5,
      color: colors.navy,
    },
    timestamp: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.textMuted,
    },
    userMessageContent: {
      ...Typography.body,
      color: colors.textBody,
      lineHeight: 22,
    },
    providerCard: {
      padding: Spacing.xl,
    },
    providerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
      paddingBottom: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.tealBorder,
    },
    providerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    providerName: {
      ...Typography.label,
      fontSize: 14,
      color: colors.navy,
    },
    providerSpecialty: {
      ...Typography.caption,
      fontSize: 11.5,
      color: colors.tealDark,
      fontFamily: 'Urbanist_600SemiBold',
      marginTop: 1,
    },
    providerMessageContent: {
      ...Typography.body,
      color: colors.navy,
      lineHeight: 23,
      marginBottom: Spacing.lg,
    },
    nextStepCard: {
      backgroundColor: isDark ? 'rgba(11, 18, 24, 0.55)' : 'rgba(255, 255, 255, 0.85)',
      padding: Spacing.md,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
      gap: 5,
    },
    nextStepHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    nextStepTitle: {
      ...Typography.label,
      fontSize: 13,
      color: colors.tealDark,
    },
    nextStepBody: {
      ...Typography.bodySmall,
      color: colors.textBody,
      lineHeight: 19,
    },
    providerTimeFooter: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.textMuted,
      marginTop: Spacing.md,
      textAlign: 'right',
    },
    waitingCard: {
      padding: Spacing.xl,
      alignItems: 'center',
    },
    waitingTitle: {
      ...Typography.h3,
      fontSize: 17,
      color: colors.navy,
      marginBottom: 4,
    },
    waitingSubtext: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 19,
      marginBottom: Spacing.sm,
    },
    disclaimerOuter: {
      marginBottom: Spacing.md,
    },
    disclaimerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      padding: Spacing.md,
    },
    disclaimerText: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      flex: 1,
      lineHeight: 18,
      fontSize: 12,
    },
    notFoundContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xxl,
      gap: Spacing.lg,
    },
    notFoundTitle: {
      ...Typography.h2,
      color: colors.navy,
    },
  });
