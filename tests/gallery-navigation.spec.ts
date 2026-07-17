import { expect, type Page, test } from "@playwright/test";
import {
	expectGalleryIndex,
	galleryDialog,
	openGalleryThumbnail,
} from "./support/gallery";

const startingPhoto = "Map of Abruzzo pointing to Alfedena at the bottom";

async function swipeGallery(
	page: Page,
	direction: "next" | "previous",
): Promise<void> {
	const carousel = galleryDialog(page).locator(
		'[data-slot="carousel-content"]',
	);
	const box = await carousel.boundingBox();
	expect(box).not.toBeNull();
	if (!box) {
		return;
	}

	const startX = box.x + box.width / 2;
	const y = box.y + box.height / 2;
	const deltaX = box.width * (direction === "next" ? -0.5 : 0.5);
	let touches = [{ identifier: 0, clientX: startX, clientY: y }];

	await carousel.dispatchEvent("touchstart", {
		changedTouches: touches,
		targetTouches: touches,
		touches,
	});
	for (let step = 1; step <= 8; step += 1) {
		touches = [
			{
				identifier: 0,
				clientX: startX + (deltaX * step) / 8,
				clientY: y,
			},
		];
		await carousel.dispatchEvent("touchmove", {
			changedTouches: touches,
			targetTouches: touches,
			touches,
		});
	}
	await carousel.dispatchEvent("touchend");
}

test.beforeEach(async ({ page }) => {
	await page.goto("/areyou");
});

test("arrow buttons navigate to the next and previous image", async ({
	page,
}) => {
	const initial = await openGalleryThumbnail(page, startingPhoto);
	const dialog = galleryDialog(page);

	await dialog.getByRole("button", { name: "Next slide" }).click();
	await expectGalleryIndex(dialog, initial.index + 1);
	await dialog.getByRole("button", { name: "Previous slide" }).click();
	await expectGalleryIndex(dialog, initial.index);

	await dialog.getByRole("button", { name: "Close image modal" }).click();
	await expect(dialog).toBeHidden();
});

test("touch dragging navigates to the next and previous image", async ({
	page,
}) => {
	const initial = await openGalleryThumbnail(page, startingPhoto);
	const dialog = galleryDialog(page);

	await swipeGallery(page, "next");
	await expectGalleryIndex(dialog, initial.index + 1);
	await swipeGallery(page, "previous");
	await expectGalleryIndex(dialog, initial.index);
});

test("arrow keys navigate and Escape closes the gallery", async ({ page }) => {
	const initial = await openGalleryThumbnail(page, startingPhoto);
	const dialog = galleryDialog(page);

	await page.keyboard.press("ArrowRight");
	await expectGalleryIndex(dialog, initial.index + 1);
	await page.keyboard.press("ArrowLeft");
	await expectGalleryIndex(dialog, initial.index);

	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
});
