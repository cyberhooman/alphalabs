import React from 'react';
import { ContainerScroll } from '@/components/ContainerScroll';
import { Navbar } from '@/components/Navbar';

const featureHighlights = [
  {
    title: 'Flow Dashboard',
    description:
      'Consolidated order flow, open interest, funding, and delta signals in a single terminal view.',
    metric: '+124% CVD'
  },
  {
    title: 'Market Pulse',
    description:
      'Streaming liquidation prints, large block alerts, and structural changes as they happen.',
    metric: '46 Signals'
  },
  {
    title: 'Execution Intel',
    description:
      'Smart routing hints and liquidity heat maps to size entries without getting run over.',
    metric: '12 Venues'
  }
];

const inlineLogs = [
  '[02:41:09] BTC Perp sweep detected — $2.1M sold into bid.',
  '[02:41:11] OI -1.8% in last 3m | Funding normalizes to 0.012%',
  '[02:41:16] CVD diverging up while price compresses < 67.1K',
  '[02:41:22] Alerts armed: Asia session imbalance threshold @ 3.4%'
];

const EarlyAccess: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#070714] to-black text-white">
      <Navbar />
      <div id="home" className="pt-16">
        <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.6em] text-[#FF6B6B]">
              Terminal Showcase
            </p>
            <h1 className="text-4xl font-bold md:text-6xl">
              AlphaLabs. The Terminal Built for Futures Specialists.
            </h1>
            <p className="mx-auto max-w-3xl text-base text-zinc-300 md:text-lg">
              Here's a peek at the live operating view our early partners use every
              session. Everything is tuned for latency, context, and the signals that
              actually move the book.
            </p>
          </div>
        }
      >
        <div className="flex h-full flex-col gap-6 bg-[radial-gradient(circle_at_top,#202034_0%,#0b0b18_55%,#04040a_100%)] px-6 py-8 text-left md:px-12">
          <TerminalHeader />
          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
            <TerminalMarketColumn />
            <TerminalFlowColumn />
            <TerminalLogColumn />
          </div>
        </div>
      </ContainerScroll>
      </div>

      <section id="product" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 text-white md:px-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
            What&apos;s Inside
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Dialed-in tooling to help you read and react faster.
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
            Visualize structural shifts, hunting stops, and liquidity cliffs without
            clicking through ten dashboards. AlphaLabs keeps terminal-first traders in
            the flow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-lg"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#FF6B6B]">
                  {feature.metric}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141428] via-[#0c0c1b] to-[#070714] p-8 text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">
            Want a guided tour or sandbox credentials?
          </h3>
          <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
            We host weekly desk walkthroughs for funds and fast-moving teams. Drop us a
            note and we&apos;ll set up a 20-minute sprint through the terminal.
          </p>
          <a
            href="mailto:hello@alphalabs.xyz?subject=Terminal%20Showcase"
            className="rounded-full border border-[#FF6B6B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B6B] transition hover:bg-[#FF6B6B] hover:text-black"
          >
            Book A Session
          </a>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 text-white md:px-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
            Pricing
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Built for Professionals
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
            Join the early access program for AlphaLabs terminals. Custom pricing tailored to your trading needs.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141428] via-[#0c0c1b] to-[#070714] p-8 text-center">
          <h3 className="text-2xl font-semibold">Contact Us for Pricing</h3>
          <p className="max-w-2xl text-sm text-zinc-400">
            We offer flexible pricing plans for individual traders, prop firms, and institutions. Get in touch to discuss your specific needs and receive a custom quote.
          </p>
          <a
            href="mailto:hello@alphalabs.xyz?subject=Pricing%20Inquiry"
            className="rounded-full bg-[#FF6B6B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#ff5252]"
          >
            Contact Sales
          </a>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 text-white md:px-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
            Connect With Us
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Join Our Community
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
            Follow us for market insights, platform updates, and trading intelligence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="https://twitter.com/alphalabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
          >
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <h3 className="text-xl font-semibold">Twitter</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Real-time market insights and platform updates
            </p>
          </a>

          <a
            href="https://discord.gg/alphalabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
          >
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <h3 className="text-xl font-semibold">Discord</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Join our community of professional traders
            </p>
          </a>

          <a
            href="mailto:hello@alphalabs.xyz"
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
          >
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold">Email</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Get in touch with our team directly
            </p>
          </a>
        </div>
      </section>
    </div>
  );
};

