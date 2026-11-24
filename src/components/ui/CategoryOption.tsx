import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { ConsultationCategory } from '@/types';
import { Typography, Spacing, Radius } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { Soft3DIcon, Soft3DAccent } from './Soft3DIcon';
import * as Haptics from 'expo-haptics';

interface CategoryOptionProps {
  category: ConsultationCategory;
  description?: string;
  selected: boolean;
  onSelect: (category: ConsultationCategory) => void;
}

const CATEGORY_ICONS: Record<
  ConsultationCategory,
  { icon: keyof typeof Ionicons.glyphMap; accent: Soft3DAccent }
> = {
  'STI / STD concerns': { icon: 'shield-checkmark', accent: 'teal' },
  Symptoms: { icon: 'pulse', accent: 'coral' },
  'Sexual health': { icon: 'heart', accent: 'coral' },
  'Reproductive health': { icon: 'fitness', accent: 'lavender' },
  Testing: { icon: 'flask', accent: 'sky' },
  'Medication questions': { icon: 'medical', accent: 'amber' },
  'Something else': { icon: 'chatbubble-ellipses', accent: 'slate' },
};

const CATEGORY_DESCRIPTIONS: Record<ConsultationCategory, string> = {
  'STI / STD concerns': 'Questions about potential exposure, risk, or guidance',
  Symptoms: 'Discomfort, itching, sores, discharge, or changes',
  'Sexual health': 'Wellness, intimacy concerns, function, and questions',
  'Reproductive health': 'Fertility, cycles, protection, and contraception',
  Testing: 'Understanding what screenings to get and when',
  'Medication questions': 'Prescriptions, interactions, side-effects, or PrEP/PEP',
  'Something else': 'Any other private concern or confidential question',
};

export function CategoryOption({
  category,
  selected,
  onSelect,
}: CategoryOptionProps) {
  const { colors } = useAppTheme();

  const iconMeta = CATEGORY_ICONS[category] || {
    icon: 'help-circle' as const,
    accent: 'teal' as Soft3DAccent,
  };
  const subtitle = CATEGORY_DESCRIPTIONS[category];

  const handlePress = () => {
    try {
      Haptics.selectionAsync();
    } catch {}
    onSelect(category);
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <GlassCard
        variant={selected ? 'tealTint' : 'elevated'}
        borderRadius={Radius.lg}
        contentStyle={styles.card}>
        <Soft3DIcon
          name={iconMeta.icon}
          accent={selected ? 'teal' : iconMeta.accent}
          solid={selected}
          size="md"
        />

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              { color: selected ? colors.tealDark : colors.navy },
              selected && styles.titleSelected,
            ]}>
            {category}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        </View>

        <View
          style={[
            styles.radioCircle,
            {
              borderColor: selected ? colors.brandTeal : colors.borderOutline,
              backgroundColor: selected ? colors.brandTeal : colors.surfaceGlassStrong,
            },
          ]}>
          {selected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
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
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.h3,
    fontSize: 15,
  },
  titleSelected: {
    fontFamily: 'Urbanist_700Bold',
  },
  subtitle: {
    ...Typography.bodySmall,
    fontSize: 12.5,
    marginTop: 2,
    lineHeight: 17,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
