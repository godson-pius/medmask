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
import { AppColors, Typography, Spacing, Radius } from '@/constants/theme';
import { MedmaskLogo } from '@/components/ui/MedmaskLogo';
import { PrivacyBanner } from '@/components/ui/PrivacyBanner';
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

export default function HomeScreen() {
  const router = useRouter();
  const { consultations } = useConsultations();
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const respondedCount = consultations.filter((c) => c.status === 'responded').length;
  const activeCount = consultations.filter((c) => c.status !== 'responded').length;

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Top Header */}
          <FadeSlideIn delay={20}>
            <View style={styles.header}>
              <MedmaskLogo size="sm" />
              <PrivacyBanner label="100% Private" />
            </View>

            <View style={styles.greetingSection}>
              <Text style={styles.greetingTitle}>{getGreeting()}</Text>
              <Text style={styles.greetingSubtext}>
                Your health deserves a safe, judgment-free space.
              </Text>
            </View>
          </FadeSlideIn>

          {/* Quick-Ask Search Bar */}
          <FadeSlideIn delay={80}>
            <Pressable
              onPress={() => router.push('/consultation/new')}
              accessibilityRole="button"
              accessibilityLabel="Ask a private health question"
              style={({ pressed }) => [styles.searchWrap, pressed && styles.pressed]}>
              <GlassCard
                variant="elevated"
                borderRadius={Radius.pill}
                contentStyle={styles.searchInner}>
                <Ionicons name="search-outline" size={18} color={colors.textMuted} />
                <Text style={styles.searchPlaceholder}>
                  Ask a private health question...
                </Text>
                <View style={styles.searchCtaPill}>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                </View>
              </GlassCard>
            </Pressable>
          </FadeSlideIn>

          {/* Care Overview */}
          <FadeSlideIn delay={140}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Care Overview</Text>
              <Pressable onPress={() => router.push('/privacy')} hitSlop={8}>
                <Text style={styles.seeAllText}>Privacy Center</Text>
              </Pressable>
            </View>

            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              style={styles.heroOuter}
              contentStyle={styles.heroContent}>
              <View style={styles.heroTopRow}>
                <Soft3DIcon name="heart" accent="coral" size="lg" solid />
                <View style={styles.heroTextCol}>
                  <View style={styles.heroBadge}>
                    <Ionicons name="lock-closed" size={11} color={colors.tealDark} />
                    <Text style={styles.heroBadgeText}>Anonymous Consultation</Text>
                  </View>
                  <Text style={styles.heroTitle}>Have a health question?</Text>
                  <Text style={styles.heroSubtext}>
                    Share privately and receive guidance from a verified clinician.
                  </Text>
                </View>
              </View>

              <PrimaryButton
                label="Start a consultation"
                onPress={() => router.push('/consultation/new')}
                icon={<Ionicons name="add-circle-outline" size={19} color="#FFFFFF" />}
                style={styles.heroButton}
              />
            </GlassCard>

            {/* Two-Column Status Tiles */}
            <View style={styles.metricsRow}>
              <Pressable
                onPress={() => router.push('/(tabs)/consult')}
                style={({ pressed }) => [styles.metricCol, pressed && styles.pressed]}>
                <GlassCard
                  variant="elevated"
                  borderRadius={Radius.lg}
                  contentStyle={styles.metricCard}>
                  <View style={styles.metricTop}>
                    <Soft3DIcon name="chatbubble-ellipses" accent="teal" size="sm" />
                    <Text style={styles.metricLabel}>Consultations</Text>
                  </View>
                  <Text style={styles.metricValue}>{consultations.length}</Text>
                  <Text style={styles.metricSub}>
                    {respondedCount} replied • {activeCount} active
                  </Text>
                </GlassCard>
              </Pressable>

              <Pressable
                onPress={() => router.push('/privacy')}
                style={({ pressed }) => [styles.metricCol, pressed && styles.pressed]}>
                <GlassCard
                  variant="elevated"
                  borderRadius={Radius.lg}
                  contentStyle={styles.metricCard}>
                  <View style={styles.metricTop}>
                    <Soft3DIcon name="shield-checkmark" accent="sky" size="sm" />
                    <Text style={styles.metricLabel}>Identity</Text>
                  </View>
                  <Text style={styles.metricValue}>Masked</Text>
                  <Text style={styles.metricSub}>#anon-8291 • Encrypted</Text>
                </GlassCard>
              </Pressable>
            </View>
          </FadeSlideIn>

          {/* Quick Actions 4-Tile Dock */}
          <FadeSlideIn delay={200}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>

            <View style={styles.quickDockRow}>
              <Pressable
                onPress={() => router.push('/consultation/new')}
                accessibilityRole="button"
                accessibilityLabel="Ask a question"
                style={({ pressed }) => [styles.quickTileWrap, pressed && styles.pressed]}>
                <GlassCard
                  variant="neumorphic"
                  borderRadius={Radius.lg}
                  contentStyle={styles.quickTile}>
                  <Soft3DIcon name="chatbubbles" accent="teal" size="md" />
                  <Text style={styles.quickTileLabel}>Ask Now</Text>
                </GlassCard>
              </Pressable>

              <Pressable
                onPress={() => router.push('/(tabs)/learn')}
                accessibilityRole="button"
                accessibilityLabel="Learn about sexual health"
                style={({ pressed }) => [styles.quickTileWrap, pressed && styles.pressed]}>
                <GlassCard
                  variant="neumorphic"
                  borderRadius={Radius.lg}
                  contentStyle={styles.quickTile}>
                  <Soft3DIcon name="book" accent="sky" size="md" />
                  <Text style={styles.quickTileLabel}>Guides</Text>
                </GlassCard>
              </Pressable>

              <Pressable
                onPress={() => router.push('/privacy')}
                accessibilityRole="button"
                accessibilityLabel="Privacy Center"
                style={({ pressed }) => [styles.quickTileWrap, pressed && styles.pressed]}>
                <GlassCard
                  variant="neumorphic"
                  borderRadius={Radius.lg}
                  contentStyle={styles.quickTile}>
                  <Soft3DIcon name="lock-closed" accent="lavender" size="md" />
                  <Text style={styles.quickTileLabel}>Privacy</Text>
                </GlassCard>
              </Pressable>

              <Pressable
                onPress={() => router.push('/(tabs)/consult')}
                accessibilityRole="button"
                accessibilityLabel="Consultation History"
                style={({ pressed }) => [styles.quickTileWrap, pressed && styles.pressed]}>
                <GlassCard
                  variant="neumorphic"
                  borderRadius={Radius.lg}
                  contentStyle={styles.quickTile}>
                  <Soft3DIcon name="time" accent="amber" size="md" />
                  <Text style={styles.quickTileLabel}>History</Text>
                </GlassCard>
              </Pressable>
            </View>
          </FadeSlideIn>

          {/* Your Consultations Section */}
          <FadeSlideIn delay={260}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Your Consultations</Text>
              {consultations.length > 0 && (
                <Pressable
                  onPress={() => router.push('/(tabs)/consult')}
                  hitSlop={8}>
                  <Text style={styles.seeAllText}>View All ({consultations.length})</Text>
                </Pressable>
              )}
            </View>

            {consultations.length === 0 ? (
              <EmptyState
                title="Your private consultations will appear here."
                subtext="When you submit a sensitive question, its status and verified guidance will be safely stored here."
                actionLabel="Start a consultation"
                onAction={() => router.push('/consultation/new')}
              />
            ) : (
              <View style={styles.consultationsList}>
                {consultations.slice(0, 3).map((item) => (
                  <ConsultationCard
                    key={item.id}
                    consultation={item}
                    onPress={() => router.push(`/consultation/${item.id}`)}
                  />
                ))}
              </View>
            )}

            <View style={styles.emergencyWrapper}>
              <EmergencyNotice />
            </View>
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.md,
    },
    greetingSection: {
      marginTop: Spacing.xs,
      marginBottom: Spacing.lg,
    },
    greetingTitle: {
      ...Typography.display,
      fontSize: 27,
      color: colors.navy,
    },
    greetingSubtext: {
      ...Typography.bodySmall,
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 3,
    },
    searchWrap: {
      marginBottom: Spacing.xl,
    },
    searchInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: Spacing.lg,
      paddingRight: 8,
      paddingVertical: 9,
      gap: Spacing.sm,
    },
    searchPlaceholder: {
      ...Typography.bodySmall,
      fontSize: 14,
      color: colors.textMuted,
      flex: 1,
    },
    searchCtaPill: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.brandTeal,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: {
      transform: [{ scale: 0.98 }],
      opacity: 0.92,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    sectionTitle: {
      ...Typography.h2,
      fontSize: 18,
      color: colors.navy,
    },
    seeAllText: {
      ...Typography.caption,
      fontSize: 13,
      fontFamily: 'Urbanist_700Bold',
      color: colors.tealDark,
    },
    heroOuter: {
      marginBottom: Spacing.md,
    },
    heroContent: {
      padding: Spacing.xl,
    },
    heroTopRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    heroTextCol: {
      flex: 1,
    },
    heroBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Radius.pill,
      alignSelf: 'flex-start',
      marginBottom: 6,
    },
    heroBadgeText: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    heroTitle: {
      ...Typography.h2,
      fontSize: 20,
      color: colors.navy,
      marginBottom: 3,
    },
    heroSubtext: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      lineHeight: 19,
    },
    heroButton: {
      width: '100%',
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
      fontSize: 22,
      color: colors.navy,
      marginBottom: 2,
    },
    metricSub: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.textMuted,
    },
    quickDockRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.xl,
    },
    quickTileWrap: {
      flex: 1,
    },
    quickTile: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xs,
      gap: 8,
    },
    quickTileLabel: {
      ...Typography.caption,
      fontSize: 11.5,
      fontFamily: 'Urbanist_700Bold',
      color: colors.navy,
    },
    consultationsList: {
      marginBottom: Spacing.lg,
    },
    emergencyWrapper: {
      marginTop: Spacing.sm,
    },
  });
