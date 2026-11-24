import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppColors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { PrimaryButton } from '@/components/ui/Buttons';
import { FadeSlideIn, FloatingView } from '@/components/ui/Motion';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type RoleChoice = 'user' | 'provider';

export default function LoginScreen() {
  const router = useRouter();
  const { loginAs } = useConsultations();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [selectedRole, setSelectedRole] = useState<RoleChoice>('user');

  const handleSelectRole = (role: RoleChoice) => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setSelectedRole(role);
  };

  const handleContinue = () => {
    loginAs(selectedRole);
    if (selectedRole === 'provider') {
      router.replace('/provider');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Animated Floating Emblem Header */}
          <FadeSlideIn delay={40} style={styles.brandSection}>
            <FloatingView distance={5} duration={2400}>
              <View style={[styles.logoOrb, !isDark && Shadows.card]}>
                <Image
                  source={require('@/assets/images/medmask-spark.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </FloatingView>

            <View style={styles.wordmarkRow}>
              <Text style={styles.wordmarkMed}>Med</Text>
              <Text style={styles.wordmarkMask}>mask</Text>
            </View>
            <Text style={styles.title}>Welcome to Medmask</Text>
            <Text style={styles.subtitle}>
              Choose how you would like to enter today.
            </Text>
          </FadeSlideIn>

          {/* Role Selection Cards */}
          <View style={styles.rolesStack}>
            <FadeSlideIn delay={140}>
              <Pressable
                onPress={() => handleSelectRole('user')}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedRole === 'user' }}
                accessibilityLabel="Enter as Patient"
                style={({ pressed }) => [pressed && styles.cardPressed]}>
                <GlassCard
                  variant={selectedRole === 'user' ? 'tealTint' : 'elevated'}
                  borderRadius={Radius.xl}
                  contentStyle={styles.roleCard}>
                  <Soft3DIcon
                    name="shield-checkmark"
                    accent="teal"
                    size="lg"
                    solid={selectedRole === 'user'}
                  />
                  <View style={styles.roleTextCol}>
                    <View style={styles.roleTitleRow}>
                      <Text style={styles.roleTitle}>Patient / User</Text>
                      <View style={styles.roleBadge}>
                        <Text style={styles.roleBadgeText}>Anonymous</Text>
                      </View>
                    </View>
                    <Text style={styles.roleDesc}>
                      Ask sensitive health questions privately and read verified guides.
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedRole === 'user' && styles.radioCircleSelected,
                    ]}>
                    {selectedRole === 'user' && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                </GlassCard>
              </Pressable>
            </FadeSlideIn>

            <FadeSlideIn delay={220}>
              <Pressable
                onPress={() => handleSelectRole('provider')}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedRole === 'provider' }}
                accessibilityLabel="Enter as Healthcare Provider"
                style={({ pressed }) => [pressed && styles.cardPressed]}>
                <GlassCard
                  variant={selectedRole === 'provider' ? 'tealTint' : 'elevated'}
                  borderRadius={Radius.xl}
                  contentStyle={styles.roleCard}>
                  <Soft3DIcon
                    name="medical"
                    accent="sky"
                    size="lg"
                    solid={selectedRole === 'provider'}
                  />
                  <View style={styles.roleTextCol}>
                    <View style={styles.roleTitleRow}>
                      <Text style={styles.roleTitle}>Healthcare Provider</Text>
                      <View style={[styles.roleBadge, styles.providerBadge]}>
                        <Text style={[styles.roleBadgeText, styles.providerBadgeText]}>
                          Clinician
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.roleDesc}>
                      Review incoming anonymous consultations and send clinical guidance.
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedRole === 'provider' && styles.radioCircleSelected,
                    ]}>
                    {selectedRole === 'provider' && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                </GlassCard>
              </Pressable>
            </FadeSlideIn>
          </View>

          {/* Footer CTA */}
          <FadeSlideIn delay={300} style={styles.footer}>
            <PrimaryButton
              label={
                selectedRole === 'provider'
                  ? 'Enter Provider Portal'
                  : 'Continue Anonymously'
              }
              onPress={handleContinue}
              icon={<Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
              style={styles.ctaButton}
            />

            <View style={styles.privacyRow}>
              <Ionicons name="lock-closed" size={13} color={colors.textMuted} />
              <Text style={styles.privacyText}>
                End-to-end anonymous session • No personal identity stored
              </Text>
            </View>
          </FadeSlideIn>
        </View>
      </SafeAreaView>
    </AmbientBackground>
  );
}

const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xxxl,
      paddingBottom: Spacing.xxl,
    },
    brandSection: {
      alignItems: 'center',
      marginTop: Spacing.md,
    },
    logoOrb: {
      width: 92,
      height: 92,
      borderRadius: 28,
      backgroundColor: isDark ? '#172533' : '#FFFFFF',
      borderWidth: 1.5,
      borderColor: isDark ? colors.borderGlass : colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    logoImage: {
      width: 62,
      height: 62,
    },
    wordmarkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    wordmarkMed: {
      fontFamily: 'Urbanist_800ExtraBold',
      fontSize: 22,
      letterSpacing: -0.5,
      color: colors.navy,
    },
    wordmarkMask: {
      fontFamily: 'Urbanist_800ExtraBold',
      fontSize: 22,
      letterSpacing: -0.5,
      color: colors.brandTeal,
    },
    title: {
      ...Typography.display,
      fontSize: 28,
      color: colors.navy,
      textAlign: 'center',
      marginBottom: 6,
    },
    subtitle: {
      ...Typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: 290,
    },
    rolesStack: {
      gap: Spacing.md,
    },
    cardPressed: {
      transform: [{ scale: 0.985 }],
    },
    roleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    roleTextCol: {
      flex: 1,
    },
    roleTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 4,
    },
    roleTitle: {
      ...Typography.h3,
      fontSize: 16,
      color: colors.navy,
    },
    roleBadge: {
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: Radius.pill,
    },
    roleBadgeText: {
      ...Typography.caption,
      fontSize: 10.5,
      fontFamily: 'Urbanist_700Bold',
      color: colors.tealDark,
    },
    providerBadge: {
      backgroundColor: colors.skyBg,
    },
    providerBadgeText: {
      color: colors.sky,
    },
    roleDesc: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    radioCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.borderOutline,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceGlassStrong,
    },
    radioCircleSelected: {
      borderColor: colors.brandTeal,
      backgroundColor: colors.brandTeal,
    },
    footer: {
      gap: Spacing.md,
    },
    ctaButton: {
      width: '100%',
    },
    privacyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    privacyText: {
      ...Typography.caption,
      fontSize: 11.5,
      color: colors.textMuted,
    },
  });
