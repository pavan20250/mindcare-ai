import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import LoginFallback from '@/components/auth/LoginFallback';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
