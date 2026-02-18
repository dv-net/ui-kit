export interface UiChatMessageUser {
  uuid: string;
  avatar: string | null;
  telegram: string | null;
  email: string;
  name: string | null;
}

export interface UiChatMessageAttachment {
  uuid: string;
  type: string;
  title: string;
  url: string;
  file_size: number;
}

export interface UiChatMessage {
  id: number;
  ticket_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  files: string[];
  attachments: UiChatMessageAttachment[];
  user: UiChatMessageUser;
}

export interface UiChatTicketStatus {
  name: string;
  value: number;
}

export interface UiChatTicket {
  id: number;
  subject: string;
  status: UiChatTicketStatus;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  messages_count: number;
  init_message: UiChatMessage;
  support_name: string;
}

export type ChatAction = "remind-ticket" | "change-operator" | "close-ticket";

export interface ChatActionOption {
  value: ChatAction;
  label: string;
  icon: string;
  color?: string;
}

export interface UiChatProps {
  ticket?: UiChatTicket;
  messages?: UiChatMessage[];
  currentUserUuid?: string;
}
