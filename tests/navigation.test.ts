import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = ["app", "components", "lib"]
  .flatMap((folder) => walk(path.join(ROOT, folder)))
  .filter((file) => /\.(ts|tsx)$/.test(file));

const source = sourceFiles.map((file) => ({
  file: path.relative(ROOT, file),
  text: readFileSync(file, "utf8"),
}));

const internalLinks = new Set<string>();
for (const { text } of source) {
  for (const regex of [/href="([^"]+)"/g, /go\("([^"]+)"\)/g, /router\.push\("([^"]+)"\)/g]) {
    for (const match of text.matchAll(regex)) {
      const href = match[1];
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      internalLinks.add(href);
    }
  }
}

function routeExists(href: string): boolean {
  const [rawPath] = href.split("#");
  const pathname = (rawPath ?? "").split("?")[0] ?? "";
  if (!pathname || pathname === "/") return true;
  if (pathname.startsWith("/fonts/") || pathname.endsWith(".svg")) {
    return existsSync(path.join(ROOT, "public", pathname));
  }
  const clean = pathname.replace(/\/$/, "");
  return existsSync(path.join(ROOT, "app", clean.slice(1), "page.tsx"));
}

describe("navigatsiya va havolalar", () => {
  it("barcha ichki havolalar mavjud sahifa yoki faylga olib boradi", () => {
    const missing = [...internalLinks].filter((href) => !routeExists(href));
    expect(missing).toEqual([]);
  });

  it("hash havolalari mavjud section ID larga olib boradi", () => {
    const anchors = [...internalLinks]
      .map((href) => href.split("#")[1])
      .filter((anchor): anchor is string => Boolean(anchor));
    const missing = [...new Set(anchors)].filter((anchor) => {
      return !source.some(({ text }) => text.includes(`id="${anchor}"`));
    });
    expect(missing).toEqual([]);
  });

  it("asosiy sahifalar mavjud", () => {
    for (const route of ["", "narxlar", "kirish", "royxatdan-otish", "maxfiylik", "shartlar", "dashboard"]) {
      expect(existsSync(path.join(ROOT, "app", route, "page.tsx"))).toBe(true);
    }
  });
});
