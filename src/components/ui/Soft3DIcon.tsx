import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/context/ThemeContext';

export type Soft3DAccent = 'teal' | 'coral' | 'sky' | 'lavender' | 'amber' | 'slate';

interface Soft3DIconProps {
  name: keyof typeof Ionicons.glyphMap;
  accent?: Soft3DAccent;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  solid?: boolean;
}

const LIGHT_ACCENT_MAP: Record<
  Soft3DAccent,
  { bg: string; solidBg: string; color: string; shadow: string; border: string }
> = {
  teal: {
    bg: '#E4F9F6',
    solidBg: '#12B5A6',
    color: '#0D9488',
    shadow: '#12B5A6',
    border: 'rgba(255, 255, 255, 0.95)',
  },
  coral: {
    bg: '#FFECEA',
    solidBg: '#F46A5E',
    color: '#EF5A4E',
    shadow: '#F46A5E',
    border: 'rgba(255, 255, 255, 0.95)',
  },
  sky: {
    bg: '#E8F4FF',
    solidBg: '#3B9EFF',
    color: '#2B8AE8',
    shadow: '#3B9EFF',
    border: 'rgba(255, 255, 255, 0.95)',
  },
  lavender: {
    bg: '#F1EEFF',
    solidBg: '#8B74F9',
    color: '#7B61FF',
    shadow: '#8B74F9',
    border: 'rgba(255, 255, 255, 0.95)',
  },
  amber: {
    bg: '#FFF5E0',
    solidBg: '#F59E0B',
    color: '#D97706',
    shadow: '#F59E0B',
    border: 'rgba(255, 255, 255, 0.95)',
  },
  slate: {
    bg: '#EEF3F7',
    solidBg: '#1B2A3D',
    color: '#1B2A3D',
    shadow: '#1B2A3D',
    border: 'rgba(255, 255, 255, 0.95)',
  },
};

const DARK_ACCENT_MAP: Record<
  Soft3DAccent,
  { bg: string; solidBg: string; color: string; shadow: string; border: string }
> = {
  teal: {
    bg: 'rgba(24, 196, 180, 0.18)',
    solidBg: '#18C4B4',
    color: '#2DD4BF',
    shadow: '#000000',
    border: 'rgba(45, 212, 191, 0.25)',
  },
  coral: {
    bg: 'rgba(244, 106, 94, 0.18)',
    solidBg: '#F46A5E',
    color: '#FF857A',
    shadow: '#000000',
    border: 'rgba(244, 106, 94, 0.25)',
  },
  sky: {
    bg: 'rgba(59, 158, 255, 0.18)',
    solidBg: '#3B9EFF',
    color: '#6BB8FF',
    shadow: '#000000',
    border: 'rgba(59, 158, 255, 0.25)',
  },
  lavender: {
    bg: 'rgba(139, 116, 249, 0.18)',
    solidBg: '#8B74F9',
    color: '#AE9BFF',
    shadow: '#000000',
    border: 'rgba(139, 116, 249, 0.25)',
  },
  amber: {
    bg: 'rgba(245, 158, 11, 0.18)',
    solidBg: '#F59E0B',
    color: '#FCD34D',
    shadow: '#000000',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  slate: {
    bg: 'rgba(148, 168, 184, 0.16)',
    solidBg: '#273A4D',
    color: '#D1DDE6',
    shadow: '#000000',
    border: 'rgba(255, 255, 255, 0.14)',
  },
};

const SIZE_MAP = {
  sm: { box: 36, icon: 17, radius: 12 },
  md: { box: 46, icon: 22, radius: 16 },
  lg: { box: 56, icon: 27, radius: 20 },
  xl: { box: 72, icon: 34, radius: 26 },
};

/**
 * Tactile 3D-inspired soft neumorphic icon tile with top glossy sheen.
 */
export function Soft3DIcon({
  name,
  accent = 'teal',
  size = 'md',
  style,
  solid = false,
}: Soft3DIconProps) {
  const { isDark } = useAppTheme();
  const palette = isDark ? DARK_ACCENT_MAP[accent] : LIGHT_ACCENT_MAP[accent];
  const dims = SIZE_MAP[size];

  return (
    <View
      style={[
        styles.shadowWrapper,
        {
          width: dims.box,
          height: dims.box,
          borderRadius: dims.radius,
          shadowColor: palette.shadow,
          shadowOpacity: isDark ? 0.35 : solid ? 0.32 : 0.16,
        },
        style,
      ]}>
      <View
        style={[
          styles.tile,
          {
            width: dims.box,
            height: dims.box,
            borderRadius: dims.radius,
            backgroundColor: solid ? palette.solidBg : palette.bg,
            borderColor: solid ? 'rgba(255, 255, 255, 0.30)' : palette.border,
          },
        ]}>
        <View
          pointerEvents="none"
          style={[
            styles.gloss,
            {
              borderTopLeftRadius: dims.radius,
              borderTopRightRadius: dims.radius,
              backgroundColor: solid
                ? 'rgba(255, 255, 255, 0.22)'
                : isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.72)',
            },
          ]}
        />
        <Ionicons
          name={name}
          size={dims.icon}
          color={solid ? '#FFFFFF' : palette.color}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.25,
    overflow: 'hidden',
  },
  gloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '44%',
  },
});
