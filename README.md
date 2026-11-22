# BALANS AI

O‘zbekiston bizneslari uchun AI buxgalteriya va biznes boshqaruv platformasi.
**Hozirgi holat: 1-bosqich — dizayn tizimi + to‘liq marketing sayti.**

Asosiy g‘oya: **DATA → AI TAHLIL → QAROR → HARAKAT**.

> **Sinov siyosati (egasi so‘rovi):** birinchi oy bepul — ro‘yxatdan o‘tgan kundan
> **30 kun**, karta talab qilinmaydi. Sinov davrida Premium darajasidagi
> imkoniyatlar va 100 ta AI CFO savoli ochiq. Shartlar `lib/pricing.config.ts`
> dagi `TRIAL` blokida turadi va ishga tushirishdan oldin egasi tasdiqlaydi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # production server
npm run lint       # ESLint (0 warning)
npm run typecheck  # TypeScript strict (0 xato)
npm run test       # Vitest (47 test)
```

Node 20+ tavsiya etiladi (sandboxda Node 22 bilan tekshirilgan).

Atrof-muhit: `NEXT_PUBLIC_SITE_URL` — canonical/OG/sitemap uchun domen.
`.env.example` faylini nusxalang.

## Sahifalar

| Route | Tavsif |
| --- | --- |
| `/` | Marketing sayti: hero, ishonch qatori, muammo/yechim, 4 qadam, modullar, AI CFO demosi, rollar, zavod, telefon, xavfsizlik, tariflar, FAQ, yakuniy CTA |
| `/narxlar` | To‘liq tariflar: oylik/yillik switch, taqqoslash jadvali, to‘lov FAQ |
| `/kirish` | Kirish formasi (demo rejim, Zod validatsiya) |
| `/royxatdan-otish` | Ro‘yxatdan o‘tish: STIR, telefon, email, tarif; birinchi oy bepul natijasi |
| `/maxfiylik`, `/shartlar` | Huquqiy sahifalar (yurist tasdiqlashi uchun TODO belgisi bilan) |
| `404`, `error`, `global-error` | Balans chizig‘i bilan xato sahifalari |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | SEO va PWA |

## Stek

- **Next.js 15.5.29** (App Router, xavfsizlik backport) + **React 19.3** + **TypeScript strict** (`noUncheckedIndexedAccess`, `noUnused*`)
- **Tailwind CSS 3.4** — tokenlar CSS variables orqali, Dark/Light
- **Framer Motion 11** — scroll-reveal, KPI count-up, parallax, magnit CTA, tema o‘tishi
- **Lucide React** — bir xil 1.5px chiziqli ikonkalar
- **Zod 4** — forma validatsiyasi
- **Vitest 5** — narx, sinov/obuna, RBAC limitlari, formatlash, tarjima parity testlari
- **Self-hosted shriftlar** (`public/fonts`): Manrope + Inter, latin + latin-ext
  (`o‘`, `g‘`) + cyrillic + cyrillic-ext. Tashqi font CDN’ga bog‘liqlik yo‘q.
- Recharts paketi 2-bosqich (app) grafiklari uchun o‘rnatilgan; marketingda
  grafiklar yengil qo‘lda yozilgan SVG (LCP va past quvvatli Android uchun).

## Tuzilma

```
app/                 route’lar, layout, global CSS, SEO fayllari
components/
  brand/             logotip va “Balans chizig‘i” motivi
  dashboard/         dashboard mockup + SVG grafiklar
  site/              marketing bo‘limlari, navbar, footer, command palette
  ui/                Button, Field, Badge, Modal, Accordion, Switch, Reveal, Toast…
  auth/              login/signup formalari
  providers/         i18n, toast
