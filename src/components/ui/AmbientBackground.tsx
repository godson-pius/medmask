import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '@/context/ThemeContext';

interface AmbientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'onboarding' | 'warm';
}

/**
 * Clean, plain minimalist screen background that adapts to light and dark themes.
 */
export function AmbientBackground({
  children,
  style,
}: AmbientBackgroundProps) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
