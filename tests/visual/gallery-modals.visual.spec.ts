import { expect, test } from "@playwright/test";
import {
	openGalleryThumbnail,
	prepareGalleryScreenshot,
} from "../support/gallery";

const galleryPhotos = [
	{
		aspectRatio: "portrait",
		title: "Hand-drawn family tree (1797-1938)",
	},
	{
		aspectRatio: "landscape",
		title: "postcard-04a",
	},
] as const;

for (const photo of galleryPhotos) {
	test(`${photo.aspectRatio} gallery photo`, async ({ page }) => {
		await page.goto("/areyou");
		await openGalleryThumbnail(page, photo.title);
		await prepareGalleryScreenshot(page);
		await expect(page).toHaveScreenshot(`gallery-${photo.aspectRatio}.png`, {
			animations: "disabled",
		});
	});
}
