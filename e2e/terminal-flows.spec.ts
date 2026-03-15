import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Terminal UI flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => {
      localStorage.removeItem("ck-chat-messages");
      localStorage.removeItem("ck-chat-auto-open");
    });
    await page.goto(BASE);
    // Scroll terminal fully into view so IntersectionObserver fires
    await page.evaluate(() =>
      document.getElementById("terminal")?.scrollIntoView({ block: "center" })
    );
    // Wait for boot animation to complete and input to appear
    await page
      .locator('#terminal input[aria-label="Terminal input"]')
      .waitFor({ state: "visible", timeout: 15000 });
  });

  test("/clear shows boot greeting lines (not markdown AI style)", async ({
    page,
  }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    // Type something first so there's content to clear
    await input.fill("/help");
    await input.press("Enter");
    await page.waitForTimeout(300);

    // Now clear
    await input.fill("/clear");
    await input.press("Enter");
    await page.waitForTimeout(500);

    const terminal = page.locator("#terminal");

    // Should show the welcome box
    const welcomeBox = terminal.locator("text=Cam Code");
    await expect(welcomeBox.first()).toBeVisible();

    // Should show boot greeting lines as plain text (not inside a bordered AI block)
    const greeting1 = terminal.locator(
      "text=Hey! I'm Cam Code, Cameron's AI assistant."
    );
    await expect(greeting1).toBeVisible();

    const greeting2 = terminal.locator(
      "text=Ask me anything or type /help for commands."
    );
    await expect(greeting2).toBeVisible();

    // The greeting should NOT be rendered with the AI left-border style
    // AI lines have a border-l-2 class; greeting text lines don't
    const aiBorderedLines = terminal.locator(".border-l-2");
    await expect(aiBorderedLines).toHaveCount(0);
  });

  test("Terminal input is functional after /clear", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/clear");
    await input.press("Enter");
    await page.waitForTimeout(500);

    // Input should still be visible and enabled
    const freshInput = page.locator(
      '#terminal input[aria-label="Terminal input"]'
    );
    await expect(freshInput).toBeVisible();
    await expect(freshInput).toBeEnabled();

    // Should accept new input
    await freshInput.fill("/whoami");
    await freshInput.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(terminal.locator("text=Cameron Keith").first()).toBeVisible();
  });

  test("/help shows all commands", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/help");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(terminal.locator("text=Available commands:")).toBeVisible();
    await expect(
      terminal.locator("text=/help        Show available commands")
    ).toBeVisible();
    await expect(terminal.locator("text=/skills")).toBeVisible();
    await expect(terminal.locator("text=/resume")).toBeVisible();
    await expect(terminal.locator("text=/work")).toBeVisible();
  });

  test("/whoami shows bio", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/whoami");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(terminal.locator("text=Cameron Keith").first()).toBeVisible();
    await expect(
      terminal.locator("text=Dartmouth '26 | CS & Economics")
    ).toBeVisible();
  });

  test("/stats shows golf highlights", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/stats");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(terminal.locator("text=Golf Highlights")).toBeVisible();
    await expect(terminal.locator("text=NCAA D1")).toBeVisible();
  });

  test("/socials shows links", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/socials");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(
      terminal.locator("text=github.com/ckeith26")
    ).toBeVisible();
    await expect(
      terminal.locator("text=linkedin.com/in/cam-keith")
    ).toBeVisible();
  });

  test("/email shows email address", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/email");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(
      terminal.locator("text=cameron.s.keith.26@dartmouth.edu")
    ).toBeVisible();
  });

  test("unknown slash command shows error", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/foobar");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const terminal = page.locator("#terminal");
    await expect(terminal.locator("text=Unknown command")).toBeVisible();
  });

  test("slash commands persist to shared storage", async ({ page }) => {
    const input = page.locator('#terminal input[aria-label="Terminal input"]');

    await input.fill("/whoami");
    await input.press("Enter");
    await page.waitForTimeout(300);

    const stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("ck-chat-messages") || "[]")
    );

    expect(stored.length).toBeGreaterThan(0);
    expect(
      stored.some((m: { content: string }) => m.content === "/whoami")
    ).toBe(true);
  });
});
