import { expect, test } from "@playwright/test";
import { prepareFullPage } from "../support/visual";

test("home page", async ({ page }) => {
	await page.goto("/");
	await prepareFullPage(page);
	await expect(page).toHaveScreenshot("home-page.png", {
		animations: "disabled",
		fullPage: true,
	});
});

test("family history page", async ({ page }) => {
	test.setTimeout(90_000);
	await page.goto("/areyou");
	await prepareFullPage(page);
	await expect(page).toHaveScreenshot("areyou-page.png", {
		animations: "disabled",
		fullPage: true,
	});
});
