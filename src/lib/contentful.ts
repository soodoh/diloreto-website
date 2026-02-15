import { createClient, type Entry, type Asset } from 'contentful'
import { marked } from 'marked'
import type { ContentfulImage, GalleryPhoto, Person, HistoryRecord, HomePageData } from '~/types'

function getClient() {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
  })
}

function toImage(asset: Asset | undefined): ContentfulImage | undefined {
  if (!asset?.fields?.file) return undefined
  const file = asset.fields.file as { url: string; details: { image: { width: number; height: number } } }
  return {
    url: `https:${file.url}`,
    title: (asset.fields.title as string) || '',
    width: file.details.image.width,
    height: file.details.image.height,
  }
}

function markdownToHtml(content: unknown): string {
  if (typeof content === 'string') {
    return marked.parse(content, { async: false }) as string
  }
  if (content && typeof content === 'object' && 'fields' in content) {
    return (content as any).fields?.html || ''
  }
  return ''
}

export async function fetchPeople(): Promise<Person[]> {
  const client = getClient()
  const entries = await client.getEntries({
    content_type: 'people',
    order: ['fields.order'] as any,
  })

  return entries.items.map((item: Entry) => {
    const fields = item.fields as any
    const portrait = toImage(fields.portrait)

    return {
      id: item.sys.id,
      order: fields.order as number,
      firstName: fields.firstName as string,
      fullName: fields.fullName as string,
      email: fields.email as string,
      link: (fields.link as string) || undefined,
      portrait: portrait!,
      bio: fields.bio ? markdownToHtml(fields.bio) : undefined,
    }
  })
}

export async function fetchHomePage(): Promise<HomePageData> {
  const client = getClient()
  const entries = await client.getEntries({
    content_type: 'homePage',
    limit: 1,
  })

  const fields = entries.items[0].fields as any
  return {
    contactThumbnail: toImage(fields.contactThumbnail)!,
    familyHistoryThumbnail: toImage(fields.familyHistoryThumbnail)!,
    photosThumbnail: toImage(fields.photosThumbnail)!,
  }
}

export async function fetchFamilyHistory(): Promise<HistoryRecord[]> {
  const client = getClient()
  const entries = await client.getEntries({
    content_type: 'familyHistory',
    order: ['fields.year'] as any,
    include: 2,
  })

  return entries.items.map((item: Entry) => {
    const fields = item.fields as any
    const photos: GalleryPhoto[] = (fields.photos || [])
      .filter((photo: any) => !!photo?.fields)
      .map((photo: any) => {
        const pFields = photo.fields
        const file = pFields.file as { url: string; details: { image: { width: number; height: number } } }
        return {
          id: photo.sys.id,
          title: (pFields.title as string) || '',
          description: (pFields.description as string) || undefined,
          thumbnail: {
            url: `https:${file.url}`,
            title: (pFields.title as string) || '',
            width: file.details.image.width,
            height: file.details.image.height,
          },
          fullSize: {
            url: `https:${file.url}`,
            title: (pFields.title as string) || '',
            width: file.details.image.width,
            height: file.details.image.height,
          },
        }
      })

    return {
      id: item.sys.id,
      year: fields.year as number,
      title: fields.title as string,
      content: markdownToHtml(fields.content),
      link: (fields.link as string) || undefined,
      photos,
    }
  })
}
