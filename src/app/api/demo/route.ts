import { NextResponse } from 'next/server';

export type DemoStepType = 'message' | 'question' | 'scale' | 'recommendation';

export interface DemoStep {
  id: string;
  title: string;
  message: string;
  type: DemoStepType;
  options?: string[];
  min?: number;
  max?: number;
  severity?: string;
  nextSteps?: string[];
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to MindCare AI',
    message:
      "Hello! I'm your AI care assistant. I'm here to help you get the care you need. Let's start by understanding how you've been feeling lately. Can you tell me about your main concerns?",
    type: 'message',
  },
  {
    id: 'symptoms',
    title: 'Symptom Assessment',
    message:
      "I understand you're experiencing some challenges. Let me ask you a few questions to better understand your situation. How long have you been feeling this way?",
    type: 'question',
    options: ['Less than 2 weeks', '2-4 weeks', '1-3 months', 'More than 3 months'],
  },
  {
    id: 'severity',
    title: 'Severity Assessment',
    message:
      "Thank you for sharing that. On a scale of 1-10, where 1 is 'not at all' and 10 is 'extremely', how would you rate the impact of these feelings on your daily life?",
    type: 'scale',
    min: 1,
    max: 10,
  },
  {
    id: 'phq9',
    title: 'PHQ-9 Assessment',
    message:
      "Based on your responses, I'd like to ask you some specific questions about your mood. Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    type: 'question',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    id: 'recommendation',
    title: 'Care Recommendation',
    message:
      "Thank you for completing the assessment. Based on your responses, I recommend scheduling a consultation with a mental health professional. Your symptoms suggest mild to moderate depression, and early intervention can be very helpful.",
    type: 'recommendation',
    severity: 'mild',
    nextSteps: [
      'Schedule consultation with psychologist',
      'Complete full PHQ-9 assessment',
      'Access self-help resources',
    ],
  },
];

/**
 * GET /api/demo
 * Returns demo mode steps for the conversational intake flow.
 */
export async function GET() {
  return NextResponse.json({
    mode: 'demo',
    steps: DEMO_STEPS,
    totalSteps: DEMO_STEPS.length,
  });
}
