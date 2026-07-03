import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center w-full">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-4xl font-black tracking-tighter text-white mb-3">
          404
        </h2>
        
        <p className="text-xl font-bold text-zinc-200 mb-2">
          Page Not Found
        </p>

        <p className="text-zinc-400 mb-8 leading-relaxed">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto rounded-full bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary/80 transition-all hover:scale-105"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
