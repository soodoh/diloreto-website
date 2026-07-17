import { expect, test } from "@playwright/test";
import { finishAnimations } from "../support/visual";

for (const person of ["Paul", "Carolyn", "John"]) {
	test(`${person.toLowerCase()} bio modal`, async ({ page }) => {
		await page.goto("/");
		await page.getByRole("button", { name: person }).click();
		await expect(page.getByRole("dialog")).toBeVisible();
		await finishAnimations(page);
		await expect(page).toHaveScreenshot(
			`${person.toLowerCase()}-bio-modal.png`,
			{
				animations: "disabled",
			},
		);
	});
}
