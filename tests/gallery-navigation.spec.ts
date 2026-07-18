import { expect, type Page, test } from "@playwright/test";
import {
	expectGalleryIndex,
	expectMountedGalleryImages,
	galleryDialog,
	openGalleryThumbnail,
} from "./support/gallery";

const startingPhoto =
	"Map of the Abruzzo region of Italy marking Alfedena near its southern border";

async function swipeGallery(
	page: Page,
	direction: "next" | "previous",
	release = true,
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
	const deltaX = box.width * (direction === "next" ? -0.6 : 0.6);
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
	if (release) {
		await carousel.dispatchEvent("touchend");
	}
}

test.beforeEach(async ({ page }) => {
	await page.goto("/areyou");
});

test("arrow buttons navigate to the next and previous image", async ({
	page,
}) => {
	const trigger = page.getByRole("button", {
		name: `View ${startingPhoto}`,
		exact: true,
	});
	const initial = await openGalleryThumbnail(page, startingPhoto);
	const dialog = galleryDialog(page);
	await expectMountedGalleryImages(dialog, initial.index);

	const status = dialog.locator('[data-slot="gallery-status"]');
	await expect(status).toHaveAttribute("role", "status");
	await expect(status).toHaveAttribute("aria-live", "polite");
	await expect(status).toHaveAttribute("aria-atomic", "true");

	await dialog.getByRole("button", { name: "Next slide" }).click();
	const next = await expectGalleryIndex(dialog, initial.index + 1);
	await expectMountedGalleryImages(dialog, next.index);
	await expect(status).toHaveText(
		`${next.alt}. Image ${next.index + 1} of ${next.total}.`,
	);
	await dialog.getByRole("button", { name: "Previous slide" }).click();
	await expectGalleryIndex(dialog, initial.index);

	await dialog.getByRole("button", { name: "Close image modal" }).click();
	await expect(dialog).toBeHidden();
	await expect(trigger).toBeFocused();
});

test("touch dragging navigates to the next and previous image", async ({
	page,
}, testInfo) => {
	test.skip(testInfo.project.name !== "mobile-chromium");
	const initial = await openGalleryThumbnail(page, startingPhoto);
	const dialog = galleryDialog(page);
	const carousel = dialog.locator('[data-slot="carousel-content"]');
	const incomingImage = dialog
		.locator('[data-slot="carousel-item"]')
		.nth(initial.index + 1)
		.locator("img");
	await expectMountedGalleryImages(dialog, initial.index);

	await swipeGallery(page, "next", false);
	await expect
		.poll(async () => {
			const carouselBox = await carousel.boundingBox();
			const imageBox = await incomingImage.boundingBox();
			if (!carouselBox || !imageBox) {
				return false;
			}
			return (
				imageBox.x < carouselBox.x + carouselBox.width &&
				imageBox.x + imageBox.width > carouselBox.x
			);
		})
		.toBe(true);
	await carousel.dispatchEvent("touchend");
	const next = await expectGalleryIndex(dialog, initial.index + 1);
	await expectMountedGalleryImages(dialog, next.index);
	await swipeGallery(page, "previous");
	await expectGalleryIndex(dialog, initial.index);
});

test("gallery image mounting handles first and last boundaries", async ({
	page,
}) => {
	const first = await openGalleryThumbnail(
		page,
		"Hand-drawn map marking the DiLoreto homestead in Alfedena, L'Aquila, Italy",
	);
	const dialog = galleryDialog(page);
	expect(first.index).toBe(0);
	await expectMountedGalleryImages(dialog, first.index);
	await dialog.getByRole("button", { name: "Close image modal" }).click();

	const nearEnd = await openGalleryThumbnail(
		page,
		"Historic multistory homes lining Via Casili in Alfedena in 2004",
	);
	for (let offset = 1; offset <= 4; offset += 1) {
		await dialog.getByRole("button", { name: "Next slide" }).click();
		await expectGalleryIndex(dialog, nearEnd.index + offset);
	}
	const lastIndex = nearEnd.total - 1;
	expect(nearEnd.index + 4).toBe(lastIndex);
	await expectMountedGalleryImages(dialog, lastIndex);
});

test("arrow keys navigate and Escape closes the gallery", async ({ page }) => {
	const trigger = page.getByRole("button", {
		name: `View ${startingPhoto}`,
		exact: true,
	});
	const initial = await openGalleryThumbnail(page, startingPhoto);
	const dialog = galleryDialog(page);

	await page.keyboard.press("ArrowRight");
	await expectGalleryIndex(dialog, initial.index + 1);
	await page.keyboard.press("ArrowLeft");
	await expectGalleryIndex(dialog, initial.index);

	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
	await expect(trigger).toBeFocused();
});
