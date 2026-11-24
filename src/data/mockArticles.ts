import { Article } from '@/types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'can-an-sti-have-no-symptoms',
    title: 'Can an STI have no symptoms?',
    category: 'STIs & Testing',
    shortDescription: 'Why asymptomatic infections are common and how routine screening protects you and your partners.',
    readingTime: '3 min read',
    publishedDate: 'Medically reviewed',
    relatedCategory: 'STI / STD concerns',
    sections: [
      {
        subheading: 'The Silent Nature of Many STIs',
        paragraphs: [
          'Yes, many common sexually transmitted infections (STIs) present with zero noticeable physical symptoms. In fact, a significant proportion of chlamydia, gonorrhea, HPV, and early-stage herpes or HIV infections develop without any outward discomfort.',
          'Because symptoms are often mild or absent entirely, individuals may carry and transmit an infection without realizing it. Feeling completely healthy does not rule out the presence of an infection.',
        ],
      },
      {
        subheading: 'Why This Happens',
        paragraphs: [
          'The immune system responds to different pathogens in unique ways. In many cases, localized bacteria or viruses quietly establish themselves without triggering acute inflammation, pain, or discharge.',
        ],
        bullets: [
          'Up to 70% of people with chlamydia have no symptoms.',
          'HPV is frequently cleared or harbored silently by the body without genital warts.',
          'Early HIV may present with a brief, mild flu-like illness that resolves within days, followed by an asymptomatic period.',
        ],
      },
      {
        subheading: 'Recommended Action',
        paragraphs: [
          'Routine testing is the only definitive way to know your status. Healthcare guidelines recommend getting tested annually if you are sexually active with new or multiple partners, or immediately if a partner discloses an infection.',
        ],
        callout: 'Remember: Testing is routine, confidential, and straightforward. Taking the initiative is an act of proactive self-care.',
      },
    ],
  },
  {
    id: 'when-should-you-get-tested',
    title: 'When should you get tested?',
    category: 'STIs & Testing',
    shortDescription: 'Understanding window periods, exposure timelines, and when tests become medically reliable.',
    readingTime: '4 min read',
    publishedDate: 'Medically reviewed',
    relatedCategory: 'Testing',
    sections: [
      {
        subheading: 'Understanding Window Periods',
        paragraphs: [
          'A "window period" is the time between potential exposure to an infection and when a diagnostic test can reliably detect it. Getting tested too early after an encounter may yield a false-negative result because bacterial load or viral antibodies take time to build up.',
        ],
      },
      {
        subheading: 'General Testing Timelines',
        paragraphs: [
          'While specific test technologies vary, here are standard guidelines for when common screenings become most accurate:',
        ],
        bullets: [
          'Chlamydia & Gonorrhea: Typically detectable within 1 to 2 weeks post-exposure via urine or swab NAAT tests.',
          'HIV: Modern 4th-generation blood antigen/antibody tests can detect infection between 18 and 45 days. Rapid fingerstick tests usually take 90 days for peak accuracy.',
          'Syphilis: Blood tests are generally accurate between 3 to 6 weeks after exposure.',
          'Herpes: Visual swabs of active lesions are most accurate within 48 hours of symptoms appearing.',
        ],
      },
      {
        subheading: 'What To Do If You Are Anxious Now',
        paragraphs: [
          'If you had a potential exposure within the last 72 hours, consult a clinic or emergency provider right away to discuss Post-Exposure Prophylaxis (PEP) for HIV prevention.',
          'For other concerns, note down the date of the encounter and speak privately with a provider to plan the best screening schedule.',
        ],
      },
    ],
  },
  {
    id: 'what-happens-during-an-sti-test',
    title: 'What happens during an STI test?',
    category: 'STIs & Testing',
    shortDescription: 'Demystifying the clinic visit: urine samples, swabs, blood tests, and what to expect step by step.',
    readingTime: '3 min read',
    publishedDate: 'Medically reviewed',
    relatedCategory: 'Testing',
    sections: [
      {
        subheading: 'A Normal, Non-Judgmental Healthcare Procedure',
        paragraphs: [
          'For many people, the anticipation of an STI test is much more stressful than the test itself. In reality, testing is quick, painless, and performed by clinical staff who do these screenings daily without judgment.',
        ],
      },
      {
        subheading: 'Common Sample Types',
        paragraphs: [
          'Depending on your anatomy and the type of sexual activity, a clinician may collect one or more of the following:',
        ],
        bullets: [
          'Urine Sample: Used primarily for chlamydia and gonorrhea. You will be asked not to urinate for 1 hour prior to providing the sample.',
          'Self-Collected Swabs: In many modern clinics, you can collect your own vaginal, throat, or rectal swab privately in the restroom.',
          'Blood Draw: A simple finger-prick or small arm blood draw for HIV, syphilis, and hepatitis.',
          'Visual Exam: Only performed if you have an active sore, rash, or bump that you would like examined.',
        ],
      },
      {
        subheading: 'Confidentiality & Results',
        paragraphs: [
          'Results typically take 2 to 5 business days. Your results are strictly confidential medical records. If a test is positive, treatments for bacterial infections are usually single-dose or short courses of antibiotics.',
        ],
      },
    ],
  },
  {
    id: 'understanding-common-sti-symptoms',
    title: 'Understanding common STI symptoms',
    category: 'Symptoms',
    shortDescription: 'A balanced guide to itching, pain, unusual discharge, and sores without jumping to conclusions.',
    readingTime: '4 min read',
    publishedDate: 'Medically reviewed',
    relatedCategory: 'Symptoms',
    sections: [
      {
        subheading: 'Separating Normal Variations from Signs to Check',
        paragraphs: [
          'Changes in your genital region can feel alarming, but many common symptoms (such as mild itching or redness) are caused by non-sexually transmitted conditions like yeast infections, contact dermatitis from laundry detergents, or shaving irritation.',
          'However, paying attention to body changes is an essential part of sexual health hygiene.',
        ],
      },
      {
        subheading: 'Symptoms That Merit Professional Review',
        paragraphs: [
          'You should have a healthcare professional review the following symptoms:',
        ],
        bullets: [
          'Unusual discharge (changes in color, odor, or consistency).',
          'Persistent burning or stinging during urination.',
          'Unexplained sores, ulcers, blisters, or bumps.',
          'Itching or swelling that does not resolve after 24–48 hours.',
          'Pelvic pain or pain during or after intercourse.',
        ],
      },
      {
        subheading: 'Avoid Self-Diagnosis and Home Remedies',
        paragraphs: [
          'Applying topical creams or taking leftover antibiotics can alter physical symptoms, making accurate clinical diagnosis harder. Avoid scrubbing or applying harsh disinfectants.',
        ],
        callout: 'Do not panic. Most conditions are manageable and easily treatable once properly identified.',
      },
    ],
  },
  {
    id: 'how-to-talk-to-a-partner-about-testing',
    title: 'How to talk to a partner about testing',
    category: 'Consent & Relationships',
    shortDescription: 'Helpful scripts and empathetic conversation starters to normalize testing together.',
    readingTime: '3 min read',
    publishedDate: 'Medically reviewed',
    relatedCategory: 'Sexual health',
    sections: [
      {
        subheading: 'Framing Testing as Mutual Care',
        paragraphs: [
          'Bringing up STI testing with a new or current partner can feel vulnerable. However, framing testing not as an accusation or sign of distrust, but as a mutual standard of safety and care, completely changes the dynamic.',
        ],
      },
      {
        subheading: 'Sample Conversation Starters',
        paragraphs: [
          'Here are respectful, straightforward ways to initiate the conversation before engaging in sexual activity:',
        ],
        bullets: [
          '"I make it a rule to get tested between partners so we can both relax and feel safe. Have you had a screening recently?"',
          '"I care about our sexual health and would love if we got tested together before taking this next step."',
          '"I went for my annual sexual health check last month and everything was clear. When was the last time you checked yours?"',
        ],
      },
      {
        subheading: 'If They React Defensively',
        paragraphs: [
          'If a partner becomes angry or refuses to discuss testing, that is valuable information about their comfort with open communication and mutual respect. You have every right to set your boundaries.',
        ],
      },
    ],
  },
  {
    id: 'understanding-sexual-consent',
    title: 'Understanding sexual consent',
    category: 'Consent & Relationships',
    shortDescription: 'Clear, affirmative, and ongoing: what healthy boundaries look like in modern relationships.',
    readingTime: '3 min read',
    publishedDate: 'Medically reviewed',
    relatedCategory: 'Sexual health',
    sections: [
      {
        subheading: 'The Core Principles of Consent',
        paragraphs: [
          'Consent is an active, enthusiastic, and informed agreement to participate in sexual activity. It cannot be assumed, forced, or implied by silence.',
        ],
      },
      {
        subheading: 'Key Characteristics of Valid Consent',
        paragraphs: [
          'Every healthy intimate encounter is based on these essential pillars:',
        ],
        bullets: [
          'Freely Given: Given without pressure, manipulation, intoxication, or fear of negative reactions.',
          'Reversible: Anyone can change their mind at any point, even during an activity.',
          'Informed: Both parties understand what is happening (including protection methods).',
          'Specific: Agreeing to one act does not mean agreeing to other acts.',
        ],
      },
      {
        subheading: 'Ongoing Communication',
        paragraphs: [
          'Checking in with simple questions like "Does this feel good?" or "Are you comfortable with this?" fosters trust, intimacy, and comfort for both partners.',
        ],
      },
    ],
  },
];
