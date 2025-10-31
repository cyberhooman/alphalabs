import React from 'react';
import { ContainerScroll } from '@/components/ContainerScroll';
<<<<<<< HEAD
import { FloatingNav } from '@/components/ui/floating-navbar';

const featureHighlights = [
  {
    title: 'Currency Strength Meter',
    description:
      'Real-time currency strength analysis across multiple timeframes with quadrant visualization. Identify the strongest and weakest currencies instantly.',
    metric: 'Multi-Timeframe'
  },
  {
    title: 'MarketMilk Integration',
    description:
      'Advanced market snapshot, watchlist overview, and symbol details with FXCM data feed integration for institutional-grade analysis.',
    metric: 'FXCM Feed'
  },
  {
    title: 'Trading Journal',
    description:
      'Comprehensive journaling system with quick notes, todo tracking, and trade documentation to refine your edge over time.',
    metric: 'Full Suite'
  }
];

const EarlyAccess: React.FC = () => {
  const handleNavClick = (link: string) => {
    if (link === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

=======

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
>>>>>>> 63670987063c40c6608a64bff19d45862a789070
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#070714] to-black text-white">
<<<<<<< HEAD
      <FloatingNav onNavClick={handleNavClick} />

      <div className="pt-16" id="home">
        <ContainerScroll
          titleComponent={
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.6em] text-[#FF6B6B]">
                Data Terminal
              </p>
              <h1 className="text-4xl font-bold md:text-6xl">
                prep-Data. The Complete Forex Trading Intelligence Terminal.
              </h1>
              <p className="mx-auto max-w-3xl text-base text-zinc-300 md:text-lg">
                Currency strength analysis, MarketMilk integration, and professional trading journal
                in one powerful platform. Built for forex traders who demand precision, context, and edge.
              </p>
            </div>
          }
        >
          <div className="flex h-full w-full flex-col gap-6 bg-[#0a0e1a] p-6 text-left">
            <CurrencyStrengthTable />
            <TradingJournalSection />
          </div>
        </ContainerScroll>
      </div>

      <section id="product" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 text-white md:px-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.5em] text-[#FF6B6B]">
            What&apos;s Inside
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Everything you need to master forex trading.
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
            Real-time currency strength meter with quadrant visualization, MarketMilk™ market
            snapshots, comprehensive trading journal, and institutional FXCM data feeds — all
            integrated into one professional terminal.
          </p>
        </div>
=======
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
>>>>>>> 63670987063c40c6608a64bff19d45862a789070

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
<<<<<<< HEAD
            Ready to trade forex with institutional-grade intelligence?
          </h3>
          <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
            Join the early access program and get the complete prep-Data terminal with currency
            strength meter, MarketMilk integration, trading journal, and FXCM data feeds.
            Built by traders, for traders.
          </p>
          <a
            href="mailto:hello@prepdata.xyz?subject=Early%20Access%20Request"
            className="rounded-full border border-[#FF6B6B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6B6B] transition hover:bg-[#FF6B6B] hover:text-black"
          >
            Request Early Access
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
            Early Access Pricing
          </h2>
          <p className="mx-auto max-w-3xl text-base text-zinc-400 md:text-lg">
            Get lifetime access to prep-Data with our early access program.
            Lock in your price now before we launch publicly.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141428] via-[#0c0c1b] to-[#070714] p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold">Early Access</h3>
              <div className="mt-4">
                <span className="text-5xl font-bold text-[#FF6B6B]">Contact Us</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">for custom pricing</p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-300">Real-time Currency Strength Meter</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-300">MarketMilk Integration</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-300">Professional Trading Journal</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-300">FXCM Data Feeds</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-300">Lifetime Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-300">Priority Support</span>
              </div>
            </div>

            <a
              href="mailto:hello@prepdata.xyz?subject=Early%20Access%20Pricing"
              className="mt-4 rounded-full bg-[#FF6B6B] px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#ff5252]"
            >
              Contact Sales
            </a>
          </div>
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
            Follow us on social media for market insights, platform updates, and trading tips.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <a
            href="https://twitter.com/prepdata"
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
            href="https://discord.gg/prepdata"
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
            href="https://github.com/prepdata"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition hover:bg-white/[0.08] hover:border-[#FF6B6B]/50"
          >
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <h3 className="text-xl font-semibold">GitHub</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Explore our open-source tools
            </p>
          </a>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#141428] via-[#0c0c1b] to-[#070714] p-8 text-center">
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="max-w-2xl text-sm text-zinc-400">
            Have questions about prep-Data? Want to learn more about our platform or discuss
            partnership opportunities? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@prepdata.xyz"
              className="rounded-full border border-[#FF6B6B] px-6 py-3 text-sm font-semibold tracking-wide text-[#FF6B6B] transition hover:bg-[#FF6B6B] hover:text-black"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@prepdata.xyz"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10"
            >
              Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const CurrencyStrengthTable: React.FC = () => {
  const currencies = [
    { rank: 1, currency: 'AUD', change: '+1.11%', momentum: 100, color: 'text-emerald-400' },
    { rank: 2, currency: 'CAD', change: '+0.63%', momentum: 78, color: 'text-emerald-400' },
    { rank: 3, currency: 'USD', change: '+0.50%', momentum: 72, color: 'text-emerald-400' },
    { rank: 4, currency: 'NZD', change: '+0.17%', momentum: 57, color: 'text-blue-400' },
    { rank: 5, currency: 'EUR', change: '-0.12%', momentum: 44, color: 'text-rose-400' },
    { rank: 6, currency: 'CHF', change: '-0.52%', momentum: 26, color: 'text-rose-400' },
    { rank: 7, currency: 'JPY', change: '-0.64%', momentum: 20, color: 'text-rose-400' },
    { rank: 8, currency: 'GBP', change: '-1.09%', momentum: 8, color: 'text-rose-400' }
  ];

  return (
    <div className="rounded-lg bg-[#131824] p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Currency Strength Meter</h3>
        <p className="text-xs text-gray-400">
          Based on 28 currency pairs • 7-Day Trend Analysis • BabyPips-style calculation
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full">
          <thead className="bg-[#1a2332]">
            <tr className="text-left">
              <th className="px-4 py-3 text-sm font-medium text-cyan-400">#</th>
              <th className="px-4 py-3 text-sm font-medium text-cyan-400">Currency</th>
              <th className="px-4 py-3 text-sm font-medium text-cyan-400">7D Change</th>
              <th className="px-4 py-3 text-sm font-medium text-cyan-400">Momentum</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((item, index) => (
              <tr
                key={item.currency}
                className={`border-t border-gray-800 ${index % 2 === 0 ? 'bg-[#0f1520]' : 'bg-[#131824]'}`}
              >
                <td className="px-4 py-3 text-sm text-gray-400">{item.rank}</td>
                <td className="px-4 py-3 text-base font-semibold text-white">{item.currency}</td>
                <td className={`px-4 py-3 text-sm font-medium ${item.color}`}>{item.change}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-700">
                      <div
                        className={`h-full rounded-full ${
                          item.momentum > 70
                            ? 'bg-emerald-500'
                            : item.momentum > 40
                              ? 'bg-blue-500'
                              : 'bg-rose-500'
                        }`}
                        style={{ width: `${item.momentum}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-300">{item.momentum}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TradingJournalSection: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#131824] p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Trading Journal (Calendar)</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Data Score */}
        <div className="rounded-lg bg-[#0f1520] p-4">
          <h4 className="mb-2 text-xs font-medium text-gray-400">Data Score</h4>
          <div className="text-center">
            <div className="mx-auto mb-2 h-20 w-20">
              <svg viewBox="0 0 100 100" className="rotate-[-90deg]">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1a2332"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="125.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold text-blue-400">3.9/10</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="rounded-lg bg-[#0f1520] p-4">
          <h4 className="mb-2 text-xs font-medium text-gray-400">Progress Tracker</h4>
          <div className="mb-2 grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-sm ${
                  i < 18
                    ? i < 15
                      ? 'bg-emerald-600'
                      : 'bg-rose-600'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-gray-400">Less</span>
            <div className="flex-1" />
            <span className="text-gray-400">More</span>
          </div>
        </div>

        {/* Account Balance */}
        <div className="rounded-lg bg-[#0f1520] p-4">
          <h4 className="mb-2 text-xs font-medium text-gray-400">Account Balance</h4>
          <p className="mb-1 text-2xl font-bold text-white">$10070.00</p>
          <p className="text-sm text-emerald-400">+70.00</p>
          <div className="mt-2 h-12">
            <svg viewBox="0 0 100 30" className="h-full w-full" preserveAspectRatio="none">
              <polyline
                points="0,25 20,20 40,15 60,10 80,8 100,5"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <polyline
                points="0,30 0,25 20,20 40,15 60,10 80,8 100,5 100,30"
                fill="url(#gradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1a2332" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* October Goals */}
        <div className="rounded-lg bg-[#0f1520] p-4">
          <h4 className="mb-3 text-xs font-medium text-gray-400">October Goals</h4>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-400">Monthly P&L</span>
                <span className="text-white">70 / 500</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full w-[14%] rounded-full bg-blue-500" />
              </div>
            </div>
            <div className="border-t border-gray-700 pt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-400">Win Rate</span>
                <span className="text-lg font-bold text-white">50.0%</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs text-gray-400">Days</span>
                <span className="text-lg font-bold text-white">4</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs text-gray-400">Total Trades</span>
                <span className="text-lg font-bold text-white">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
=======
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
>>>>>>> 63670987063c40c6608a64bff19d45862a789070
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
