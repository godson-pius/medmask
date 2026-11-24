# Medmask

> **"Anonymous healthcare for the questions you're afraid to ask."**

Medmask is a privacy-focused sexual-health platform designed to help people ask sensitive health questions and connect with healthcare professionals without unnecessary stigma, embarrassment, or fear of judgment.

---

## 🌟 Hackathon Demo Flow (2-Minute Walkthrough)

1. **Launch Medmask** & complete the 3-step calm onboarding.
2. **Arrive at Home**: Notice the privacy indicators, "Have a health question?" hero, and recent consultations.
3. Tap **"Start a consultation"** (or use the primary CTA).
4. **Step 1 (Category)**: Select **"STI / STD concerns"** (or any sensitive health category).
5. **Step 2 (Concern)**: Enter a concern (or tap the demo prompt shortcut).
6. **Step 3 (Symptoms)**: Select symptoms (e.g. *Itching*, *Burning sensation*).
7. **Step 4 (Review)**: Review the inquiry and anonymous privacy notice.
8. Tap **"Submit privately"** to transmit the consultation.
9. **Success Screen**: View the timeline (*Submitted* → *Under review* → *Professional response*).
10. **Prototype Provider Mode**: Tap the quick-action button on the success screen (or navigate to `Profile` → `Prototype Healthcare Professional Mode`).
11. **Review & Respond**: View the anonymous consultation from the clinical triage queue, select a guidance template, and tap **"Send response"**.
12. **View Result**: Switch to user mode to view the verified response from **"Verified Healthcare Professional"** with recommended next steps and safety disclaimers.

---

## 🎨 Design System & Philosophy

- **Emotional Tone**: Safe, Private, Calm, Trustworthy, Modern, Human, Non-judgmental.
- **Color Palette**:
  - Primary: Deep navy (`#0B1528`)
  - Accent / Secondary: Calming Teal (`#0D9488` / `#14B8A6`)
  - Background: Soft off-white cool gray (`#F8FAFC`)
  - Surfaces: Clean white (`#FFFFFF`) with subtle border elevation
  - Semantic: Green (`#10B981`) for success, Amber (`#F59E0B`) for reviews
- **Typography**: Hierarchy with clear display, headings, body, and captions.
- **Privacy & Safety**:
  - Strictly anonymous patient tickets (`#anon-XXXX`).
  - No real-name or phone number requirements.
  - Non-alarmist emergency notice disclaimers.

---

## 📱 Architecture & Tech Stack

- **Framework**: Expo SDK 57 (React Native 0.86, React 19)
- **Routing**: Expo Router (file-based routing with Stack & Bottom Tabs)
- **Language**: TypeScript (strict mode enabled)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Haptics**: `expo-haptics` for subtle tactile feedback
- **State Management**: `ConsultationContext` with live state mutation between patient and provider views

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Typecheck
npx tsc --noEmit

# Diagnose project health
npx expo-doctor
```
