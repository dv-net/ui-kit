export const defaultChatMessage = (message: string, dateNow: string) => {
  return {
    id: 0,
    ticket_id: 0,
    message,
    created_at: dateNow,
    updated_at: dateNow,
    files: [],
    attachments: [],
    user: { uuid: "", avatar: null, telegram: null, email: "", name: null }
  };
};

export const ATTACH_MAX_FILES: number = 10;
export const ATTACH_FORMATS: string = "jpg, jpeg, png, heic & heif";