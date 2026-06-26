import React, { useState, useEffect } from 'react';
import { Lock, Check, X } from 'lucide-react';
import { playSuccessChime, playFailureBuzz } from '../utils/audio';

interface ParentGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ParentGate({ isOpen, onClose, onSuccess }: ParentGateProps) {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<'addition' | 'multiplication'>('addition');
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      generateQuestion();
    }
  }, [isOpen]);

  const generateQuestion = () => {
    const isMul = Math.random() > 0.5;
    if (isMul) {
      setNum1(Math.floor(Math.random() * 8) + 3); // 3-10
      setNum2(Math.floor(Math.random() * 7) + 3); // 3-9
      setOperation('multiplication');
    } else {
      setNum1(Math.floor(Math.random() * 50) + 20); // 20-69
      setNum2(Math.floor(Math.random() * 40) + 10); // 10-49
      setOperation('addition');
    }
    setInputValue('');
    setErrorMsg('');
  };

  if (!isOpen) return null;

  const getQuestionText = () => {
    if (operation === 'addition') {
      return `Xallili: Waa maxay ${num1} lagu daray ${num2}?`;
    } else {
      return `Xallili: Waa maxay ${num1} lagu dhuftay ${num2}?`;
    }
  };

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(inputValue, 10);
    const expected = operation === 'addition' ? num1 + num2 : num1 * num2;

    if (answer === expected) {
      playSuccessChime();
      onSuccess();
    } else {
      playFailureBuzz();
      setErrorMsg('Jawaabtu waa khalad. Waalidiintow, fadlan mar kale isku daya!');
      setInputValue('');
      generateQuestion();
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm border-2 border-rose-100 flex flex-col items-center">
        <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-7 h-7 text-rose-500 animate-pulse" />
        </div>

        <h3 className="text-lg font-bold text-slate-800 text-center mb-1">Xaqiijinta Waalidka</h3>
        <p className="text-xs text-slate-500 text-center mb-4 leading-relaxed">
          Halkaan waxaa loogu talagalay waalidiinta oo kaliya. Fadlan xallili xisaabtan si aad u xaqiijiso inaad tahay qof weyn.
        </p>

        <form onSubmit={checkAnswer} className="w-full flex flex-col gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-sm font-semibold text-slate-700 font-mono">
              {getQuestionText()}
            </span>
          </div>

          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Halkan ku qor jawaabta..."
            className="w-full text-center bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-lg font-bold text-slate-800 focus:border-rose-500 focus:outline-hidden transition-all font-mono"
            autoFocus
            required
          />

          {errorMsg && (
            <span className="text-xs text-rose-500 font-medium text-center bg-rose-50 px-3 py-1 rounded-full animate-bounce">
              {errorMsg}
            </span>
          )}

          <div className="flex gap-2.5 mt-2">
            <button
              type="button"
              id="btn-parent-gate-cancel"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 px-4 rounded-xl transition-all"
            >
              Ka laabo
            </button>
            <button
              type="submit"
              id="btn-parent-gate-submit"
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Xaqiiji
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
