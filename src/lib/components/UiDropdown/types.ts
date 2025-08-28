import type { OffsetOptions } from "@floating-ui/vue";

import { UiPlacementType } from "@/lib/components/UiTooltip/types.ts";

export type UiDropdownTrigger = "click" | "hover";
export type UiDropdownMode = "custom";

export interface UiDropdownProps {
  popperClass?: string | string[];
  offset?: OffsetOptions;
  disabled?: boolean;
  trigger?: UiDropdownTrigger;
  fitContentWidth?: boolean;
  placement?: UiPlacementType;
  teleport?: string | boolean;
  mode?: UiDropdownMode;
}
