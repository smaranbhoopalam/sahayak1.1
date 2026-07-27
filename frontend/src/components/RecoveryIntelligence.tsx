import React, { useState } from 'react';
import { Brain, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

interface CausalRule {
  symptoms: string[];
  cause: string;
  impactScore: number;
  aiRecommendation: string;
  explanation: string;
}

const CAUSAL_RULES: CausalRule[] = [
  {
    symptoms: ["Pain score increased from 3 to 7", "Daily walking decreased by 60%", "Midday painkiller missed"],
    cause: "Post-surgical inflammation unmanaged due to skipped adherence",
    impactScore: -22.5,
    aiRecommendation: "Resume prescribed analgesic schedule with warm compress. Alert care manager if pain persists above 7.",
    explanation: "Skipping scheduled anti-inflammatory medication allows local swelling to rebuild, causing a secondary reduction in patient mobility. Restoring dosage controls pain without surgical intervention."
  },
  {
    symptoms: ["Temperature reached 100.8°F", "Redness noted at wound site"],
    cause: "Early wound tissue inflammatory drift",
    impactScore: -28.0,
    aiRecommendation: "Doctor review requested for prophylactic antibiotics. Request wound photo upload.",
    explanation: "Fever combined with localized surgical site erythema points to early bacterial colonization. Early antibiotic intervention prevents deep tissue infection and emergency readmission."
  },
  {
    symptoms: ["Sleep duration dropped to 3.5 hrs", "High anxiety logged"],
    cause: "Psychological recovery barrier impacting physical healing speed",
    impactScore: -12.0,
    aiRecommendation: "Offer guided relaxation voice exercises via app and schedule nurse check-in call.",
    explanation: "Severe sleep deprivation increases cortisol levels, which impairs wound healing and lowers pain tolerance thresholds."
  }
];

export const RecoveryIntelligence: React.FC = () => {
  const [selectedRuleIndex, setSelectedRuleIndex] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  const activeRule = CAUSAL_RULES[selectedRuleIndex];

  return (
    <section id="intelligence" className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 text-purple-600" />
            Transparent & Explainable AI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Recovery Intelligence with "Why" Transparency
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We don't believe in AI black boxes. Every confidence drop, risk alert, and recommendation comes with clinical explanations doctors and patients can verify.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAUSAL_RULES.map((rule, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRuleIndex(idx)}
              className={`p-5 rounded-2xl border text-left transition duration-200 ${
                selectedRuleIndex === idx 
                  ? 'bg-purple-50 border-purple-300 text-slate-900 shadow-md scale-[1.02]' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider block text-purple-700">Scenario 0{idx + 1}</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{rule.cause}</h3>
              <span className="text-xs font-mono font-bold text-rose-600 block mt-2">{rule.impactScore}% Confidence Drop</span>
            </button>
          ))}
        </div>

        <div className="mt-8 glass-panel p-8 rounded-3xl border border-slate-200 bg-white shadow-md space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">01. Observed Inputs</span>
              <ul className="space-y-2">
                {activeRule.symptoms.map((sym, sIdx) => (
                  <li key={sIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1 flex justify-center text-purple-600">
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </div>

            <div className="lg:col-span-3 bg-purple-50 p-5 rounded-2xl border border-purple-200 space-y-2 text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-800 block">02. Causal Diagnosis</span>
              <h4 className="text-sm font-bold text-slate-900">{activeRule.cause}</h4>
              <p className="text-xs text-rose-700 font-mono font-bold">Impact: {activeRule.impactScore}% RCS</p>
            </div>

            <div className="lg:col-span-1 flex justify-center text-purple-600">
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </div>

            <div className="lg:col-span-3 bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2 text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">03. Smart Guidance</span>
              <p className="text-xs text-emerald-900 font-semibold">{activeRule.aiRecommendation}</p>
            </div>

          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3">
            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center justify-between w-full text-xs font-bold text-purple-800 hover:text-purple-900"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <span>Why did the AI reach this clinical recommendation?</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
            </button>

            {showExplanation && (
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                {activeRule.explanation}
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
