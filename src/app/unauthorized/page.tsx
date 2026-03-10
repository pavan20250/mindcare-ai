export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Unauthorized
        </div>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">Access denied</h1>
        <p className="mt-2 text-sm text-slate-600">
          You don&apos;t have permission to view this page.
        </p>
        <a
          href="/dashboard"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          Back to dashboard
        </a>
      </div>
    </div>
  );
}

