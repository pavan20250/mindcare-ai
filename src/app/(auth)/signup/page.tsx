import { Suspense } from 'react';
import SignupForm from '@/components/auth/SignupForm';
import LoginFallback from '@/components/auth/LoginFallback';

export default function SignupPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <SignupForm />
    </Suspense>
  );
}
