import { expect, test } from "@playwright/test";
import {
	expectGalleryState,
	galleryDialog,
	readGalleryState,
} from "./support/gallery";
import { expectImageLoaded } from "./support/visual";

const panorama = {
	alt: "Black-and-white panoramic view of Alfedena and the surrounding mountains in 1946, view 1",
	title: "Alfedena panorama, 1946 — view 1",
};

test.beforeEach(async ({ page }) => {
	await page.goto("/areyou");
});

test("each history thumbnail is keyboard-operable and opens its image", async ({
	page,
}) => {
	test.setTimeout(180_000);
	const thumbnails = page.getByRole("button", { name: /^View / });
	const labels = await thumbnails.evaluateAll((buttons) =>
		buttons.map((button) => button.getAttribute("aria-label") ?? ""),
	);
	expect(labels.length).toBeGreaterThan(0);

	for (const [index, label] of labels.entries()) {
		const trigger = page.getByRole("button", { name: label, exact: true });
		const thumbnailSource = await trigger.locator("img").getAttribute("src");
		expect(thumbnailSource).not.toBeNull();
		await trigger.focus();
		await expect(trigger).toBeFocused();
		await page.keyboard.press(index % 2 === 0 ? "Enter" : "Space");

		const dialog = galleryDialog(page);
		await expect(dialog).toBeVisible();
		const activeImage = dialog.locator(
			'[data-slot="carousel-item"][aria-hidden="false"] img',
		);
		await expect(activeImage).toHaveAttribute("src", thumbnailSource ?? "");
		await expectImageLoaded(activeImage);
		const alt = await activeImage.getAttribute("alt");
		expect(label).toBe(`View ${alt}`);
		await dialog.getByRole("button", { name: "Close image modal" }).click();
		await expect(dialog).toBeHidden();
		await expect(trigger).toBeFocused();
	}
});

test("a non-first thumbnail is correct in the first observable dialog state", async ({
	page,
}) => {
	await page.evaluate(() => {
		const capture = document.createElement("output");
		capture.id = "first-gallery-state";
		document.body.append(capture);

		const observer = new MutationObserver(() => {
			const dialog = document.querySelector('[role="dialog"]');
			const image = dialog?.querySelector(
				'[data-slot="carousel-item"][aria-hidden="false"] img',
			);
			const caption = dialog?.querySelector(
				'[data-slot="carousel-item"][aria-hidden="false"] p',
			);
			const title = dialog?.querySelector('[data-slot="dialog-title"]');
			const counter = dialog?.querySelector('[data-slot="gallery-indicator"]');
			if (!image || !caption || !title || !counter) {
				return;
			}

			capture.dataset.state = JSON.stringify({
				alt: image.getAttribute("alt"),
				caption: caption.textContent,
				counter: counter.textContent?.trim(),
				title: title.textContent,
			});
			observer.disconnect();
		});
		observer.observe(document.body, { childList: true, subtree: true });
	});

	const trigger = page.getByRole("button", {
		name: `View ${panorama.alt}`,
		exact: true,
	});
	await expect(trigger.locator("xpath=..")).toContainText(panorama.title);
	await trigger.focus();
	await page.keyboard.press("Enter");
	const state = await readGalleryState(galleryDialog(page));
	expect(state.index).toBeGreaterThan(0);
	expect(state.alt).toBe(panorama.alt);
	expect(state.title).toBe(panorama.title);
	await expectGalleryState(galleryDialog(page), state);
	await expect(page.locator("#first-gallery-state")).toHaveAttribute(
		"data-state",
		JSON.stringify({
			alt: panorama.alt,
			caption: panorama.title,
			counter: `${state.index + 1} / ${state.total}`,
			title: panorama.title,
		}),
	);
});
