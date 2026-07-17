import { expect, type Page, test } from "@playwright/test";

type DeploymentRoute = {
	interact: (page: Page) => Promise<void>;
	path: string;
};

const routes: DeploymentRoute[] = [
	{
		path: "/",
		interact: async (page) => {
			await page.getByRole("button", { name: "Contact" }).click();
			await expect(
				page.getByRole("dialog").getByRole("heading", { name: "Contact Us" }),
			).toBeVisible();
		},
	},
	{
		path: "/areyou",
		interact: async (page) => {
			await page
				.getByAltText("Hand-drawn family tree (1797-1938)", {
					exact: true,
				})
				.click();
			await expect(
				page.getByRole("dialog").getByRole("button", {
					name: "Close image modal",
				}),
			).toBeVisible();
		},
	},
];

for (const route of routes) {
	test(`${route.path} hydrates without browser errors`, async ({
		baseURL,
		page,
	}) => {
		if (!baseURL) {
			throw new Error("Deployment smoke tests require a base URL");
		}

		const expectedOrigin = new URL(baseURL).origin;
		const consoleErrors: string[] = [];
		const pageErrors: string[] = [];
		const failedScripts: string[] = [];
		const isSameOriginScript = (url: string, resourceType: string) => {
			const parsedUrl = new URL(url);
			return (
				parsedUrl.origin === expectedOrigin &&
				(resourceType === "script" || parsedUrl.pathname.endsWith(".js"))
			);
		};

		page.on("console", (message) => {
			if (message.type() === "error") {
				consoleErrors.push(message.text());
			}
		});
		page.on("pageerror", (error) => pageErrors.push(error.message));
		page.on("requestfailed", (request) => {
			if (isSameOriginScript(request.url(), request.resourceType())) {
				failedScripts.push(
					`${request.url()}: ${request.failure()?.errorText ?? "request failed"}`,
				);
			}
		});
		page.on("response", (response) => {
			const request = response.request();
			if (
				response.status() >= 400 &&
				isSameOriginScript(request.url(), request.resourceType())
			) {
				failedScripts.push(`${response.status()} ${response.url()}`);
			}
		});

		const response = await page.goto(route.path, {
			waitUntil: "domcontentloaded",
		});
		expect(response, `navigation response for ${route.path}`).not.toBeNull();
		expect(response?.status(), `HTTP status for ${route.path}`).toBe(200);
		expect((await page.locator("body").innerText()).trim()).not.toBe("");

		await route.interact(page);

		expect(pageErrors, "uncaught page errors").toEqual([]);
		expect(consoleErrors, "browser console errors").toEqual([]);
		expect(failedScripts, "failed same-origin scripts").toEqual([]);
	});
}
