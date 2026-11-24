import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface MedmaskSparkIconProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

/**
 * Custom branded Medmask 3D emblem icon derived from the official logo,
 * used in place of generic sparkle icons.
 */
export function MedmaskSparkIcon({ size = 18, style }: MedmaskSparkIconProps) {
  return (
    <Image
      source={require('@/assets/images/medmask-spark.png')}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
      accessibilityLabel="Medmask emblem"
    />
  );
}
