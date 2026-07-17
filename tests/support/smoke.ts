import {
	test as base,
	type ConsoleMessage,
	expect,
	type Page,
	type Request,
	type Response,
} from "@playwright/test";

type RuntimeDiagnostics = {
	allowConsoleError: (message: string) => void;
	allowResponse: (path: string, status: number) => void;
};

type DiagnosticFixtures = {
	diagnostics: RuntimeDiagnostics;
};

export const test = base.extend<DiagnosticFixtures>({
	diagnostics: async ({ page }, use) => {
		const consoleErrors: string[] = [];
		const pageErrors: string[] = [];
		const failedRequests: string[] = [];
		const badResponses: string[] = [];
		const allowedConsoleErrors = new Set<string>();
		const allowedResponses = new Set<string>();
		const responseKey = (response: Response): string => {
			const url = new URL(response.url());
			return `${response.status()} ${url.pathname}`;
		};
		const onConsole = (message: ConsoleMessage) => {
			if (message.type() === "error") {
				consoleErrors.push(message.text());
			}
		};
		const onPageError = (error: Error) => {
			pageErrors.push(error.message);
		};
		const onRequestFailed = (request: Request) => {
			failedRequests.push(
				`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "unknown failure"}`,
			);
		};
		const onResponse = (response: Response) => {
			if (
				response.status() >= 400 &&
				!allowedResponses.has(responseKey(response))
			) {
				badResponses.push(`${response.status()} ${response.url()}`);
			}
		};

		page.on("console", onConsole);
		page.on("pageerror", onPageError);
		page.on("requestfailed", onRequestFailed);
		page.on("response", onResponse);

		await use({
			allowConsoleError: (message) => {
				allowedConsoleErrors.add(message);
			},
			allowResponse: (path, status) => {
				allowedResponses.add(`${status} ${path}`);
			},
		});

		await page.waitForTimeout(50);
		expect(
			consoleErrors.filter((message) => !allowedConsoleErrors.has(message)),
			"browser console errors",
		).toEqual([]);
		expect(pageErrors, "uncaught page errors").toEqual([]);
		expect(failedRequests, "failed browser requests").toEqual([]);
		expect(badResponses, "unexpected HTTP error responses").toEqual([]);
	},
});

export { expect } from "@playwright/test";

export async function expectSuccessfulNavigation(
	page: Page,
	path: string,
): Promise<void> {
	const response = await page.goto(path);
	expect(response, `navigation response for ${path}`).not.toBeNull();
	expect(response?.status(), `HTTP status for ${path}`).toBe(200);
}
