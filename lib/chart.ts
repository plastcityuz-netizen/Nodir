export type Point = { x: number; y: number };

export function scalePoints(
  values: number[],
  width: number,
  height: number,
  padding = 6,
): Point[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  return values.map((value, index) => ({
    x: padding + (values.length === 1 ? innerW / 2 : (index / (values.length - 1)) * innerW),
    y: padding + innerH - ((value - min) / span) * innerH,
  }));
}

/** Yumshoq chiziq — gorizontal tutqichli bezier (overshoot yo‘q) */
export function smoothPath(points: Point[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  if (!first) return "";
  let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  let previous = first;
  for (const point of rest) {
    const dx = (point.x - previous.x) / 2.6;
    d += ` C ${(previous.x + dx).toFixed(2)} ${previous.y.toFixed(2)}, ${(point.x - dx).toFixed(2)} ${point.y.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    previous = point;
  }
  return d;
}

export function areaPath(points: Point[], height: number): string {
  if (points.length === 0) return "";
  const line = smoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return "";
  return `${line} L ${last.x.toFixed(2)} ${height} L ${first.x.toFixed(2)} ${height} Z`;
}

/** Doira yoyi (gauge uchun) */
export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polar(cx, cy, radius, startAngle);
  const end = polar(cx, cy, radius, endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function polar(cx: number, cy: number, radius: number, angle: number): Point {
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

/** SVG ichidagi nuqtani foizga aylantirish (HTML overlay uchun) */
export function percent(point: Point, width: number, height: number): { left: string; top: string } {
  return {
    left: `${(point.x / width) * 100}%`,
    top: `${(point.y / height) * 100}%`,
  };
}
