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

export enum UiChatTicketStatusValue {
  MANAGER_CLOSED = 5,
  USER_CLOSED = 4,
  USER_WAITING = 3,
  IN_PROGRESS = 2,
  MANAGER_WAITING = 1,
}

export interface UiChatTicketStatus {
  name: string;
  value: UiChatTicketStatusValue;
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

export interface UiChatSubmitPayload {
  message: string;
  files: File[];
}

export interface UiChatProps {
  ticket: UiChatTicket | null | undefined;
  messages?: UiChatMessage[];
  currentUserUuid?: string;
  showManagerAlert?: boolean;
  managerAlertSeconds?: number;
  ticketLoading?: boolean;
  isCreateTicket?: boolean;
  sendingLoading?: boolean;
}
