import type { JSX } from "react";
import type { ContentImage } from "~/content/image";
import ResponsiveImage from "./responsive-image";

type PhotoProps = {
	data: ContentImage;
	link?: string;
	openPhoto: (photo: ContentImage) => void;
};

export default function Photo({
	data,
	link,
	openPhoto,
}: PhotoProps): JSX.Element {
	const Wrapper = link ? "a" : "div";

	return (
		<div className="mt-6 text-center">
			{link ? (
				<a href={link} className="text-sm no-underline italic">
					{data.title}
				</a>
			) : (
				<span className="text-sm italic">{data.title}</span>
			)}

			<Wrapper
				href={link}
				onClick={link ? undefined : () => openPhoto(data)}
				className="block max-w-[300px] mx-auto cursor-pointer"
			>
				<ResponsiveImage
					image={data}
					sizes="(max-width: 320px) 100vw, 300px"
					className="h-auto w-full object-contain"
				/>
			</Wrapper>
		</div>
	);
}
