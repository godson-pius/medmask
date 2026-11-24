import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeSlideIn } from '@/components/ui/Motion';
import { AppColors, Radius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { MOCK_ARTICLES } from '@/data/mockArticles';
import { ArticleCategory } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES: ('All' | ArticleCategory)[] = [
  'All',
  'STIs & Testing',
  'Sexual Health',
  'Symptoms',
  'Consent & Relationships',
  'Reproductive Health',
];

export default function LearnScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArticleCategory>('All');

  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    if (selectedCategory === 'All') return true;
    return article.category === selectedCategory;
  });

  return (
    <AmbientBackground variant="warm">
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Health Library</Text>
            <Text style={styles.headerSubtext}>
              Evidence-based guides to help you make informed, confident decisions.
            </Text>
          </View>

          <GlassCard
            variant="tealTint"
            borderRadius={Radius.lg}
            style={styles.disclaimerOuter}
            contentStyle={styles.disclaimerPill}>
            <Ionicons
              name="information-circle"
              size={18}
              color={colors.brandTeal}
            />
            <Text style={styles.disclaimerText}>
              Educational information only. Does not replace personalized clinical advice.
            </Text>
          </GlassCard>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.categoryChip,
                    isSelected ? styles.categoryChipActive : !isDark && Shadows.subtle,
                    isSelected && Shadows.tealGlow,
                  ]}>
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextActive,
                    ]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.articlesList}>
            {filteredArticles.map((article, index) => (
              <FadeSlideIn key={article.id} delay={index * 55}>
                <ArticleCard
                  article={article}
                  featured={index === 0 && selectedCategory === 'All'}
                  onPress={() => router.push(`/article/${article.id}`)}
                />
              </FadeSlideIn>
            ))}
          </View>

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
      marginBottom: Spacing.md,
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
    disclaimerOuter: {
      marginBottom: Spacing.lg,
    },
    disclaimerPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: Spacing.md,
      paddingVertical: 10,
    },
    disclaimerText: {
      ...Typography.caption,
      color: colors.textBody,
      flex: 1,
      lineHeight: 17,
    },
    categoriesScroll: {
      gap: Spacing.sm,
      paddingBottom: Spacing.lg,
    },
    categoryChip: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: Radius.pill,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1.25,
      borderColor: isDark ? colors.borderGlass : colors.border,
    },
    categoryChipActive: {
      backgroundColor: colors.brandTeal,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    categoryChipText: {
      ...Typography.caption,
      fontSize: 12.5,
      color: colors.textSecondary,
      fontFamily: 'Urbanist_700Bold',
    },
    categoryChipTextActive: {
      color: '#FFFFFF',
    },
    articlesList: {
      marginBottom: Spacing.xl,
    },
  });
