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

	await expectSuccessfulNavigation(page, "/familytree?person=I790");
	await expect(page).toHaveTitle("DiLoreto Family Tree");
	await expect(
		page.getByRole("heading", { name: "Explore the family tree" }),
	).toBeVisible();
	const fullTreeChart = page.getByRole("application", {
		name: "Interactive family relationship chart",
	});
	await expect(fullTreeChart).toBeVisible();
	const initialScale = await fullTreeChart
		.locator(".react-flow__viewport")
		.evaluate(
			(viewport) =>
				new DOMMatrixReadOnly(getComputedStyle(viewport).transform).a,
		);
	expect(initialScale).toBeGreaterThan(0.1);
	await expect(
		page.getByText("Full family tree", { exact: true }),
	).toBeVisible();
	await expect(
		fullTreeChart.getByRole("button", { name: /Lucrezia Farina/ }),
	).toBeAttached();
	await expect(
		page.getByRole("heading", { name: "Biagio di Loreto", exact: true }),
	).toBeVisible();
	const search = page.getByRole("searchbox", {
		name: "Find a family member",
	});
	await expect(
		page.getByRole("heading", { name: "Family records" }),
	).toBeVisible();
	await search.fill("Otto Di-Loreto");
	const results = page.locator(".family-tree-search-results");
	await results
		.getByRole("button", { name: /Ottorino Antonio Angelo DiLoreto/ })
		.click();
	await expect(page).toHaveURL(/\/familytree\?person=I103$/);
	await expect(search).toHaveValue("");
	await expect(
		page.getByRole("heading", {
			name: "Ottorino Antonio Angelo DiLoreto",
			exact: true,
		}),
	).toBeVisible();
	await expect(page.getByText("Otto Di-Loreto", { exact: true })).toBeVisible();

	await expectSuccessfulNavigation(page, "/familytree?person=I775");
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
