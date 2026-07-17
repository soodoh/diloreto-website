import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

type Diagnostics = {
	consoleErrors: string[];
	pageErrors: string[];
	forbiddenUrls: string[];
	failedRequests: string[];
	badResponses: Array<{ status: number; url: string }>;
};

const diagnosticsByPage = new WeakMap<Page, Diagnostics>();
const forbiddenUrl = /(?:\.netlify|\/\.netlify\/images)/i;

async function expectImagesToLoad(images: Locator): Promise<void> {
	const count = await images.count();
	expect(count).toBeGreaterThan(0);

	for (let index = 0; index < count; index += 1) {
		const image = images.nth(index);
		await image.scrollIntoViewIfNeeded();
		await expect
			.poll(() =>
				image.evaluate((element) => ({
					complete: element instanceof HTMLImageElement && element.complete,
					naturalHeight:
						element instanceof HTMLImageElement ? element.naturalHeight : 0,
					naturalWidth:
						element instanceof HTMLImageElement ? element.naturalWidth : 0,
				})),
			)
			.toMatchObject({ complete: true });

		const dimensions = await image.evaluate((element) => ({
			naturalHeight:
				element instanceof HTMLImageElement ? element.naturalHeight : 0,
			naturalWidth:
				element instanceof HTMLImageElement ? element.naturalWidth : 0,
		}));
		expect(dimensions.naturalWidth).toBeGreaterThan(0);
		expect(dimensions.naturalHeight).toBeGreaterThan(0);
	}
}

test.beforeEach(async ({ page }) => {
	const diagnostics: Diagnostics = {
		consoleErrors: [],
		pageErrors: [],
		forbiddenUrls: [],
		failedRequests: [],
		badResponses: [],
	};
	diagnosticsByPage.set(page, diagnostics);

	page.on("console", (message) => {
		if (message.type() === "error") {
			diagnostics.consoleErrors.push(message.text());
		}
	});
	page.on("pageerror", (error) => diagnostics.pageErrors.push(error.message));
	page.on("request", (request) => {
		if (forbiddenUrl.test(request.url())) {
			diagnostics.forbiddenUrls.push(request.url());
		}
	});
	page.on("requestfailed", (request) => {
		diagnostics.failedRequests.push(
			`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "unknown error"}`,
		);
	});
	page.on("response", (response) => {
		if (response.status() >= 400) {
			diagnostics.badResponses.push({
				status: response.status(),
				url: response.url(),
			});
		}
	});
});

test.afterEach(async ({ page }, testInfo) => {
	const diagnostics = diagnosticsByPage.get(page);
	expect(diagnostics).toBeDefined();
	if (!diagnostics) {
		return;
	}

	const isNotFoundTest = testInfo.title.includes("unknown routes");
	const consoleErrors = isNotFoundTest
		? diagnostics.consoleErrors.filter(
				(message) =>
					!message.startsWith(
						"Failed to load resource: the server responded with a status of 404",
					),
			)
		: diagnostics.consoleErrors;
	const badResponses = isNotFoundTest
		? diagnostics.badResponses.filter(
				(response) => !response.url.endsWith("/not-a-real-route"),
			)
		: diagnostics.badResponses;

	expect.soft(consoleErrors, "browser console errors").toEqual([]);
	expect.soft(diagnostics.pageErrors, "uncaught page errors").toEqual([]);
	expect.soft(diagnostics.forbiddenUrls, "Netlify request URLs").toEqual([]);
	expect
		.soft(diagnostics.failedRequests, "failed network requests")
		.toEqual([]);
	expect.soft(badResponses, "unexpected HTTP error responses").toEqual([]);
});

test("home renders its title, tiles, and responsive images", async ({
	page,
}) => {
	const response = await page.goto("/");
	expect(response?.status()).toBe(200);
	await expect(page).toHaveTitle("The DiLoreto Family");
	const tileButtons = page.getByRole("button");
	await expect(tileButtons).toHaveCount(6);
	for (const tileButton of await tileButtons.all()) {
		await expect(tileButton).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
	}
	await expect(
		page.getByRole("link", { name: /Family History/ }),
	).toBeVisible();
	await expect(page.getByRole("button", { name: /Contact/ })).toBeVisible();
	await expectImagesToLoad(page.locator("img"));
	await expect(page.locator("picture source[srcset]")).toHaveCount(6);
});

test("a person tile opens and closes the correct modal", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: /John/ }).click();
	const dialog = page.getByRole("dialog");
	await expect(
		dialog.getByRole("heading", { name: "John R. DiLoreto" }),
	).toBeVisible();
	await dialog.getByRole("button", { name: "Close" }).click();
	await expect(dialog).toBeHidden();
});

test("contact exposes the expected mail links", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: /Contact/ }).click();
	const dialog = page.getByRole("dialog");
	await expect(
		dialog.getByRole("heading", { name: "Contact Us" }),
	).toBeVisible();
	await expect(
		dialog.locator('a[href="mailto:john@diloreto.com"]'),
	).toBeVisible();
	await expect(
		dialog.locator('a[href="mailto:paul@diloreto.com"]'),
	).toBeVisible();
	await expect(
		dialog.locator('a[href="mailto:carolyn@diloreto.com"]'),
	).toBeVisible();
});

test("Family History navigation reaches the historical content", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("link", { name: /Family History/ }).click();
	await expect(page).toHaveURL(/\/areyou$/);
	await expect(page).toHaveTitle("Are You a DiLoreto?");
	await expect(page.getByRole("heading", { name: "1600s" })).toBeVisible();
});

test("family history renders content and successful images", async ({
	page,
}) => {
	const response = await page.goto("/areyou");
	expect(response?.status()).toBe(200);
	await expect(page.getByText("We Came from Alfedena")).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "A G.I.'s Visit to Alfedena" }).first(),
	).toBeVisible();
	await expectImagesToLoad(page.locator("img"));
	await expect(page.locator("picture source[srcset]")).toHaveCount(29);
});

test("gallery modal and carousel navigate images", async ({ page }) => {
	await page.goto("/areyou");
	await page
		.getByAltText("Map of Abruzzo pointing to Alfedena at the bottom")
		.click();
	const dialog = page.getByRole("dialog");
	const title = dialog.getByRole("heading");
	await expect(title).toHaveText(
		"Map of Abruzzo pointing to Alfedena at the bottom",
	);
	await expectImagesToLoad(
		dialog.getByAltText("Map of Abruzzo pointing to Alfedena at the bottom"),
	);

	const initialTitle = await title.textContent();
	await dialog.getByRole("button", { name: "Next slide" }).click();
	await expect(title).not.toHaveText(initialTitle ?? "");
	const nextTitle = await title.textContent();
	await dialog.getByRole("button", { name: "Previous slide" }).click();
	await expect(title).not.toHaveText(nextTitle ?? "");
	await expect(title).toHaveText(initialTitle ?? "");

	await dialog.getByRole("button", { name: "Close image modal" }).click();
	await expect(dialog).toBeHidden();
});

test("unknown routes return the custom 404 document", async ({ page }) => {
	const response = await page.goto("/not-a-real-route");
	expect(response?.status()).toBe(404);
	await expect(
		page.getByRole("heading", { name: "404: Page Not Found" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Return to the home page" }),
	).toBeVisible();
});
