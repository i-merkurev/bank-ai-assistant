import { test, expect } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const deployed = "https://bank-ai-assistant-case-club.netlify.app/";

async function openAssistant(page) {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Основная навигация" })
    .getByRole("button", { name: "AI-помощник" }).click();
  await expect(page.getByRole("button", { name: "Попробовать бесплатно" })).toBeVisible();
  await page.getByRole("button", { name: "Попробовать бесплатно" }).click();
  await expect(page.getByText("В августе расходы выросли на 12%")).toBeVisible();
}

async function openService(page, name) {
  await page.locator(".service-grid button").filter({ hasText: name }).click();
}

async function back(page) {
  await page.getByRole("button", { name: "Назад" }).click();
}

test("home and navigation are functional", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByText("Алексей")).toBeVisible();
  await expect(page.getByText("124 850,26 ₽")).toBeVisible();
  await page.getByRole("navigation", { name: "Основная навигация" })
    .getByRole("button", { name: "Платежи" }).click();
  await expect(page.getByRole("heading", { name: "Платежи", exact: true })).toBeVisible();
  await page.getByRole("navigation", { name: "Основная навигация" })
    .getByRole("button", { name: "Карты" }).click();
  await expect(page.getByRole("heading", { name: "Карты" })).toBeVisible();
  await page.getByRole("navigation", { name: "Основная навигация" })
    .getByRole("button", { name: "Главная" }).click();
  await expect(page.getByText("Последние операции")).toBeVisible();
  expect(errors).toEqual([]);
});

test("AI activation, expenses, reminders, savings and chat work", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await openAssistant(page);

  await openService(page, "Расходы");
  await expect(page.getByText("Потрачено за месяц")).toBeVisible();
  await expect(page.getByText("86 420 ₽", { exact: true })).toBeVisible();
  await back(page);

  await openService(page, "Платежи");
  await expect(page.getByText("Регулярные платежи")).toBeVisible();
  const toggle = page.locator(".reminder-list button.toggle").first();
  const before = await toggle.getAttribute("aria-pressed");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", before === "true" ? "false" : "true");
  await page.getByRole("button", { name: /Добавить напоминание/ }).click();
  await expect(page.getByText("Новое напоминание добавлено")).toBeVisible();
  await back(page);

  await openService(page, "Накопления");
  await expect(page.getByText("Подушка безопасности")).toBeVisible();
  await page.getByRole("button", { name: "Начать копить" }).click();
  await expect(page.getByRole("button", { name: "План накоплений создан" })).toBeVisible();
  await back(page);

  await openService(page, "Задать вопрос");
  await expect(page.getByText("AI может ошибаться. Проверяйте важную информацию.")).toBeVisible();
  await page.getByRole("button", { name: "Сколько я потратил в этом месяце?" }).click();
  await expect(page.getByText(/В августе вы потратили 86 420 ₽/)).toBeVisible();
  await page.getByRole("textbox", { name: "Вопрос AI-помощнику" }).fill("Как мне начать копить?");
  await page.getByRole("button", { name: "Отправить вопрос" }).click();
  await expect(page.getByText(/Попробуйте откладывать 10% от каждого дохода/)).toBeVisible();
  expect(errors).toEqual([]);
});

test("original Netlify interface visually matches recovered interface", async ({ page, browser }, testInfo) => {
  const live = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1
  });
  try {
    await live.goto(deployed, { waitUntil: "networkidle" });
    await page.goto("/", { waitUntil: "networkidle" });
    await Promise.all([live.evaluate(() => document.fonts.ready), page.evaluate(() => document.fonts.ready)]);

    async function compareScreens(name) {
      const original = await live.screenshot({ animations: "disabled" });
      const restored = await page.screenshot({ animations: "disabled" });
      await testInfo.attach(name + "-original", { body: original, contentType: "image/png" });
      await testInfo.attach(name + "-restored", { body: restored, contentType: "image/png" });
      const a = PNG.sync.read(original);
      const b = PNG.sync.read(restored);
      expect(a.width).toBe(b.width);
      expect(a.height).toBe(b.height);
      const mismatched = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.15 });
      const mismatch = mismatched / (a.width * a.height);
      console.log("Visual parity " + name + ": " + (100 * (1 - mismatch)).toFixed(2) + "%");
      expect(mismatch, name + " differs too much from published version").toBeLessThan(0.05);
    }
    await expect(page.getByText("Алексей")).toBeVisible();
    await expect(live.getByText("Алексей")).toBeVisible();
    await compareScreens("home");

    for (const p of [live, page]) {
      await p.getByRole("navigation", { name: "Основная навигация" })
        .getByRole("button", { name: "AI-помощник" }).click();
      await expect(p.getByRole("button", { name: "Попробовать бесплатно" })).toBeVisible();
    }
    await compareScreens("offer");

    for (const p of [live, page]) {
      await p.getByRole("button", { name: "Попробовать бесплатно" }).click();
      await expect(p.getByText("В августе расходы выросли на 12%")).toBeVisible();
    }
    await compareScreens("overview");
  } finally {
    await live.close();
  }
});
