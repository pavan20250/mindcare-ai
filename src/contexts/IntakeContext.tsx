'use client';

import { createContext, useCallback, useContext, useState } from 'react';

type IntakeContextValue = {
  intakeCompleted: boolean;
  setIntakeCompleted: (value: boolean) => void;
};

const IntakeContext = createContext<IntakeContextValue | null>(null);

export function IntakeProvider({
  children,
  initialCompleted,
}: {
  children: React.ReactNode;
  initialCompleted: boolean;
}) {
  const [intakeCompleted, setIntakeCompleted] = useState(initialCompleted);
  return (
    <IntakeContext.Provider value={{ intakeCompleted, setIntakeCompleted }}>
      {children}
    </IntakeContext.Provider>
  );
}

export function useIntake() {
  const ctx = useContext(IntakeContext);
  if (!ctx) throw new Error('useIntake must be used within IntakeProvider');
  return ctx;
}
