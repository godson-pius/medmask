# Medmask

> **"Anonymous healthcare for the questions you're afraid to ask."**

Medmask is a privacy-first sexual and personal health mobile application built with Expo and React Native. It enables patients to ask sensitive health questions anonymously, read evidence-based health guides, and receive verified clinical guidance from healthcare professionals in a calm, judgment-free experience.

---

## Key Features

### Role-Based Entry
- **Onboarding & Role Login**: Clean 3-step onboarding leading into a role-based login screen where users enter either as a **Patient / User** (anonymous session) or as a **Healthcare Provider** (clinical intake portal).
- **Session Switching**: Sign out cleanly from the **Profile** tab (Patient) or the **Provider Portal** header to switch roles at any time.

### Patient Experience
- **Home Dashboard**: Care overview card, live consultation & privacy status tiles, 4-tile Quick Actions dock (*Ask Now*, *Guides*, *Privacy*, *History*), and recent consultations.
- **4-Step Anonymous Consultation Flow**:
  1. **Category** — Select the concern category (*STI / STD concerns*, *Symptoms*, *Sexual health*, *Reproductive health*, *Testing*, *Medication questions*, or *Something else*).
  2. **Concern** — Describe the concern privately in your own words.
  3. **Symptoms** — Multi-select symptom chips with smart *"No symptoms"* handling.
  4. **Review & Submit** — Confirm details with privacy reassurance and view a live consultation timeline (*Submitted* → *Under review* → *Professional response*).
- **Health Library**: Filterable, evidence-based educational guides with direct links into private consultations.
- **Privacy Center & Profile**: Transparent privacy pillars, discreet notification preference, and an **Appearance** selector supporting **Light**, **Dark**, and **System** themes.

### Healthcare Provider Portal
- **Clinical Intake Queue**: Summary metrics (*Pending* / *Responded*) and filterable queue (*All*, *Needs Response*, *Responded*) displaying anonymous patient IDs (`Anonymous #XXXX`), categories, and reported symptoms.
- **Clinical Response Workspace**: Multiline **Clinical Response** and **Recommended Next Step** inputs with quick clinical guidance templates, keyboard avoidance, native iOS **Done** accessory bar, and inline **Done** controls.

### Awareness Website (`web/`)
- **Next.js 16 Spatial Web Experience**: Full-viewport, non-scrolling desktop awareness UI with smooth in-place section transitions (**Overview**, **Privacy**, **Guides**, **Clinicians**), responsive mobile/tablet layout, Light & Dark theme toggle, self-hosted **Urbanist** font, custom Medmask favicons, and full SEO (`robots.txt`, `sitemap.xml`, `manifest.webmanifest`, Open Graph, JSON-LD). See [web/README.md](web/README.md) for details.

---

## Design System & UI

- **Visual Direction**: Apple-inspired minimalist healthcare UI with soft neumorphic elevation, frosted glass surfaces (`expo-blur`), a floating bottom tab bar with a raised center `+` consultation button, and custom 3D-styled tactile icon tiles.
- **Typography**: **Urbanist** (`@expo-google-fonts/urbanist`) across all weights (`400`–`800`).
- **Light & Dark Themes**:
  - **Light Mode**: Plain crisp background (`#F6F8FA`), elevated white cards (`#FFFFFF`), deep slate text (`#1B2A3D`), and medical teal accent (`#12B5A6`).
  - **Dark Mode**: Deep obsidian-slate background (`#0B1218`), dark slate surfaces (`#131F2A`), high-contrast off-white text (`#F1F6FA`), and luminous teal accent (`#18C4B4` / `#2DD4BF`).
- **Custom Medmask Alerts & Motion**: Branded frosted-glass `AlertProvider` modal dialogs (replacing native `Alert.alert`) and subtle, zero-overshoot `react-native-reanimated` transitions.

---

## Tech Stack & Project Structure

- **Framework**: Expo SDK 58 (React Native `0.88`, React `19.3`)
- **Routing**: Expo Router (`src/app/`) with typed routes
- **Language**: TypeScript (strict mode)
- **Styling & UI**: `expo-blur`, `react-native-reanimated`, `@expo-google-fonts/urbanist`, `@expo/vector-icons`, `expo-haptics`
- **State & Context**:
  - `src/context/ConsultationContext.tsx` — Role state (`user` / `provider`), onboarding, and live consultations
  - `src/context/ThemeContext.tsx` — Light, Dark, and System theme switching
  - `src/context/AlertContext.tsx` — Custom branded alert modal system

```text
src/
├── app/
│   ├── _layout.tsx              # Root stack, Urbanist font loading, providers
│   ├── index.tsx                # Entry router (onboarding -> login -> role home)
│   ├── onboarding.tsx           # 3-step onboarding flow
│   ├── login.tsx                # Patient vs Healthcare Provider entry
│   ├── privacy.tsx              # Privacy Center
│   ├── (tabs)/                  # Patient tab navigator + floating glass tab bar
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Home Dashboard
│   │   ├── consult.tsx          # Consultations list & filters
│   │   ├── learn.tsx            # Health Library
│   │   └── profile.tsx          # Profile, Theme switcher, Sign Out
│   ├── consultation/            # New consultation wizard, success timeline, detail view
│   ├── article/[id].tsx         # Health guide reader
│   └── provider/                # Healthcare Provider intake queue & response view
├── components/ui/               # GlassCard, Soft3DIcon, Motion, Buttons, MedmaskLogo, etc.
├── constants/theme.ts           # LightColors, DarkColors, Urbanist Typography, Spacing, Shadows
├── context/                     # ConsultationContext, ThemeContext, AlertContext
└── data/                        # Mock articles, consultations, and provider data
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the Expo dev server
npx expo start

# Run on a specific platform
npm run ios
npm run android
npm run web

# Typecheck
npx tsc --noEmit

# Diagnose project health
npx expo-doctor
```
