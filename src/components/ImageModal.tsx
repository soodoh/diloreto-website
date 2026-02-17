import { useCallback, useEffect, useRef } from 'react'
import { Image } from '@unpic/react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from '~/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '~/components/ui/carousel'
import type { GalleryPhoto } from '~/types'

interface ImageModalProps {
  onChange: (index: number) => void
  onClose: () => void
  images: GalleryPhoto[]
  photoIndex: number | null
}

export default function ImageModal({ onChange, onClose, images, photoIndex }: ImageModalProps) {
  const currentPhoto = photoIndex !== null ? images[photoIndex] : null
  const apiRef = useRef<CarouselApi>(null)

  const handleSetApi = useCallback(
    (api: CarouselApi) => {
      if (!api) return
      apiRef.current = api
      api.on('select', () => {
        onChange(api.selectedScrollSnap())
      })
    },
    [onChange],
  )

  // Sync carousel position when photoIndex changes externally
  useEffect(() => {
    const api = apiRef.current
    if (!api || photoIndex === null) return
    if (api.selectedScrollSnap() !== photoIndex) {
      api.scrollTo(photoIndex, true)
    }
  }, [photoIndex])

  // Arrow key navigation at document level (carousel's built-in handler requires focus on its div)
  useEffect(() => {
    if (photoIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const api = apiRef.current
      if (!api) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        api.scrollPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        api.scrollNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [photoIndex])

  return (
    <Dialog open={photoIndex !== null} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center outline-none"
        >
          <DialogTitle className="sr-only">
            {currentPhoto?.title || 'Photo'}
          </DialogTitle>

          {/* Close button */}
          <DialogPrimitive.Close className="absolute top-4 right-4 z-10 p-2 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <Carousel
            className="w-full h-full"
            opts={{ startIndex: photoIndex ?? 0 }}
            setApi={handleSetApi}
          >
            <CarouselContent className="-ml-0 h-full">
              {images.map((photo) => (
                <CarouselItem
                  key={photo.id}
                  className="flex flex-col items-center justify-center pl-0 h-full"
                >
                  <div className="flex items-center justify-center" style={{ width: '85vw', height: '80vh' }}>
                    <Image
                      src={photo.fullSize.url}
                      alt={photo.title}
                      layout="constrained"
                      width={photo.fullSize.width}
                      height={photo.fullSize.height}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                  </div>
                  {photo.description && (
                    <p className="text-white text-center text-sm mt-2 px-4 max-w-2xl">
                      {photo.description}
                    </p>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4 bg-black/50 border-none text-white hover:bg-black/70 hover:text-white disabled:opacity-30 size-10" />
            <CarouselNext className="right-4 bg-black/50 border-none text-white hover:bg-black/70 hover:text-white disabled:opacity-30 size-10" />
          </Carousel>

          {currentPhoto && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {(photoIndex ?? 0) + 1} / {images.length}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
