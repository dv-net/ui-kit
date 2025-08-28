import { UiPlacementType } from "@/lib/components/UiTooltip/types.ts";

export interface UiConfirmProps {
  method?: () => Promise<unknown>;
  text?: string;
  title?: string;
  tooltipText?: string;
  tooltipTitle?: string;
  popperClass?: string;
  position?: UiPlacementType;
  isDisableSuccessButton?: boolean;
}
