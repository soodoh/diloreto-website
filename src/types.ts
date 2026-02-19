export type ContentfulImage = {
  url: string;
  title: string;
  width: number;
  height: number;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  link?: string;
  description?: string;
  thumbnail: ContentfulImage;
  fullSize: ContentfulImage;
};

export type Person = {
  id: string;
  order: number;
  firstName: string;
  fullName: string;
  email: string;
  link?: string;
  portrait: ContentfulImage;
  bio?: string;
};

export type HistoryRecord = {
  id: string;
  year: number;
  title: string;
  content: string;
  link?: string;
  photos: GalleryPhoto[];
};

export type HomePageData = {
  contactThumbnail: ContentfulImage;
  familyHistoryThumbnail: ContentfulImage;
  photosThumbnail: ContentfulImage;
};
