import { UiIconSize, UiIconType } from "@/lib/components/UiIcon/types.ts";

export interface UiCopyTextProps {
  copiedText: string | number;
  colorIcon?: string;
  timeout?: number;
  typeIcon?: UiIconType;
  sizeIcon?: UiIconSize;
  nameIcon?: string;
}
