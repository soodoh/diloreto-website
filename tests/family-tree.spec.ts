import { expect, expectSuccessfulNavigation, test } from "./support/smoke";

test("family tree supports private, searchable, shareable exploration", async ({
	page,
}) => {
	await expectSuccessfulNavigation(page, "/areyou");
	await expect(
		page.getByRole("link", { name: "Explore the Family Tree" }),
	).toHaveAttribute("href", "/familytree");
	await expect(
		page.getByRole("link", { name: "DiLoreto Family Tree" }),
	).toHaveAttribute("href", "/familytree");

	await expectSuccessfulNavigation(page, "/familytree?person=P1");
	await expect(page).toHaveTitle("DiLoreto Family Tree");
	await expect(
		page.getByRole("heading", { name: "Explore the family tree" }),
	).toBeVisible();
	await expect(
		page.getByRole("application", {
			name: "Interactive family relationship chart",
		}),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Biagio di Loreto", exact: true }),
	).toBeVisible();
	const search = page.getByRole("searchbox", {
		name: "Find a family member",
	});
	await search.fill("Pasquale");
	const results = page.locator(".family-tree-search-results");
	await results.getByRole("button", { name: /Pasquale di Loreto/ }).click();
	await expect(page).toHaveURL(/\/familytree\?person=P87$/);
	await expect(search).toHaveValue("");
	await expect(
		page.getByRole("heading", { name: "Pasquale di Loreto", exact: true }),
	).toBeVisible();

	await expectSuccessfulNavigation(page, "/familytree?person=P72");
	const panfiloChart = page.getByRole("application", {
		name: "Interactive family relationship chart",
	});
	await expect(
		panfiloChart.getByRole("button", { name: /Domenico Di Loreto/ }),
	).toBeVisible();
	await expect(
		panfiloChart.getByRole("button", { name: /Santa Projetta/ }),
	).toBeVisible();

	const viewport = page.viewportSize();
	const canvas = page.locator(".family-tree-canvas");
	const details = page.locator(".family-tree-details");
	const canvasBox = await canvas.boundingBox();
	const detailsBox = await details.boundingBox();
	expect(canvasBox).not.toBeNull();
	expect(detailsBox).not.toBeNull();
	if (viewport && canvasBox && detailsBox && viewport.width < 900) {
		expect(canvasBox.width).toBeLessThanOrEqual(viewport.width);
		expect(detailsBox.y).toBeGreaterThan(canvasBox.y);
	}
});
