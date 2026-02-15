import Photo from './Photo'
import HistoryGallery from './HistoryGallery'
import type { HistoryRecord } from '~/types'

interface RecordProps {
  data: HistoryRecord
  openPhoto: (id: string) => void
  isEven: boolean
}

export default function Record({ data, openPhoto, isEven }: RecordProps) {
  const hasGallery = Array.isArray(data.photos) && data.photos.length > 1

  const markdownColSpan = (() => {
    if (hasGallery) return 'col-span-3'
    if (isEven) return 'col-start-2 col-span-2'
    return 'col-start-1 col-span-2'
  })()

  const photoCol = isEven ? 'col-start-1 col-span-1' : 'col-start-3 col-span-1'

  return (
    <div className={`p-4 ${isEven ? 'bg-white' : 'bg-bg-dark'}`}>
      <h1 className="font-serif italic text-primary text-5xl text-center animate-[fadeIn_0.6s_ease-out]">
        {data.title}
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {data.photos && !hasGallery && (
          <div className={`row-start-1 ${photoCol} max-sm:row-start-auto max-sm:col-span-3`}>
            <Photo data={data.photos[0]} link={data.link} openPhoto={openPhoto} />
          </div>
        )}

        <div className={`row-start-1 ${markdownColSpan} max-sm:row-start-auto max-sm:col-span-3`}>
          <div
            className="font-serif markdown-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>

        {data.photos && hasGallery && (
          <HistoryGallery
            className="col-span-3 row-start-2 max-sm:row-start-auto"
            data={data}
            openPhoto={openPhoto}
          />
        )}
      </div>
    </div>
  )
}
