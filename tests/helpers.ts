export type Shape = string | { [key: string]: Shape };

export function dictionariesShape(value: unknown): Shape {
  if (typeof value === "string") return "string";
  if (Array.isArray(value)) {
    return { __array: value.length > 0 ? dictionariesShape(value[0]) : "empty" };
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, dictionariesShape(child)]),
    );
  }
  return "string";
}