const TerminalHeader: React.FC = () => (
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.4em] text-zinc-400">
    <div className="flex items-center gap-2 text-zinc-500">
      <span className="h-2 w-2 rounded-full bg-[#ff5f5f]" />
      <span className="h-2 w-2 rounded-full bg-[#f9d257]" />
      <span className="h-2 w-2 rounded-full bg-[#68ff86]" />
      <span className="pl-3 text-zinc-400">AlphaLabs // Terminal</span>
    </div>
    <div className="flex items-center gap-4 text-zinc-500">
      <span>24H LAT 21ms</span>
      <span>Session: APEX-12</span>
      <span>Status: LIVE</span>
    </div>
  </div>
);

const TerminalMarketColumn: React.FC = () => (
  <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Pairs</p>
      <h4 className="mt-2 text-lg font-semibold">Market Overview</h4>
    </div>
    <div className="space-y-3 text-sm">
      {[
        { pair: 'BTC-PERP', price: '$67,120', change: '+0.84%', oi: '+1.6%' },
        { pair: 'ETH-PERP', price: '$3,420', change: '+1.12%', oi: '+2.1%' },
        { pair: 'SOL-PERP', price: '$188.40', change: '-0.42%', oi: '+0.5%' },
        { pair: 'DOGE-PERP', price: '$0.193', change: '+3.10%', oi: '+2.9%' }
      ].map((row) => (
        <div
          key={row.pair}
          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-3"
        >
          <div>
            <p className="font-semibold">{row.pair}</p>
            <p className="text-xs text-zinc-500">OI {row.oi}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm">{row.price}</p>
            <p
              className={`text-xs font-semibold ${
                row.change.startsWith('-') ? 'text-[#FF6B6B]' : 'text-[#68ff86]'
              }`}
            >
              {row.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TerminalFlowColumn: React.FC = () => (
  <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Flow</p>
      <h4 className="mt-2 text-lg font-semibold">Real-Time Signals</h4>
    </div>
    <div className="grid gap-3 text-sm">
      {[
        {
          title: 'CVD Divergence',
          body: 'Buyer absorption on BTC perp vs spot — monitor for reclaim above 67.3K.',
          pill: 'Bullish Bias'
        },
        {
          title: 'Funding Snapshot',
          body: 'Funding reset across majors; negative on SOL indicates trapped shorts.',
          pill: 'Neutral'
        },
        {
          title: 'Block Tape',
          body: 'Tracked 9 block orders > $500K routed through Binance + OKX last 5m.',
          pill: 'High Activity'
        }
      ].map((signal) => (
        <div
          key={signal.title}
          className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">{signal.title}</p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-zinc-300">
              {signal.pill}
            </span>
          </div>
          <p className="text-xs text-zinc-400">{signal.body}</p>
        </div>
      ))}
    </div>
  </div>
);

const TerminalLogColumn: React.FC = () => (
  <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Chronicle</p>
      <h4 className="mt-2 text-lg font-semibold">Live Console</h4>
    </div>
    <div className="flex-1 space-y-3 rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-zinc-300">
      {inlineLogs.map((line) => (
        <p key={line} className="text-left text-[#8ed2ff]">
          {line}
        </p>
      ))}
    </div>
    <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-xs text-zinc-400">
      Auto-hedge mode ready · Session synced with TradeStation OMS · Next sweep alert
      armed at $1M notional.
    </div>
  </div>
);

export default EarlyAccess;
