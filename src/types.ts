export interface ContentfulImage {
  url: string
  title: string
  width: number
  height: number
}

export interface GalleryPhoto {
  id: string
  title: string
  link?: string
  description?: string
  thumbnail: ContentfulImage
  fullSize: ContentfulImage
}

export interface Person {
  id: string
  order: number
  firstName: string
  fullName: string
  email: string
  link?: string
  portrait: ContentfulImage
  bio?: string
}

export interface HistoryRecord {
  id: string
  year: number
  title: string
  content: string
  link?: string
  photos: GalleryPhoto[]
}

export interface HomePageData {
  contactThumbnail: ContentfulImage
  familyHistoryThumbnail: ContentfulImage
  photosThumbnail: ContentfulImage
}
