import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("defines the public Dropwich routes", async () => {
  const expectations = [
    ["../app/page.tsx", /Big flavor/],
    ["../app/menu/page.tsx", /ORIGINAL 2023 LINEUP/],
    ["../app/story/page.tsx", /story\/brand/],
    ["../app/story/brand/page.tsx", /brand-modern-hero/],
    ["../app/story/why/page.tsx", /why-modern-hero/],
    ["../app/story/notice/page.tsx", /notice-modern-hero/],
    ["../app/story/history/page.tsx", /history-modern-hero/],
    ["../app/account/page.tsx", /YOUR DROPWICH ACCOUNT/],
    ["../app/admin/setup/page.tsx", /ONE-TIME SETUP/],
  ];
  for (const [file, content] of expectations) {
    assert.match(await readFile(new URL(file, import.meta.url), "utf8"), content);
  }
});

test("ships protected admin access, separate product customization, and persistent order APIs", async () => {
  const [header, catalog, customizer, productRoute, dashboard, dashboardClient, orderApi, styles] = await Promise.all([
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/menu/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/menu/ProductCustomizer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/menu/[product]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/dashboard/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/dashboard/AdminDashboard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/orders/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  await Promise.all([
    access(new URL("../public/dropwich-logo.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/products/plain.png", import.meta.url)),
    access(new URL("../public/products/ham.png", import.meta.url)),
    access(new URL("../public/products/hungarian.png", import.meta.url)),
    access(new URL("../public/sauces/ketchup-v2.webp", import.meta.url)),
    access(new URL("../public/sauces/mayo-v2.webp", import.meta.url)),
    access(new URL("../public/sauces/ketchup-mayo-v2.webp", import.meta.url)),
    access(new URL("../public/sauces/no-sauce-v2.webp", import.meta.url)),
    access(new URL("../public/sauces/house-sauce-v2.webp", import.meta.url)),
    access(new URL("../public/about/st-anthony-school-line.png", import.meta.url)),
  ]);
  assert.match(header, /unoptimized/);
  assert.match(header, /\["Menu", "\/menu"\]/);
  assert.match(header, /\["Dashboard", "\/dashboard"\]/);
  assert.match(catalog, /Pick your<br \/>Dropwich/);
  assert.match(catalog, /href={`\/menu\/\${product\.id}`}/);
  assert.match(customizer, /Pick your sauce/);
  assert.match(customizer, /Add a note/);
  assert.match(customizer, /Remove/);
  assert.match(customizer, /sauce-card/);
  assert.match(customizer, /Add to tray/);
  assert.match(productRoute, /notFound/);
  assert.doesNotMatch(`${catalog}${customizer}`, /demo/i);
  assert.match(dashboard, /user\.role !== "admin"/);
  assert.match(dashboardClient, /Operations,/);
  assert.match(dashboardClient, /aria-pressed/);
  assert.match(dashboardClient, /Refresh orders/);
  assert.match(dashboardClient, /Active orders/);
  assert.match(dashboardClient, /DATA QUALITY NOTE/);
  assert.match(orderApi, /Sign in before placing an order/);
  assert.match(orderApi, /totalCentavos/);
  assert.match(styles, /@media \(max-width: 680px\)/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("splits About into linked, modern pages and preserves the accessible company hierarchy", async () => {
  const [subnav, brand, why, notice, history, schoolIllustration, styles] = await Promise.all([
    readFile(new URL("../app/story/_components/AboutSubnav.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/brand/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/why/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/notice/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/history/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/why/SchoolIllustration.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/story/about.css", import.meta.url), "utf8"),
  ]);
  assert.match(subnav, /\/story\/brand/);
  assert.match(subnav, /\/story\/why/);
  assert.match(subnav, /\/story\/notice/);
  assert.match(subnav, /\/story\/history/);
  assert.match(subnav, /aria-current/);
  assert.match(brand, /org-chart/);
  assert.match(brand, /Chief Executive Officer/);
  assert.match(brand, /Product team/);
  assert.match(brand, /Operations team/);
  assert.match(brand, /brand-system/);
  assert.match(why, /why-outcome-grid/);
  assert.match(notice, /notice-primary-disclosure/);
  assert.match(history, /history-modern-entry/);
  assert.match(history, /history-afterword/);
  assert.match(schoolIllustration, /IntersectionObserver/);
  assert.match(schoolIllustration, /classList\.toggle\("is-visible"/);
  assert.match(styles, /school-line-reveal/);
  assert.match(styles, /school-line-stage\.is-visible/);
  assert.match(styles, /about-subnav-links/);
  assert.match(styles, /prefers-reduced-motion/);
});
