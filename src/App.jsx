import { useState } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import wizardHat from "./assets/wizard-hat.svg";
import figmaIcon from "./assets/icons/figma.svg";
import claudeIcon from "./assets/icons/claude.png";
import vscodeIcon from "./assets/icons/vscode.svg";

const projects = [
  {
    name: "Sage",
    description: "Project management for engineering teams",
    link: "https://sage-blond-eight.vercel.app",
    problem:
      "Engineering teams needed a fast, opinionated project tracker that felt native to their workflow. Existing tools were either too bloated or too simple for real sprint management.",
    solution:
      "A Linear-inspired project management app with kanban boards, issue tracking, team workspaces, automation rules, roadmap views, and an AI assistant for querying project state.",
    results: [
      "Full issue lifecycle: backlog, in progress, review, done.",
      "Built-in AI assistant for natural language project queries.",
      "Automation engine with rule builder and dry-run mode.",
    ],
    role: [
      "UX design strategy.",
      "User interface & interaction design.",
      "Frontend development.",
    ],
  },
  {
    name: "Aggregator Admin",
    description: "Managing the network of commodity aggregators",
    link: "http://cf-admin-jade.vercel.app",
    problem:
      "Agricultural commodity aggregators across Africa lacked a centralized system to manage inventory, track transactions, and coordinate logistics. Leading to data silos and operational inefficiency.",
    solution:
      "An admin dashboard with real-time inventory tracking, aggregator network visualization, and automated reporting. Designed role-based access for field agents and managers.",
    results: [
      "40% reduction in manual data entry across all aggregation points.",
      "Real-time visibility across 50+ aggregation points, enabling faster decision-making.",
      "Streamlined onboarding for new aggregators, cutting setup time significantly.",
    ],
    role: [
      "UX design strategy.",
      "Dashboard & data visualization design.",
      "Frontend development.",
    ],
  },
  {
    name: "Ventryl",
    description: "Supply chain infrastructure for Africa downstream sector",
    problem:
      "Nigeria's downstream petroleum sector relied on fragmented, manual processes for ordering, invoicing, and delivery tracking. Causing delays and revenue leakage.",
    solution:
      "A B2B marketplace connecting petroleum distributors with retailers. Integrated payment processing, order management, and delivery logistics into a single platform.",
    results: [
      "Digitized ordering for 200+ petroleum retailers.",
      "Reduced order-to-delivery time by 60%.",
      "Enabled transparent pricing across the supply chain.",
    ],
    role: [
      "Product design & strategy.",
      "User interface design.",
      "Frontend development.",
    ],
  },
  {
    name: "NexaaSocial",
    description: "AI Social media management",
    link: "https://nexaa-frontend.vercel.app/dashboard",
    problem:
      "Small businesses and creators struggled to maintain consistent social media presence. Manually scheduling posts, writing captions, and analyzing performance across multiple platforms.",
    solution:
      "An AI-powered social media management tool that generates content suggestions, auto-schedules posts, and provides unified analytics. Built with a focus on simplicity for non-technical users.",
    results: [
      "3x faster content creation with AI assistance.",
      "Unified dashboard for multi-platform management.",
      "Automated scheduling reduced manual work by 70%.",
    ],
    role: [
      "Product design & strategy.",
      "AI interaction design.",
      "Frontend development.",
    ],
  },
];

function Nav() {
  return (
    <nav className="flex items-center justify-end gap-2 pt-20 font-sans text-[11px] uppercase tracking-[1.98px]">
      <a href="#" className="text-primary">
        Home
      </a>
      <span className="text-muted/25">/</span>
      <Link to="/designing-with-ai" className="text-muted">
        Designing with AI
      </Link>
      <span className="text-muted/25">/</span>
      <Link to="/playground" className="text-muted">
        Playground
      </Link>
    </nav>
  );
}

