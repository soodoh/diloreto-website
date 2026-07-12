import netlifyPlugin from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		port: 3000,
	},
	plugins: [
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
			},
		}),
		netlifyPlugin(),
		tailwindcss(),
		viteReact(),
	],
});
