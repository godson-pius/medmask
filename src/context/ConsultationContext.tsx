import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Consultation,
  ConsultationCategory,
  SymptomType,
  Message,
} from '@/types';
import { INITIAL_MOCK_CONSULTATIONS } from '@/data/mockConsultations';

export type UserRole = 'user' | 'provider' | null;

interface ConsultationContextValue {
  consultations: Consultation[];
  hasCompletedOnboarding: boolean;
  userRole: UserRole;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  loginAs: (role: 'user' | 'provider') => void;
  logout: () => void;
  createConsultation: (
    category: ConsultationCategory,
    description: string,
    symptoms: SymptomType[]
  ) => string;
  addProviderResponse: (
    consultationId: string,
    responseContent: string,
    nextStep?: string
  ) => boolean;
  getConsultationById: (id: string) => Consultation | undefined;
}

const ConsultationContext = createContext<ConsultationContextValue | undefined>(
  undefined
);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [consultations, setConsultations] = useState<Consultation[]>(
    INITIAL_MOCK_CONSULTATIONS
  );
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
  };

  const loginAs = (role: 'user' | 'provider') => {
    setHasCompletedOnboarding(true);
    setUserRole(role);
  };

  const logout = () => {
    setUserRole(null);
  };

  const createConsultation = (
    category: ConsultationCategory,
    description: string,
    symptoms: SymptomType[]
  ): string => {
    const id = `c-${Date.now().toString().slice(-4)}`;
    const randomAnonNumber = Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toISOString();

    const userMessage: Message = {
      id: `m-${id}-1`,
      sender: 'user',
      senderTitle: 'You (Anonymous)',
      content: description,
      timestamp: now,
    };

    const newConsultation: Consultation = {
      id,
      anonymousId: `Anonymous #${randomAnonNumber}`,
      category,
      description,
      symptoms,
      status: 'submitted',
      createdAt: now,
      updatedAt: now,
      messages: [userMessage],
    };

    setConsultations((prev) => [newConsultation, ...prev]);
    return id;
  };

  const addProviderResponse = (
    consultationId: string,
    responseContent: string,
    nextStep?: string
  ): boolean => {
    const now = new Date().toISOString();
    let found = false;

    setConsultations((prev) =>
      prev.map((c) => {
        if (c.id === consultationId) {
          found = true;
          const providerMessage: Message = {
            id: `m-${c.id}-${Date.now().toString().slice(-3)}`,
            sender: 'provider',
            senderTitle: 'Verified Healthcare Professional',
            content: responseContent,
            timestamp: now,
            nextStepRecommendation: nextStep,
          };

          return {
            ...c,
            status: 'responded',
            updatedAt: now,
            assignedSpecialist: 'Verified Healthcare Professional',
            messages: [...c.messages, providerMessage],
          };
        }
        return c;
      })
    );

    return found;
  };

  const getConsultationById = (id: string): Consultation | undefined => {
    return consultations.find((c) => c.id === id);
  };

  return (
    <ConsultationContext.Provider
      value={{
        consultations,
        hasCompletedOnboarding,
        userRole,
        completeOnboarding,
        resetOnboarding,
        loginAs,
        logout,
        createConsultation,
        addProviderResponse,
        getConsultationById,
      }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultations() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error(
      'useConsultations must be used within a ConsultationProvider'
    );
  }
  return context;
}
