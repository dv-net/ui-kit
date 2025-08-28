import { Component } from "vue";

import { AvatarStatusType } from "../UiAvatar/types";
import { UiIconType } from "../UiIcon/types";

export interface ProfileMenuItem {
  name?: string;
  iconName?: string;
  iconColor?: string;
  iconType?: UiIconType;
  animationIcon?: Component;
  label?: string;
  isShow?: boolean;
  isActive?: boolean;
  action?: () => void;
  class?: () => string;
  id?: () => string;
}

export interface UiProfileMenuProps {
  userEmail: string | null;
  status?: AvatarStatusType;
  menuItems: ProfileMenuItem[][];
  avatar?: string;
}
