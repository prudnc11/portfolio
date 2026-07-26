import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// ─── Navigation ───
function Nav() {
  return (
    <nav className="flex items-center justify-center gap-2 pt-20 font-sans text-[11px] uppercase tracking-[1.98px]">
      <Link to="/" className="text-muted">
        Home
      </Link>
      <span className="text-muted/25">/</span>
      <Link to="/playground" className="text-primary">
        Playground
      </Link>
    </nav>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl font-medium text-primary tracking-[-0.6px]">
        {title}
      </h2>
      <p className="mt-2 text-sm text-secondary">{description}</p>
    </div>
  );
}

function ExperimentCard({ title, children }) {
  return (
    <div className="rounded-[6px] border border-border bg-surface p-6 flex flex-col gap-4">
      <span className="text-[10px] uppercase tracking-[1.5px] text-muted">
        {title}
      </span>
      {children}
    </div>
  );
}

// ─── 1. Magnetic Button ───
function MagneticButton() {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <ExperimentCard title="Magnetic Button">
      <p className="text-xs text-secondary">Hover over the button. It follows your cursor.</p>
      <div className="flex items-center justify-center py-8">
        <button
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded-full border border-accent bg-accent/10 px-8 py-3 text-sm font-medium text-accent transition-transform duration-300 ease-out hover:bg-accent/20"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          Hover me
        </button>
      </div>
    </ExperimentCard>
  );
}

