import { readFile, writeFile } from "node:fs/promises";

const notFoundPath = "dist/client/404.html";
const notFoundDocument = await readFile(notFoundPath, "utf8");
const staticNotFoundDocument = notFoundDocument
	.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
	.replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "");

if (!staticNotFoundDocument.includes("404: Page Not Found")) {
	throw new Error("Refusing to write a 404 document without the expected UI");
}

await writeFile(notFoundPath, staticNotFoundDocument);
console.log("Finalized hydration-free dist/client/404.html");
