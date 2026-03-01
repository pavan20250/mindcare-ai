'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type BillingCycle = 'monthly' | 'yearly';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  icon: typeof Sparkles;
  monthlyPrice: number;
  yearlyPrice: number;
  accent: string;
  iconBg: string;
  popular?: boolean;
  cta: string;
  features: PlanFeature[];
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    description: 'Basic mental health tools to get started on your wellness journey.',
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    accent: 'border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    cta: 'Current plan',
    features: [
      { text: 'AI clinical intake assessment', included: true },
      { text: 'Basic care plan', included: true },
      { text: 'Daily mood check-in', included: true },
      { text: 'Self-help resource library', included: true },
      { text: '1 provider appointment / month', included: true },
      { text: 'Priority scheduling', included: false },
      { text: 'Advanced analytics & insights', included: false },
      { text: 'Unlimited messaging with providers', included: false },
      { text: 'Crisis support line', included: false },
      { text: 'Family account sharing', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'Enhanced support with more appointments and deeper insights.',
    icon: Sparkles,
    monthlyPrice: 29,
    yearlyPrice: 24,
    accent: 'border-teal-300 ring-2 ring-teal-400/30',
    iconBg: 'bg-teal-50 text-teal-600',
    popular: true,
    cta: 'Upgrade to Pro',
    features: [
      { text: 'AI clinical intake assessment', included: true },
      { text: 'Personalized care plan', included: true },
      { text: 'Daily mood check-in', included: true },
      { text: 'Full resource library + guided exercises', included: true },
      { text: '4 provider appointments / month', included: true },
      { text: 'Priority scheduling', included: true },
      { text: 'Advanced analytics & insights', included: true },
      { text: 'Unlimited messaging with providers', included: true },
      { text: 'Crisis support line', included: false },
      { text: 'Family account sharing', included: false },
    ],
  },
  {
    name: 'Premium',
    description: 'Comprehensive care for you and your family with full access.',
    icon: Crown,
    monthlyPrice: 59,
    yearlyPrice: 49,
    accent: 'border-violet-300',
    iconBg: 'bg-violet-50 text-violet-600',
    cta: 'Upgrade to Premium',
    features: [
      { text: 'AI clinical intake assessment', included: true },
      { text: 'Personalized care plan with AI coaching', included: true },
      { text: 'Daily mood check-in + journaling', included: true },
      { text: 'Full resource library + live workshops', included: true },
      { text: 'Unlimited provider appointments', included: true },
      { text: 'Priority scheduling', included: true },
      { text: 'Advanced analytics & insights', included: true },
      { text: 'Unlimited messaging with providers', included: true },
      { text: '24/7 crisis support line', included: true },
      { text: 'Family account sharing (up to 4)', included: true },
    ],
  },
];

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
      <button
        onClick={() => onChange('monthly')}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          cycle === 'monthly'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
          cycle === 'yearly'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        Yearly
        <Badge className="text-[9px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shadow-none">
          Save 17%
        </Badge>
      </button>
    </div>
  );
}

function PlanCard({
  plan,
  cycle,
}: {
  plan: Plan;
  cycle: BillingCycle;
}) {
  const price = cycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const isFree = price === 0;
  const isCurrentPlan = isFree;
  const Icon = plan.icon;

  return (
    <Card
      className={`relative rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${plan.accent}`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            Most popular
          </div>
        </div>
      )}
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`flex size-10 items-center justify-center rounded-xl ${plan.iconBg}`}
          >
            <Icon className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
            <p className="text-[11px] text-slate-400">{plan.description}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isFree ? 'Free' : `$${price}`}
          </span>
          {!isFree && (
            <span className="text-sm text-slate-400 font-medium">/ mo</span>
          )}
        </div>
        {!isFree && cycle === 'yearly' && (
          <p className="text-[11px] text-slate-400 mb-4">
            Billed ${price * 12}/year
          </p>
        )}
        {isFree && <p className="text-[11px] text-slate-400 mb-4">No credit card required</p>}

        <Button
          size="sm"
          disabled={isCurrentPlan}
          className={`w-full rounded-xl font-semibold text-sm h-10 mt-1 mb-6 transition-all ${
            plan.popular
              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20 border-0'
              : isCurrentPlan
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50/40'
          }`}
        >
          {isCurrentPlan ? (
            'Current plan'
          ) : (
            <>
              {plan.cta}
              <ArrowRight className="size-3.5 ml-1.5" />
            </>
          )}
        </Button>

        <div className="space-y-2.5 flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.08em]">
            What&apos;s included
          </p>
          {plan.features.map((feature) => (
            <div key={feature.text} className="flex items-start gap-2.5">
              <div
                className={`flex size-4.5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                  feature.included
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-slate-100 text-slate-300'
                }`}
                style={{ width: 18, height: 18 }}
              >
                <Check className="size-2.5" strokeWidth={3} />
              </div>
              <span
                className={`text-[13px] leading-snug ${
                  feature.included
                    ? 'text-slate-600'
                    : 'text-slate-300 line-through'
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PricingView() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="min-h-full bg-[#f8fafb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="text-center mb-8">
          <Badge className="text-[10px] px-2.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 font-bold shadow-none mb-3">
            Pricing
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose the right plan for you
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Start free and upgrade as your needs grow. All plans include our
            core AI assessment and care tools.
          </p>
          <div className="mt-5">
            <BillingToggle cycle={cycle} onChange={setCycle} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} cycle={cycle} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400">
            All plans are HIPAA compliant. Cancel or change your plan anytime.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Need a custom plan for your organization?{' '}
            <a
              href="mailto:support@mindcare.ai"
              className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
