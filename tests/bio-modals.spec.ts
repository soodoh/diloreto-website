import { expect, test } from "@playwright/test";

for (const person of ["Paul", "Carolyn", "John"]) {
	test(`${person.toLowerCase()} bio modal opens and closes`, async ({
		page,
	}) => {
		await page.goto("/");
		const trigger = page.getByRole("button", { name: person });

		await trigger.click();
		const dialog = page.getByRole("dialog");
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole("heading")).toBeVisible();

		await dialog.getByRole("button", { name: "Close" }).click();
		await expect(dialog).toBeHidden();
		await expect(trigger).toBeFocused();
	});
}
