export type UiTooltipShowEvent = "click" | "hover";
export type UiPlacementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface UiTooltipProps {
  position?: UiPlacementType;
  title?: string;
  text?: string;
  showEvent?: UiTooltipShowEvent;
  disabled?: boolean;
  popperClass?: string;
  timeout?: number;
  teleport?: string | boolean;
  isShowIconClose?: boolean;
  tabindex?: number;
}
