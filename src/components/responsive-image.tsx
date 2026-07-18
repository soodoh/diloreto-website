import type { ImgHTMLAttributes, JSX } from "react";
import type { ContentImage } from "~/content/image";
import { cn } from "~/lib/utils";

type ResponsiveImageProps = Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	"alt" | "height" | "src" | "srcSet" | "width"
> & {
	image: ContentImage;
	pictureClassName?: string;
};

const mimeType = (format: string): string =>
	`image/${format === "jpg" ? "jpeg" : format}`;

export default function ResponsiveImage({
	image,
	className,
	pictureClassName,
	loading = "lazy",
	decoding = "async",
	...imageProps
}: ResponsiveImageProps): JSX.Element {
	return (
		<picture className={cn("block", pictureClassName)}>
			{Object.entries(image.sources).map(([format, srcSet]) => (
				<source
					key={format}
					type={mimeType(format)}
					srcSet={srcSet}
					sizes={imageProps.sizes}
				/>
			))}
			<img
				{...imageProps}
				src={image.img.src}
				alt={image.alt}
				width={image.img.w}
				height={image.img.h}
				loading={loading}
				decoding={decoding}
				className={className}
			/>
		</picture>
	);
}
