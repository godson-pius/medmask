import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppColors, Typography, Spacing, Radius } from '@/constants/theme';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';
import { MedmaskLogo } from '@/components/ui/MedmaskLogo';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { FadeSlideIn, FloatingView, PulseDot } from '@/components/ui/Motion';
import { useAppTheme } from '@/context/ThemeContext';

export default function ConsultationSuccessScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <AmbientBackground variant="onboarding">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <MedmaskLogo size="sm" style={{ marginBottom: Spacing.xl }} />

          <FloatingView distance={5} duration={2200}>
            <Soft3DIcon
              name="checkmark-done"
              accent="teal"
              size="xl"
              solid
              style={{ marginBottom: Spacing.xl }}
            />
          </FloatingView>

          <FadeSlideIn delay={60} style={styles.centerBlock}>
            <Text style={styles.headline}>Consultation submitted</Text>
            <Text style={styles.supportingText}>
              Your question has been securely submitted for professional review.
            </Text>

            <View style={styles.statusPill}>
              <PulseDot color={colors.amber} size={8} />
              <Text style={styles.statusText}>Waiting for response</Text>
            </View>
          </FadeSlideIn>

          <FadeSlideIn delay={140} style={styles.cardOuter}>
            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              contentStyle={styles.timelineCard}>
              <Text style={styles.timelineHeader}>Consultation Timeline</Text>

              <View style={styles.timelineStep}>
                <View style={[styles.stepDot, styles.stepDotCompleted]}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Submitted</Text>
                  <Text style={styles.stepDesc}>Transmitted with end-to-end anonymity</Text>
                </View>
              </View>

              <View style={styles.verticalLineActive} />

              <View style={styles.timelineStep}>
                <View style={[styles.stepDot, styles.stepDotActive]}>
                  <View style={styles.innerActiveDot} />
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: colors.tealDark }]}>
                    Under review
                  </Text>
                  <Text style={styles.stepDesc}>Queued for licensed practitioner review</Text>
                </View>
              </View>

              <View style={styles.verticalLinePending} />

              <View style={styles.timelineStep}>
                <View style={[styles.stepDot, styles.stepDotPending]}>
                  <Ionicons name="ellipse" size={8} color={colors.textMuted} />
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: colors.textMuted }]}>
                    Professional response
                  </Text>
                  <Text style={styles.stepDesc}>Guidance, testing recommendation & next step</Text>
                </View>
              </View>
            </GlassCard>
          </FadeSlideIn>

          <FadeSlideIn delay={220} style={styles.buttonStack}>
            <PrimaryButton
              label="View Consultation"
              onPress={() => router.replace(`/consultation/${id}`)}
              icon={<Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFFFFF" />}
            />
            <SecondaryButton
              label="Return to Home"
              onPress={() => router.replace('/(tabs)')}
            />
          </FadeSlideIn>

          <EmergencyNotice compact />
        </ScrollView>
      </SafeAreaView>
    </AmbientBackground>
  );
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xxxl,
      paddingBottom: Spacing.huge,
      alignItems: 'center',
    },
    centerBlock: {
      alignItems: 'center',
    },
    headline: {
      ...Typography.display,
      fontSize: 27,
      color: colors.navy,
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    supportingText: {
      ...Typography.bodySmall,
      fontSize: 14.5,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: 310,
      lineHeight: 21,
      marginBottom: Spacing.lg,
    },
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.warningBg,
      paddingHorizontal: Spacing.md,
      paddingVertical: 7,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.warningBorder,
      marginBottom: Spacing.xl,
    },
    statusText: {
      ...Typography.caption,
      fontFamily: 'Urbanist_700Bold',
      color: colors.warningText,
    },
    cardOuter: {
      width: '100%',
      marginBottom: Spacing.xl,
    },
    timelineCard: {
      padding: Spacing.xl,
    },
    timelineHeader: {
      ...Typography.label,
      color: colors.navy,
      marginBottom: Spacing.lg,
      fontSize: 14,
    },
    timelineStep: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    stepDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepDotCompleted: {
      backgroundColor: colors.brandTeal,
    },
    stepDotActive: {
      backgroundColor: colors.brandTealBg,
      borderWidth: 2,
      borderColor: colors.brandTeal,
    },
    innerActiveDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.brandTeal,
    },
    stepDotPending: {
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: colors.borderOutline,
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
      lineHeight: 16,
    },
    verticalLineActive: {
      width: 2,
      height: 20,
      backgroundColor: colors.brandTeal,
      marginLeft: 11,
      marginVertical: 4,
    },
    verticalLinePending: {
      width: 2,
      height: 20,
      backgroundColor: colors.borderOutline,
      marginLeft: 11,
      marginVertical: 4,
    },
    buttonStack: {
      width: '100%',
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
  });
