"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, Play, Sparkles } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { BalanceLine } from "@/components/brand/balance-line";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button, ButtonLink, ArrowRight } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="inline-flex w-full justify-center sm:w-auto"
      onMouseMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const [demoOpen, setDemoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const fade = {
    hidden: { opacity: 0, y: 18 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-6 pt-[104px] sm:pb-10 sm:pt-[128px] lg:pb-14 lg:pt-[152px]"
    >
      <div className="aurora" aria-hidden>
        <div className="aurora-blob aurora-emerald -left-[10%] top-[6%] h-[420px] w-[520px] opacity-40" />
        <div className="aurora-blob aurora-violet right-[-8%] top-[18%] h-[460px] w-[520px] opacity-35" />
        <div className="aurora-blob aurora-cyan left-[32%] top-[52%] h-[380px] w-[440px] opacity-20" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] islimi" aria-hidden />

      <div className="wrap relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10 xl:gap-14">
          <div className="relative z-10 max-w-[640px]">
            <motion.div variants={fade} custom={0} initial="hidden" animate="show">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] font-medium text-ink/90">
                <span className="relative grid place-items-center">
                  <span className="size-1.5 rounded-full bg-emerald pulse-dot" aria-hidden />
                </span>
                {dict.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fade}
              custom={1}
              initial="hidden"
              animate="show"
              className="t-hero mt-6 text-ink"
            >
              <span className="block text-ink/95">{dict.hero.titleTop}</span>
              <span className="text-glow block">{dict.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={fade}
              custom={2}
              initial="hidden"
              animate="show"
              className="t-lead mt-6 max-w-[540px]"
            >
              {dict.hero.sub}
            </motion.p>

            <motion.div
              variants={fade}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <ButtonLink href="/royxatdan-otish" size="lg" className="w-full sm:w-auto">
                  {dict.common.start}
                  <ArrowRight />
                </ButtonLink>
              </Magnetic>
              <Button variant="glass" size="lg" onClick={() => setDemoOpen(true)} className="w-full sm:w-auto">
                <span className="grid size-5 place-items-center rounded-full bg-emerald-soft">
                  <Play className="size-2.5 fill-emerald-ink text-emerald-ink" aria-hidden />
                </span>
                {dict.common.demo}
              </Button>
            </motion.div>

            <motion.ul
              variants={fade}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {dict.hero.micro.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[12.5px] text-muted">
                  <Check className="size-3.5 text-emerald-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            style={{ y: previewY, rotateX: springX, rotateY: springY, transformPerspective: 1400 }}
            onMouseMove={(event) => {
              if (reduce) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              rotateY.set(px * 7);
              rotateX.set(-py * 6);
            }}
            onMouseLeave={() => {
              rotateX.set(0);
              rotateY.set(0);
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 lg:pl-4"
          >
            <DashboardPreview className="lg:-mr-6 xl:-mr-10" />
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-muted lg:justify-start lg:pl-2">
              <Sparkles className="size-3 text-violet" aria-hidden />
              {dict.hero.demoNote}
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ scaleX: lineScale, opacity: lineOpacity }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <BalanceLine quiet className="origin-center" />
        </motion.div>
      </div>

      <Modal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title={dict.demo.title}
        description={dict.demo.sub}
        closeLabel={dict.demo.close}
        size="xl"
      >
        <DashboardPreview showFloating={false} />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[12px] leading-relaxed text-muted">{dict.demo.note}</p>
          <ButtonLink href="/royxatdan-otish" size="md" onClick={() => setDemoOpen(false)}>
            {dict.demo.cta}
            <ArrowRight />
          </ButtonLink>
        </div>
      </Modal>
    </section>
  );
}
