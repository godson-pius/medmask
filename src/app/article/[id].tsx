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
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { useAppTheme } from '@/context/ThemeContext';
import { MOCK_ARTICLES } from '@/data/mockArticles';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';

export default function ArticleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const article = MOCK_ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <AmbientBackground>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundTitle}>Article not found</Text>
            <SecondaryButton
              label="Back to Learn"
              onPress={() => router.replace('/(tabs)/learn')}
            />
          </View>
        </SafeAreaView>
      </AmbientBackground>
    );
  }

  return (
    <AmbientBackground variant="warm">
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

          <Text style={styles.navTitle} numberOfLines={1}>
            {article.category}
          </Text>

          <Pressable
            onPress={() => router.push('/(tabs)/learn')}
            hitSlop={12}
            style={[styles.backButton, !isDark && Shadows.subtle]}>
            <Ionicons name="book-outline" size={18} color={colors.navy} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <GlassCard
            variant="elevated"
            borderRadius={Radius.xl}
            style={styles.headerCardOuter}
            contentStyle={styles.headerCard}>
            <View style={styles.badgesRow}>
              <View style={styles.categoryPill}>
                <Text style={styles.categoryPillText}>{article.category}</Text>
              </View>
              <View style={styles.timeBadge}>
                <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                <Text style={styles.timeText}>{article.readingTime}</Text>
              </View>
              <View style={styles.timeBadge}>
                <Ionicons name="shield-checkmark" size={13} color={colors.brandTeal} />
                <Text style={styles.timeText}>{article.publishedDate}</Text>
              </View>
            </View>

            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.leadSummary}>{article.shortDescription}</Text>
          </GlassCard>

          <GlassCard
            variant="elevated"
            borderRadius={Radius.xl}
            style={styles.bodyCardOuter}
            contentStyle={styles.bodyCard}>
            {article.sections.map((section, sIdx) => (
              <View
                key={sIdx}
                style={[
                  styles.sectionContainer,
                  sIdx === article.sections.length - 1 && { marginBottom: 0 },
                ]}>
                {section.subheading && (
                  <Text style={styles.subheading}>{section.subheading}</Text>
                )}

                {section.paragraphs.map((p, pIdx) => (
                  <Text key={pIdx} style={styles.paragraph}>
                    {p}
                  </Text>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <View style={styles.bulletList}>
                    {section.bullets.map((bullet, bIdx) => (
                      <View key={bIdx} style={styles.bulletItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {section.callout && (
                  <View style={styles.calloutBox}>
                    <Ionicons
                      name="information-circle"
                      size={20}
                      color={colors.brandTeal}
                    />
                    <Text style={styles.calloutText}>{section.callout}</Text>
                  </View>
                )}
              </View>
            ))}
          </GlassCard>

          <GlassCard
            variant="tealTint"
            borderRadius={Radius.xl}
            style={styles.guidanceOuter}
            contentStyle={styles.guidanceCard}>
            <Soft3DIcon
              name="chatbubble-ellipses"
              accent="teal"
              size="lg"
              solid
              style={{ marginBottom: Spacing.md }}
            />
            <Text style={styles.guidanceTitle}>Need personal guidance?</Text>
            <Text style={styles.guidanceSubtext}>
              If you have questions about your own symptoms or test results, ask our healthcare team anonymously.
            </Text>
            <PrimaryButton
              label="Start a private consultation"
              onPress={() =>
                router.push({
                  pathname: '/consultation/new',
                  params: { category: article.relatedCategory || 'STI / STD concerns' },
                })
              }
              icon={
                <Ionicons
                  name="shield-checkmark"
                  size={18}
                  color="#FFFFFF"
                />
              }
              style={styles.guidanceButton}
            />
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
    navTitle: {
      ...Typography.label,
      color: colors.navy,
      maxWidth: 200,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.huge,
    },
    headerCardOuter: {
      marginBottom: Spacing.lg,
    },
    headerCard: {
      padding: Spacing.xl,
    },
    badgesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    categoryPill: {
      backgroundColor: colors.brandTeal,
      paddingHorizontal: 11,
      paddingVertical: 4,
      borderRadius: Radius.pill,
    },
    categoryPillText: {
      ...Typography.caption,
      color: '#FFFFFF',
      fontFamily: 'Urbanist_700Bold',
    },
    timeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    timeText: {
      ...Typography.caption,
      color: colors.textSecondary,
      fontSize: 12,
    },
    title: {
      ...Typography.h1,
      fontSize: 24,
      lineHeight: 31,
      color: colors.navy,
      marginBottom: Spacing.sm,
    },
    leadSummary: {
      ...Typography.body,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
    },
    bodyCardOuter: {
      marginBottom: Spacing.xl,
    },
    bodyCard: {
      padding: Spacing.xl,
    },
    sectionContainer: {
      marginBottom: Spacing.xl,
    },
    subheading: {
      ...Typography.h2,
      fontSize: 18,
      color: colors.navy,
      marginBottom: Spacing.sm,
    },
    paragraph: {
      ...Typography.body,
      color: colors.textBody,
      lineHeight: 24,
      marginBottom: Spacing.md,
    },
    bulletList: {
      marginVertical: Spacing.sm,
      gap: Spacing.sm,
      paddingLeft: Spacing.xs,
    },
    bulletItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
    },
    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.brandTeal,
      marginTop: 8,
    },
    bulletText: {
      ...Typography.body,
      flex: 1,
      color: colors.textBody,
      lineHeight: 22,
    },
    calloutBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.brandTealBg,
      padding: Spacing.md,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: colors.tealBorder,
      marginTop: Spacing.md,
      gap: Spacing.sm,
    },
    calloutText: {
      ...Typography.bodySmall,
      color: colors.navy,
      flex: 1,
      lineHeight: 20,
      fontFamily: 'Urbanist_500Medium',
    },
    guidanceOuter: {
      marginBottom: Spacing.xl,
    },
    guidanceCard: {
      padding: Spacing.xl,
      alignItems: 'center',
    },
    guidanceTitle: {
      ...Typography.h2,
      fontSize: 19,
      color: colors.navy,
      marginBottom: 4,
      textAlign: 'center',
    },
    guidanceSubtext: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 19,
      maxWidth: 280,
      marginBottom: Spacing.lg,
    },
    guidanceButton: {
      width: '100%',
    },
    notFoundContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xl,
      gap: Spacing.md,
    },
    notFoundTitle: {
      ...Typography.h2,
      color: colors.navy,
    },
  });