lib/
  pricing.config.ts  YAGONA MANBA: tariflar, limitlar, sinov shartlari, QQS TODO
  trial.ts           sinov va obuna holatlari (trial → active → past_due → read_only)
  format.ts          pul/sana/foiz/telefon/STIR — yagona formatlash qatlami
  i18n/              uz + ru lug‘atlar (type-safe), server cookie helper
  validation.ts      Zod sxemalar (uz/ru xabarlar bilan)
  mock/demo.ts       o‘zaro mos namunaviy raqamlar
  chart.ts           yengil SVG chart geometriyasi
tests/               Vitest testlari
```

## Dizayn tizimi

- **Brend motivi — “Balans chizig‘i”:** nozik gorizontal chiziq, markazda yonib
  turgan nuqta. Hero, scroll-progress, loader, Balans Score, 404 va footerda.
- **Logotip:** minimal “B” — ikki teng yarim (debet/kredit), markazda yorug‘ nuqta.
- **Tokenlar:** `app/globals.css` — dark `#060A12`, light `#F5F7FA`, emerald
  `#19E3A6` (light fill `#00A97A`, matn `#007A59`), violet `#7C5CFF`, cyan `#2DD4FF`.
- **Liquid Glass:** `.glass` — blur 28px, saturate 140%, ichki yorug‘lik, nozik noise.
  Fallback: `backdrop-filter` yo‘q, `prefers-reduced-transparency`, yoki qurilma
  kuchsiz bo‘lsa (`html.lite`) — solid sirt.
- **Adaptiv:** 360–639 / 640–1023 / 1024–1439 / 1440–1919 / 1920+ uchun alohida
  tipografik shkala, konteyner va bo‘lim oraliqlari (`clamp()` + media queries).
  Telefonda jadval kartaga, modal bottom-sheetga aylanadi; pastki sticky CTA.
- **Motion:** 150–400ms, `cubic-bezier(.22,1,.36,1)`; `prefers-reduced-motion`
  to‘liq hurmat qilinadi.

## i18n

- `uz-Latn` (asosiy) va `ru` — barcha matn `lib/i18n/uz.ts` / `ru.ts` da.
- Til cookie (`balans_lang`) orqali saqlanadi; server komponentlar shu tilda
  render qiladi, `router.refresh()` bilan almashadi. `html lang` ham yangilanadi.
- Kalitlar parity testi (`tests/i18n.test.ts`) uz/ru strukturasini solishtiradi.
- `uz-Cyrl` uchun lug‘at qo‘shish kifoya — struktura tayyor.

## Ma’lumot qatlami

Hozircha barcha raqamlar `lib/mock/demo.ts` da va o‘zaro mos:
tushum − xarajat = sof foyda, xarajat toifalari yig‘indisi = jami xarajat,
grafik oxiri = kassa qoldig‘i, debitor yig‘indisi = AI javobidagi summa.
Keyingi bosqichda service/repository pattern orqali real API (PostgreSQL/Supabase)
ulanadi; `company_id` (multi-tenant) va AI uchun alohida `aiService` nazarda tutilgan.

## Sinov shartlari va tariflar

`lib/pricing.config.ts` — yagona manba:

- Start 449 000 / 4 490 000 so‘m; Business 990 000 / 9 900 000;
  Premium 1 790 000 / 17 900 000; Enterprise — kelishuv.
- Yillik narx = oylik × 10 (2 oy bepul) — test bilan qat’iy tekshiriladi.
- Sinov: 30 kun, karta shart emas, Premium darajasi, 100 AI savoli.
- Holatlar: `trial → active → past_due → read_only`; 7/3/1 kun eslatmalari;
  to‘lov kechiksa 3 kun imtiyoz, keyin faqat ko‘rish/eksport. Ma’lumot o‘chmaydi.
- Limitlar (foydalanuvchi, kompaniya, AI savollari) va yumshoq upsell logikasi.

## Xavfsizlik yangilanishi (Vercel blokirovkasidan keyin)

