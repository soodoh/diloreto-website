import { FluidObject, GatsbyImageFluidProps } from 'gatsby-image';

export interface Markdown {
  childMarkdownRemark: {
    html: string;
  };
}

export interface GalleryPhoto {
  id: string;
  title: string;
  link?: string;
  description?: string;
  thumbnail: FluidObject | FluidObject[];
  fullSize: FluidObject | FluidObject[];
}

export interface Person {
  id: string;
  order: number;
  firstName: string;
  fullName: string;
  email: string;
  link?: string;
  portrait: GatsbyImageFluidProps;
  bio?: Markdown;
}

export interface HistoryRecord {
  id: string;
  year: number;
  title: string;
  content: Markdown;
  link?: string;
  photos: GalleryPhoto[];
}
