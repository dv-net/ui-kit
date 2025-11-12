export interface UiGalleryProps<T> {
  images: Array<{ url?: string; file?: File } & T>;
}
