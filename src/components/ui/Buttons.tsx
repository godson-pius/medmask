import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform,
  View,
} from 'react-native';
import { Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { colors, isDark } = useAppTheme();

  const handlePress = () => {
    if (disabled || loading) return;
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics optional
      }
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.baseButton,
        {
          backgroundColor: colors.brandTeal,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.25)',
        },
        !disabled && Shadows.tealGlow,
        disabled && {
          backgroundColor: isDark ? '#243544' : '#CBD8DC',
          borderColor: 'transparent',
          opacity: 0.75,
        },
        pressed && !disabled && !loading && styles.primaryPressed,
        style,
      ]}>
      {!disabled && <View pointerEvents="none" style={styles.primaryGloss} />}
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.buttonText,
              styles.primaryText,
              disabled && { color: colors.textMuted },
              textStyle,
            ]}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { colors, isDark } = useAppTheme();

  const handlePress = () => {
    if (disabled || loading) return;
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics optional
      }
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.baseButton,
        {
          backgroundColor: colors.surfaceGlassStrong,
          borderWidth: 1.25,
          borderColor: isDark ? colors.borderGlass : colors.border,
        },
        !isDark && Shadows.subtle,
        disabled && styles.secondaryDisabled,
        pressed &&
          !disabled &&
          !loading && {
            backgroundColor: colors.brandTealBg,
            transform: [{ scale: 0.985 }],
          },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={colors.tealDark} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.buttonText,
              { color: colors.navy },
              disabled && { color: colors.textMuted },
              textStyle,
            ]}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 54,
    minHeight: 54,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    overflow: 'hidden',
  },
  primaryGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '46%',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  primaryPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  secondaryDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    ...Typography.button,
  },
  primaryText: {
    color: '#FFFFFF',
  },
});
