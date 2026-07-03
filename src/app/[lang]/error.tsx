'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error('Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-white mb-3">
          Something went wrong
        </h2>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-all hover:scale-105"
          >
            Try again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto text-sm font-semibold leading-6 text-zinc-300 hover:text-white transition-colors"
          >
            Go to Homepage <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
