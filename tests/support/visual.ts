import { expect, type Locator, type Page } from "@playwright/test";

export async function expectImageLoaded(image: Locator): Promise<void> {
	await expect(image).toBeVisible();
	await expect
		.poll(() =>
			image.evaluate(
				(element) =>
					element instanceof HTMLImageElement &&
					element.complete &&
					element.naturalHeight > 0 &&
					element.naturalWidth > 0,
			),
		)
		.toBe(true);
}

export async function loadAllImages(page: Page): Promise<void> {
	const images = page.locator("img");
	const imageCount = await images.count();

	for (let index = 0; index < imageCount; index += 1) {
		const image = images.nth(index);
		await image.scrollIntoViewIfNeeded();
		await expectImageLoaded(image);
	}
}

export async function finishAnimations(page: Page): Promise<void> {
	await page.evaluate(async () => {
		await document.fonts.ready;

		for (const animation of document.getAnimations()) {
			if (animation.playState !== "finished") {
				animation.finish();
			}
		}

		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
		});
	});
}

export async function prepareFullPage(page: Page): Promise<void> {
	await loadAllImages(page);
	await page.evaluate(() => window.scrollTo(0, 0));
	await finishAnimations(page);
}
