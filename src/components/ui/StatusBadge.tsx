import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConsultationStatus } from '@/types';
import { Typography, Radius } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface StatusBadgeProps {
  status: ConsultationStatus;
  showIcon?: boolean;
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const { colors, isDark } = useAppTheme();

  const config = {
    submitted: {
      label: 'Waiting',
      color: colors.warningText,
      dot: colors.amber,
      bg: colors.warningBg,
      border: colors.warningBorder,
      iconName: 'time-outline' as const,
    },
    under_review: {
      label: 'In review',
      color: isDark ? '#6BB8FF' : '#1D6FD8',
      dot: colors.sky,
      bg: isDark ? 'rgba(59, 158, 255, 0.16)' : 'rgba(237, 246, 255, 0.92)',
      border: 'rgba(59, 158, 255, 0.30)',
      iconName: 'sync-outline' as const,
    },
    responded: {
      label: 'Responded',
      color: colors.successText,
      dot: colors.brandTeal,
      bg: colors.successBg,
      border: colors.successBorder,
      iconName: 'checkmark-circle' as const,
    },
  }[status];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
        },
      ]}>
      {showIcon ? (
        <Ionicons
          name={config.iconName}
          size={12}
          color={config.color}
          style={styles.icon}
        />
      ) : (
        <View style={[styles.dot, { backgroundColor: config.dot }]} />
      )}
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
    gap: 5,
  },
  icon: {
    marginRight: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    ...Typography.caption,
    fontFamily: 'Urbanist_700Bold',
    fontSize: 11,
  },
});
