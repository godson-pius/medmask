import React, { useMemo, useState } from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppColors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { CategoryOption } from '@/components/ui/CategoryOption';
import { SymptomChip } from '@/components/ui/SymptomChip';
import { PrimaryButton } from '@/components/ui/Buttons';
import { PrivacyBanner } from '@/components/ui/PrivacyBanner';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { GlassCard } from '@/components/ui/GlassCard';
import { Soft3DIcon } from '@/components/ui/Soft3DIcon';
import { FadeSlideIn } from '@/components/ui/Motion';
import { useConsultations } from '@/context/ConsultationContext';
import { useAppTheme } from '@/context/ThemeContext';
import { ConsultationCategory, SymptomType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyNotice } from '@/components/ui/EmergencyNotice';

const ALL_CATEGORIES: ConsultationCategory[] = [
  'STI / STD concerns',
  'Symptoms',
  'Sexual health',
  'Reproductive health',
  'Testing',
  'Medication questions',
  'Something else',
];

const ALL_SYMPTOMS: SymptomType[] = [
  'Itching',
  'Pain',
  'Rash',
  'Unusual discharge',
  'Burning sensation',
  'Sores',
  'Swelling',
  'No symptoms',
  'Other',
];

export default function NewConsultationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const { createConsultation } = useConsultations();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ConsultationCategory>(
    (params.category as ConsultationCategory) || 'STI / STD concerns'
  );
  const [concernText, setConcernText] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleToggleSymptom = (symptom: SymptomType) => {
    if (symptom === 'No symptoms') {
      if (selectedSymptoms.includes('No symptoms')) {
        setSelectedSymptoms([]);
      } else {
        setSelectedSymptoms(['No symptoms']);
      }
      return;
    }

    const filtered = selectedSymptoms.filter((s) => s !== 'No symptoms');
    if (filtered.includes(symptom)) {
      setSelectedSymptoms(filtered.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...filtered, symptom]);
    }
  };

  const handleNextStep = () => {
    Keyboard.dismiss();
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    Keyboard.dismiss();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newId = createConsultation(
        selectedCategory,
        concernText.trim(),
        selectedSymptoms.length > 0 ? selectedSymptoms : ['No symptoms']
      );
      setIsSubmitting(false);
      router.replace({
        pathname: '/consultation/success',
        params: { id: newId },
      });
    }, 400);
  };

  const isStep2Valid = concernText.trim().length >= 10;
  const isStep3Valid = selectedSymptoms.length > 0;

  return (
    <AmbientBackground>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}>
          <View style={styles.navBar}>
            <Pressable
              onPress={handlePrevStep}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              style={[styles.backButton, !isDark && Shadows.subtle]}>
              <Ionicons name="arrow-back" size={20} color={colors.navy} />
            </Pressable>

            <View style={styles.stepIndicatorContainer}>
              <Text style={styles.stepText}>Step {currentStep} of 4</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(currentStep / 4) * 100}%` },
                  ]}
                />
              </View>
            </View>

            <PrivacyBanner label="Private" />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}>
            {currentStep === 1 && (
              <FadeSlideIn key="step-1" style={styles.stepContainer}>
                <Text style={styles.questionTitle}>
                  What can we help you with?
                </Text>
                <Text style={styles.questionSubtitle}>
                  Select the category that best describes your inquiry.
                </Text>

                <View style={styles.categoryList}>
                  {ALL_CATEGORIES.map((cat) => (
                    <CategoryOption
                      key={cat}
                      category={cat}
                      selected={selectedCategory === cat}
                      onSelect={(catSelected) => setSelectedCategory(catSelected)}
                    />
                  ))}
                </View>
              </FadeSlideIn>
            )}

            {currentStep === 2 && (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.stepContainer}>
                  <Text style={styles.questionTitle}>
                    Tell us what's going on.
                  </Text>
                  <Text style={styles.questionSubtitle}>
                    Share only what you're comfortable sharing.
                  </Text>

                  <GlassCard
                    variant="elevated"
                    borderRadius={Radius.xl}
                    contentStyle={styles.inputCard}>
                    <TextInput
                      style={styles.multilineInput}
                      placeholder="Describe your concern in your own words..."
                      placeholderTextColor={colors.textMuted}
                      multiline
                      numberOfLines={6}
                      textAlignVertical="top"
                      value={concernText}
                      onChangeText={setConcernText}
                      accessibilityLabel="Describe your concern"
                      autoFocus
                    />
                    <View style={styles.inputFooter}>
                      <Text style={styles.charCount}>
                        {concernText.trim().length} characters
                      </Text>
                    </View>
                  </GlassCard>

                  {concernText.length > 0 && !isStep2Valid && (
                    <View style={styles.validationMessageRow}>
                      <Ionicons
                        name="information-circle-outline"
                        size={16}
                        color={colors.warningText}
                      />
                      <Text style={styles.validationMessage}>
                        Please tell us a little more about your concern.
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            )}

            {currentStep === 3 && (
              <View style={styles.stepContainer}>
                <Text style={styles.questionTitle}>
                  Are you experiencing any of these?
                </Text>
                <Text style={styles.questionSubtitle}>
                  Select all that apply. This helps providers give precise guidance.
                </Text>

                <View style={styles.symptomsContainer}>
                  {ALL_SYMPTOMS.map((symptom) => (
                    <SymptomChip
                      key={symptom}
                      symptom={symptom}
                      selected={selectedSymptoms.includes(symptom)}
                      onToggle={handleToggleSymptom}
                    />
                  ))}
                </View>

                {!isStep3Valid && (
                  <View style={styles.validationMessageRow}>
                    <Ionicons
                      name="information-circle-outline"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.validationNotice}>
                      Please select at least one option, or select "No symptoms".
                    </Text>
                  </View>
                )}
              </View>
            )}

            {currentStep === 4 && (
              <View style={styles.stepContainer}>
                <Text style={styles.questionTitle}>Review your consultation</Text>
                <Text style={styles.questionSubtitle}>
                  Check your details before confidential submission.
                </Text>

                <GlassCard
                  variant="elevated"
                  borderRadius={Radius.xl}
                  style={styles.reviewOuter}
                  contentStyle={styles.reviewCard}>
                  <View style={styles.reviewSection}>
                    <Text style={styles.reviewLabel}>Category</Text>
                    <Text style={styles.reviewValue}>{selectedCategory}</Text>
                  </View>

                  <View style={styles.reviewDivider} />

                  <View style={styles.reviewSection}>
                    <Text style={styles.reviewLabel}>Your Concern</Text>
                    <Text style={styles.reviewBodyText}>{concernText}</Text>
                  </View>

                  <View style={styles.reviewDivider} />

                  <View style={styles.reviewSection}>
                    <Text style={styles.reviewLabel}>Symptoms Reported</Text>
                    <View style={styles.symptomsRow}>
                      {selectedSymptoms.map((s, idx) => (
                        <View key={idx} style={styles.reviewSymptomTag}>
                          <Text style={styles.reviewSymptomText}>{s}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </GlassCard>

                <GlassCard
                  variant="tealTint"
                  borderRadius={Radius.xl}
                  style={styles.privacyOuter}
                  contentStyle={styles.privacyReassuranceCard}>
                  <Soft3DIcon name="lock-closed" accent="teal" size="sm" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.privacyCardTitle}>Private consultation</Text>
                    <Text style={styles.privacyCardText}>
                      Your consultation is designed to keep your identity private. No real names or identifying data are shared with healthcare professionals.
                    </Text>
                  </View>
                </GlassCard>
              </View>
            )}

            <EmergencyNotice compact />
          </ScrollView>

          <View style={styles.bottomBar}>
            {currentStep < 4 ? (
              <PrimaryButton
                label="Continue"
                onPress={handleNextStep}
                disabled={
                  (currentStep === 2 && !isStep2Valid) ||
                  (currentStep === 3 && !isStep3Valid)
                }
              />
            ) : (
              <PrimaryButton
                label="Submit privately"
                onPress={handleSubmit}
                loading={isSubmitting}
                icon={
                  <Ionicons
                    name="shield-checkmark"
                    size={18}
                    color="#FFFFFF"
                  />
                }
              />
            )}
          </View>
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
    stepIndicatorContainer: {
      alignItems: 'center',
      gap: 5,
    },
    stepText: {
      ...Typography.caption,
      fontFamily: 'Urbanist_700Bold',
      color: colors.textSecondary,
    },
    progressBarBg: {
      width: 110,
      height: 5,
      borderRadius: 3,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(27, 42, 61, 0.1)',
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: colors.brandTeal,
      borderRadius: 3,
    },
    scrollContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xl,
    },
    stepContainer: {
      marginBottom: Spacing.xxl,
    },
    questionTitle: {
      ...Typography.h1,
      fontSize: 25,
      color: colors.navy,
      marginBottom: 6,
    },
    questionSubtitle: {
      ...Typography.bodySmall,
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: Spacing.xl,
      lineHeight: 20,
    },
    categoryList: {
      marginBottom: Spacing.lg,
    },
    inputCard: {
      padding: Spacing.lg,
      minHeight: 185,
    },
    multilineInput: {
      ...Typography.body,
      color: colors.navy,
      fontSize: 15.5,
      lineHeight: 23,
      minHeight: 135,
    },
    inputFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderTopWidth: 1,
      borderTopColor: colors.borderSubtle,
      paddingTop: Spacing.sm,
      marginTop: Spacing.sm,
    },
    charCount: {
      ...Typography.caption,
      color: colors.textMuted,
    },
    validationMessageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: Spacing.sm,
      paddingHorizontal: 4,
    },
    validationMessage: {
      ...Typography.bodySmall,
      color: colors.warningText,
      fontSize: 13,
    },
    validationNotice: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      fontSize: 13,
    },
    samplePromptButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      marginTop: Spacing.lg,
      alignSelf: 'flex-start',
      backgroundColor: colors.surfaceGlassStrong,
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: Radius.pill,
      borderWidth: 1.2,
      borderColor: colors.tealBorder,
    },
    samplePromptText: {
      ...Typography.caption,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    symptomsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: Spacing.lg,
    },
    reviewOuter: {
      marginBottom: Spacing.lg,
    },
    reviewCard: {
      padding: Spacing.xl,
    },
    reviewSection: {
      paddingVertical: Spacing.xs,
    },
    reviewLabel: {
      ...Typography.caption,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      fontFamily: 'Urbanist_700Bold',
      marginBottom: 4,
    },
    reviewValue: {
      ...Typography.h3,
      fontSize: 16,
      color: colors.navy,
    },
    reviewBodyText: {
      ...Typography.body,
      color: colors.textBody,
      lineHeight: 22,
    },
    reviewDivider: {
      height: 1,
      backgroundColor: colors.borderSubtle,
      marginVertical: Spacing.md,
    },
    symptomsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 4,
    },
    reviewSymptomTag: {
      backgroundColor: colors.brandTealBg,
      paddingHorizontal: 11,
      paddingVertical: 4,
      borderRadius: Radius.pill,
      borderWidth: 1,
      borderColor: colors.tealBorder,
    },
    reviewSymptomText: {
      ...Typography.caption,
      color: colors.tealDark,
      fontFamily: 'Urbanist_700Bold',
    },
    privacyOuter: {
      marginBottom: Spacing.xl,
    },
    privacyReassuranceCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    privacyCardTitle: {
      ...Typography.h3,
      fontSize: 15,
      color: colors.navy,
      marginBottom: 2,
    },
    privacyCardText: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    bottomBar: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surfaceGlass,
      borderTopWidth: 1,
      borderTopColor: colors.borderSubtle,
    },
  });
