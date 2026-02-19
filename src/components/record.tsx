import ReactMarkdown from "react-markdown";
import Photo from "./photo";
import HistoryGallery from "./history-gallery";
import type { HistoryRecord } from "~/types";

type RecordProps = {
  data: HistoryRecord;
  openPhoto: (id: string) => void;
  isEven: boolean;
};

export default function Record({
  data,
  openPhoto,
  isEven,
}: RecordProps): JSX.Element {
  const hasPhotos = Array.isArray(data.photos) && data.photos.length > 0;
  const hasGallery = hasPhotos && data.photos.length > 1;

  const markdownColSpan = (() => {
    if (hasGallery || !hasPhotos) {
      return "col-span-3";
    }
    if (isEven) {
      return "col-start-2 col-span-2";
    }
    return "col-start-1 col-span-2";
  })();

  const photoCol = isEven ? "col-start-1 col-span-1" : "col-start-3 col-span-1";

  return (
    <div className={`p-4 ${isEven ? "bg-white" : "bg-bg-dark"}`}>
      <h1 className="font-serif italic text-primary text-5xl text-center">
        {data.title}
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {hasPhotos && !hasGallery && (
          <div
            className={`row-start-1 ${photoCol} max-sm:row-start-auto max-sm:col-span-3`}
          >
            <Photo
              data={data.photos[0]}
              link={data.link}
              openPhoto={openPhoto}
            />
          </div>
        )}

        <div
          className={`row-start-1 ${markdownColSpan} max-sm:row-start-auto max-sm:col-span-3`}
        >
          <div className="font-serif markdown-content">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
        </div>

        {hasPhotos && hasGallery && (
          <HistoryGallery
            className="col-span-3 row-start-2 max-sm:row-start-auto"
            data={data}
            openPhoto={openPhoto}
          />
        )}
      </div>
    </div>
  );
}
