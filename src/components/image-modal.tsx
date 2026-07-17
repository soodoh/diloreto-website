import { XIcon } from "lucide-react";
import type { JSX } from "react";
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
	onChange: (index: number) => void;
	onClose: () => void;
	images: ContentImage[];
	photoIndex: number | undefined;
};

export default function ImageModal({
	onChange,
	onClose,
	images,
	photoIndex,
}: ImageModalProps): JSX.Element {
	const [api, setApi] = useState<CarouselApi>();
	const [currentIndex, setCurrentIndex] = useState(0);
	const isOpen = photoIndex !== undefined;
	const currentPhoto = images[currentIndex];
	const carouselOpts = useMemo(() => ({ watchDrag: true }), []);

	const handleSetApi = useCallback((carouselApi: CarouselApi) => {
		setApi(carouselApi);
	}, []);

	useEffect(() => {
		if (!api) {
			return;
		}

		const handleSelect = () => {
			const selectedIndex = api.selectedScrollSnap();
			setCurrentIndex(selectedIndex);
			if (selectedIndex !== photoIndex) {
				onChange(selectedIndex);
			}
		};

		api.on("select", handleSelect);
		return () => {
			api.off("select", handleSelect);
		};
	}, [api, onChange, photoIndex]);

	useEffect(() => {
		if (!isOpen || !api || photoIndex === undefined) {
			return;
		}

		if (api.selectedScrollSnap() !== photoIndex) {
			api.scrollTo(photoIndex, true);
		}

		setCurrentIndex(api.selectedScrollSnap());
	}, [api, isOpen, photoIndex]);

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				showCloseButton={false}
				overlayClassName="bg-black/80"
				className="inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none max-h-screen h-full w-full overflow-hidden rounded-none border-none bg-black/95 p-0 shadow-none gap-0 flex flex-col data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100"
			>
				<DialogTitle className="sr-only">
					{currentPhoto?.title || "Image Gallery"}
				</DialogTitle>
				<DialogDescription className="sr-only">
					Viewing image {currentIndex + 1} of {images.length}
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
						{images.map((photo) => (
							<CarouselItem key={photo.img.src} className="h-full p-4">
								<div className="h-full min-h-0 flex flex-col items-center">
									<div className="min-h-0 w-full flex-1">
										<ResponsiveImage
											image={photo}
											sizes="100vw"
											pictureClassName="size-full"
											className="size-full object-contain"
										/>
									</div>
									<p className="mt-2 max-w-2xl shrink-0 px-4 text-center text-white/80 text-sm">
										{photo.title}
									</p>
								</div>
							</CarouselItem>
						))}
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

				<div className="pb-3 text-center text-white/70 text-sm">
					{currentIndex + 1} / {images.length}
				</div>
			</DialogContent>
		</Dialog>
	);
}
