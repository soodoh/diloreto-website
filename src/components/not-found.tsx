import { Link } from "@tanstack/react-router";
import type { JSX } from "react";

export default function NotFound(): JSX.Element {
	return (
		<main className="p-4">
			<h1 className="font-serif text-3xl mb-4">404: Page Not Found</h1>
			<p className="font-serif text-xl mb-4">Please check your URL.</p>
			<Link to="/" className="font-serif text-xl text-primary">
				Return to the home page
			</Link>
		</main>
	);
}
