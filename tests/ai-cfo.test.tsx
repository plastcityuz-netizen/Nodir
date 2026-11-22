// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AiCfo } from "@/components/site/ai-cfo";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { uz } from "@/lib/i18n/uz";

const firstSuggestion = uz.ai.suggestions[0] ?? "";
const firstAnswer = uz.ai.answers[0]?.text ?? "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
}));

afterEach(cleanup);

function renderCfo() {
  return render(
    <I18nProvider initialLang="uz">
      <ToastProvider>
        <AiCfo />
      </ToastProvider>
    </I18nProvider>,
  );
}

describe("AI CFO demo holatlari", () => {
  it("bo‘sh savolda tushunarli xato ko‘rsatadi", async () => {
    const user = userEvent.setup();
    renderCfo();
    await user.click(screen.getByRole("button", { name: uz.common.send }));
    expect(screen.getByRole("alert").textContent).toContain(uz.ai.emptyError);
  });

  it("tayyor savolga javob, manba va demo belgisini ko‘rsatadi", async () => {
    const user = userEvent.setup();
    renderCfo();
    await user.click(screen.getByRole("button", { name: firstSuggestion }));
    expect(await screen.findByText(firstAnswer, {}, { timeout: 2500 })).toBeTruthy();
    expect(screen.getAllByText(uz.ai.demoLabel).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: uz.ai.why })).toBeTruthy();
  });

  it("demo doirasidan tashqari savolda halol fallback beradi", async () => {
    const user = userEvent.setup();
    renderCfo();
    await user.type(screen.getByLabelText(uz.ai.inputPlaceholder), "Kelajakdagi savol");
    await user.click(screen.getByRole("button", { name: uz.common.send }));
    expect(await screen.findByText(uz.ai.fallback, {}, { timeout: 2500 })).toBeTruthy();
    expect(screen.getAllByText(uz.ai.demoNotice).length).toBeGreaterThan(0);
  });

  it("suhbatni tozalash boshlang‘ich holatga qaytaradi", async () => {
    const user = userEvent.setup();
    renderCfo();
    await user.click(screen.getByRole("button", { name: firstSuggestion }));
    await screen.findByText(firstAnswer, {}, { timeout: 2500 });
    await user.click(screen.getByRole("button", { name: uz.ai.clear }));
    expect(screen.getByText(uz.ai.greeting)).toBeTruthy();
    expect(screen.queryByText(firstAnswer)).toBeNull();
  });
});
