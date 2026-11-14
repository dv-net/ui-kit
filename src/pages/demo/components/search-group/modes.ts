export type ViewModeId = "row" | "grid" | "table" | "auto";

export type ViewMode = {
  id: ViewModeId;
  label: string;
  icon: string;
};

export const viewModes: ViewMode[] = [
  { id: "row", label: "Row", icon: "list" },
  { id: "grid", label: "Grid", icon: "grid-view  1" },
  { id: "table", label: "Table", icon: "menu  1" },
  { id: "auto", label: "Auto", icon: "motion-photos_auto  1" }
];
