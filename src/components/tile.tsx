import { Link } from "@tanstack/react-router";
import type { JSX, MouseEventHandler } from "react";
import type { ContentImage } from "~/content/image";
import ResponsiveImage from "./responsive-image";

type TileContentProps = {
	image: ContentImage;
	label: string;
	delay?: number;
	priority?: boolean;
};

type TileProps = TileContentProps &
	(
		| { link: string; onClick?: never }
		| { link?: never; onClick: MouseEventHandler<HTMLButtonElement> }
		| { link?: never; onClick?: never }
	);

export default function Tile({
	image,
	label,
	onClick,
	link,
	delay = 0,
	priority = false,
}: TileProps): JSX.Element {
	const className =
		"group relative overflow-hidden border-none p-0 w-full grayscale hover:grayscale-0 focus:grayscale-0 transition-[filter] duration-500 bg-transparent animate-fade-in";
	const style = { animationDelay: `${delay}ms` };
	const content = (
		<>
			<ResponsiveImage
				image={image}
				sizes="(max-width: 640px) calc(50vw - 12px), (max-width: 1216px) calc(33vw - 12px), 400px"
				loading={priority ? "eager" : "lazy"}
				fetchPriority={priority ? "high" : "auto"}
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
		</>
	);

	if (link) {
		return (
			<Link to={link} data-slot="tile" className="group">
				<span
					className={`${className} inline-block cursor-pointer group-focus:grayscale-0`}
					style={style}
				>
					{content}
				</span>
			</Link>
		);
	}

	if (onClick) {
		return (
			<button
				type="button"
				onClick={onClick}
				data-slot="tile"
				className={`${className} cursor-pointer`}
				style={style}
			>
				{content}
			</button>
		);
	}

	return (
		<div
			data-slot="tile"
			className={`${className} flex items-center justify-center`}
			style={style}
		>
			{content}
		</div>
	);
}
