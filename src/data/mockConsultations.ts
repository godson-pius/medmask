import { Consultation } from '@/types';

export const INITIAL_MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: 'c-101',
    anonymousId: 'Anonymous #8291',
    category: 'STI / STD concerns',
    description:
      'I had unprotected sexual contact about 9 days ago. Over the last 48 hours, I have noticed mild itching and a slight burning sensation when urinating. I feel nervous about going to an in-person clinic and do not know what test I should ask for.',
    symptoms: ['Itching', 'Burning sensation'],
    status: 'responded',
    createdAt: '2026-09-27T10:14:00Z',
    updatedAt: '2026-09-27T12:30:00Z',
    assignedSpecialist: 'Verified Healthcare Professional',
    messages: [
      {
        id: 'm-101-1',
        sender: 'user',
        senderTitle: 'You (Anonymous)',
        content:
          'I had unprotected sexual contact about 9 days ago. Over the last 48 hours, I have noticed mild itching and a slight burning sensation when urinating. I feel nervous about going to an in-person clinic and do not know what test I should ask for.',
        timestamp: '2026-09-27T10:14:00Z',
      },
      {
        id: 'm-101-2',
        sender: 'provider',
        senderTitle: 'Verified Healthcare Professional',
        content:
          'Thank you for reaching out. It is very common to feel nervous, but seeking guidance early is the right decision. Based on your timeline (9 days post-exposure) and symptoms (itching and dysuria), these symptoms are consistent with common, highly treatable bacterial conditions such as chlamydia, gonorrhea, or non-gonococcal urethritis (NGU).\n\nBecause 9 days is past the typical incubation window for standard NAAT tests, a simple urine screening will be reliable. In the meantime, avoid sexual contact until you complete testing and any prescribed treatment.',
        timestamp: '2026-09-27T12:30:00Z',
        nextStepRecommendation:
          'Schedule a routine urine NAAT test at your local clinic or order a certified discreet home-collection kit. Do not take leftover antibiotics prior to testing.',
      },
    ],
  },
  {
    id: 'c-102',
    anonymousId: 'Anonymous #3492',
    category: 'Symptoms',
    description:
      'I noticed a small, painless reddish bump on my groin area about three days ago. It does not itch or hurt, but I have never noticed it before. Could this just be an ingrown hair?',
    symptoms: ['Swelling'],
    status: 'under_review',
    createdAt: '2026-09-29T08:20:00Z',
    updatedAt: '2026-09-29T08:20:00Z',
    messages: [
      {
        id: 'm-102-1',
        sender: 'user',
        senderTitle: 'You (Anonymous)',
        content:
          'I noticed a small, painless reddish bump on my groin area about three days ago. It does not itch or hurt, but I have never noticed it before. Could this just be an ingrown hair?',
        timestamp: '2026-09-29T08:20:00Z',
      },
    ],
  },
];
