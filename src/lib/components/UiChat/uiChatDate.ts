import dayjs, { type Dayjs } from "dayjs";
import timezonePlugin from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { config } from "@/lib/config";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

const isValidTimezone = (timezone: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
};

export const resolveUiChatTimezone = (): string => {
  const configured = config.uiChat.timezone?.trim();
  if (configured && isValidTimezone(configured)) {
    return configured;
  }
  return dayjs.tz.guess();
};

export const parseUiChatDatetime = (datetime: string): Dayjs | null => {
  const trimmed = datetime.trim();
  if (!trimmed) return null;

  const parsed = dayjs.utc(trimmed);
  if (!parsed.isValid()) return null;
  return parsed.tz(resolveUiChatTimezone());
};

export const formatUiChatDate = (datetime: string): string => {
  const parsed = parseUiChatDatetime(datetime);
  return parsed?.isValid() ? parsed.format(config.uiChat.dateFormat) : "";
};

export const formatUiChatTime = (datetime: string): string => {
  const parsed = parseUiChatDatetime(datetime);
  return parsed?.isValid() ? parsed.format("HH:mm") : "";
};

export const getUiChatDatetimeTimestamp = (datetime: string): number => {
  return parseUiChatDatetime(datetime)?.valueOf() ?? 0;
};

export const getUiChatNowIso = (): string => dayjs().utc().format();
