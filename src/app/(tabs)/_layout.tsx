import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Radius, Shadows } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type TabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

const TAB_ICONS: Record<
  string,
  {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
    label: string;
    href: '/(tabs)' | '/(tabs)/consult' | '/(tabs)/learn' | '/(tabs)/profile';
  }
> = {
  index: { active: 'home', inactive: 'home-outline', label: 'Home', href: '/(tabs)' },
  consult: {
    active: 'chatbubble-ellipses',
    inactive: 'chatbubble-ellipses-outline',
    label: 'Consult',
    href: '/(tabs)/consult',
  },
  learn: { active: 'book', inactive: 'book-outline', label: 'Learn', href: '/(tabs)/learn' },
  profile: { active: 'person', inactive: 'person-outline', label: 'Profile', href: '/(tabs)/profile' },
};

function FloatingGlassTabBar({ state, descriptors }: TabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  const leftRoutes = state.routes.slice(0, 2);
  const rightRoutes = state.routes.slice(2);

  const renderTab = (route: (typeof state.routes)[number], index: number) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    const meta = TAB_ICONS[route.name] || {
      active: 'ellipse',
      inactive: 'ellipse-outline',
      label: options.title || route.name,
      href: '/(tabs)' as const,
    };

    const onPress = () => {
      if (Platform.OS !== 'web') {
        try {
          Haptics.selectionAsync();
        } catch {}
      }
      if (!isFocused) {
        router.navigate(meta.href);
      }
    };

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={meta.label}
        style={styles.tabItem}>
        <View
          style={[
            styles.iconWrap,
            isFocused && { backgroundColor: colors.brandTealBg },
          ]}>
          <Ionicons
            name={isFocused ? meta.active : meta.inactive}
            size={20}
            color={isFocused ? colors.brandTeal : colors.textMuted}
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            isFocused
              ? { color: colors.tealDark, fontFamily: 'Urbanist_700Bold' }
              : { color: colors.textMuted, fontFamily: 'Urbanist_500Medium' },
          ]}>
          {meta.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.barOuter,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}>
      <View
        style={[
          styles.barContainer,
          isDark ? styles.darkFloatingShadow : Shadows.floating,
        ]}>
        <View
          style={[
            styles.barGlassClip,
            {
              backgroundColor: isDark
                ? Platform.OS === 'android'
                  ? 'rgba(19, 31, 42, 0.96)'
                  : 'rgba(19, 31, 42, 0.84)'
                : Platform.OS === 'android'
                  ? 'rgba(255, 255, 255, 0.96)'
                  : 'rgba(255, 255, 255, 0.86)',
              borderColor: isDark
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(27, 42, 61, 0.08)',
            },
          ]}>
          {Platform.OS !== 'android' && (
            <BlurView
              intensity={55}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          )}
          <View style={styles.barRow}>
            <View style={styles.sideGroup}>
              {leftRoutes.map((route, i) => renderTab(route, i))}
            </View>

            <View style={styles.fabSpacer} />

            <View style={styles.sideGroup}>
              {rightRoutes.map((route, i) => renderTab(route, i + 2))}
            </View>
          </View>
        </View>

        {/* Center Raised Glowing Teal + Button */}
        <Pressable
          onPress={() => {
            if (Platform.OS !== 'web') {
              try {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              } catch {}
            }
            router.push('/consultation/new');
          }}
          accessibilityRole="button"
          accessibilityLabel="Start a new anonymous consultation"
          style={({ pressed }) => [
            styles.centerFab,
            {
              backgroundColor: colors.brandTeal,
              borderColor: isDark ? '#0B1218' : 'rgba(255, 255, 255, 0.95)',
            },
            Shadows.tealGlow,
            pressed && styles.centerFabPressed,
          ]}>
          <View pointerEvents="none" style={styles.fabGloss} />
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingGlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="consult" options={{ title: 'Consult' }} />
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  barOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  barContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkFloatingShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.48,
    shadowRadius: 24,
    elevation: 10,
  },
  barGlassClip: {
    width: '100%',
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1.25,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: 8,
  },
  sideGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fabSpacer: {
    width: 68,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 58,
  },
  iconWrap: {
    width: 34,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10.5,
    letterSpacing: -0.1,
  },
  centerFab: {
    position: 'absolute',
    top: -16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    overflow: 'hidden',
  },
  centerFabPressed: {
    transform: [{ scale: 0.93 }],
    opacity: 0.9,
  },
  fabGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
});
