import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { Easing, FadeIn, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { AppColors, Radius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { MedmaskSparkIcon } from '@/components/ui/MedmaskSparkIcon';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';

export type AlertVariant = 'brand' | 'success' | 'warning' | 'error' | 'info';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface AlertOptions {
  title: string;
  message: string;
  variant?: AlertVariant;
  buttons?: AlertButton[];
  dismissible?: boolean;
}

interface AlertContextValue {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [alertState, setAlertState] = useState<AlertOptions | null>(null);

  const hideAlert = useCallback(() => {
    setAlertState(null);
  }, []);

  const showAlert = useCallback((options: AlertOptions) => {
    if (Platform.OS !== 'web') {
      try {
        if (options.variant === 'success') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else if (options.variant === 'error') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } else if (options.variant === 'warning') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      } catch {}
    }
    setAlertState(options);
  }, []);

  const buttons: AlertButton[] = alertState?.buttons?.length
    ? alertState.buttons
    : [{ text: 'Got it', style: 'default' }];

  const handleButtonPress = (btn: AlertButton) => {
    setAlertState(null);
    if (btn.onPress) {
      setTimeout(() => btn.onPress?.(), 60);
    }
  };

  const renderEmblem = (variant: AlertVariant = 'brand') => {
    if (variant === 'success') {
      return <Soft3DIcon name="checkmark-done" accent="teal" size="lg" solid />;
    }
    if (variant === 'warning') {
      return <Soft3DIcon name="alert-circle" accent="amber" size="lg" solid />;
    }
    if (variant === 'error') {
      return <Soft3DIcon name="close-circle" accent="coral" size="lg" solid />;
    }
    if (variant === 'info') {
      return <Soft3DIcon name="information-circle" accent="sky" size="lg" solid />;
    }
    return (
      <View style={[styles.brandOrb, !isDark && Shadows.subtle]}>
        <MedmaskSparkIcon size={34} />
      </View>
    );
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      <Modal
        visible={!!alertState}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => {
          if (alertState?.dismissible !== false) hideAlert();
        }}>
        {alertState && (
          <Animated.View entering={FadeIn.duration(180)} style={styles.overlay}>
            {Platform.OS !== 'android' && (
              <BlurView
                intensity={28}
                tint={isDark ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
              />
            )}
            <Pressable
              style={styles.backdrop}
              onPress={() => {
                if (alertState.dismissible !== false) hideAlert();
              }}
            />

            <Animated.View
              entering={ZoomIn.duration(200).easing(Easing.out(Easing.cubic))}
              style={styles.dialogWrap}>
              <GlassCard
                variant="elevated"
                borderRadius={Radius.xl}
                contentStyle={styles.dialogCard}>
                {/* Subtle top brand bar */}
                <View style={styles.emblemWrap}>
                  {renderEmblem(alertState.variant)}
                </View>

                <Text style={styles.title}>{alertState.title}</Text>
                <Text style={styles.message}>{alertState.message}</Text>

                <View style={styles.actionsStack}>
                  {buttons.map((btn, idx) => {
                    const isCancel = btn.style === 'cancel';
                    const isDestructive = btn.style === 'destructive';
                    const isPrimary = !isCancel && !isDestructive && idx === 0;

                    if (isDestructive) {
                      return (
                        <Pressable
                          key={idx}
                          onPress={() => handleButtonPress(btn)}
                          accessibilityRole="button"
                          accessibilityLabel={btn.text}
                          style={({ pressed }) => [
                            styles.destructiveBtn,
                            pressed && { opacity: 0.85, transform: [{ scale: 0.985 }] },
                          ]}>
                          <Text style={styles.destructiveText}>{btn.text}</Text>
                        </Pressable>
                      );
                    }

                    if (isPrimary) {
                      return (
                        <PrimaryButton
                          key={idx}
                          label={btn.text}
                          onPress={() => handleButtonPress(btn)}
                          style={styles.actionBtn}
                        />
                      );
                    }

                    return (
                      <SecondaryButton
                        key={idx}
                        label={btn.text}
                        onPress={() => handleButtonPress(btn)}
                        style={styles.actionBtn}
                      />
                    );
                  })}
                </View>
              </GlassCard>
            </Animated.View>
          </Animated.View>
        )}
      </Modal>
    </AlertContext.Provider>
  );
}

export function useAlert(): AlertContextValue {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return ctx;
}

const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.xxl,
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: isDark ? 'rgba(4, 9, 14, 0.72)' : 'rgba(15, 27, 41, 0.36)',
    },
    dialogWrap: {
      width: '100%',
      maxWidth: 340,
    },
    dialogCard: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xxl,
      paddingBottom: Spacing.xl,
      alignItems: 'center',
    },
    emblemWrap: {
      marginBottom: Spacing.md,
    },
    brandOrb: {
      width: 60,
      height: 60,
      borderRadius: 20,
      backgroundColor: colors.brandTealBg,
      borderWidth: 1.25,
      borderColor: colors.tealBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...Typography.h2,
      fontSize: 20,
      color: colors.navy,
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    message: {
      ...Typography.bodySmall,
      fontSize: 14.5,
      lineHeight: 21,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    actionsStack: {
      width: '100%',
      gap: Spacing.sm,
    },
    actionBtn: {
      width: '100%',
      height: 48,
      minHeight: 48,
    },
    destructiveBtn: {
      width: '100%',
      height: 48,
      borderRadius: Radius.pill,
      backgroundColor: colors.errorBg,
      borderWidth: 1,
      borderColor: colors.errorBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    destructiveText: {
      ...Typography.button,
      color: colors.errorText,
    },
  });
