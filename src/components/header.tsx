import { Link } from "@tanstack/react-router";
import type { JSX } from "react";

type HeaderProps = {
	isHome: boolean;
};

export default function Header({ isHome }: HeaderProps): JSX.Element {
	return (
		<header
			className={`
        sticky z-50 bg-primary
        ${isHome ? "bottom-0" : "top-0"}
      `}
		>
			<div className="flex justify-center py-4">
				<Link
					to="/"
					className="font-serif italic text-primary-contrast text-5xl max-sm:text-3xl whitespace-nowrap overflow-hidden no-underline cursor-pointer"
				>
					The DiLoreto Family
				</Link>
			</div>
		</header>
	);
}
