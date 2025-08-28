export interface UiDragAndDropProps {
  loading?: boolean;
  extensions?: string[];
  multiple?: boolean;
  id?: string;
}

export type FileToUpload = {
  id: string;
  file: File;
  percent: number;
  status: "default" | "loading" | "error" | "canceled";
  additionalInfo?: Record<string, unknown>;
};
