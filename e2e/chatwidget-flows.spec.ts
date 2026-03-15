import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("ChatWidget UI flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => {
      localStorage.removeItem("ck-chat-messages");
      localStorage.removeItem("ck-chat-auto-open");
    });
  });

  test("ChatWidget is hidden on homepage", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(500);

    // The floating button should not be visible on homepage
    const chatButton = page.locator('button[aria-label="Open Cam Code"]');
    await expect(chatButton).not.toBeVisible();
  });

  test("ChatWidget is visible on non-homepage pages", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    const chatButton = page.locator('button[aria-label="Open Cam Code"]');
    await expect(chatButton).toBeVisible();
  });

  test("ChatWidget opens and shows greeting", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();
    await expect(chatPanel.locator("text=Cam Code").first()).toBeVisible();
    await expect(chatPanel.locator("text=Ask me anything").first()).toBeVisible();
  });

  test("ChatWidget /clear resets to greeting", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    // Pre-populate with a conversation
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "test question" },
        { role: "assistant", content: "test answer" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Reload to pick up messages
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    // Verify conversation is loaded
    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel.locator("text=test question")).toBeVisible();

    // Type /clear
    const input = chatPanel.locator('input[aria-label="Chat message input"]');
    await input.fill("/clear");
    await input.press("Enter");
    await page.waitForTimeout(300);

    // Should show greeting, not old conversation
    await expect(chatPanel.locator("text=test question")).not.toBeVisible();
    await expect(chatPanel.locator("text=Ask me anything")).toBeVisible();
  });

  test("ChatWidget /help shows commands", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    const input = chatPanel.locator('input[aria-label="Chat message input"]');
    await input.fill("/help");
    await input.press("Enter");
    await page.waitForTimeout(300);

    await expect(chatPanel.locator("text=Available commands").last()).toBeVisible();
  });

  test("ChatWidget toggle with Cmd+K", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    // Open with Cmd+K
    await page.keyboard.press("Meta+k");
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();

    // Close with Cmd+K
    await page.keyboard.press("Meta+k");
    await page.waitForTimeout(300);
    await expect(chatPanel).not.toBeVisible();
  });

  test("ChatWidget close button works", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();

    await page.click('button[aria-label="Close chat"]');
    await page.waitForTimeout(300);
    await expect(chatPanel).not.toBeVisible();
  });

  test("ChatWidget persists conversation across page navigations", async ({
    page,
  }) => {
    // Write a conversation on /about
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "persistent message" },
        { role: "assistant", content: "I remember this" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Navigate to /work
    await page.goto(`${BASE}/work`);
    await page.waitForTimeout(500);

    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel.locator("text=persistent message")).toBeVisible();
    await expect(chatPanel.locator("text=I remember this")).toBeVisible();
  });
});
