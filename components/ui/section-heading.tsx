import clsx from "clsx";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  action,
  className,
  id,
  level = 2,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
  id?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div
      className={clsx(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        action ? "md:flex-row md:items-end md:justify-between md:gap-10" : "",
        className,
      )}
    >
      <div className={clsx("max-w-[760px]", align === "center" && "mx-auto")}>
        {eyebrow && (
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-px w-7 bg-emerald/60" aria-hidden />
            <span className="t-eyebrow text-emerald-ink">{eyebrow}</span>
          </div>
        )}
        <Heading id={id} className="t-h2 text-ink">
          {title}
        </Heading>
        {sub && <p className="t-lead mt-5 max-w-[620px]">{sub}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
