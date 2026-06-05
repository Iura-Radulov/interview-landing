'use client';

import { Send } from 'lucide-react';
import { BOT_USERNAME } from '@/lib/constants';
import AuthCodeInput from './AuthCodeInput';

export default function TelegramLoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Step 1: Open bot */}
      <a
        href={`https://t.me/${BOT_USERNAME}?start=auth`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl bg-[#229ED9] hover:bg-[#1a8bc2] active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-blue-500/20"
      >
        <Send className="w-5 h-5" />
        Get code via Telegram
      </a>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-sm text-slate-500">Then enter code below</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Step 2: Enter code */}
      <AuthCodeInput />
    </div>
  );
}
