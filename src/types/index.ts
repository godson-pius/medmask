export type ConsultationCategory =
  | 'STI / STD concerns'
  | 'Symptoms'
  | 'Sexual health'
  | 'Reproductive health'
  | 'Testing'
  | 'Medication questions'
  | 'Something else';

export type SymptomType =
  | 'Itching'
  | 'Pain'
  | 'Rash'
  | 'Unusual discharge'
  | 'Burning sensation'
  | 'Sores'
  | 'Swelling'
  | 'No symptoms'
  | 'Other';

export type ConsultationStatus = 'submitted' | 'under_review' | 'responded';

export interface Message {
  id: string;
  sender: 'user' | 'provider';
  senderTitle: string;
  content: string;
  timestamp: string;
  nextStepRecommendation?: string;
}

export interface Consultation {
  id: string;
  anonymousId: string;
  category: ConsultationCategory;
  description: string;
  symptoms: SymptomType[];
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  assignedSpecialist?: string;
}

export interface HealthcareProfessional {
  id: string;
  displayName: string;
  specialty: string;
  verified: boolean;
  avatarUrl?: string;
  licenseNote?: string;
}

export type ArticleCategory =
  | 'STIs & Testing'
  | 'Sexual Health'
  | 'Reproductive Health'
  | 'Symptoms'
  | 'Consent & Relationships';

export interface ArticleSection {
  subheading?: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  shortDescription: string;
  readingTime: string;
  sections: ArticleSection[];
  relatedCategory?: ConsultationCategory;
  publishedDate: string;
}
