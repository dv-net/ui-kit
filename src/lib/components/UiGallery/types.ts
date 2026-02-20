export interface UiGalleryImage {
  url?: string;
  file?: File;
}

export interface UiGalleryProps {
  images: UiGalleryImage[];
  initialIndex?: number;
}
