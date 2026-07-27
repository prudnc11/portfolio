import { useState } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

function Nav() {
  return (
    <nav className="flex items-center justify-end gap-2 pt-20 font-sans text-[11px] uppercase tracking-[1.98px]">
      <Link to="/" className="text-muted">
        Home
      </Link>
      <span className="text-muted/25">/</span>
      <a href="#" className="text-primary">
        Designing with AI
      </a>
      <span className="text-muted/25">/</span>
      <Link to="/playground" className="text-muted">
        Playground
      </Link>
    </nav>
  );
}

function Section({ number, title, highlight, children }) {
  return (
    <section className="group relative">
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-serif text-sm text-accent">
            {number}
          </span>
          <div className="w-px flex-1 bg-border group-last:bg-transparent" />
        </div>
        <div className="flex flex-col gap-4 pb-16 group-last:pb-0">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-2xl text-primary tracking-[-0.6px]">
              {title}
            </h2>
            {highlight && (
              <span className="text-[13px] text-accent leading-[20px]">
                {highlight}
              </span>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }) {
  return (
    <blockquote className="border-l-2 border-accent/40 pl-5 py-1">
      <p className="font-serif text-lg text-[#EFEFEF] leading-[30px] italic">
        {children}
      </p>
    </blockquote>
  );
}

function BeforeAfter({ before, after }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          onClick={() => setShowAfter(false)}
          className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[1px] transition-colors duration-300 ${
            !showAfter
              ? "bg-accent/15 text-accent border border-accent/30"
              : "bg-surface text-muted border border-border hover:text-secondary"
          }`}
        >
          Before AI
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[1px] transition-colors duration-300 ${
            showAfter
              ? "bg-accent/15 text-accent border border-accent/30"
              : "bg-surface text-muted border border-border hover:text-secondary"
          }`}
        >
          With AI
        </button>
      </div>
      <div className="rounded-[6px] border border-border bg-surface p-5">
        <p className="text-base text-secondary leading-[26px]">
          {showAfter ? after : before}
        </p>
      </div>
    </div>
  );
}

function DesigningWithAI() {
  return (
    <div className="min-h-screen bg-bg font-sans">
      <div className="mx-auto max-w-[608px] px-4">
        <Nav />

        {/* Header */}
        <header className="mt-20">
          <p className="text-[13px] uppercase tracking-[2.42px] text-accent">
            How I work
          </p>
          <h1 className="mt-4 font-serif text-[52px] text-primary tracking-[-1.04px] leading-[56.16px]">
            Designing with AI
          </h1>
          <p className="mt-6 text-[20px] text-[#EFEFEF] leading-[32px]">
            I don't use AI to replace thinking. I use it to think more, explore
            wider, and ship what actually matters.
          </p>
          <div className="mt-8 h-px bg-border" />
        </header>

        {/* Content */}
        <div className="mt-16 flex flex-col">
          {/* 01 - Shipping real products */}
          <Section
            number="01"
            title="I ship products, not mockups"
            highlight="Code is my design tool"
          >
            <p className="text-base text-secondary leading-[26px]">
              Most designers hand off a Figma file and hope for the best. I
              write the front-end myself — with AI as my pair programmer. The
              result isn't a prototype that "feels close." It's the actual
              product, running in a browser, ready for users.
            </p>
            <PullQuote>
              The best design feedback comes from using the real thing, not
              commenting on a screenshot.
            </PullQuote>
            <p className="text-base text-secondary leading-[26px]">
              When I can test real interactions instead of simulating them, the
              gap between what I design and what users experience disappears.
              Every hover state, every loading sequence, every edge case — I've
              already lived through it before anyone else sees it.
            </p>
          </Section>

          {/* 02 - Exploring more directions */}
          <Section
            number="02"
            title="More directions, better decisions"
            highlight="Diverge wider, converge smarter"
          >
            <p className="text-base text-secondary leading-[26px]">
              The biggest risk in early-stage design isn't picking the wrong
              direction. It's not seeing enough directions to know what "right"
              looks like. When exploring manually, you build two or three
              options and commit before you've really searched the space.
            </p>
            <BeforeAfter
              before="Explore 2-3 directions over a week. Pick the least bad option. Hope it holds up. Realize two sprints later it doesn't."
              after="Build 5-6 functional directions in a day. Test each with real data. Pick the one that actually survives contact with users."
            />
            <p className="text-base text-secondary leading-[26px]">
              The difference isn't just speed. I'm making better choices because
              I've built and tested more possibilities instead of imagining
              them. AI doesn't choose for me — it gives me more things worth
              choosing between.
            </p>
          </Section>

          {/* 03 - Research synthesis */}
          <Section
            number="03"
            title="From raw data to sharp insights"
            highlight="AI does the first pass. I do the thinking."
          >
            <p className="text-base text-secondary leading-[26px]">
              Interview transcripts pile up. Survey responses blur together.
              Competitor audits become a wall of screenshots. The hard part was
              never collecting research — it was making sense of it fast enough
              to keep momentum.
            </p>
            <p className="text-base text-secondary leading-[26px]">
              I use AI to surface the patterns, contradictions, and buried
              opportunities across all of it. Not as a shortcut — as a
              sparring partner. It gives me a first pass I can interrogate,
              challenge, and push back on.
            </p>
            <PullQuote>
              I still read every transcript. I still sit with the data. AI just
              makes sure I don't miss the thing hiding on page forty-seven.
            </PullQuote>
          </Section>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-[6px] border border-border bg-surface p-8 text-center">
          <p className="font-serif text-xl text-primary">Want to see this in action?</p>
          <p className="mt-3 text-base text-secondary leading-[26px]">
            Every project on my homepage was designed and shipped this way.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block rounded-full bg-accent/15 border border-accent/30 px-6 py-2.5 text-[13px] uppercase tracking-[1px] text-accent transition-colors duration-300 hover:bg-accent/25"
          >
            View projects
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-border py-6">
          <p className="font-serif text-base text-muted">© Tribe · Prudence</p>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}

export default DesigningWithAI;
