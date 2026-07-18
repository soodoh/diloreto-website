import type { JSX } from "react";
import type { ContentImage } from "~/content/image";
import ResponsiveImage from "./responsive-image";

export type OpenPhoto = (
	photo: ContentImage,
	trigger: HTMLButtonElement,
) => void;

type PhotoProps = {
	data: ContentImage;
	link?: string;
	openPhoto: OpenPhoto;
};

export default function Photo({
	data,
	link,
	openPhoto,
}: PhotoProps): JSX.Element {
	const image = (
		<ResponsiveImage
			image={data}
			sizes="(max-width: 320px) 100vw, 300px"
			className="h-auto w-full object-contain"
		/>
	);

	return (
		<div className="mt-6 text-center">
			{link ? (
				<a href={link} className="text-sm no-underline italic">
					{data.title}
				</a>
			) : (
				<span className="text-sm italic">{data.title}</span>
			)}

			{link ? (
				<a href={link} className="block max-w-[300px] mx-auto">
					{image}
				</a>
			) : (
				<button
					type="button"
					onClick={(event) => openPhoto(data, event.currentTarget)}
					aria-label={`View ${data.alt}`}
					className="m-0 block w-full max-w-[300px] appearance-none border-0 bg-transparent p-0 mx-auto cursor-pointer text-inherit [font:inherit] [letter-spacing:inherit] [line-height:inherit] [text-align:inherit] [word-spacing:inherit]"
				>
					{image}
				</button>
			)}
		</div>
	);
}
