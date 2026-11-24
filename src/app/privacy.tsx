import React, { useMemo } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';
import { SecondaryButton } from '@/components/ui/Buttons';
import { MedmaskLogo } from '@/components/ui/MedmaskLogo';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon, Soft3DAccent } from '@/components/ui/Soft3DIcon';
import { useAppTheme } from '@/context/ThemeContext';

export default function PrivacyCenterScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const PILLARS: {
    icon: keyof typeof Ionicons.glyphMap;
    accent: Soft3DAccent;
    title: string;
    description: string;
  }[] = [
    {
      icon: 'shield-checkmark',
      accent: 'teal',
      title: 'Private consultations',
      description:
        'When you submit an inquiry, you are assigned an anonymous identifier (e.g. "Anonymous #8291"). No real name, social handle, or phone number is ever attached to your consultation ticket.',
    },
    {
      icon: 'finger-print',
      accent: 'sky',
      title: 'Minimal personal information',
      description:
        'We adhere to strict data-minimization principles. We only collect the specific symptom descriptions and questions you choose to share. No biometric tracking or location logs.',
    },
    {
      icon: 'lock-closed',
      accent: 'lavender',
      title: 'Secure communication',
      description:
        'Consultations are transferred over secure encrypted TLS connections directly to verified clinical reviewers. Data is isolated to your private session.',
    },
    {
      icon: 'heart',
      accent: 'coral',
      title: 'Respectful healthcare conversations',
      description:
        'All clinical guidance strictly adheres to empathetic, non-judgmental sexual health ethics. Questions are addressed with medical objectivity and human compassion.',
    },
  ];

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

          <Text style={styles.navTitle}>Privacy Center</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroSection}>
            <MedmaskLogo variant="full" size="md" style={{ marginBottom: Spacing.md }} />
            <Text style={styles.headline}>Your privacy matters.</Text>
            <Text style={styles.subtext}>
              Medmask was founded on the belief that fear of judgment or exposure should never stand between a person and essential healthcare guidance.
            </Text>
          </View>

          <View style={styles.pillarsContainer}>
            {PILLARS.map((pillar, idx) => (
              <GlassCard
                key={idx}
                variant="elevated"
                borderRadius={Radius.xl}
                contentStyle={styles.pillarCard}>
                <Soft3DIcon name={pillar.icon} accent={pillar.accent} size="md" />
                <View style={styles.pillarContent}>
                  <Text style={styles.pillarTitle}>{pillar.title}</Text>
                  <Text style={styles.pillarDescription}>
                    {pillar.description}
                  </Text>
                </View>
              </GlassCard>
            ))}
          </View>

          <GlassCard
            variant="tealTint"
            borderRadius={Radius.xl}
            style={styles.commitmentOuter}
            contentStyle={styles.commitmentCard}>
            <Text style={styles.commitmentTitle}>Our Healthcare Commitment</Text>
            <Text style={styles.commitmentBody}>
              Medmask does not sell data, track you across web trackers, or monetize sensitive personal health queries. Our mission is to provide an accessible digital first step toward safe, informed health decisions.
            </Text>
          </GlassCard>

          <SecondaryButton
            label="Back"
            onPress={() => router.back()}
            style={styles.backBtn}
          />

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
    navTitle: {
      ...Typography.h3,
      fontSize: 16,
      color: colors.navy,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.huge,
    },
    heroSection: {
      alignItems: 'center',
      marginBottom: Spacing.xxl,
    },
    headline: {
      ...Typography.display,
      fontSize: 27,
      color: colors.navy,
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    subtext: {
      ...Typography.bodySmall,
      fontSize: 14.5,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 21,
      maxWidth: 320,
    },
    pillarsContainer: {
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
    pillarCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    pillarContent: {
      flex: 1,
    },
    pillarTitle: {
      ...Typography.h3,
      fontSize: 16,
      color: colors.navy,
      marginBottom: 4,
    },
    pillarDescription: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    commitmentOuter: {
      marginBottom: Spacing.xl,
    },
    commitmentCard: {
      padding: Spacing.lg,
    },
    commitmentTitle: {
      ...Typography.label,
      fontSize: 14,
      color: colors.tealDark,
      marginBottom: 4,
    },
    commitmentBody: {
      ...Typography.bodySmall,
      color: colors.textBody,
      lineHeight: 19,
    },
    backBtn: {
      marginBottom: Spacing.xl,
    },
  });
