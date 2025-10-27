import React from 'react';
import { ContainerScroll } from '@/components/ContainerScroll';

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
              Here’s a peek at the live operating view our early partners use every
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

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 text-white md:px-10">
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
