export type AvatarStatusType = "success" | "pending" | "reject";
export type AvatarSizeType = "sm" | "md" | "lg";

export interface UiAvatarProps {
  avatar?: string;
  email: string | null;
  size?: AvatarSizeType;
  status?: AvatarStatusType;
  clickable?: boolean;
}
