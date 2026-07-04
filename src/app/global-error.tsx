'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white font-sans antialiased min-h-screen">
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center w-full">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-black tracking-tighter text-white mb-3">
              Fatal System Error
            </h2>
            
            <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
              We encountered a critical error while loading this page. Our technical team has been notified.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="w-full sm:w-auto rounded-full bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary/80 transition-all hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
