import { expect, type Locator, type Page } from "@playwright/test";
import { expectImageLoaded, finishAnimations } from "./visual";

export type GalleryState = {
	alt: string;
	index: number;
	source: string;
	title: string;
	total: number;
};

export function galleryDialog(page: Page): Locator {
	return page.getByRole("dialog");
}

export async function openGalleryThumbnail(
	page: Page,
	name: string,
): Promise<GalleryState> {
	const trigger = page.getByRole("button", {
		name: `View ${name}`,
		exact: true,
	});
	const thumbnail = trigger.locator("img");
	const source = await thumbnail.getAttribute("src");
	expect(source).not.toBeNull();
	await trigger.focus();
	await trigger.press("Enter");

	const dialog = galleryDialog(page);
	await expect(dialog).toBeVisible();

	const state = await readGalleryState(dialog);
	expect(state.source).toBe(source);
	return state;
}

export async function readGalleryState(dialog: Locator): Promise<GalleryState> {
	const slides = dialog.locator('[data-slot="carousel-item"]');
	await expect(slides.first()).toBeAttached();
	const total = await slides.count();
	const currentSlide = dialog.locator(
		'[data-slot="carousel-item"][aria-hidden="false"]',
	);
	await expect(currentSlide).toHaveCount(1);
	const image = currentSlide.locator("img");
	const alt = await image.getAttribute("alt");
	const source = await image.getAttribute("src");
	const title = await dialog
		.locator('[data-slot="dialog-title"]')
		.textContent();
	const index = await slides.evaluateAll((elements) =>
		elements.findIndex(
			(element) => element.getAttribute("aria-hidden") === "false",
		),
	);

	expect(alt).not.toBeNull();
	expect(source).not.toBeNull();
	expect(title).not.toBeNull();
	return {
		alt: alt ?? "",
		index,
		source: source ?? "",
		title: title ?? "",
		total,
	};
}

export async function expectGalleryState(
	dialog: Locator,
	state: GalleryState,
): Promise<void> {
	const currentSlide = dialog.locator(
		'[data-slot="carousel-item"][aria-hidden="false"]',
	);
	await expect(currentSlide).toHaveCount(1);
	const image = currentSlide.locator("img");
	await expect(image).toHaveAttribute("src", state.source);
	await expect(image).toHaveAttribute("alt", state.alt);
	await expectImageLoaded(image);
	await expect(currentSlide.locator("p")).toHaveText(state.title);
	await expect(dialog.locator('[data-slot="dialog-title"]')).toHaveText(
		state.title,
	);
	await expect(dialog.locator('[data-slot="dialog-description"]')).toHaveText(
		`Viewing image ${state.index + 1} of ${state.total}`,
	);
	await expect(dialog.locator('[data-slot="gallery-indicator"]')).toHaveText(
		`${state.index + 1} / ${state.total}`,
	);
}

export async function expectGalleryIndex(
	dialog: Locator,
	index: number,
): Promise<GalleryState> {
	const slides = dialog.locator('[data-slot="carousel-item"]');
	await expect(slides.nth(index)).toHaveAttribute("aria-hidden", "false");
	const state = await readGalleryState(dialog);
	expect(state.index).toBe(index);
	await expectGalleryState(dialog, state);
	return state;
}

export async function expectMountedGalleryImages(
	dialog: Locator,
	displayedIndex: number,
): Promise<void> {
	const slides = dialog.locator('[data-slot="carousel-item"]');
	const displayedImage = slides.nth(displayedIndex).locator("img");
	await expect(displayedImage).toHaveAttribute("loading", "eager");
	await expect(displayedImage).toHaveAttribute("fetchpriority", "high");
	await expect(displayedImage).not.toHaveAttribute("sizes", "100vw");
	await expectImageLoaded(displayedImage);

	const total = await slides.count();
	const expectedIndexes = [
		displayedIndex - 1,
		displayedIndex,
		displayedIndex + 1,
	].filter((index) => index >= 0 && index < total);
	await expect
		.poll(() =>
			slides.evaluateAll((elements) =>
				elements.flatMap((element, index) =>
					element.querySelector("img") ? [index] : [],
				),
			),
		)
		.toEqual(expectedIndexes);

	for (const index of expectedIndexes) {
		if (index === displayedIndex) {
			continue;
		}

		const image = slides.nth(index).locator("img");
		await expect(image).toHaveAttribute("loading", "lazy");
		await expect(image).toHaveAttribute("fetchpriority", "low");
	}
}

export async function prepareGalleryScreenshot(page: Page): Promise<void> {
	await finishAnimations(page);
	const state = await readGalleryState(galleryDialog(page));
	await expectGalleryState(galleryDialog(page), state);
}
