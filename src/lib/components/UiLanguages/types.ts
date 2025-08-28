export interface Locale {
  id: number;
  name: string;
  isoCode: string;
  nativeName?: string;
}

export interface UiLanguagesProps {
  locales: Locale[];
  disabled?: boolean;
  minNumbersLocalesDisplayFavorites?: number;
  forHeader?: boolean;
  isHidden?: boolean;
}

export interface UiLanguagesButtonProps {
  locale: Locale
  selected: Locale
}
