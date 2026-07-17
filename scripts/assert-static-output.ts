import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const outputDirectory = "dist/client";
const routesDirectory = "src/routes";
const requiredAssets = ["robots.txt", "favicon.png", "apple-touch-icon.png"];
const searchableExtensions = new Set([
	".css",
	".html",
	".js",
	".json",
	".txt",
	".xml",
]);
const forbiddenPatterns = [/\.netlify\/images/i, /netlify/i];

const files: string[] = [];
const routeFiles: string[] = [];

async function collectFiles(
	directory: string,
	results: string[],
): Promise<void> {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			await collectFiles(path, results);
		} else {
			results.push(path);
		}
	}
}

function routeOutputPath(routeFile: string): string | undefined {
	const routeId = relative(routesDirectory, routeFile)
		.slice(0, -extname(routeFile).length)
		.replaceAll(".", "/");

	if (routeId === "__root" || routeId.includes("$")) {
		return undefined;
	}

	const routeSegments = routeId
		.split("/")
		.filter(
			(segment) =>
				segment !== "index" &&
				!segment.startsWith("_") &&
				!(segment.startsWith("(") && segment.endsWith(")")),
		);
	const routePath = routeSegments.join("/");

	if (routePath === "404") {
		return "404.html";
	}

	return routePath ? `${routePath}/index.html` : "index.html";
}

await collectFiles(routesDirectory, routeFiles);
const requiredRouteFiles = routeFiles
	.filter((path) => extname(path) === ".tsx")
	.flatMap((path) => {
		const outputPath = routeOutputPath(path);
		return outputPath ? [outputPath] : [];
	});

for (const requiredFile of [...requiredRouteFiles, ...requiredAssets]) {
	const path = join(outputDirectory, requiredFile);
	if (!(await stat(path)).isFile()) {
		throw new Error(`Missing required static file: ${path}`);
	}
}

await collectFiles(outputDirectory, files);

for (const path of files) {
	const extension = extname(path);
	if (!searchableExtensions.has(extension)) {
		continue;
	}

	const contents = await readFile(path, "utf8");
	for (const pattern of forbiddenPatterns) {
		if (pattern.test(contents)) {
			throw new Error(
				`Forbidden deployment reference ${pattern} found in ${relative(outputDirectory, path)}`,
			);
		}
	}
}

const home = await readFile(join(outputDirectory, "index.html"), "utf8");
const history = await readFile(
	join(outputDirectory, "areyou/index.html"),
	"utf8",
);
const notFound = await readFile(join(outputDirectory, "404.html"), "utf8");

if (!home.includes("<picture") || !history.includes("<picture")) {
	throw new Error(
		"Responsive picture markup is missing from prerendered pages",
	);
}
if (!/srcset=/i.test(home) || !/srcset=/i.test(history)) {
	throw new Error(
		"Responsive image srcsets are missing from prerendered pages",
	);
}
if (!notFound.includes("404: Page Not Found")) {
	throw new Error("The custom 404 document is missing its expected content");
}
if (/<script\b/i.test(notFound)) {
	throw new Error("The custom 404 document must not contain hydration scripts");
}
if (/<link\b(?=[^>]*\brel=["']modulepreload["'])/i.test(notFound)) {
	throw new Error("The custom 404 document must not contain module preloads");
}

const totalBytes = (
	await Promise.all(files.map(async (path) => (await stat(path)).size))
).reduce((total, size) => total + size, 0);

console.log(
	`Static output verified: ${requiredRouteFiles.length} routes, ${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MiB`,
);
