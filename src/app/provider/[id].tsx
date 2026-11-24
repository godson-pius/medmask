import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  InputAccessoryView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppColors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useAlert } from '@/context/AlertContext';
import { Ionicons } from '@expo/vector-icons';

const CLINICAL_TEMPLATES = [
  {
    title: 'STI Testing & Timing Guidance',
    content:
      'Thank you for reaching out. Based on your exposure timeline and symptoms, routine screening is strongly recommended. Testing after 7–14 days allows accurate detection for bacterial STIs (chlamydia/gonorrhea) via NAAT urine or swab testing. Please avoid sexual contact until you receive clear results.',
    nextStep:
      'Schedule a routine NAAT urine/swab screening at an in-person sexual health clinic or discreet home test.',
  },
  {
    title: 'Symptom Reassurance & Observation',
    content:
      'Thank you for sharing your concern. Mild irritation can stem from a variety of causes including contact dermatitis, friction, or localized imbalances. If symptoms do not abate within 48 hours or worsen, an in-person visual exam is advised.',
    nextStep:
      'Monitor symptoms for 48 hours. If pain, discharge, or lesions develop, visit an outpatient healthcare clinic.',
  },
];

export default function ProviderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getConsultationById, addProviderResponse } = useConsultations();
  const { colors, isDark } = useAppTheme();
  const { showAlert } = useAlert();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const consultation = getConsultationById(id || '');

  const [responseText, setResponseText] = useState<string>('');
  const [nextStepText, setNextStepText] = useState<string>('');
  const [focusedField, setFocusedField] = useState<'response' | 'nextStep' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const scrollViewRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const formYRef = useRef<number>(0);
  const nextStepOffsetRef = useRef<number>(0);

  const KEYBOARD_DONE_ID = 'providerKeyboardDone';

  const scrollToField = (field: 'response' | 'nextStep') => {
    setTimeout(() => {
      const targetY =
        field === 'response'
          ? Math.max(0, formYRef.current - 12)
          : Math.max(0, formYRef.current + nextStepOffsetRef.current - 12);
      scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
    }, 150);
  };

  if (!consultation) {
    return (
      <AmbientBackground>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundTitle}>Consultation not found</Text>
            <SecondaryButton
              label="Back to Queue"
              onPress={() => router.replace('/provider')}
            />
          </View>
        </SafeAreaView>
      </AmbientBackground>
    );
  }

  const existingProviderMsg = consultation.messages.find(
    (m) => m.sender === 'provider'
  );

  const handleApplyTemplate = (tpl: (typeof CLINICAL_TEMPLATES)[0]) => {
    setResponseText(tpl.content);
    setNextStepText(tpl.nextStep);
  };

  const handleSendResponse = () => {
    if (responseText.trim().length < 15) {
      showAlert({
        title: 'Response Required',
        message: 'Please enter a clinical response of at least 15 characters.',
        variant: 'warning',
        buttons: [{ text: 'Got it' }],
      });
      return;
    }

    setIsSubmitting(true);
    Keyboard.dismiss();

    setTimeout(() => {
      addProviderResponse(
        consultation.id,
        responseText.trim(),
        nextStepText.trim() || undefined
      );
      setIsSubmitting(false);

      showAlert({
        title: 'Response Delivered',
        message:
          'Your verified clinical response has been delivered to the anonymous consultation.',
        variant: 'success',
        dismissible: false,
        buttons: [
          {
            text: 'Back to Intake Queue',
            onPress: () => router.replace('/provider'),
          },
        ],
      });
    }, 400);
  };

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}>
          <View style={styles.navBar}>
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={12}
              style={[styles.backButton, !isDark && Shadows.subtle]}>
              <Ionicons name="arrow-back" size={20} color={colors.navy} />
            </Pressable>

            <View style={styles.navTitleContainer}>
              <Text style={styles.navTitle}>Review Consultation</Text>
              <Text style={styles.navSub}>{consultation.anonymousId}</Text>
            </View>

            <StatusBadge status={consultation.status} showIcon={false} />
          </View>

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}>
            <GlassCard
              variant="elevated"
              borderRadius={Radius.xl}
              style={styles.cardOuter}
              contentStyle={styles.patientCard}>
              <View style={styles.patientCardHeader}>
                <View style={styles.anonPill}>
                  <Ionicons name="lock-closed" size={12} color={colors.tealDark} />
                  <Text style={styles.anonPillText}>
                    {consultation.anonymousId}
                  </Text>
                </View>
                <Text style={styles.categoryLabel}>{consultation.category}</Text>
              </View>

              <Text style={styles.sectionHeading}>Patient Concern</Text>
              <Text style={styles.concernFullText}>{consultation.description}</Text>

              <Text style={[styles.sectionHeading, { marginTop: Spacing.md }]}>
                Symptoms Reported
              </Text>
              <View style={styles.symptomsRow}>
                {consultation.symptoms.map((sym, idx) => (
                  <View key={idx} style={styles.symptomTag}>
                    <Text style={styles.symptomTagText}>{sym}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>

            {existingProviderMsg && (
              <GlassCard
                variant="tealTint"
                borderRadius={Radius.xl}
                style={styles.cardOuter}
                contentStyle={styles.existingResponseBox}>
                <View style={styles.existingResponseHeader}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.brandTeal} />
                  <Text style={styles.existingResponseTitle}>
                    Previous Provider Guidance Delivered
                  </Text>
                </View>
                <Text style={styles.existingResponseContent}>
                  {existingProviderMsg.content}
                </Text>
                {existingProviderMsg.nextStepRecommendation && (
                  <Text style={styles.existingResponseNext}>
                    Next Step: {existingProviderMsg.nextStepRecommendation}
                  </Text>
                )}
              </GlassCard>
            )}

            <Text style={styles.templateSectionTitle}>
              Quick Clinical Guidance Templates
            </Text>
            <View style={styles.templatesContainer}>
              {CLINICAL_TEMPLATES.map((tpl, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleApplyTemplate(tpl)}
                  style={({ pressed }) => [
                    styles.templateChip,
                    !isDark && Shadows.subtle,
                    pressed && styles.templateChipPressed,
                  ]}>
                  <Ionicons name="flash" size={14} color={colors.brandTeal} />
                  <Text style={styles.templateChipText}>{tpl.title}</Text>
                </Pressable>
              ))}
            </View>

            <View
              style={styles.formContainer}
              onLayout={(e) => {
                formYRef.current = e.nativeEvent.layout.y;
              }}>
              <View style={styles.fieldHeaderRow}>
                <Text style={styles.formLabel}>Clinical Response</Text>
                {focusedField === 'response' && (
                  <Pressable
                    onPress={() => Keyboard.dismiss()}
                    hitSlop={8}
                    style={styles.donePill}>
                    <Ionicons name="checkmark" size={13} color={colors.tealDark} />
                    <Text style={styles.donePillText}>Done</Text>
                  </Pressable>
                )}
              </View>
              <GlassCard
                variant="elevated"
                borderRadius={Radius.xl}
                contentStyle={styles.inputWrapper}>
                <TextInput
                  style={styles.multilineInput}
                  placeholder="Provide compassionate, medically sound guidance and next steps..."
                  placeholderTextColor={colors.textMuted}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={responseText}
                  onChangeText={setResponseText}
                  onFocus={() => {
                    setFocusedField('response');
                    scrollToField('response');
                  }}
                  onBlur={() => setFocusedField((prev) => (prev === 'response' ? null : prev))}
                  inputAccessoryViewID={Platform.OS === 'ios' ? KEYBOARD_DONE_ID : undefined}
                />
              </GlassCard>

              <View
                onLayout={(e) => {
                  nextStepOffsetRef.current = e.nativeEvent.layout.y;
                }}>
                <View style={[styles.fieldHeaderRow, { marginTop: Spacing.lg }]}>
                  <Text style={styles.formLabel}>
                    Recommended Next Step (Optional)
                  </Text>
                  {focusedField === 'nextStep' && (
                    <Pressable
                      onPress={() => Keyboard.dismiss()}
                      hitSlop={8}
                      style={styles.donePill}>
                      <Ionicons name="checkmark" size={13} color={colors.tealDark} />
                      <Text style={styles.donePillText}>Done</Text>
                    </Pressable>
                  )}
                </View>
                <GlassCard
                  variant="elevated"
                  borderRadius={Radius.xl}
                  contentStyle={styles.nextStepInputWrapper}>
                  <TextInput
                    style={styles.nextStepMultilineInput}
                    placeholder="e.g. Schedule a routine urine NAAT test within 48 hours..."
                    placeholderTextColor={colors.textMuted}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={nextStepText}
                    onChangeText={setNextStepText}
                    onFocus={() => {
                      setFocusedField('nextStep');
                      scrollToField('nextStep');
                    }}
                    onBlur={() => setFocusedField((prev) => (prev === 'nextStep' ? null : prev))}
                    inputAccessoryViewID={Platform.OS === 'ios' ? KEYBOARD_DONE_ID : undefined}
                  />
                </GlassCard>
              </View>
            </View>

            <GlassCard
              variant="glass"
              borderRadius={Radius.lg}
              contentStyle={styles.safetyBox}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.safetyText}>
                Responses appear under the title "Verified Healthcare Professional". Never provide definitive diagnostic claims or replace emergency triage.
              </Text>
            </GlassCard>
          </ScrollView>

          <View style={styles.bottomBar}>
            <PrimaryButton
              label="Send response"
              onPress={handleSendResponse}
              loading={isSubmitting}
              icon={<Ionicons name="send" size={16} color="#FFFFFF" />}
              disabled={responseText.trim().length === 0}
            />
          </View>

          {Platform.OS === 'ios' && (
            <InputAccessoryView nativeID={KEYBOARD_DONE_ID}>
              <View style={styles.keyboardBar}>
                <Pressable
                  onPress={() => Keyboard.dismiss()}
                  hitSlop={8}
                  style={styles.keyboardDoneBtn}>
                  <Text style={styles.keyboardDoneText}>Done</Text>
                </Pressable>
              </View>
            </InputAccessoryView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AmbientBackground>
  );
}

