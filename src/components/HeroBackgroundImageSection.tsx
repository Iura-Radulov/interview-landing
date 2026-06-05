'use client';

import Image from 'next/image';

export default function HeroBackgroundImageSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#0f172a]">
      <div className="relative z-10 w-full mx-auto">
        <div className="relative w-full aspect-video max-h-[70vh] mx-auto pointer-events-none select-none">
          <Image
            src="/images/hero-main.svg"
            alt=""
            fill
            className="object-contain"
            priority={false}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
