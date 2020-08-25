export interface Markdown {
  childMarkdownRemark: {
    html: string;
  };
}

export interface Image {
  fluid: any;
  srcSet: string[];
  src: string;
  title: string;
}

export interface GalleryPhoto {
  id: string;
  thumbnail: Image;
  title: string;
  link?: string;
  description?: string;
}

export interface Person {
  firstName: string;
  email: string;
  link?: string;
}
