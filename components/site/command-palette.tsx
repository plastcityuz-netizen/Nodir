"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Home,
  Languages,
  Layers,
  LogIn,
  Search,
  Shield,
  Sparkles,
  SunMoon,
  Tag,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { applyTheme, getActiveTheme, otherTheme } from "@/lib/theme";

type PaletteItem = {
  id: string;
  label: string;
  group: "pages" | "actions";
  icon: ComponentType<{ className?: string }>;
  run: () => void;
  keywords?: string;
};

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dict, toggleLang } = useI18n();
  const router = useRouter();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const go = useCallback(
    (href: string) => {
      onClose();
      if (href.startsWith("#")) {
        if (window.location.pathname !== "/") {
          router.push(`/${href}`);
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", href);
        }
        return;
      }
      router.push(href);
    },
    [onClose, router],
  );

  const items = useMemo<PaletteItem[]>(() => {
    const pages: PaletteItem[] = [
      { id: "home", label: dict.nav.home, group: "pages", icon: Home, run: () => go("/") },
      { id: "features", label: dict.nav.product, group: "pages", icon: Layers, run: () => go("#mahsulot"), keywords: "modullar imkoniyatlar" },
      { id: "roles", label: dict.nav.solutions, group: "pages", icon: Shield, run: () => go("#rollar"), keywords: "rollar rbac" },
      { id: "ai", label: dict.nav.ai, group: "pages", icon: Sparkles, run: () => go("#ai-cfo"), keywords: "ai cfo tahlil" },
      { id: "pricing", label: dict.nav.pricing, group: "pages", icon: Tag, run: () => go("/narxlar"), keywords: "narx tarif" },
      { id: "signup", label: dict.footer.links.signup, group: "pages", icon: UserPlus, run: () => go("/royxatdan-otish"), keywords: "bepul sinov" },
      { id: "login", label: dict.nav.login, group: "pages", icon: LogIn, run: () => go("/kirish") },
      { id: "privacy", label: dict.footer.links.privacy, group: "pages", icon: FileText, run: () => go("/maxfiylik") },
      { id: "terms", label: dict.footer.links.terms, group: "pages", icon: FileText, run: () => go("/shartlar") },
    ];
    const actions: PaletteItem[] = [
      {
        id: "theme",
        label: dict.command.toggleTheme,
        group: "actions",
        icon: SunMoon,
        run: () => {
          applyTheme(otherTheme(getActiveTheme()));
          onClose();
        },
      },
      {
        id: "lang",
        label: dict.command.toggleLang,
        group: "actions",
        icon: Languages,
        run: () => {
          toggleLang();
          onClose();
        },
      },
    ];
    return [...pages, ...actions];
  }, [dict, go, onClose, toggleLang]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      `${item.label} ${item.keywords ?? ""}`.toLowerCase().includes(needle),
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (filtered.length ? (index + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (filtered.length ? (index - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      filtered[active]?.run();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  const groups: { key: "pages" | "actions"; title: string }[] = [
    { key: "pages", title: dict.command.groups.pages },
    { key: "actions", title: dict.command.groups.actions },
  ];

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[12vh]">
          <motion.button
            type="button"
            aria-label={dict.nav.close}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-[#03060c]/70 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.command.title}
            initial={reduce ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative z-10 w-full max-w-[560px] overflow-hidden rounded-2xl shadow-float"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={dict.command.placeholder}
                aria-label={dict.command.placeholder}
                role="combobox"
                aria-expanded
                aria-controls="command-results"
                className="h-14 w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-muted/70"
              />
              <kbd className="shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted">
                esc
              </kbd>
            </div>
            <div id="command-results" role="listbox" className="max-h-[min(56vh,420px)] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">{dict.command.empty}</p>
              )}
              {groups.map((group) => {
                const groupItems = filtered.filter((item) => item.group === group.key);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group.key} className="mb-1">
                    <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {group.title}
                    </div>
                    {groupItems.map((item) => {
                      flatIndex += 1;
                      const index = flatIndex;
                      const isActive = index === active;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActive(index)}
                          onClick={item.run}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            isActive ? "bg-[var(--elevated)] text-ink" : "text-muted hover:text-ink"
                          }`}
                        >
                          <Icon className={`size-4 shrink-0 ${isActive ? "text-emerald-ink" : ""}`} />
                          <span className="flex-1">{item.label}</span>
                          <ArrowRight
                            className={`size-3.5 transition ${isActive ? "opacity-100" : "opacity-0"}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[10.5px] text-muted">
              <span>{dict.command.hint}</span>
              <span className="hidden sm:inline">BALANS AI</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const CommandContext = createContext<{ open: () => void } | null>(null);

export function useCommand(): { open: () => void } {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error("useCommand faqat CommandProvider ichida ishlaydi");
  return ctx;
}

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </CommandContext.Provider>
  );
}
