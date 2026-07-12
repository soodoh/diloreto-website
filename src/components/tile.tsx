import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import type { JSX } from "react";
import type { SiteImage } from "~/content/image";

type TileProps = {
	image: SiteImage;
	label: string;
	onClick?: () => void;
	link?: string;
	delay?: number;
};

export default function Tile({
	image,
	label,
	onClick,
	link,
	delay = 0,
}: TileProps): JSX.Element {
	const content = (
		<button
			type="button"
			onClick={onClick}
			className="group relative cursor-pointer overflow-hidden border-none p-0 w-full grayscale hover:grayscale-0 focus:grayscale-0 transition-[filter] duration-500 bg-black animate-fade-in"
			style={{ animationDelay: `${delay}ms` }}
		>
			<Image
				src={image.url}
				alt={image.title}
				layout="constrained"
				width={400}
				height={400}
				className="w-full h-full object-cover aspect-square"
			/>

			{label && (
				<div className="absolute bottom-0 left-0 right-0 h-1/3 max-sm:h-auto flex items-center justify-center bg-black/50 scale-0 group-hover:scale-100 group-focus:scale-100 [@media(hover:none)]:scale-100 transition-transform duration-300 origin-bottom">
					<span className="font-serif text-primary-contrast text-3xl max-sm:text-xl text-center overflow-hidden text-ellipsis p-2">
						{label}
					</span>
				</div>
			)}
		</button>
	);

	if (link) {
		return <Link to={link}>{content}</Link>;
	}

	return content;
}
