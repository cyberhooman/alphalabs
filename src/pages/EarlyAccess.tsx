import React from 'react';
import { ContainerScroll } from '@/components/ContainerScroll';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const EarlyAccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b18] to-black text-white">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.6em] text-[#FF6B6B]">
              Early Access
            </p>
            <h1 className="text-4xl font-bold md:text-6xl">
              Unlock Institutional-Grade Flow Tools First
            </h1>
            <p className="mx-auto max-w-2xl text-base text-zinc-300 md:text-lg">
              Join the waitlist to pilot AlphaLabs&apos; next-gen futures intelligence
              suite. We&apos;ll notify you as soon as invite codes are ready.
            </p>
          </div>
        }
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 bg-gradient-to-br from-[#141424] via-[#0f0f1e] to-[#050509] px-6 py-10 text-left md:px-12">
          <div className="w-full max-w-xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-[0.4em] text-zinc-400">
                Email
              </label>
              <input
                type="email"
                placeholder="trader@desk.com"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder:text-zinc-500 focus:border-[#FF6B6B] focus:outline-none focus:ring-1 focus:ring-[#FF6B6B]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-[0.4em] text-zinc-400">
                What are you trading?
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what markets or strategies you run."
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder:text-zinc-500 focus:border-[#FF6B6B] focus:outline-none focus:ring-1 focus:ring-[#FF6B6B]"
              />
            </div>
            <InteractiveHoverButton
              text="Join Waitlist"
              className="w-full bg-[#FF6B6B] text-white hover:bg-[#ff5c5c]"
            />
          </div>
          <p className="max-w-lg text-center text-sm text-zinc-500">
            By joining the waitlist you agree to receive early-access updates, security
            notifications, and release changelogs. You can opt out at any time.
          </p>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default EarlyAccess;
