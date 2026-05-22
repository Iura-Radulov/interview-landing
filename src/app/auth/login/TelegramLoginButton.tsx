'use client';

import { Send } from 'lucide-react';
import { BOT_USERNAME } from '@/lib/constants';

export default function TelegramLoginButton() {
  const deepLink = `tg://resolve?domain=${BOT_USERNAME}&start=auth`;

  return (
    <a
      href={deepLink}
      className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl bg-[#229ED9] hover:bg-[#1a8bc2] active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-blue-500/20"
    >
      <Send className="w-5 h-5" />
      Login via Telegram
    </a>
  );
}
