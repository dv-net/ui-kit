export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt';

export type Orientation = "horizontal" | "vertical";

export interface UiDrawerProps {
  direction?: DrawerDirection,
  size?: string,
  drawerClass?: string
}