const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.surfaceGlassStrong,
      borderWidth: 1,
      borderColor: isDark ? colors.borderGlass : colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navTitleContainer: {
      alignItems: 'center',
    },
    navTitle: {
      ...Typography.h3,
      fontSize: 15,
      color: colors.navy,
    },
    navSub: {
      ...Typography.caption,
      color: colors.textMuted,
      fontSize: 11,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.xl,
    },
    cardOuter: {
      marginBottom: Spacing.lg,
    },
    patientCard: {
      padding: Spacing.lg,
    },
    patientCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    anonPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.tealBorder,
    },
    anonPillText: {
      ...Typography.caption,
      fontSize: 11,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    categoryLabel: {
      ...Typography.label,
      color: colors.navy,
      fontSize: 13,
    },
    sectionHeading: {
      ...Typography.caption,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      fontFamily: 'Urbanist_700Bold',
      marginBottom: 4,
    },
    concernFullText: {
      ...Typography.body,
      color: colors.textBody,
      lineHeight: 22,
    },
    symptomsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 4,
    },
    symptomTag: {
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Radius.pill,
    },
    symptomTagText: {
      ...Typography.caption,
      fontSize: 11.5,
      color: colors.tealDark,
      fontFamily: 'Urbanist_600SemiBold',
    },
    existingResponseBox: {
      padding: Spacing.lg,
      gap: 5,
    },
    existingResponseHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    existingResponseTitle: {
      ...Typography.label,
      fontSize: 13,
      color: colors.successText,
    },
    existingResponseContent: {
      ...Typography.bodySmall,
      color: colors.textBody,
      lineHeight: 19,
    },
    existingResponseNext: {
      ...Typography.caption,
      color: colors.successText,
      fontFamily: 'Urbanist_700Bold',
      marginTop: 4,
    },
    templateSectionTitle: {
      ...Typography.caption,
      color: colors.textMuted,
      marginBottom: Spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      fontFamily: 'Urbanist_700Bold',
    },
    templatesContainer: {
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    templateChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: colors.surfaceGlassStrong,
      paddingHorizontal: Spacing.md,
      paddingVertical: 11,
      borderRadius: Radius.pill,
      borderWidth: 1.2,
      borderColor: colors.tealBorder,
    },
    templateChipPressed: {
      backgroundColor: colors.brandTealBg,
    },
    templateChipText: {
      ...Typography.caption,
      fontSize: 12.5,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    formContainer: {
      marginBottom: Spacing.xl,
    },
    fieldHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    formLabel: {
      ...Typography.label,
      color: colors.navy,
    },
    donePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.tealBorder,
    },
    donePillText: {
      ...Typography.caption,
      fontSize: 12,
      fontFamily: 'Urbanist_700Bold',
      color: colors.tealDark,
    },
    inputWrapper: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      minHeight: 145,
    },
    multilineInput: {
      ...Typography.body,
      color: colors.navy,
      fontSize: 15,
      lineHeight: 22,
      minHeight: 118,
      paddingTop: 0,
      paddingBottom: 0,
    },
    nextStepInputWrapper: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      minHeight: 104,
    },
    nextStepMultilineInput: {
      ...Typography.body,
      color: colors.navy,
      fontSize: 14.5,
      lineHeight: 21,
      minHeight: 78,
      paddingTop: 0,
      paddingBottom: 0,
    },
    keyboardBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: 8,
      backgroundColor: colors.surfaceSolid,
      borderTopWidth: 1,
      borderTopColor: colors.borderSubtle,
    },
    keyboardDoneBtn: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: Radius.pill,
      backgroundColor: colors.brandTealBg,
    },
    keyboardDoneText: {
      ...Typography.label,
      fontSize: 14,
      color: colors.tealDark,
    },
    safetyBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      padding: Spacing.md,
    },
    safetyText: {
      ...Typography.caption,
      color: colors.textSecondary,
      flex: 1,
      lineHeight: 17,
    },
    bottomBar: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surfaceGlass,
      borderTopWidth: 1,
      borderTopColor: colors.borderSubtle,
    },
    notFoundContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xl,
      gap: Spacing.md,
    },
    notFoundTitle: {
      ...Typography.h2,
      color: colors.navy,
    },
  });
