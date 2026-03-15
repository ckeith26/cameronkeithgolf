import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Terminal ↔ ChatWidget sync", () => {
  test.beforeEach(async ({ page }) => {
    // Clear shared localStorage before each test
    await page.goto(BASE);
    await page.evaluate(() => {
      localStorage.removeItem("ck-chat-messages");
      localStorage.removeItem("ck-chat-auto-open");
    });
  });

  test("ChatWidget does NOT overwrite Terminal messages on homepage", async ({
    page,
  }) => {
    // Simulate the Terminal writing a conversation to shared storage
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "should I hire this kid" },
        { role: "assistant", content: "Yes, Cameron is great!" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Reload homepage — ChatWidget is mounted but should NOT overwrite
    await page.goto(BASE);
    await page.waitForTimeout(1000);

    const stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("ck-chat-messages") || "[]")
    );

    // Should still have the Terminal's conversation, not just [GREETING]
    expect(stored.length).toBe(2);
    expect(stored[0].content).toBe("should I hire this kid");
  });

  test("ChatWidget syncs messages when navigating from homepage to another page", async ({
    page,
  }) => {
    await page.goto(BASE);

    // Simulate Terminal writing a conversation
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "tell me about projects" },
        { role: "assistant", content: "Cameron has built several projects." },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Navigate to /about (ChatWidget should pick up Terminal messages)
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    // Open the ChatWidget
    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    // The ChatWidget should display the Terminal's conversation
    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();

    // Check that the user message from the Terminal is visible
    const userMessage = chatPanel.locator("text=tell me about projects");
    await expect(userMessage).toBeVisible();

    // Check that the assistant response is visible
    const assistantMessage = chatPanel.locator(
      "text=Cameron has built several projects."
    );
    await expect(assistantMessage).toBeVisible();
  });

  test("Terminal navigation sets auto-open flag and ChatWidget opens", async ({
    page,
  }) => {
    await page.goto(BASE);

    // Simulate what the Terminal does when it navigates:
    // 1. Write conversation to shared storage
    // 2. Set auto-open flag
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "/work" },
        { role: "assistant", content: "Navigating to /work" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
      localStorage.setItem("ck-chat-auto-open", "true");
    });

    // Navigate to /work (simulating Terminal's router.push)
    await page.goto(`${BASE}/work`);
    await page.waitForTimeout(1000);

    // ChatWidget should auto-open
    const chatPanel = page.locator(".fixed.bottom-20");
    await expect(chatPanel).toBeVisible();

    // Auto-open flag should be cleared
    const flag = await page.evaluate(() =>
      localStorage.getItem("ck-chat-auto-open")
    );
    expect(flag).toBeNull();
  });

  test("Terminal /clear resets shared storage", async ({ page }) => {
    // Pre-populate shared storage
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "old question" },
        { role: "assistant", content: "old answer" },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    await page.goto(BASE);
    await page.waitForTimeout(1500);

    // Scroll to terminal section
    await page.evaluate(() =>
      document.getElementById("terminal")?.scrollIntoView()
    );
    await page.waitForTimeout(2000);

    // Type /clear in the Terminal
    const terminalInput = page.locator(
      '#terminal input[aria-label="Terminal input"]'
    );
    await terminalInput.waitFor({ state: "visible", timeout: 5000 });
    await terminalInput.fill("/clear");
    await terminalInput.press("Enter");
    await page.waitForTimeout(500);

    // Shared storage should be cleared
    const stored = await page.evaluate(() =>
      localStorage.getItem("ck-chat-messages")
    );
    expect(stored).toBeNull();

    // Navigate to /about — ChatWidget should show GREETING, not old conversation
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);
    await page.click('button[aria-label="Open Cam Code"]');
    await page.waitForTimeout(300);

    const chatPanel = page.locator(".fixed.bottom-20");
    const oldMessage = chatPanel.locator("text=old question");
    await expect(oldMessage).not.toBeVisible();
  });

  test("ChatWidget conversation persists and is visible in Terminal on homepage", async ({
    page,
  }) => {
    // Go to /about and have a conversation in ChatWidget
    await page.goto(`${BASE}/about`);
    await page.waitForTimeout(500);

    // Write a conversation via ChatWidget's localStorage
    await page.evaluate(() => {
      const msgs = [
        { role: "user", content: "what about golf" },
        { role: "assistant", content: "Cameron is a D1 golfer at Dartmouth." },
      ];
      localStorage.setItem("ck-chat-messages", JSON.stringify(msgs));
    });

    // Navigate to homepage — Terminal should load the ChatWidget's conversation
    await page.goto(BASE);
    await page.waitForTimeout(500);

    // Scroll to terminal
    await page.evaluate(() =>
      document.getElementById("terminal")?.scrollIntoView()
    );
    await page.waitForTimeout(2000);

    // Terminal should display the conversation from ChatWidget
    const terminal = page.locator("#terminal");
    const userMsg = terminal.locator("text=what about golf");
    await expect(userMsg).toBeVisible();
  });
});
