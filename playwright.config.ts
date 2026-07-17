import { defineConfig, devices } from "@playwright/test";

const localBaseUrl = "http://127.0.0.1:4173";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? localBaseUrl;
const useLocalServer = process.env.PLAYWRIGHT_BASE_URL === undefined;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : undefined,
	timeout: 45_000,
	expect: {
		timeout: 10_000,
	},
	reporter: process.env.CI
		? [["line"], ["html", { open: "never" }]]
		: [["list"], ["html", { open: "never" }]],
	use: {
		baseURL,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "desktop-chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "mobile-chromium",
			use: { ...devices["Pixel 7"] },
		},
	],
	webServer: useLocalServer
		? {
				command: "bun run start",
				url: localBaseUrl,
				reuseExistingServer: !process.env.CI,
				timeout: 30_000,
			}
		: undefined,
});
