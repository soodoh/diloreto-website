import { Image } from "@unpic/react";
import type { JSX } from "react";
import type { GalleryPhoto } from "~/content/family-history";

type PhotoProps = {
	data: GalleryPhoto;
	link?: string;
	openPhoto: (id: string) => void;
};

export default function Photo({
	data,
	link,
	openPhoto,
}: PhotoProps): JSX.Element {
	const Wrapper = link ? "a" : "div";

	return (
		<div className="mt-6 text-center">
			{data.description &&
				(link ? (
					<a href={link} className="text-sm no-underline italic">
						{data.description}
					</a>
				) : (
					<span className="text-sm italic">{data.description}</span>
				))}

			<Wrapper
				href={link}
				onClick={link ? undefined : () => openPhoto(data.id)}
				className="block max-w-[300px] mx-auto cursor-pointer"
			>
				<Image
					src={data.thumbnail.url}
					alt={data.title}
					layout="constrained"
					width={300}
					height={Math.round(
						300 * (data.thumbnail.height / data.thumbnail.width),
					)}
				/>
			</Wrapper>
		</div>
	);
}
