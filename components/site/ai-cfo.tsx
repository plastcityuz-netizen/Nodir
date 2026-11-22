"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BellRing,
  Database,
  Info,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { useToast } from "@/components/providers/toast-provider";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { DEBTORS, EXPENSE_LABELS, KPI } from "@/lib/mock/demo";
import { formatNumber, formatPercent, money } from "@/lib/format";
import { getPlan, planLimit } from "@/lib/pricing.config";

type Chart = "expense" | "debt" | "scenario";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
  source?: string;
  chart?: Chart;
  withAction?: boolean;
  fallback?: boolean;
};

let messageId = 0;
const nextId = () => {
  messageId += 1;
  return `msg-${messageId}`;
};

function ChartPreview({ chart }: { chart: Chart }) {
  const { dict, lang } = useI18n();

  if (chart === "expense") {
    const rows = [
      { label: EXPENSE_LABELS.materials[lang], value: 246, delta: 32, tone: "text-danger" },
      { label: EXPENSE_LABELS.payroll[lang], value: 312, delta: 2, tone: "text-muted" },
      { label: EXPENSE_LABELS.other[lang], value: 615.6, delta: 0, tone: "text-muted" },
    ];
    return (
      <div className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-[74px] shrink-0 text-[9.5px] text-muted">{row.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--emerald),var(--cyan))]"
                style={{ width: `${Math.min((row.value / 615.6) * 100, 100)}%` }}
              />
            </div>
            <span className="w-[56px] shrink-0 text-right text-[9.5px] text-ink num">
              {formatNumber(row.value, 1)} {dict.mock.mln}
            </span>
            <span className={`w-[44px] shrink-0 text-right text-[9.5px] ${row.delta > 10 ? "text-danger" : "text-muted"} num`}>
              {row.delta ? formatPercent(row.delta) : "—"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (chart === "debt") {
    return (
      <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
        {DEBTORS.map((debtor) => (
          <div
            key={debtor.name.uz}
            className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-2.5 py-1.5 last:border-0"
          >
            <span className="truncate text-[10px] text-ink/85">
              {debtor.name[lang]} {debtor.legal[lang]}
            </span>
            <span className="shrink-0 text-[10px] font-medium text-ink num">
              {money(debtor.amount, lang, { compact: true })}
            </span>
            <span className="shrink-0 rounded bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] px-1.5 py-0.5 text-[9px] text-danger num">
              {debtor.days} {dict.mock.days}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {[
        { label: dict.hero.kpiRevenue, value: `+41,2 ${dict.mock.mln}` },
        { label: dict.hero.kpiProfit, value: "+9,8%" },
        { label: dict.ai.scenarioVolume, value: "+5,1%" },
      ].map((item) => (
        <div key={item.label} className="rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] px-2 py-1.5">
          <div className="text-[8.5px] leading-tight text-muted">{item.label}</div>
          <div className="mt-0.5 text-[10.5px] font-semibold text-emerald-ink num">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

const MAX_QUESTION_LENGTH = 300;

export function AiCfo() {
  const { dict, lang } = useI18n();
  const { push } = useToast();
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "ai", text: dict.ai.greeting },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [openSource, setOpenSource] = useState<Record<string, boolean>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const busyRef = useRef(false);
  const demoPlan = getPlan("business");

  useEffect(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setMessages([{ id: nextId(), role: "ai", text: dict.ai.greeting }]);
    busyRef.current = false;
    setTyping(false);
    setError("");
    setOpenSource({});
  }, [lang, dict.ai.greeting]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const ask = (question: string, answerIndex: number | null) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setError("");
    setMessages((list) => [...list, { id: nextId(), role: "user", text: question }]);
    setTyping(true);
    const timer = window.setTimeout(() => {
      busyRef.current = false;
      setTyping(false);
      if (answerIndex === null) {
        setMessages((list) => [
          ...list,
          { id: nextId(), role: "ai", text: dict.ai.fallback, fallback: true },
        ]);
        return;
      }
      const answer = dict.ai.answers[answerIndex];
      if (!answer) return;
      setMessages((list) => [
        ...list,
        {
          id: nextId(),
          role: "ai",
          text: answer.text,
          source: answer.source,
          chart: answer.chart as Chart,
          withAction: answerIndex === 1,
        },
      ]);
    }, 720);
    timers.current.push(timer);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (typing) return;
    const value = input.trim();
    if (!value) {
      setError(dict.ai.emptyError);
      return;
    }
    if (value.length > MAX_QUESTION_LENGTH) {
      setError(dict.ai.tooLongError);
      return;
    }
    if (!/\p{L}/u.test(value)) {
      setError(dict.ai.noLettersError);
      return;
    }
    setInput("");
    ask(value, null);
  };

  const resetChat = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setMessages([{ id: nextId(), role: "ai", text: dict.ai.greeting }]);
    busyRef.current = false;
    setTyping(false);
    setInput("");
    setError("");
    setOpenSource({});
  };

  return (
    <section id="ai-cfo" className="section relative overflow-hidden">
      <div className="aurora" aria-hidden>
        <div className="aurora-blob aurora-violet -right-24 top-10 h-[420px] w-[460px] opacity-25" />
        <div className="aurora-blob aurora-emerald -left-24 bottom-0 h-[380px] w-[440px] opacity-20" />
      </div>

      <div className="wrap relative">
        <Reveal>
          <SectionHeading eyebrow={dict.ai.eyebrow} title={dict.ai.title} sub={dict.ai.sub} />
        </Reveal>

        <div className="mt-10 grid gap-3 lg:mt-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-4">
          <Reveal>
            <div className="glass flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--violet),var(--cyan))] text-white shadow-[0_8px_24px_-8px_rgba(124,92,255,.7)]">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-ink">{dict.ai.chatTitle}</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] px-1.5 py-0.5 text-[8.5px] font-medium text-warning">
                        <span className="size-1 rounded-full bg-warning" aria-hidden />
                        {dict.ai.demoBadge}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted">{dict.ai.chatStatus}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="hidden rounded-md border border-[var(--border)] px-2 py-1 text-[9px] text-muted sm:block">
                    {dict.ai.quota}
                  </span>
                  <button
                    type="button"
                    onClick={resetChat}
                    aria-label={dict.ai.clear}
                    title={dict.ai.clear}
                    className="grid size-8 place-items-center rounded-lg border border-[var(--border)] text-muted transition hover:border-[var(--border-strong)] hover:text-ink"
                  >
                    <RotateCcw className="size-3.5" aria-hidden />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="min-h-[280px] max-h-[380px] flex-1 space-y-3 overflow-y-auto px-3.5 py-4 sm:max-h-[420px] sm:px-4"
                aria-live="polite"
                aria-busy={typing}
              >
                {messages.map((message) => (
                  <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className={
                        message.role === "user"
                          ? "max-w-[85%] rounded-2xl rounded-br-md border border-[var(--border)] bg-[var(--elevated)] px-3 py-2 text-[11.5px] text-ink"
                          : message.fallback
                            ? "max-w-[92%] rounded-2xl rounded-bl-md border border-warning/30 bg-[color-mix(in_srgb,var(--warning)_7%,var(--surface))] px-3 py-2.5"
                            : "max-w-[92%] rounded-2xl rounded-bl-md border border-violet/20 bg-[color-mix(in_srgb,var(--violet)_6%,var(--surface))] px-3 py-2.5"
                      }
                    >
                      {message.role === "ai" && (
                        <div className="mb-1 flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-violet">
                          <Sparkles className="size-2.5" aria-hidden />
                          AI CFO
                          <span className="rounded border border-[var(--border)] px-1 py-px text-[7.5px] font-medium normal-case tracking-normal text-muted">
                            {dict.ai.demoLabel}
                          </span>
                        </div>
                      )}
                      <p className="text-[11.5px] leading-relaxed text-ink/90">{message.text}</p>
                      {message.fallback && (
                        <p className="mt-1.5 flex items-start gap-1.5 text-[9px] leading-relaxed text-warning">
                          <Info className="mt-px size-3 shrink-0" aria-hidden />
                          {dict.ai.demoNotice}
                        </p>
                      )}
                      {message.chart && <ChartPreview chart={message.chart} />}

                      {message.source && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSource((state) => ({ ...state, [message.id]: !state[message.id] }))
                            }
                            aria-expanded={Boolean(openSource[message.id])}
                            className="inline-flex items-center gap-1 rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] text-muted transition hover:text-ink"
                          >
                            <Database className="size-2.5" aria-hidden />
                            {dict.ai.why}
                          </button>
                          <AnimatePresence initial={false}>
                            {openSource[message.id] && (
                              <motion.p
                                initial={reduce ? undefined : { opacity: 0, height: 0 }}
                                animate={reduce ? undefined : { opacity: 1, height: "auto" }}
                                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-1.5 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-[9px] leading-relaxed text-muted"
                              >
                                <span className="font-medium text-ink/80">{dict.ai.source}: </span>
                                {message.source}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {message.withAction && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() => setConfirmOpen(true)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-fill px-2.5 py-1.5 text-[10px] font-medium text-[#04130E] transition hover:brightness-105"
                          >
                            <BellRing className="size-3" aria-hidden />
                            {dict.ai.sendNote}
                          </button>
                          <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[10px] text-ink/85 transition hover:border-[var(--border-strong)]"
                          >
                            {dict.ai.view}
                            <ArrowUpRight className="size-3" aria-hidden />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-violet/20 bg-[color-mix(in_srgb,var(--violet)_6%,var(--surface))] px-3 py-2">
                      <span className="flex gap-0.5" aria-hidden>
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="size-1 rounded-full bg-violet"
                            animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.16 }}
                          />
                        ))}
                      </span>
                      <span className="text-[9.5px] text-muted">{dict.ai.typing}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--border)] px-3 py-3 sm:px-4">
                <div className="mb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {dict.ai.suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => ask(suggestion, index)}
                      disabled={typing}
                      className="shrink-0 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_60%,transparent)] px-2.5 py-1.5 text-[10px] text-ink/85 transition hover:border-violet/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <form onSubmit={onSubmit} className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                      if (error) setError("");
                    }}
                    placeholder={dict.ai.inputPlaceholder}
                    aria-label={dict.ai.inputPlaceholder}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "ai-cfo-error" : undefined}
                    maxLength={MAX_QUESTION_LENGTH}
                    autoComplete="off"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-[16px] text-ink outline-none transition placeholder:text-[11.5px] placeholder:text-muted/70 focus:border-violet/50 focus:ring-4 focus:ring-violet/10 aria-invalid:border-danger/60 sm:text-[12.5px]"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    aria-label={dict.common.send}
                    disabled={typing}
                    className="size-11 shrink-0 rounded-xl p-0"
                  >
                    <Send className="size-4" aria-hidden />
                  </Button>
                </form>
                {error && (
                  <p id="ai-cfo-error" role="alert" className="mt-2 text-[10px] text-danger">
                    {error}
                  </p>
                )}
                <p className="mt-2 flex items-start gap-1.5 text-[9px] leading-relaxed text-muted">
                  <Info className="mt-px size-3 shrink-0 text-warning" aria-hidden />
                  {dict.ai.demoNotice}
                </p>
                <p className="mt-1.5 flex items-start gap-1.5 text-[9px] leading-relaxed text-muted">
                  <ShieldCheck className="mt-px size-3 shrink-0 text-emerald-ink" aria-hidden />
                  {dict.ai.disclaimer}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-ink">{dict.ai.briefTitle}</h3>
                  <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[9px] text-muted">
                    08:00
                  </span>
                </div>
                <p className="mt-0.5 text-[10.5px] text-muted">{dict.ai.briefSub}</p>
                <ol className="mt-4 space-y-2">
                  {dict.ai.brief.map((item, index) => (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => ask(dict.ai.suggestions[index] ?? item.title, index)}
                        className="group flex w-full items-start gap-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_30%,transparent)] p-3 text-left transition hover:border-emerald/30 hover:bg-[color-mix(in_srgb,var(--elevated)_60%,transparent)]"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-soft text-[9px] font-semibold text-emerald-ink num">
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11.5px] font-medium text-ink">{item.title}</span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-[9.5px] text-muted">
                            {item.note}
                            <span className="inline-flex items-center gap-0.5 rounded bg-[var(--surface)] px-1 py-px text-[8px]">
                              <Database className="size-2" aria-hidden />
                              {dict.ai.briefSource}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-muted transition group-hover:text-emerald-ink" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_30%,transparent)] p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg bg-emerald-soft text-emerald-ink">
                    <TrendingUp className="size-3.5" aria-hidden />
                  </span>
                  <div>
                    <div className="text-[11px] font-medium text-ink">
                      {dict.roles.title}
                    </div>
                    <div className="text-[9.5px] text-muted">{dict.ai.workspaceNote}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {[
                    {
                      label: dict.pricing.labels.users,
                      value: planLimit(demoPlan, "users", lang),
                    },
                    {
                      label: dict.pricing.labels.companies,
                      value: planLimit(demoPlan, "companies", lang),
                    },
                    { label: "Balans Score", value: String(KPI.score) },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5">
                      <div className="text-[8.5px] leading-tight text-muted">{item.label}</div>
                      <div className="mt-0.5 text-[12px] font-semibold text-ink num">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={dict.ai.confirmTitle}
        description={dict.ai.confirmText}
        closeLabel={dict.common.close}
        size="md"
      >
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="mb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted">
            {dict.ai.previewLabel}
          </div>
          <p className="text-[11.5px] leading-relaxed text-ink/85">{dict.ai.preview}</p>
        </div>
        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" size="md" onClick={() => setConfirmOpen(false)}>
            {dict.common.cancel}
          </Button>
          <Button
            size="md"
            onClick={() => {
              setConfirmOpen(false);
              push(dict.ai.sent, "success");
            }}
          >
            {dict.ai.sendNote}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
