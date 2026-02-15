import { useEffect, useState } from 'react'
import { Image } from '@unpic/react'
import type { GalleryPhoto } from '~/types'

interface ImageModalProps {
  onChange: (index: number) => void
  onClose: () => void
  images: GalleryPhoto[]
  photoIndex: number | null
}

export default function ImageModal({ onChange, onClose, images, photoIndex }: ImageModalProps) {
  const currentPhoto = photoIndex !== null ? images[photoIndex] : null
  const [windowAspectRatio, setWindowRatio] = useState(1)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setWindowRatio(window.innerWidth / window.innerHeight)
  }, [])

  useEffect(() => {
    if (photoIndex === null) return

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft' && photoIndex > 0) {
        onChange(photoIndex - 1)
      } else if (event.key === 'ArrowRight' && photoIndex <= images.length - 2) {
        onChange(photoIndex + 1)
      }
    }

    const handleResize = () => {
      setWindowRatio(window.innerWidth / window.innerHeight)
    }

    window.addEventListener('keydown', handleKeys)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeys)
      window.removeEventListener('resize', handleResize)
    }
  }, [photoIndex, images.length, onChange, onClose])

  if (!currentPhoto || photoIndex === null) return null

  const imageAspectRatio = currentPhoto.fullSize.width / currentPhoto.fullSize.height
  const useFullWidth = windowAspectRatio < imageAspectRatio && ((windowAspectRatio > 1 && imageAspectRatio > 1) || imageAspectRatio < 1)
  const width = useFullWidth ? '100%' : `calc(90vh * ${imageAspectRatio})`

  return (
    <div
      className="fixed inset-0 z-[1300] bg-black/80 flex items-center"
      onClick={onClose}
    >
      <button
        className="p-2 text-secondary disabled:opacity-30 bg-transparent border-none cursor-pointer"
        disabled={photoIndex < 1}
        onClick={e => {
          e.stopPropagation()
          onChange(photoIndex - 1)
        }}
        aria-label="Previous photo"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="flex-1 my-4 flex flex-col items-center">
        <div className="flex w-full items-center justify-between" style={{ width }}>
          <span className="text-secondary text-base">
            {`${photoIndex + 1} / ${images.length}`}
          </span>
          <button
            className="p-2 text-secondary bg-transparent border-none cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ width }} onClick={e => e.stopPropagation()}>
          <Image
            src={currentPhoto.fullSize.url}
            alt={currentPhoto.title}
            layout="constrained"
            width={currentPhoto.fullSize.width}
            height={currentPhoto.fullSize.height}
          />
        </div>

        <p className="text-secondary text-center text-base mt-2" style={{ width }}>
          {currentPhoto.description}
        </p>
      </div>

      <button
        className="p-2 text-secondary disabled:opacity-30 bg-transparent border-none cursor-pointer"
        disabled={photoIndex >= images.length - 1}
        onClick={e => {
          e.stopPropagation()
          onChange(photoIndex + 1)
        }}
        aria-label="Next photo"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}
