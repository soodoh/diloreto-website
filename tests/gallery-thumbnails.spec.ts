import { expect, test } from "@playwright/test";
import {
	expectGalleryState,
	galleryDialog,
	openGalleryThumbnail,
} from "./support/gallery";

test("each history thumbnail opens its corresponding gallery image", async ({
	page,
}) => {
	test.setTimeout(120_000);
	await page.goto("/areyou");

	const thumbnails = page.locator("div.cursor-pointer img");
	const titles = await thumbnails.evaluateAll((images) =>
		images.map((image) => image.getAttribute("alt") ?? ""),
	);
	expect(titles.length).toBeGreaterThan(0);

	for (const title of titles) {
		const state = await openGalleryThumbnail(page, title);
		await expectGalleryState(galleryDialog(page), state);
		await galleryDialog(page)
			.getByRole("button", { name: "Close image modal" })
			.click();
		await expect(galleryDialog(page)).toBeHidden();
	}
});
