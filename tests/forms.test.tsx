// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider, useI18n } from "@/components/providers/i18n-provider";
import { LangToggle } from "@/components/ui/lang-toggle";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

afterEach(cleanup);

function renderUz(ui: React.ReactNode) {
  return render(<I18nProvider initialLang="uz">{ui}</I18nProvider>);
}

function DictProbe() {
  const { dict } = useI18n();
  return <p>{dict.nav.pricing}</p>;
}

describe("kirish formasi", () => {
  it("bo‘sh maydonlarda xato ko‘rsatadi", async () => {
    const user = userEvent.setup();
    renderUz(<LoginForm />);
    await user.click(screen.getByRole("button", { name: "Kirish" }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(2);
  });

  it("to‘g‘ri ma’lumotda demo holatiga o‘tadi", async () => {
    const user = userEvent.setup();
    renderUz(<LoginForm />);
    await user.type(screen.getByLabelText("Email yoki telefon"), "salom@balans.ai");
    await user.type(screen.getByLabelText("Parol"), "kamida8belgi");
    await user.click(screen.getByRole("button", { name: "Kirish" }));
    expect(await screen.findByText("Demo tekshiruvi o‘tdi", {}, { timeout: 2000 })).toBeTruthy();
  });
});

describe("ro‘yxatdan o‘tish formasi", () => {
  async function fill(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("Kompaniya nomi"), "MCHJ Nur Tekstil");
    await user.type(screen.getByLabelText("STIR"), "301234567");
    await user.type(screen.getByLabelText("Telefon"), "+998 90 123 45 67");
    await user.type(screen.getByLabelText("Email"), "salom@balans.ai");
    await user.click(screen.getByRole("checkbox"));
  }

  it("noto‘g‘ri STIR ni rad etadi", async () => {
    const user = userEvent.setup();
    renderUz(<SignupForm initialPlan="business" />);
    await user.type(screen.getByLabelText("Kompaniya nomi"), "MCHJ Nur Tekstil");
    await user.type(screen.getByLabelText("STIR"), "123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Birinchi oy bepulni boshlash" }));
    expect(screen.getByText("STIR 9 raqamdan iborat bo‘lishi kerak")).toBeTruthy();
  });

  it("to‘g‘ri ma’lumotda demo tasdiqini ko‘rsatadi", async () => {
    const user = userEvent.setup();
    renderUz(<SignupForm initialPlan="business" />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: "Birinchi oy bepulni boshlash" }));
    expect(await screen.findByText("Demo so‘rov qabul qilindi", {}, { timeout: 2000 })).toBeTruthy();
  });
});

describe("til almashtirish", () => {
  it("UZ -> RU matnni va cookie’ni yangilaydi", async () => {
    const user = userEvent.setup();
    renderUz(
      <>
        <LangToggle />
        <DictProbe />
      </>,
    );
    expect(screen.getByText("Narxlar")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "RU" }));
    expect(screen.getByText("Тарифы")).toBeTruthy();
    expect(document.cookie).toContain("balans_lang=ru");
  });
});
