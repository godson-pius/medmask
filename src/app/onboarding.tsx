import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppColors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { MedmaskLogo } from '@/components/ui/MedmaskLogo';
import { PrimaryButton } from '@/components/ui/Buttons';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { FadeSlideIn, FloatingView } from '@/components/ui/Motion';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Slide {
  id: number;
  headline: string;
  supporting: string;
  iconName: keyof typeof Ionicons.glyphMap;
  pillLabel: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    headline: 'Your Health.\nYour Privacy.',
    supporting:
      'Get confidential sexual-health guidance in a private, judgment-free space.',
    iconName: 'shield-checkmark',
    pillLabel: 'Zero judgment',
  },
  {
    id: 2,
    headline: "Ask what you're\nafraid to ask.",
    supporting:
      'Talk about sensitive concerns without unnecessary embarrassment or stigma.',
    iconName: 'chatbubbles',
    pillLabel: '100% Anonymous',
  },
  {
    id: 3,
    headline: 'Know your\nnext step.',
    supporting:
      'Connect with verified healthcare professionals and get clear guidance on what to do next.',
    iconName: 'navigate-circle',
    pillLabel: 'Verified clinicians',
  },
];

const MINI_FEATURES = [
  { label: 'Anonymous\nQ&A', icon: 'lock-closed' as const, accent: 'teal' as const },
  { label: 'Verified\nCare', icon: 'medical' as const, accent: 'sky' as const },
  { label: '24/7\nGuides', icon: 'book' as const, accent: 'lavender' as const },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useConsultations();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const isLastSlide = currentSlideIndex === SLIDES.length - 1;

  const handleFinish = () => {
    completeOnboarding();
    router.replace('/login');
  };

  const handleNext = () => {
    if (isLastSlide) {
      handleFinish();
    } else {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <AmbientBackground variant="onboarding">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <MedmaskLogo size="sm" />
          {!isLastSlide ? (
            <Pressable
              onPress={handleFinish}
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              hitSlop={12}
              style={({ pressed }) => [
                styles.skipButton,
                !isDark && Shadows.subtle,
                pressed && { opacity: 0.75 },
              ]}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          ) : (
            <View style={styles.placeholderHeader} />
          )}
        </View>

        <View style={styles.slideContent}>
          <FloatingView distance={6} duration={2400} style={styles.illustrationWrapper}>
            <Image
              source={require('@/assets/images/logo-glow.png')}
              style={styles.outerGlowImage}
              resizeMode="contain"
            />
            <View style={[styles.logoOuterRing, !isDark && Shadows.floating]}>
              <View style={styles.logoCircleContainer}>
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.officialLogoHero}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={[styles.pillBadge, !isDark && Shadows.card]}>
              <Ionicons name={currentSlide.iconName} size={14} color={colors.brandTeal} />
              <Text style={styles.pillBadgeText}>{currentSlide.pillLabel}</Text>
            </View>
          </FloatingView>

          <FadeSlideIn key={currentSlide.id} delay={30} style={styles.textWrapper}>
            <Text style={styles.headline}>{currentSlide.headline}</Text>
            <Text style={styles.supporting}>{currentSlide.supporting}</Text>
          </FadeSlideIn>

          <FadeSlideIn delay={140} style={styles.trustCardOuter}>
            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              contentStyle={styles.trustCardContent}>
              <View style={styles.trustHeaderRow}>
                <View>
                  <Text style={styles.trustLabel}>Built for privacy</Text>
                  <Text style={styles.trustValue}>100% Anonymous</Text>
                </View>
                <View style={styles.trustBadge}>
                  <Ionicons name="shield-checkmark" size={14} color={colors.brandTeal} />
                  <Text style={styles.trustBadgeText}>Encrypted</Text>
                </View>
              </View>

              <View style={styles.miniFeaturesRow}>
                {MINI_FEATURES.map((feat) => (
                  <View key={feat.label} style={styles.miniFeatureTile}>
                    <Soft3DIcon name={feat.icon} accent={feat.accent} size="sm" />
                    <Text style={styles.miniFeatureLabel}>{feat.label}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          </FadeSlideIn>
        </View>

        <View style={styles.footer}>
          <View style={styles.indicators}>
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <View
                  key={slide.id}
                  style={[styles.dot, isActive && styles.activeDot]}
                />
              );
            })}
          </View>

          <PrimaryButton
            label={isLastSlide ? 'Get Started' : 'Continue'}
            onPress={handleNext}
            icon={<Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </AmbientBackground>
  );
}

const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.sm,
    },
    skipButton: {
      paddingVertical: 7,
      paddingHorizontal: 14,
      borderRadius: Radius.pill,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1,
      borderColor: isDark ? colors.borderGlass : colors.border,
    },
    skipText: {
      ...Typography.caption,
      color: colors.navy,
      fontFamily: 'Urbanist_700Bold',
    },
    placeholderHeader: {
      width: 48,
    },
    slideContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.xl,
    },
    illustrationWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.xxl,
    },
    outerGlowImage: {
      position: 'absolute',
      width: 240,
      height: 240,
      opacity: isDark ? 0.35 : 0.75,
    },
    logoOuterRing: {
      width: 144,
      height: 144,
      borderRadius: 72,
      padding: 8,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.78)',
      borderWidth: 1.5,
      borderColor: isDark ? colors.borderGlass : colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoCircleContainer: {
      width: 124,
      height: 124,
      borderRadius: 62,
      backgroundColor: isDark ? '#172533' : '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: colors.tealBorder,
      overflow: 'hidden',
    },
    officialLogoHero: {
      width: 92,
      height: 92,
    },
    pillBadge: {
      position: 'absolute',
      bottom: -14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: colors.surfaceGlassStrong,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: Radius.pill,
      borderWidth: 1.25,
      borderColor: isDark ? colors.borderGlass : colors.border,
    },
    pillBadgeText: {
      ...Typography.caption,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    textWrapper: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    headline: {
      ...Typography.display,
      fontSize: 30,
      lineHeight: 36,
      color: colors.navy,
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    supporting: {
      ...Typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      maxWidth: 310,
    },
    trustCardOuter: {
      width: '100%',
    },
    trustCardContent: {
      padding: Spacing.lg,
    },
    trustHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    trustLabel: {
      ...Typography.caption,
      color: colors.textMuted,
      fontFamily: 'Urbanist_600SemiBold',
    },
    trustValue: {
      ...Typography.h3,
      fontSize: 17,
      color: colors.navy,
      marginTop: 1,
    },
    trustBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: Radius.pill,
    },
    trustBadgeText: {
      ...Typography.caption,
      fontSize: 11,
      fontFamily: 'Urbanist_700Bold',
      color: colors.tealDark,
    },
    miniFeaturesRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    miniFeatureTile: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: Radius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
      gap: 6,
    },
    miniFeatureLabel: {
      ...Typography.caption,
      fontSize: 11,
      fontFamily: 'Urbanist_600SemiBold',
      color: colors.navy,
      textAlign: 'center',
      lineHeight: 14,
    },
    footer: {
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.xl,
      gap: Spacing.lg,
    },
    indicators: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(27, 42, 61, 0.16)',
    },
    activeDot: {
      width: 26,
      backgroundColor: colors.brandTeal,
    },
    button: {
      width: '100%',
    },
  });
