import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppColors, Typography, Spacing, Radius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useConsultations } from '@/context/ConsultationContext';
import { ThemeMode, useAppTheme } from '@/context/ThemeContext';
import { useAlert } from '@/context/AlertContext';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';
import { MedmaskLogo } from '@/components/ui/MedmaskLogo';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { FadeSlideIn } from '@/components/ui/Motion';
import * as Haptics from 'expo-haptics';

const THEME_OPTIONS: {
  key: ThemeMode;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { key: 'light', label: 'Light', icon: 'sunny' },
  { key: 'dark', label: 'Dark', icon: 'moon' },
  { key: 'system', label: 'System', icon: 'phone-portrait-outline' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useConsultations();
  const { colors, isDark, mode, setMode } = useAppTheme();
  const { showAlert } = useAlert();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [discreetNotifications, setDiscreetNotifications] = useState(true);

  const handleSelectTheme = (nextMode: ThemeMode) => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setMode(nextMode);
  };

  const handleSignOut = () => {
    logout();
    router.replace('/login');
  };

  return (
    <AmbientBackground variant="warm">
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <FadeSlideIn delay={20}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Profile & Privacy</Text>
              <Text style={styles.headerSubtext}>
                Control your confidential preferences and appearance.
              </Text>
            </View>

            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              style={styles.identityOuter}
              contentStyle={styles.identityCard}>
              <Soft3DIcon name="shield-checkmark" accent="teal" size="lg" solid />
              <View style={styles.identityTextContainer}>
                <Text style={styles.identityTitle}>Anonymous Patient</Text>
                <Text style={styles.identitySub}>ID: #anon-8291 • No account required</Text>
                <View style={styles.privacyPill}>
                  <Ionicons name="lock-closed" size={10} color={colors.tealDark} />
                  <Text style={styles.privacyPillText}>Zero identity tracking</Text>
                </View>
              </View>
            </GlassCard>
          </FadeSlideIn>

          {/* APPEARANCE / THEME SELECTOR */}
          <FadeSlideIn delay={90} style={styles.section}>
            <Text style={styles.sectionHeader}>Appearance</Text>
            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              contentStyle={styles.appearanceCard}>
              <View style={styles.appearanceTopRow}>
                <Soft3DIcon
                  name={isDark ? 'moon' : 'sunny'}
                  accent={isDark ? 'lavender' : 'amber'}
                  size="sm"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>App Theme</Text>
                  <Text style={styles.menuSub}>
                    {mode === 'system'
                      ? `Following device (${isDark ? 'Dark' : 'Light'})`
                      : mode === 'dark'
                        ? 'Dark theme enabled'
                        : 'Light theme enabled'}
                  </Text>
                </View>
              </View>

              <View style={styles.segmentedControl}>
                {THEME_OPTIONS.map((opt) => {
                  const selected = mode === opt.key;
                  return (
                    <Pressable
                      key={opt.key}
                      onPress={() => handleSelectTheme(opt.key)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`${opt.label} theme`}
                      style={({ pressed }) => [
                        styles.segmentBtn,
                        selected && styles.segmentBtnActive,
                        pressed && !selected && { opacity: 0.75 },
                      ]}>
                      <Ionicons
                        name={opt.icon}
                        size={14}
                        color={selected ? '#FFFFFF' : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.segmentText,
                          selected && styles.segmentTextActive,
                        ]}>
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </GlassCard>
          </FadeSlideIn>

          {/* Privacy & Security Section */}
          <FadeSlideIn delay={150} style={styles.section}>
            <Text style={styles.sectionHeader}>Privacy & Security</Text>
            <GlassCard variant="elevated" borderRadius={Radius.xl}>
              <Pressable
                onPress={() => router.push('/privacy')}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}>
                <Soft3DIcon name="lock-closed" accent="sky" size="sm" />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Privacy Center</Text>
                  <Text style={styles.menuSub}>How Medmask safeguards your data</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Pressable>

              <View style={styles.divider} />

              <View style={styles.menuItem}>
                <Soft3DIcon name="notifications" accent="lavender" size="sm" />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Discreet Notifications</Text>
                  <Text style={styles.menuSub}>Hide medical details on lock screen</Text>
                </View>
                <Switch
                  value={discreetNotifications}
                  onValueChange={setDiscreetNotifications}
                  trackColor={{
                    false: isDark ? '#2A3B4C' : '#D2DCE2',
                    true: colors.brandTeal,
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </GlassCard>
          </FadeSlideIn>

          {/* History & Support */}
          <FadeSlideIn delay={210} style={styles.section}>
            <Text style={styles.sectionHeader}>History & Support</Text>
            <GlassCard variant="elevated" borderRadius={Radius.xl}>
              <Pressable
                onPress={() => router.push('/(tabs)/consult')}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}>
                <Soft3DIcon name="time" accent="amber" size="sm" />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Consultation History</Text>
                  <Text style={styles.menuSub}>Review previous private inquiries</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Pressable>

              <View style={styles.divider} />

              <Pressable
                onPress={() => {
                  showAlert({
                    title: 'Support & Clinical Ethics',
                    message:
                      'Medmask is committed to ethical, non-judgmental guidance. For inquiries, email support@medmask.health',
                    variant: 'brand',
                    buttons: [{ text: 'Close' }],
                  });
                }}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}>
                <Soft3DIcon name="help-buoy" accent="coral" size="sm" />
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Help & Support</Text>
                  <Text style={styles.menuSub}>Clinical guidelines & FAQs</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Pressable>
            </GlassCard>
          </FadeSlideIn>

          {/* About Medmask & Sign Out */}
          <FadeSlideIn delay={270}>
            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              style={styles.aboutOuter}
              contentStyle={styles.aboutCard}>
              <MedmaskLogo variant="full" size="md" style={{ marginBottom: Spacing.md }} />
              <Text style={styles.missionQuote}>
                "Sometimes the biggest barrier between a person and healthcare isn't distance. It's fear."
              </Text>
              <Text style={styles.aboutMeta}>
                Medmask • Confidential Health Care
              </Text>
            </GlassCard>

            <Pressable
              onPress={handleSignOut}
              accessibilityRole="button"
              accessibilityLabel="Sign out"
              style={({ pressed }) => [
                styles.signOutButton,
                pressed && styles.signOutButtonPressed,
              ]}>
              <Ionicons name="log-out-outline" size={17} color={colors.errorText} />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </Pressable>

            <EmergencyNotice compact />
          </FadeSlideIn>
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
    identityOuter: {
      marginBottom: Spacing.xl,
    },
    identityCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    identityTextContainer: {
      flex: 1,
    },
    identityTitle: {
      ...Typography.h3,
      color: colors.navy,
      fontSize: 17,
    },
    identitySub: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      marginTop: 2,
    },
    privacyPill: {
      marginTop: 7,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: Radius.pill,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: colors.tealBorder,
    },
    privacyPillText: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    section: {
      marginBottom: Spacing.xl,
    },
    sectionHeader: {
      ...Typography.caption,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.7,
      fontFamily: 'Urbanist_700Bold',
      marginBottom: Spacing.sm,
      marginLeft: 4,
    },
    appearanceCard: {
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    appearanceTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: Radius.pill,
      padding: 4,
      gap: 4,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
    },
    segmentBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 9,
      borderRadius: Radius.pill,
    },
    segmentBtnActive: {
      backgroundColor: colors.brandTeal,
    },
    segmentText: {
      ...Typography.caption,
      fontSize: 13,
      fontFamily: 'Urbanist_600SemiBold',
      color: colors.textSecondary,
    },
    segmentTextActive: {
      color: '#FFFFFF',
      fontFamily: 'Urbanist_700Bold',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    menuItemPressed: {
      backgroundColor: colors.brandTealBg,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      ...Typography.h3,
      fontSize: 15,
      color: colors.navy,
    },
    menuSub: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      marginTop: 2,
      fontSize: 12,
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderSubtle,
      marginLeft: 64,
    },
    aboutOuter: {
      marginBottom: Spacing.xl,
    },
    aboutCard: {
      padding: Spacing.xl,
      alignItems: 'center',
    },
    missionQuote: {
      ...Typography.bodySmall,
      fontStyle: 'italic',
      color: colors.textBody,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: Spacing.md,
    },
    aboutMeta: {
      ...Typography.caption,
      color: colors.textMuted,
    },
    signOutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 14,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.errorBorder,
      backgroundColor: colors.errorBg,
      marginBottom: Spacing.xl,
    },
    signOutButtonPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.985 }],
    },
    signOutButtonText: {
      ...Typography.label,
      color: colors.errorText,
      fontSize: 14,
    },
  });
