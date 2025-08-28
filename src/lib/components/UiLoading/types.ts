import { UiIconSize, UiIconType } from "../UiIcon/types";

export interface UiLoadingProps {
  isShow: boolean;
  iconName?: string;
  iconSize?: UiIconSize;
  iconType?: UiIconType;
  iconColor?: string;
  filled?: boolean;
}
