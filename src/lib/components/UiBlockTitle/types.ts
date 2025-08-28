export interface UiBlockTitleLink {
  path: string;
  title: string;
}

export interface UiBlockTitleProps {
  title?: string;
  links: UiBlockTitleLink[];
}
