import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
const dark = css.slice(0, css.indexOf("html.light"));
const light = css.slice(css.indexOf("html.light"));

function token(block: string, key: string): string {
  const match = block.match(new RegExp(`--${key}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match?.[1]) throw new Error(`token topilmadi: ${key}`);
  return match[1];
}

function luminance(hex: string): number {
  const parts = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const [r = 0, g = 0, b = 0] = parts.map((value) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const high = Math.max(luminance(foreground), luminance(background));
  const low = Math.min(luminance(foreground), luminance(background));
  return (high + 0.05) / (low + 0.05);
}

describe("rang kontrasti (WCAG 2.2 AA)", () => {
  for (const [theme, block] of [
    ["dark", dark],
    ["light", light],
  ] as const) {
    it(`${theme}: matn va holat ranglari 4.5:1 dan yuqori`, () => {
      const backgrounds = [token(block, "bg"), token(block, "surface")];
      for (const key of ["text", "muted", "emerald-ink", "success", "warning", "danger", "info"]) {
        for (const background of backgrounds) {
          expect(contrast(token(block, key), background), `${theme} --${key} on ${background}`).toBeGreaterThanOrEqual(4.5);
        }
      }
    });
  }
});