// ─── 2. 3D Card Tilt ───
function TiltCard() {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale3d(1.03, 1.03, 1.03)`
    );
  };

  const handleMouseLeave = () => setTransform("");

  return (
    <ExperimentCard title="3D Card Tilt">
      <p className="text-xs text-secondary">Move your cursor across the card.</p>
      <div className="flex items-center justify-center py-6">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-48 h-32 rounded-lg bg-gradient-to-br from-accent/30 via-accent/10 to-transparent border border-surface-border flex items-center justify-center transition-transform duration-150 ease-out"
          style={{ transform, transformStyle: "preserve-3d" }}
        >
          <span className="text-sm text-primary font-medium">Tilt me</span>
        </div>
      </div>
    </ExperimentCard>
  );
}

// ─── 3. Morphing Toggle ───
function MorphToggle() {
  const [on, setOn] = useState(false);

  return (
    <ExperimentCard title="Morphing Toggle">
      <p className="text-xs text-secondary">Click to toggle between states.</p>
      <div className="flex items-center justify-center py-6 gap-4">
        <button
          onClick={() => setOn(!on)}
          className="relative w-16 h-8 rounded-full transition-colors duration-500"
          style={{ backgroundColor: on ? "#38c56a" : "rgba(255,255,255,0.1)" }}
        >
          <div
            className="absolute top-1 left-1 size-6 rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]"
            style={{
              transform: on ? "translateX(32px) rotate(360deg)" : "translateX(0) rotate(0deg)",
            }}
          />
        </button>
        <span className="text-sm text-secondary">{on ? "On" : "Off"}</span>
      </div>
    </ExperimentCard>
  );
}

// ─── 4. Staggered List ───
function StaggeredList() {
  const [visible, setVisible] = useState(false);
  const items = ["Design", "Engineer", "Ship", "Iterate", "Scale"];

  return (
    <ExperimentCard title="Staggered Reveal">
      <p className="text-xs text-secondary">Click to trigger a staggered entrance animation.</p>
      <div className="flex flex-col gap-2 py-4">
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => setVisible(true), 50);
          }}
          className="self-start rounded-full border border-surface-border bg-[rgba(255,255,255,0.04)] px-4 py-1.5 text-xs text-secondary hover:text-primary transition-colors"
        >
          {visible ? "Replay" : "Trigger"}
        </button>
        <div className="flex flex-col gap-2 mt-2">
          {items.map((item, i) => (
            <div
              key={item}
              className="rounded-md border border-surface-border bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-primary transition-all duration-500 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transitionDelay: visible ? `${i * 80}ms` : "0ms",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </ExperimentCard>
  );
}

// ─── 5. Pulse Loader ───
function PulseLoader() {
  return (
    <ExperimentCard title="Pulse Loader">
      <p className="text-xs text-secondary">Three CSS-only loading animations.</p>
      <div className="flex items-center justify-center gap-12 py-8">
        {/* Dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2.5 rounded-full bg-accent"
              style={{
                animation: "pulse-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        {/* Ring */}
        <div
          className="size-8 rounded-full border-2 border-surface-border border-t-accent"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
        {/* Bars */}
        <div className="flex items-end gap-1 h-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-accent"
              style={{
                animation: "pulse-bar 1s ease-in-out infinite",
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      </div>
    </ExperimentCard>
  );
}

// ─── 6. Draggable Cards ───
function DraggableCards() {
  const containerRef = useRef(null);
  const [cards, setCards] = useState([
    { id: 1, label: "React", x: 20, y: 20 },
    { id: 2, label: "Tailwind", x: 130, y: 40 },
    { id: 3, label: "Vite", x: 70, y: 90 },
  ]);
  const dragRef = useRef(null);

  const handlePointerDown = (e, id) => {
    const rect = containerRef.current.getBoundingClientRect();
    const card = cards.find((c) => c.id === id);
    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left - card.x,
      offsetY: e.clientY - rect.top - card.y,
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - 90, e.clientX - rect.left - dragRef.current.offsetX));
    const y = Math.max(0, Math.min(rect.height - 36, e.clientY - rect.top - dragRef.current.offsetY));
    setCards((prev) =>
      prev.map((c) => (c.id === dragRef.current.id ? { ...c, x, y } : c))
    );
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <ExperimentCard title="Draggable Cards">
      <p className="text-xs text-secondary">Drag the tags around the container.</p>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-44 rounded-lg border border-surface-border bg-[rgba(255,255,255,0.02)] overflow-hidden touch-none"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onPointerDown={(e) => handlePointerDown(e, card.id)}
            className="absolute rounded-md border border-surface-border bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs text-primary cursor-grab active:cursor-grabbing select-none hover:border-accent/50 transition-colors"
            style={{ left: card.x, top: card.y }}
          >
            {card.label}
          </div>
        ))}
      </div>
    </ExperimentCard>
  );
}

// ─── 7. Custom Cursor ───
function CustomCursor() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [inside, setInside] = useState(false);
  const [clicking, setClicking] = useState(false);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ExperimentCard title="Custom Cursor">
      <p className="text-xs text-secondary">Move your cursor inside the box.</p>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setInside(true)}
        onMouseLeave={() => setInside(false)}
        onMouseDown={() => setClicking(true)}
        onMouseUp={() => setClicking(false)}
        className="relative h-40 rounded-lg border border-surface-border bg-[rgba(255,255,255,0.02)] overflow-hidden"
        style={{ cursor: inside ? "none" : "default" }}
      >
        {inside && (
          <>
            <div
              className="pointer-events-none absolute rounded-full border-2 border-accent transition-all duration-100 ease-out"
              style={{
                left: pos.x - (clicking ? 12 : 16),
                top: pos.y - (clicking ? 12 : 16),
                width: clicking ? 24 : 32,
                height: clicking ? 24 : 32,
              }}
            />
            <div
              className="pointer-events-none absolute size-1.5 rounded-full bg-accent"
              style={{ left: pos.x - 3, top: pos.y - 3 }}
            />
          </>
        )}
        <span className="absolute inset-0 flex items-center justify-center text-xs text-muted">
          {inside ? "Click anywhere" : "Hover here"}
        </span>
      </div>
    </ExperimentCard>
  );
}

// ─── 8. Particle Canvas ───
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const count = 60;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 197, 106, 0.6)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 197, 106, ${0.15 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        for (const p of particles) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            p.vx += dx * 0.0005;
            p.vy += dy * 0.0005;
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
  };

  return (
    <ExperimentCard title="Particle System">
      <p className="text-xs text-secondary">Move your cursor to attract particles.</p>
      <div className="relative h-56 rounded-lg border border-surface-border overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-0"
        />
      </div>
    </ExperimentCard>
  );
}

// ─── 9. Gradient Generator ───
function GradientGenerator() {
  const [angle, setAngle] = useState(135);
  const [c1, setC1] = useState("#38c56a");
  const [c2, setC2] = useState("#0C0B09");
  const [animating, setAnimating] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    if (!animating) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    let a = angle;
    const tick = () => {
      a = (a + 0.5) % 360;
      setAngle(a);
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animRef.current);
  }, [animating]);

  const css = `linear-gradient(${Math.round(angle)}deg, ${c1}, ${c2})`;

  return (
    <ExperimentCard title="Gradient Generator">
      <p className="text-xs text-secondary">Adjust colors and angle, or animate it.</p>
      <div className="h-32 rounded-lg border border-surface-border" style={{ background: css }} />
      <div className="flex flex-wrap items-center gap-4 text-xs text-secondary">
        <label className="flex items-center gap-2">
          <input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="size-6 rounded border-0 bg-transparent cursor-pointer" />
          Start
        </label>
        <label className="flex items-center gap-2">
          <input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="size-6 rounded border-0 bg-transparent cursor-pointer" />
          End
        </label>
        <label className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={360}
            value={Math.round(angle)}
            onChange={(e) => { setAngle(Number(e.target.value)); setAnimating(false); }}
            className="w-20 accent-accent"
          />
          {Math.round(angle)}deg
        </label>
        <button
          onClick={() => setAnimating(!animating)}
          className="rounded-full border border-surface-border px-3 py-1 hover:text-primary transition-colors"
        >
          {animating ? "Stop" : "Animate"}
        </button>
      </div>
      <code className="text-[11px] text-muted break-all">{css}</code>
    </ExperimentCard>
  );
}

// ─── 10. Toast Notifications ───
function ToastDemo() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const addToast = (type) => {
    const id = ++idRef.current;
    const messages = {
      success: "Changes saved successfully",
      error: "Something went wrong",
      info: "New update available",
    };
    setToasts((prev) => [...prev, { id, type, message: messages[type] }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const colors = {
    success: "border-accent/40 bg-accent/10 text-accent",
    error: "border-red-500/40 bg-red-500/10 text-red-400",
    info: "border-blue-400/40 bg-blue-400/10 text-blue-400",
  };

  return (
    <ExperimentCard title="Toast Notifications">
      <p className="text-xs text-secondary">Click the buttons to trigger toasts.</p>
      <div className="flex gap-2 py-2">
        {["success", "error", "info"].map((type) => (
          <button
            key={type}
            onClick={() => addToast(type)}
            className="rounded-full border border-surface-border bg-[rgba(255,255,255,0.04)] px-4 py-1.5 text-xs text-secondary capitalize hover:text-primary transition-colors"
          >
            {type}
          </button>
        ))}
      </div>
      <div className="relative h-28 rounded-lg border border-surface-border bg-[rgba(255,255,255,0.02)] overflow-hidden">
        <div className="absolute top-2 right-2 flex flex-col gap-2 w-56">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`rounded-md border px-3 py-2 text-xs ${colors[t.type]} animate-[slide-in_0.3s_ease-out]`}
            >
              {t.message}
            </div>
          ))}
        </div>
      </div>
    </ExperimentCard>
  );
}

// ─── 11. Command Palette ───
function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const commands = [
    { label: "Go to Home", shortcut: "G H" },
    { label: "Go to Projects", shortcut: "G P" },
    { label: "Toggle Theme", shortcut: "T T" },
    { label: "Copy Email", shortcut: "C E" },
    { label: "Open GitHub", shortcut: "G G" },
    { label: "Search", shortcut: "/" },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <ExperimentCard title="Command Palette">
      <p className="text-xs text-secondary">Click the button or imagine pressing CMD+K.</p>
      <div className="py-2">
        <button
          onClick={() => { setOpen(true); setQuery(""); }}
          className="flex items-center gap-2 rounded-md border border-surface-border bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs text-muted hover:text-secondary transition-colors w-full"
        >
          <span>Search commands...</span>
          <span className="ml-auto rounded border border-surface-border bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 text-[10px] text-muted">
            CMD+K
          </span>
        </button>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-surface-border bg-[#1a1917] shadow-2xl overflow-hidden animate-[scale-in_0.15s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command..."
              className="w-full bg-transparent px-4 py-3 text-sm text-primary outline-none border-b border-surface-border placeholder:text-muted"
            />
            <div className="max-h-64 overflow-y-auto py-2">
              {filtered.map((cmd) => (
                <button
                  key={cmd.label}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-secondary hover:bg-[rgba(255,255,255,0.06)] hover:text-primary transition-colors"
                >
                  <span>{cmd.label}</span>
                  <span className="text-[10px] text-muted font-mono">{cmd.shortcut}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-xs text-muted">No results found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </ExperimentCard>
  );
}

// ─── 12. Animated Menu ───
function AnimatedMenu() {
  const [open, setOpen] = useState(false);
  const items = ["Home", "Projects", "Playground", "Contact"];

  return (
    <ExperimentCard title="Animated Menu">
      <p className="text-xs text-secondary">Click the hamburger to see the menu animation.</p>
      <div className="relative py-4">
        <button
          onClick={() => setOpen(!open)}
          className="relative z-10 flex flex-col gap-1.5 p-2"
        >
          <span
            className="block h-0.5 w-5 bg-primary rounded transition-all duration-300"
            style={{
              transform: open ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-0.5 w-5 bg-primary rounded transition-all duration-300"
            style={{
              opacity: open ? 0 : 1,
              transform: open ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="block h-0.5 w-5 bg-primary rounded transition-all duration-300"
            style={{
              transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
            }}
          />
        </button>

        <div
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{ maxHeight: open ? "200px" : "0px" }}
        >
          <div className="flex flex-col gap-1 mt-3 pl-2">
            {items.map((item, i) => (
              <span
                key={item}
                className="text-sm text-secondary py-1 transition-all duration-300 ease-out hover:text-primary hover:translate-x-2"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-8px)",
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ExperimentCard>
  );
}

// ─── 13. Hover Card Effects ───
function HoverCards() {
  const [active, setActive] = useState(null);

  const effects = [
    { id: "glow", label: "Glow" },
    { id: "lift", label: "Lift" },
    { id: "border", label: "Border Trace" },
  ];

  const getStyle = (id) => {
    if (active !== id) return {};
    switch (id) {
      case "glow":
        return { boxShadow: "0 0 30px rgba(56,197,106,0.3), 0 0 60px rgba(56,197,106,0.1)" };
      case "lift":
        return { transform: "translateY(-8px) scale(1.02)" };
      case "border":
        return { borderColor: "#38c56a" };
      default:
        return {};
    }
  };

  return (
    <ExperimentCard title="Hover Effects">
      <p className="text-xs text-secondary">Hover over each card for a different effect.</p>
      <div className="grid grid-cols-3 gap-3 py-4">
        {effects.map((fx) => (
          <div
            key={fx.id}
            onMouseEnter={() => setActive(fx.id)}
            onMouseLeave={() => setActive(null)}
            className="flex h-20 items-center justify-center rounded-lg border border-surface-border bg-[rgba(255,255,255,0.04)] text-xs text-secondary transition-all duration-300 cursor-pointer"
            style={getStyle(fx.id)}
          >
            {fx.label}
          </div>
        ))}
      </div>
    </ExperimentCard>
  );
}

// ─── 14. Scroll Progress ───
function ScrollProgress() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = (e) => {
    const el = e.target;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.min(1, Math.max(0, pct)));
  };

  return (
    <ExperimentCard title="Scroll Progress">
      <p className="text-xs text-secondary">Scroll inside the box to see the progress bar.</p>
      <div className="relative">
        <div
          className="h-1 rounded-full bg-accent/20 mb-2 overflow-hidden"
        >
          <div
            className="h-full bg-accent rounded-full transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-36 overflow-y-auto rounded-lg border border-surface-border bg-[rgba(255,255,255,0.02)] p-4 space-y-4"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="text-xs text-muted">
              Section {i + 1}. Scroll to track progress across content blocks.
            </p>
          ))}
        </div>
        <span className="absolute top-3 right-2 text-[10px] text-muted font-mono">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </ExperimentCard>
  );
}

// ─── Main Playground Page ───
export default function Playground() {
  return (
    <div className="min-h-screen bg-bg font-sans">
      <div className="mx-auto max-w-[608px] px-4 pb-24">
        <Nav />

        <header className="mt-20">
          <h1 className="font-serif text-[36px] sm:text-[52px] text-primary tracking-[-1.04px] leading-[40px] sm:leading-[56.16px]">
            Playground
          </h1>
          <p className="mt-4 text-sm text-secondary leading-[22.75px]">
            Interactive experiments with animations, micro-interactions, and generative visuals. Built with React and CSS.
          </p>
        </header>

        {/* Animation / Motion */}
        <section className="mt-16">
          <SectionHeader
            title="Animation / Motion"
            description="CSS animations, loaders, and micro-interactions."
          />
          <div className="flex flex-col gap-6">
            <MagneticButton />
            <MorphToggle />
            <StaggeredList />
            <PulseLoader />
            <HoverCards />
          </div>
        </section>

        {/* Interactive UI */}
        <section className="mt-16">
          <SectionHeader
            title="Interactive UI"
            description="Draggable elements, custom cursors, and parallax effects."
          />
          <div className="flex flex-col gap-6">
            <TiltCard />
            <DraggableCards />
            <CustomCursor />
            <ScrollProgress />
          </div>
        </section>

        {/* Generative / Creative */}
        <section className="mt-16">
          <SectionHeader
            title="Generative / Creative"
            description="Particle systems and gradient generators."
          />
          <div className="flex flex-col gap-6">
            <ParticleCanvas />
            <GradientGenerator />
          </div>
        </section>

        {/* Practical Components */}
        <section className="mt-16">
          <SectionHeader
            title="Practical Components"
            description="Toast notifications, command palettes, and animated menus."
          />
          <div className="flex flex-col gap-6">
            <ToastDemo />
            <CommandPalette />
            <AnimatedMenu />
          </div>
        </section>

        <footer className="mt-24 border-t border-border py-6">
          <p className="font-serif text-sm text-muted">&copy; Tribe. Prudence</p>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}
