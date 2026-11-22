// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DemoDashboard } from "@/components/dashboard/demo-dashboard";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { uz } from "@/lib/i18n/uz";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
}));

afterEach(cleanup);

function renderDashboard() {
  return render(
    <I18nProvider initialLang="uz">
      <DemoDashboard />
    </I18nProvider>,
  );
}

describe("demo kabinet", () => {
  it("demo belgisi va asosiy KPI larni ko‘rsatadi", () => {
    renderDashboard();
    expect(screen.getAllByText(uz.dashboard.demoBadge).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 1, name: uz.dashboard.title })).toBeTruthy();
    expect(screen.getAllByText(uz.dashboard.kpi.revenue).length).toBeGreaterThan(0);
    expect(screen.getAllByText(uz.dashboard.kpi.profit).length).toBeGreaterThan(0);
  });

  it("qidiruv operatsiyalarni filtrlaydi", async () => {
    const user = userEvent.setup();
    renderDashboard();
    const search = screen.getByPlaceholderText(uz.dashboard.searchPh);
    await user.type(search, "Baraka");
    expect(screen.getAllByText(/Baraka Savdo/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/QQS avans/)).toBeNull();
  });

  it("tur bo‘yicha filtr va bo‘sh holat ishlaydi", async () => {
    const user = userEvent.setup();
    renderDashboard();
    const select = screen.getByLabelText(uz.dashboard.filterAll);
    await user.selectOptions(select, "tax");
    expect(screen.getAllByText(/QQS avans/).length).toBeGreaterThan(0);
    await user.type(screen.getByPlaceholderText(uz.dashboard.searchPh), "topilmaydigan-yozuv");
    expect(screen.getByText(uz.dashboard.empty)).toBeTruthy();
  });

  it("davr tanlash grafikni yangilaydi", async () => {
    const user = userEvent.setup();
    renderDashboard();
    const threeMonths = screen.getByRole("button", { name: uz.dashboard.periods.m3 });
    await user.click(threeMonths);
    expect(threeMonths.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: uz.dashboard.periods.m6 }).getAttribute("aria-pressed")).toBe("false");
  });
});
