import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { SymptomType } from '@/types';
import { Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface SymptomChipProps {
  symptom: SymptomType;
  selected: boolean;
  onToggle: (symptom: SymptomType) => void;
}

export function SymptomChip({ symptom, selected, onToggle }: SymptomChipProps) {
  const { colors, isDark } = useAppTheme();

  const handlePress = () => {
    try {
      Haptics.selectionAsync();
    } catch {}
    onToggle(symptom);
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.brandTeal : colors.surfaceGlassStrong,
          borderColor: selected
            ? 'rgba(255, 255, 255, 0.35)'
            : isDark
              ? colors.borderGlass
              : colors.border,
        },
        !selected && !isDark && Shadows.subtle,
        selected && Shadows.tealGlow,
        pressed && styles.chipPressed,
      ]}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: selected ? '#FFFFFF' : colors.textMuted,
            backgroundColor: selected ? '#FFFFFF' : 'transparent',
          },
        ]}>
        {selected && <Ionicons name="checkmark" size={12} color={colors.brandTeal} />}
      </View>
      <Text
        style={[
          styles.label,
          { color: selected ? '#FFFFFF' : colors.navy },
          selected && styles.labelSelected,
        ]}>
        {symptom}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 11,
    borderRadius: Radius.pill,
    borderWidth: 1.25,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: 8,
  },
  chipPressed: {
    transform: [{ scale: 0.96 }],
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...Typography.bodySmall,
    fontSize: 13.5,
    fontFamily: 'Urbanist_600SemiBold',
  },
  labelSelected: {
    fontFamily: 'Urbanist_700Bold',
  },
});
