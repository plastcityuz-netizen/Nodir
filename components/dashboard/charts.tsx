import clsx from "clsx";
import { areaPath, arcPath, polar, scalePoints, smoothPath } from "@/lib/chart";

export function AreaChart({
  values,
  width = 320,
  height = 96,
  id,
  tone = "emerald",
  showGrid = true,
  className,
  strokeWidth = 1.6,
  title,
  description,
}: {
  values: number[];
  width?: number;
  height?: number;
  id: string;
  tone?: "emerald" | "cyan" | "violet" | "warning";
  showGrid?: boolean;
  className?: string;
  strokeWidth?: number;
  /** Berilsa, grafik ekran o‘quvchiga nom va tavsif bilan e’lon qilinadi. */
  title?: string;
  description?: string;
}) {
  const points = scalePoints(values, width, height, 8);
  const line = smoothPath(points);
  const area = areaPath(points, height);
  const last = points[points.length - 1];
  const colors: Record<string, string> = {
    emerald: "var(--emerald)",
    cyan: "var(--cyan)",
    violet: "var(--violet)",
    warning: "var(--warning)",
  };
  const stroke = colors[tone] ?? "var(--emerald)";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={clsx("h-auto w-full", className)}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      preserveAspectRatio="none"
    >
      {description && <desc>{description}</desc>}
      <defs>
        <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="70%" stopColor={stroke} stopOpacity="0.06" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`line-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.55" />
          <stop offset="55%" stopColor={stroke} />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {showGrid && (
        <g stroke="var(--border)" strokeWidth="1" opacity="0.7">
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line key={ratio} x1="0" x2={width} y1={height * ratio} y2={height * ratio} strokeDasharray="2 6" />
          ))}
        </g>
      )}
      <path d={area} fill={`url(#area-${id})`} className="chart-area" />
      <path
        d={line}
        stroke={`url(#line-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={100}
        className="chart-line"
      />
      {last && (
        <g>
          <circle cx={last.x} cy={last.y} r="7" fill={stroke} opacity="0.16" />
          <circle cx={last.x} cy={last.y} r="3" fill={stroke} />
        </g>
      )}
    </svg>
  );
}

export function Sparkline({
  values,
  width = 90,
  height = 28,
  tone = "var(--emerald)",
}: {
  values: number[];
  width?: number;
  height?: number;
  tone?: string;
}) {
  const points = scalePoints(values, width, height, 2);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-7 w-[90px]"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d={smoothPath(points)}
        stroke={tone}
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function ScoreGauge({
  value,
  max = 100,
  size = 188,
  label,
  sublabel,
}: {
  value: number;
  max?: number;
  size?: number;
  label: string;
  sublabel?: string;
}) {
  const width = size;
  const height = size * 0.62;
  const cx = width / 2;
  const cy = size * 0.53;
  const radius = size * 0.4;
  const ratio = Math.max(0, Math.min(1, value / max));
  const track = arcPath(cx, cy, radius, Math.PI, Math.PI * 2);
  const progress = arcPath(cx, cy, radius, Math.PI, Math.PI * (1 + ratio));
  const tip = polar(cx, cy, radius, Math.PI * (1 + ratio));

  return (
    <div className="relative flex flex-col items-center" style={{ width }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--warning)" />
            <stop offset="45%" stopColor="var(--emerald)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <path d={track} stroke="var(--border)" strokeWidth="9" strokeLinecap="round" />
        <path
          d={progress}
          stroke="url(#gauge-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          pathLength={100}
        />
        <circle cx={tip.x} cy={tip.y} r="12" fill="var(--emerald)" opacity="0.14" />
        <circle cx={tip.x} cy={tip.y} r="4.5" fill="var(--emerald)" />
      </svg>
      <div className="absolute inset-x-0 top-[42%] flex flex-col items-center">
        <span className="font-display text-[28px] font-semibold leading-none tracking-tight text-ink num">{value}</span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">{label}</span>
      </div>
      {sublabel && <span className="mt-1 text-[11px] text-emerald-ink">{sublabel}</span>}
    </div>
  );
}

export function MiniBars({
  values,
  labels,
  height = 64,
  highlightLast = true,
}: {
  values: number[];
  labels?: string[];
  height?: number;
  highlightLast?: boolean;
}) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-1.5" style={{ height }} aria-hidden>
      {values.map((value, index) => {
        const isLast = index === values.length - 1;
        return (
          <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={clsx(
                "w-full rounded-[3px] transition-all",
                isLast && highlightLast
                  ? "bg-[linear-gradient(180deg,var(--emerald),color-mix(in_srgb,var(--emerald)_45%,transparent))]"
                  : "bg-[color-mix(in_srgb,var(--muted)_28%,transparent)]",
              )}
              style={{ height: `${Math.max(8, (value / max) * (height - 16))}px` }}
            />
            {labels?.[index] && <span className="text-[8px] text-muted">{labels[index]}</span>}
          </div>
        );
      })}
    </div>
  );
}

export function Donut({
  slices,
  size = 132,
  thickness = 12,
  centerLabel,
  centerValue,
}: {
  slices: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={thickness} />
        {slices.map((slice, index) => {
          const length = (slice.value / total) * circumference;
          const dash = `${Math.max(length - 2.5, 1)} ${circumference - Math.max(length - 2.5, 1)}`;
          const element = (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return element;
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-sm font-semibold text-ink num">{centerValue}</span>}
          {centerLabel && <span className="mt-0.5 text-[9px] uppercase tracking-wide text-muted">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}
