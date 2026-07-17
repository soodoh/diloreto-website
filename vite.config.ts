import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools, resolveConfigs } from "vite-imagetools";

const responsiveWidths = "320;640;960;1440;2160";

const fallbackFormat = (pathname: string): string => {
	const extension = pathname.split(".").at(-1)?.toLowerCase();
	return extension === "gif" || extension === "png" ? extension : "jpeg";
};

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		port: 3000,
	},
	plugins: [
		imagetools({
			include: /\.(?:heif|avif|jpeg|jpg|png|tiff|webp|gif)(?:\?.*)?$/i,
			defaultDirectives: (url) => {
				if (!url.searchParams.has("responsive")) {
					return new URLSearchParams();
				}

				return new URLSearchParams({
					w: responsiveWidths,
					format: `webp;${fallbackFormat(url.pathname)}`,
					quality: "82",
					as: "picture",
				});
			},
			resolveConfigs: (entries, outputFormats) => {
				const configs = resolveConfigs(entries, outputFormats);
				const formats = entries.find(([key]) => key === "format")?.[1];
				const widths = entries.find(([key]) => key === "w")?.[1];
				const fallback = formats?.at(-1);
				const fallbackWidth =
					widths?.filter((width) => Number(width) <= 960).at(-1) ??
					widths?.at(-1);

				return configs.filter(
					(config) => config.format !== fallback || config.w === fallbackWidth,
				);
			},
		}),
		tanstackStart({
			pages: [
				{
					path: "/404",
					prerender: { outputPath: "/404.html", crawlLinks: false },
				},
			],
			prerender: {
				enabled: true,
				autoStaticPathsDiscovery: true,
				crawlLinks: false,
				failOnError: true,
			},
		}),
		tailwindcss(),
		viteReact(),
	],
});
