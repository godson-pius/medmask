import { Redirect } from 'expo-router';
import { useConsultations } from '@/context/ConsultationContext';

export default function Index() {
  const { hasCompletedOnboarding, userRole } = useConsultations();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!userRole) {
    return <Redirect href="/login" />;
  }

  if (userRole === 'provider') {
    return <Redirect href="/provider" />;
  }

  return <Redirect href="/(tabs)" />;
}
