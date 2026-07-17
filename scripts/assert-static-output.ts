import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const outputDirectory = "dist/client";
const requiredFiles = [
	"index.html",
	"areyou/index.html",
	"404.html",
	"robots.txt",
	"favicon.png",
];
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

async function collectFiles(directory: string): Promise<void> {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			await collectFiles(path);
		} else {
			files.push(path);
		}
	}
}

for (const requiredFile of requiredFiles) {
	const path = join(outputDirectory, requiredFile);
	if (!(await stat(path)).isFile()) {
		throw new Error(`Missing required static file: ${path}`);
	}
}

await collectFiles(outputDirectory);

for (const path of files) {
	const extension = path.slice(path.lastIndexOf("."));
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

const totalBytes = (
	await Promise.all(files.map(async (path) => (await stat(path)).size))
).reduce((total, size) => total + size, 0);

console.log(
	`Static output verified: ${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MiB`,
);
