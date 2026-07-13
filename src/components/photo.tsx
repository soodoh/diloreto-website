import { Image } from "@unpic/react";
import type { JSX } from "react";
import type { ContentImage } from "~/content/image";

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
				<Image
					src={data.src}
					alt={data.title}
					layout="constrained"
					width={data.width}
					height={data.height}
					fallback="netlify"
				/>
			</Wrapper>
		</div>
	);
}
