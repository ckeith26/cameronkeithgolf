import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

/** Helper: go to homepage, scroll to terminal, wait for input to appear */
async function bootTerminal(page: import("@playwright/test").Page) {
  await page.goto(BASE);
  await page.evaluate(() =>
    document.getElementById("terminal")?.scrollIntoView({ block: "center" })
  );
  await page
    .locator('#terminal input[aria-label="Terminal input"]')
    .waitFor({ state: "visible", timeout: 15000 });
}

test.describe("Cross-component navigation sync", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => {
      localStorage.removeItem("ck-chat-messages");
      localStorage.removeItem("ck-chat-auto-open");
    });
  });

  test("Terminal /work navigates and ChatWidget auto-opens with conversation", async ({
    page,
  }) => {
    await bootTerminal(page);

    const input = page.locator('#terminal input[aria-label="Terminal input"]');
    await input.fill("/work");
    await input.press("Enter");

    // Should navigate to /work
    await page.waitForURL("**/work", { timeout: 5000 });

    // ChatWidget should auto-open
    await page.waitForTimeout(1000);
    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();

    // Auto-open flag should be consumed
    const flag = await page.evaluate(() =>
      localStorage.getItem("ck-chat-auto-open")
    );
    expect(flag).toBeNull();
  });

  test("Terminal /about navigates and ChatWidget auto-opens", async ({
    page,
  }) => {
    await bootTerminal(page);

    const input = page.locator('#terminal input[aria-label="Terminal input"]');
    await input.fill("/about");
    await input.press("Enter");

    await page.waitForURL("**/about", { timeout: 5000 });
    await page.waitForTimeout(1000);

    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();
  });

  test("Multiple Terminal commands persist correctly to shared storage", async ({
    page,
  }) => {
    await bootTerminal(page);

    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    // Run multiple commands
    await input.fill("/whoami");
    await input.press("Enter");
    await page.waitForTimeout(300);

    await input.fill("/stats");
    await input.press("Enter");
    await page.waitForTimeout(300);

    // Check shared storage has all messages
    const stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("ck-chat-messages") || "[]")
    );

    const userMessages = stored.filter(
      (m: { role: string }) => m.role === "user"
    );
    expect(userMessages.length).toBe(2);
    expect(
      userMessages.some((m: { content: string }) => m.content === "/whoami")
    ).toBe(true);
    expect(
      userMessages.some((m: { content: string }) => m.content === "/stats")
    ).toBe(true);
  });

  test("ChatWidget clear syncs back to Terminal on homepage", async ({
    page,
  }) => {
    // Start with a conversation in shared storage
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "hello from chatwidget" },
        { role: "assistant", content: "hi back" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Go to /about, open ChatWidget, clear it
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    const chatInput = chatPanel.locator(
      'input[aria-label="Chat message input"]'
    );
    await chatInput.fill("/clear");
    await chatInput.press("Enter");
    await page.waitForTimeout(300);

    // Navigate to homepage
    await page.goto(BASE);
    await page.evaluate(() =>
      document.getElementById("terminal")?.scrollIntoView({ block: "center" })
    );
    await page.waitForTimeout(4000);

    // Terminal should NOT show the old conversation
    const terminal = page.locator("#terminal");
    const oldMsg = terminal.locator("text=hello from chatwidget");
    await expect(oldMsg).not.toBeVisible();
  });

  test("Rapid navigation between pages preserves conversation", async ({
    page,
  }) => {
    // Create a conversation
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "rapid nav test" },
        { role: "assistant", content: "should survive navigation" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Rapidly navigate between pages
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(200);
    await page.goto(`${BASE}/work`);
    await page.waitForTimeout(200);
    await page.goto(`${BASE}/projects`);
    await page.waitForTimeout(200);
    await page.goto(`${BASE}/golf`);
    await page.waitForTimeout(500);

    // Open ChatWidget - conversation should still be there
    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel.locator("text=rapid nav test")).toBeVisible();
    await expect(
      chatPanel.locator("text=should survive navigation")
    ).toBeVisible();
  });
});
