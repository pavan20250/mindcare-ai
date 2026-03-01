import { Suspense } from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import LoginFallback from '@/components/auth/LoginFallback';

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
