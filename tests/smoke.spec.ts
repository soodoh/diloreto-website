import { expect, expectSuccessfulNavigation, test } from "./support/smoke";

test("core pages return success and home navigation works", async ({
	page,
}) => {
	await expectSuccessfulNavigation(page, "/");
	await expect(page).toHaveTitle("The DiLoreto Family");
	await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
		"href",
		"/favicon.png",
	);
	await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
		"href",
		"/apple-touch-icon.png",
	);
	const iconDimensions = await page.evaluate(async () => {
		const icon = new Image();
		icon.src = "/favicon.png";
		await icon.decode();
		return { height: icon.naturalHeight, width: icon.naturalWidth };
	});
	expect(iconDimensions).toEqual({ height: 64, width: 64 });
	const homeGrid = page.locator(".grid.grid-cols-3").first();
	const homeImages = homeGrid.locator("img");
	await expect(homeImages).toHaveCount(6);
	expect(
		await homeImages.evaluateAll((images) =>
			images.map((image) => ({
				fetchPriority: image.getAttribute("fetchpriority"),
				loading: image.getAttribute("loading"),
			})),
		),
	).toEqual([
		{ fetchPriority: "high", loading: "eager" },
		{ fetchPriority: "high", loading: "eager" },
		{ fetchPriority: "high", loading: "eager" },
		{ fetchPriority: "auto", loading: "lazy" },
		{ fetchPriority: "auto", loading: "lazy" },
		{ fetchPriority: "auto", loading: "lazy" },
	]);
	const historyTile = page.getByRole("link", { name: "Family History" });
	const contactTile = page.getByRole("button", { name: "Contact" });
	const photosTile = page
		.locator('[data-slot="tile"]')
		.filter({ hasText: "Photos" });
	await expect(historyTile).toHaveCount(1);
	await expect(historyTile).toHaveJSProperty("tagName", "A");
	await expect(historyTile.getByRole("button")).toHaveCount(0);
	await expect(contactTile).toHaveJSProperty("tagName", "BUTTON");
	await expect(contactTile.getByRole("link")).toHaveCount(0);
	await expect(photosTile).toHaveCount(1);
	await expect(photosTile).toHaveJSProperty("tagName", "DIV");
	await expect(photosTile.getByRole("button")).toHaveCount(0);
	await expect(photosTile.getByRole("link")).toHaveCount(0);
	await historyTile.click();
	await expect(page).toHaveURL(/\/areyou\/?$/);
	await expect(page.getByRole("heading", { name: "996 - 1330" })).toBeVisible();
	await expectSuccessfulNavigation(page, "/areyou");

	const headerBox = await page.locator("header").boundingBox();
	expect(headerBox?.y).toBe(0);
});

test("contact and biography dialogs preserve content and restore focus", async ({
	page,
}) => {
	await expectSuccessfulNavigation(page, "/");

	const contactTrigger = page.getByRole("button", { name: "Contact" });
	await contactTrigger.focus();
	await contactTrigger.press("Enter");
	const contactDialog = page.getByRole("dialog");
	await expect(
		contactDialog.getByRole("heading", { name: "Contact Us" }),
	).toBeVisible();
	await expect(
		contactDialog.getByRole("link", { name: "john@diloreto.com" }),
	).toHaveAttribute("href", "mailto:john@diloreto.com");
	const contactClose = contactDialog.getByRole("button", { name: "Close" });
	await contactClose.focus();
	await contactClose.press("Enter");
	await expect(contactDialog).toBeHidden();
	await expect(contactTrigger).toBeFocused();

	await contactTrigger.press("Enter");
	await expect(contactDialog).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(contactDialog).toBeHidden();
	await expect(contactTrigger).toBeFocused();

	const biographyTrigger = page.getByRole("button", { name: "Paul" });
	await biographyTrigger.focus();
	await biographyTrigger.press("Enter");
	const biographyDialog = page.getByRole("dialog");
	const biographyContent = page.locator('[data-slot="dialog-content"]');
	await expect(
		biographyDialog.getByRole("heading", { name: "Paul Michael DiLoreto" }),
	).toBeVisible();
	const biographyClose = biographyDialog.getByRole("button", {
		name: "Close",
	});
	await biographyClose.focus();
	await biographyClose.press("Enter");
	await expect(biographyContent).toHaveAttribute("data-state", "closed");
	await expect(
		biographyContent.getByRole("heading", { name: "Paul Michael DiLoreto" }),
	).toHaveText("Paul Michael DiLoreto");
	await expect(biographyContent).toBeHidden();
	await expect(biographyTrigger).toBeFocused();

	await biographyTrigger.press("Enter");
	await expect(biographyDialog).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(biographyDialog).toBeHidden();
	await expect(biographyTrigger).toBeFocused();
});

test("custom 404 keeps its status and loads no JavaScript", async ({
	page,
	diagnostics,
}) => {
	const javascriptRequests: string[] = [];
	page.on("request", (request) => {
		if (
			request.resourceType() === "script" ||
			new URL(request.url()).pathname.endsWith(".js")
		) {
			javascriptRequests.push(request.url());
		}
	});
	diagnostics.allowResponse("/not-a-real-route", 404);
	diagnostics.allowConsoleError(
		"Failed to load resource: the server responded with a status of 404 (Not Found)",
	);
	diagnostics.allowConsoleError(
		"Failed to load resource: the server responded with a status of 404 ()",
	);

	const response = await page.goto("/not-a-real-route");
	expect(response).not.toBeNull();
	expect(response?.status()).toBe(404);
	await expect(page).toHaveURL(/\/not-a-real-route$/);
	await expect(
		page.getByRole("heading", { name: "404: Page Not Found" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Return to the home page" }),
	).toHaveAttribute("href", "/");
	expect(javascriptRequests).toEqual([]);
});