- `next` 15.1.6 → **15.5.29** (15.x rasmiy xavfsizlik backport liniyasi), `react`/`react-dom` → **19.3.1**.
- `zod` → **4.6.7**, `vitest` → **5.1.1**, `postcss` → **8.5.33**, `eslint` → **9.39.5**.
- Next 15 o‘z ichida `postcss@8.4.31` ni pin qiladi; `overrides` orqali **8.5.33** ga majburlangan
  (API mos, build va CSS chiqishi tekshirilgan).
- `npm audit` — **0 vulnerability** (production va dev).
- UI, sahifalar, autentifikatsiya va biznes logika o‘zgarmagan. Zod 4 uchun faqat bitta
  texnik moslashtirish: `z.literal(true, { errorMap })` → `z.literal(true, { message })`.
- `eslint@9` — `eslint-config-next@15` qo‘llab-quvvatlaydigan eng yangi satr (ESLint 10 faqat
  Next 16 ekotizimida). Bu dev-only vosita, zaiflik emas.

## QA holati (1-bosqich)

Bajarilgan:

- `npm run typecheck` — 0 xato (strict, `any` yo‘q).
- `npm run lint` — 0 warning/error.
- `npm run build` — muvaffaqiyatli (barcha route’lar).
- `npm run test` — 47 test o‘tdi (format, narx/limit, sinov/obuna, validatsiya, i18n parity).
- SSR tekshiruvi: barcha route’lar 200, noma’lum route 404; uz/ru renderlari
  cookie orqali tekshirildi; ruscha sahifada o‘zbekcha UI matni qolmagan
  (faqat kompaniya nomlari).
- Raqamlar izchilligi qo‘lda tekshirildi (KPI = qismlar yig‘indisi).
- Barcha ichki havolalar mavjud sahifalarga/bo‘limlarga olib boradi; o‘lik tugma yo‘q.

Tekshirilmagan (sababi bilan):

- Lighthouse/CLS/LCP o‘lchovlari va Playwright/axe — sandboxda brauzer (Chromium
  runtime kutubxonalari) mavjud emas, headless brauzer ishga tushmadi.
- Haqiqiy qurilma/brauzer matritsasi (iOS Safari, Samsung Internet) — keyingi
  bosqichda CI’da Playwright bilan.
- Real backend, to‘lov shlyuzi va AI javoblari — hali ulanmagan (demo).

## Farazlar (egasi tasdiqlaydi)

1. **Birinchi oy bepul = 30 kun**, karta shart emas; sinovda Premium darajasi va
   100 AI savoli. Bu matnlar saytda shu tarzda ko‘rsatilgan.
2. Narxlar — O‘zbekiston bozoridagi o‘rtacha narxlarga moslangan boshlang‘ich
   taklif; QQS holati tasdiqlanmagan (`VAT.confirmed = false`), UI’da belgi bor.
3. Telefon, email, Telegram — TODO placeholder (`+998 71 200 00 00`,
   `salom@balans.ai`, `@balansai`), footerda aniq TODO izohi bilan.
4. Ishonch qatori, mijoz logotiplari va raqamlar — TODO; soxta fikr/statistika
   ishlatilmagan.
5. Integratsiyalar, import (Excel/1C) va 2FA — rejada; “Tez orada” yoki
   “rejada” deb yozilgan. Mavjud bo‘lmagan sertifikat da’vo qilinmagan.
6. Marketing grafiklari — qo‘lda yozilgan SVG; Recharts 2-bosqichda app uchun.

## Keyingi bosqichlar

2. App shell, Dashboard (Balans Score gauge, cash flow, AI CFO paneli), RBAC.
3. Modullar: Savdo, Ombor, Xarid, Ishlab chiqarish, HR, Moliya, Buxgalteriya, Hisobotlar.
4. Onboarding, rollar matritsasi, obuna/to‘lov oqimi, Sozlamalar, PWA, optimizatsiya.

Har bosqich oxirida brefning 13-bo‘limidagi tekshiruvlar ishga tushiriladi va
hisobot beriladi.
