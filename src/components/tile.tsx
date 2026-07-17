import { Link } from "@tanstack/react-router";
import type { JSX } from "react";
import type { ContentImage } from "~/content/image";
import ResponsiveImage from "./responsive-image";

type TileProps = {
	image: ContentImage;
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
			<ResponsiveImage
				image={image}
				sizes="(max-width: 640px) calc(50vw - 12px), (max-width: 1216px) calc(33vw - 12px), 400px"
				pictureClassName="w-full aspect-square"
				className="size-full object-cover"
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