function NowPlaying() {
  return (
    <div className="flex items-center gap-4 rounded-[6px] border border-border bg-surface p-4">
      <div className="relative shrink-0">
        <img
          src={wizardHat}
          alt="Wizard hat"
          className="relative size-14 rounded-[6px] shadow-[0px_12px_30px_0px_rgba(0,0,0,0.32)] animate-[wizard-float_3s_ease-in-out_infinite]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-base text-secondary">
            Wearing a new hat
          </span>
          <span className="text-lg font-medium text-primary truncate">
            Design Engineer
          </span>
          <span className="text-xs capitalize text-muted">android</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <SoundBars />
          <ToolIcon icon={figmaIcon} alt="Figma" />
          <ToolIcon icon={claudeIcon} alt="Claude" className="size-6" />
          <ToolIcon icon={vscodeIcon} alt="VS Code" />
        </div>
      </div>
    </div>
  );
}

function SoundBars() {
  const heights = [8, 16, 12, 20, 8];
  return (
    <div className="flex items-center gap-1 rounded-full border border-surface-border bg-[rgba(255,255,255,0.04)] px-2.5 py-2.5 h-[38px]">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-[rgba(196,181,157,0.8)]"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

function ToolIcon({ icon, alt, className }) {
  return (
    <div className="flex items-center justify-center rounded-full border border-surface-border bg-[rgba(255,255,255,0.04)] size-8">
      <img src={icon} alt={alt} className={className || "size-4"} />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="text-[11px] uppercase tracking-[1.5px] text-muted">
      {children}
    </span>
  );
}

function ProjectItem({ name, description, link, problem, solution, results, role }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <div
        className="group px-1 py-7 transition-transform duration-300 ease-out hover:scale-[1.02] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-xl text-primary leading-[30px]">
                {name}
              </h3>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[1px] text-accent transition-colors duration-300 hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  View project
                </a>
              ) : (
                <span className="text-[11px] uppercase tracking-[1px] text-accent">
                  View project
                </span>
              )}
            </div>
            <p className="text-base text-secondary leading-[26px]">
              {description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[1px] text-muted transition-colors duration-300 group-hover:text-secondary mt-1">
              {isOpen ? "Show less" : "Read more"}
              <span
                className="text-[10px] transition-transform duration-300 inline-block"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▾
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-1 pb-8 pt-2 flex flex-col gap-6">
            <div className="h-px bg-border" />

            <div className="flex flex-col gap-2">
              <SectionLabel>Problem</SectionLabel>
              <p className="text-[15px] text-secondary leading-[24px]">
                {problem}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <SectionLabel>Solution</SectionLabel>
              <p className="text-[15px] text-secondary leading-[24px]">
                {solution}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <SectionLabel>Results</SectionLabel>
              <ul className="flex flex-col gap-2">
                {results.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[15px] text-secondary leading-[24px]"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <SectionLabel>My Role</SectionLabel>
              <ul className="flex flex-col gap-1">
                {role.map((item, i) => (
                  <li
                    key={i}
                    className="text-[15px] text-secondary leading-[24px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-bg font-sans">
      <div className="mx-auto max-w-[608px] px-4">
        <Nav />

        {/* Header */}
        <header className="mt-20">
          <h1 className="font-serif text-[52px] text-primary tracking-[-1.04px] leading-[56.16px]">
            Prudence
          </h1>
          <p className="mt-4 text-[13px] uppercase tracking-[2.42px] text-secondary">
            SENIOR AI PRODUCT DESIGNER
          </p>

          {/* Currently */}
          <p className="mt-8 text-[20px] text-[#B4B4B4] leading-[32px]">
            <span className="inline-block size-2 rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite] mr-2 align-middle" />
            Product designer who brings visual craft to products, shipping in
            code with AI, not just Figma. Currently designing experience for
            the food supply chain at{" "}
            <span className="text-primary">Complete Farmer</span>
          </p>

          {/* Now Playing */}
          <div className="mt-8 max-w-[448px]">
            <NowPlaying />
          </div>
        </header>

        {/* Projects Section */}
        <section className="mt-16">
          <div className="border-b border-border pb-4">
            <h2 className="font-serif text-2xl font-medium text-primary tracking-[-0.6px]">
              Projects
            </h2>
          </div>
          <div className="mt-6">
            {projects.map((project, i) => (
              <ProjectItem key={i} {...project} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-border py-6">
          <p className="font-serif text-base text-muted">© Tribe · Prudence</p>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
