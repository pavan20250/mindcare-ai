export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="max-w-md w-full px-6 text-center space-y-3">
        <div className="size-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-xl font-semibold">Verifying your email…</h1>
        <p className="text-sm text-slate-400">
          Redirecting you to your dashboard.
        </p>
      </div>
    </div>
  );
}
