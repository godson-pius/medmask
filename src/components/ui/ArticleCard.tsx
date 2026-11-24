import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Article, ArticleCategory } from '@/types';
import { GlassCard } from './GlassCard';
import { Soft3DIcon, Soft3DAccent } from './Soft3DIcon';
import { Typography, Spacing, Radius } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
  featured?: boolean;
}

const CATEGORY_STYLE: Record<
  ArticleCategory,
  { icon: keyof typeof Ionicons.glyphMap; accent: Soft3DAccent }
> = {
  'STIs & Testing': { icon: 'flask', accent: 'teal' },
  'Sexual Health': { icon: 'heart', accent: 'coral' },
  Symptoms: { icon: 'pulse', accent: 'sky' },
  'Consent & Relationships': { icon: 'people', accent: 'lavender' },
  'Reproductive Health': { icon: 'shield-checkmark', accent: 'amber' },
};

export function ArticleCard({ article, onPress, featured = false }: ArticleCardProps) {
  const { colors } = useAppTheme();

  const catStyle = CATEGORY_STYLE[article.category] || {
    icon: 'book',
    accent: 'teal' as Soft3DAccent,
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={article.title}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <GlassCard
        variant={featured ? 'tealTint' : 'elevated'}
        contentStyle={styles.cardContent}>
        <View style={styles.row}>
          <Soft3DIcon
            name={catStyle.icon}
            accent={catStyle.accent}
            size="md"
          />
          <View style={styles.bodyCol}>
            <View style={styles.topRow}>
              <View
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: colors.surfaceGlassStrong,
                    borderColor: colors.tealBorder,
                  },
                ]}>
                <Text style={[styles.categoryText, { color: colors.tealDark }]}>
                  {article.category}
                </Text>
              </View>
              <View style={styles.timeBadge}>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                <Text style={[styles.timeText, { color: colors.textMuted }]}>
                  {article.readingTime}
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.title,
                { color: colors.navy },
                featured && styles.featuredTitle,
              ]}>
              {article.title}
            </Text>

            <Text
              style={[styles.description, { color: colors.textSecondary }]}
              numberOfLines={2}>
              {article.shortDescription}
            </Text>

            <View style={styles.readMoreRow}>
              <Text style={[styles.readMoreText, { color: colors.tealDark }]}>
                Read guide
              </Text>
              <Ionicons name="arrow-forward" size={13} color={colors.tealDark} />
            </View>
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.94,
  },
  cardContent: {
    padding: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  bodyCol: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 6,
  },
  categoryBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  categoryText: {
    ...Typography.caption,
    fontSize: 10.5,
    fontFamily: 'Urbanist_700Bold',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  timeText: {
    ...Typography.caption,
    fontSize: 11,
  },
  title: {
    ...Typography.h3,
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  featuredTitle: {
    fontSize: 17,
  },
  description: {
    ...Typography.bodySmall,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    ...Typography.caption,
    fontFamily: 'Urbanist_700Bold',
  },
});
