import { defineConfig, devices } from "@playwright/test";

const localBaseUrl = "http://127.0.0.1:4173";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? localBaseUrl;
const useLocalServer = process.env.PLAYWRIGHT_BASE_URL === undefined;
const outputRoot = process.env.PLAYWRIGHT_OUTPUT_ROOT ?? ".";

export default defineConfig({
	testDir: "./tests",
	outputDir: `${outputRoot}/test-results`,
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : undefined,
	timeout: 45_000,
	expect: {
		timeout: 10_000,
		toHaveScreenshot: {
			animations: "disabled",
			caret: "hide",
			scale: "css",
		},
	},
	reporter: process.env.CI
		? [
				["line"],
				[
					"html",
					{ open: "never", outputFolder: `${outputRoot}/playwright-report` },
				],
			]
		: [
				["list"],
				[
					"html",
					{ open: "never", outputFolder: `${outputRoot}/playwright-report` },
				],
			],
	use: {
		baseURL,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				hasTouch: true,
				viewport: { width: 1280, height: 720 },
			},
		},
		{
			name: "mobile-chromium",
			testMatch: [
				"**/*.visual.spec.ts",
				"**/bio-modals.spec.ts",
				"**/gallery-*.spec.ts",
				"**/smoke.spec.ts",
			],
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
