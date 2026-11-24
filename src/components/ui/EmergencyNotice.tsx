import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Spacing, Radius } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface EmergencyNoticeProps {
  compact?: boolean;
}

export function EmergencyNotice({ compact = false }: EmergencyNoticeProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        !compact && {
          backgroundColor: colors.surfaceGlass,
          borderColor: colors.border,
        },
        compact && styles.compactContainer,
      ]}>
      <Ionicons
        name="information-circle-outline"
        size={compact ? 15 : 17}
        color={colors.textMuted}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          { color: colors.textSecondary },
          compact && [styles.compactText, { color: colors.textMuted }],
        ]}>
        Medmask is not an emergency service. If you are experiencing a medical emergency, seek immediate in-person medical care.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
  },
  compactContainer: {
    padding: Spacing.sm,
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignItems: 'center',
  },
  icon: {
    marginTop: 1,
  },
  text: {
    ...Typography.bodySmall,
    flex: 1,
    lineHeight: 18,
  },
  compactText: {
    fontSize: 11.5,
    lineHeight: 16,
  },
});
