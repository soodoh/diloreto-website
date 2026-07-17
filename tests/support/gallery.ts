import { expect, type Locator, type Page } from "@playwright/test";
import { expectImageLoaded, finishAnimations } from "./visual";

export type GalleryState = {
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
	const thumbnail = page.getByAltText(name, { exact: true }).first();
	const source = await thumbnail.getAttribute("src");
	expect(source).not.toBeNull();
	await thumbnail.click();

	const dialog = galleryDialog(page);
	await expect(dialog).toBeVisible();
	const slides = dialog.locator('[data-slot="carousel-item"]');
	const sources = await slides
		.locator("img")
		.evaluateAll((images) => images.map((image) => image.getAttribute("src")));
	const index = sources.indexOf(source);
	expect(index).toBeGreaterThanOrEqual(0);

	const state = {
		index,
		source: source ?? "",
		title: name,
		total: sources.length,
	};
	await expectGalleryState(dialog, state);
	return state;
}

export async function readGalleryState(dialog: Locator): Promise<GalleryState> {
	const slides = dialog.locator('[data-slot="carousel-item"]');
	const total = await slides.count();
	const currentSlide = dialog.locator(
		'[data-slot="carousel-item"][aria-hidden="false"]',
	);
	await expect(currentSlide).toHaveCount(1);
	const image = currentSlide.locator("img");
	const title = await image.getAttribute("alt");
	const source = await image.getAttribute("src");
	const index = await slides.evaluateAll((elements) =>
		elements.findIndex(
			(element) => element.getAttribute("aria-hidden") === "false",
		),
	);

	expect(title).not.toBeNull();
	expect(source).not.toBeNull();
	return {
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
	await expect(image).toHaveAttribute("alt", state.title);
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
	const image = slides.nth(index).locator("img");
	const title = await image.getAttribute("alt");
	const source = await image.getAttribute("src");
	expect(title).not.toBeNull();
	expect(source).not.toBeNull();

	const state = {
		index,
		source: source ?? "",
		title: title ?? "",
		total: await slides.count(),
	};
	await expectGalleryState(dialog, state);
	return state;
}

export async function prepareGalleryScreenshot(page: Page): Promise<void> {
	await finishAnimations(page);
	const state = await readGalleryState(galleryDialog(page));
	await expectGalleryState(galleryDialog(page), state);
}
