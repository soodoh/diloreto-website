import { XIcon } from "lucide-react";
import type { JSX, KeyboardEvent, RefObject } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ResponsiveImage from "~/components/responsive-image";
import { Button } from "~/components/ui/button";
import type { CarouselApi } from "~/components/ui/carousel";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "~/components/ui/dialog";
import type { ContentImage } from "~/content/image";

type ImageModalProps = {
	onClose: () => void;
	images: ContentImage[];
	photoIndex: number | undefined;
	restoreFocusRef: RefObject<HTMLElement | null>;
};

const modalImageSizes = (photo: ContentImage): string => {
	const aspectRatio = photo.img.w / photo.img.h;
	const heightBasedWidth = `calc(${(aspectRatio * 100).toFixed(2)}vh - ${(aspectRatio * 6).toFixed(2)}rem)`;
	const fittedWidth = `min(calc(100vw - 2rem), ${heightBasedWidth})`;

	return aspectRatio < 1
		? `(max-width: 640px) ${fittedWidth}, calc(100vw - 1px)`
		: fittedWidth;
};

export default function ImageModal({
	onClose,
	images,
	photoIndex,
	restoreFocusRef,
}: ImageModalProps): JSX.Element {
	const requestedIndex = photoIndex ?? 0;
	const [api, setApi] = useState<CarouselApi>();
	const [displayedIndex, setDisplayedIndex] = useState(requestedIndex);
	const [preloadAdjacentTo, setPreloadAdjacentTo] = useState<number>();
	const isOpen = photoIndex !== undefined;
	const currentPhoto = images[displayedIndex];
	const carouselOpts = useMemo(
		() => ({ startIndex: requestedIndex, watchDrag: true }),
		[requestedIndex],
	);

	const handleSetApi = useCallback((carouselApi: CarouselApi) => {
		if (!carouselApi) {
			return;
		}
		setApi(carouselApi);
		setDisplayedIndex(carouselApi.selectedScrollSnap());
	}, []);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (!api) {
				return;
			}

			if (event.key === "ArrowLeft") {
				event.preventDefault();
				event.stopPropagation();
				api.scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				event.stopPropagation();
				api.scrollNext();
			}
		},
		[api],
	);

	useEffect(() => {
		if (!api) {
			return;
		}

		const handleSelect = () => {
			const selectedIndex = api.selectedScrollSnap();
			setDisplayedIndex(selectedIndex);
			setPreloadAdjacentTo(selectedIndex);
		};

		api.on("select", handleSelect);
		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				onKeyDownCapture={handleKeyDown}
				restoreFocusRef={restoreFocusRef}
				showCloseButton={false}
				overlayClassName="bg-black/80"
				className="inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none max-h-screen h-full w-full overflow-hidden rounded-none border-none bg-black/95 p-0 shadow-none gap-0 flex flex-col data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100"
			>
				<DialogTitle className="sr-only">
					{currentPhoto?.title ?? "Image Gallery"}
				</DialogTitle>
				<DialogDescription className="sr-only">
					Viewing image {displayedIndex + 1} of {images.length}
				</DialogDescription>

				<Carousel
					className="flex-1 min-h-0 flex flex-col"
					opts={carouselOpts}
					setApi={handleSetApi}
				>
					<DialogClose asChild>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Close image modal"
							className="absolute top-3 right-3 z-10 text-white/70 hover:text-white hover:bg-white/10"
						>
							<XIcon className="size-5" />
						</Button>
					</DialogClose>

					<CarouselContent className="ml-0 h-full">
						{images.map((photo, index) => {
							const isDisplayed = index === displayedIndex;
							const shouldPreload =
								preloadAdjacentTo === displayedIndex &&
								Math.abs(index - displayedIndex) === 1;

							return (
								<CarouselItem
									key={photo.img.src}
									aria-hidden={!isDisplayed}
									className="h-full p-4"
								>
									<div className="h-full min-h-0 flex flex-col items-center">
										<div className="min-h-0 w-full flex-1">
											{isDisplayed || shouldPreload ? (
												<ResponsiveImage
													image={photo}
													sizes={modalImageSizes(photo)}
													loading={isDisplayed ? "eager" : "lazy"}
													fetchPriority={isDisplayed ? "high" : "low"}
													onLoad={
														isDisplayed
															? () => setPreloadAdjacentTo(index)
															: undefined
													}
													pictureClassName="size-full"
													className="size-full object-contain"
												/>
											) : null}
										</div>
										<p className="mt-2 max-w-2xl shrink-0 px-4 text-center text-white/80 text-sm">
											{photo.title}
										</p>
									</div>
								</CarouselItem>
							);
						})}
					</CarouselContent>

					<CarouselPrevious
						variant="ghost"
						className="left-2 top-1/2 -translate-y-1/2 size-10 border-none text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-0"
					/>
					<CarouselNext
						variant="ghost"
						className="right-2 top-1/2 -translate-y-1/2 size-10 border-none text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-0"
					/>
				</Carousel>

				<div
					data-slot="gallery-indicator"
					className="pb-3 text-center text-white/70 text-sm"
				>
					{displayedIndex + 1} / {images.length}
				</div>
				<div
					data-slot="gallery-status"
					role="status"
					aria-live="polite"
					aria-atomic="true"
					className="sr-only"
				>
					{currentPhoto
						? `${currentPhoto.alt}. Image ${displayedIndex + 1} of ${images.length}.`
						: ""}
				</div>
			</DialogContent>
		</Dialog>
	);
}
