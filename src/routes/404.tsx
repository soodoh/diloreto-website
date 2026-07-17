import { createFileRoute } from "@tanstack/react-router";
import NotFound from "~/components/not-found";

export const Route = createFileRoute("/404")({
	head: () => ({
		meta: [
			{ title: "Page Not Found | The DiLoreto Family" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: NotFound,
});
