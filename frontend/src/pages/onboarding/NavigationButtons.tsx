import React from 'react';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  canNext: boolean;
  canBack: boolean;
  nextText?: string;
  isSubmitting?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onBack,
  canNext,
  canBack,
  nextText = 'Continue',
  isSubmitting = false
}) => {
  return (
    <div className="w-full border-t border-slate-200 bg-white/90 backdrop-blur-md py-4 px-6 mt-8">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 font-sans">
        
        {/* Back Button */}
        {canBack ? (
          <button
            onClick={onBack}
            type="button"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 font-bold px-5 py-2.5 rounded-full text-sm transition duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-20" /> // Spacer
        )}

        {/* Security badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-teal-650" />
          <span>Clinical-grade data protection</span>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!canNext || isSubmitting}
          type="button"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-300 shadow-md shadow-teal-600/10 hover:shadow-teal-650/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{nextText}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </div>
    </div>
  );
};
