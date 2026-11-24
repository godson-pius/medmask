import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface FadeSlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Smooth Apple-style staggered upward fade entrance.
 */
export function FadeSlideIn({
  children,
  delay = 0,
  duration = 280,
  style,
}: FadeSlideInProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(duration).easing(Easing.out(Easing.cubic))}
      style={style}>
      {children}
    </Animated.View>
  );
}

interface GentleFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export function GentleFade({
  children,
  delay = 0,
  duration = 380,
  style,
}: GentleFadeProps) {
  return (
    <Animated.View
      entering={FadeIn.delay(delay).duration(duration)}
      style={style}>
      {children}
    </Animated.View>
  );
}

interface FloatingViewProps {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Subtle continuous floating levitation for hero 3D icons and emblems.
 */
export function FloatingView({
  children,
  distance = 4,
  duration = 2600,
  style,
}: FloatingViewProps) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-distance, {
          duration,
          easing: Easing.inOut(Easing.sin),
        }),
        withTiming(distance, {
          duration,
          easing: Easing.inOut(Easing.sin),
        })
      ),
      -1,
      true
    );
  }, [distance, duration, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
}

interface PulseDotProps {
  color: string;
  size?: number;
}

/**
 * Softly breathing live indicator dot.
 */
export function PulseDot({ color, size = 8 }: PulseDotProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.45, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.45, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}
