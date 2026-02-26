<script setup lang="ts">
  import UiChatHeader from "./UiChatHeader.vue";
  import UiChatFooter from "./UiChatFooter.vue";
  import UiChatMessage from "./UiChatMessage.vue";
  import UiChatManagerAlert from "./UiChatManagerAlert.vue";
  import { computed, onUnmounted, ref, watch } from "vue";
  import dayjs from "dayjs";
  import timezonePlugin from "dayjs/plugin/timezone";
  import utc from "dayjs/plugin/utc";
  import { config } from "@/lib/config";
  import {
    UiChatMessage as UiChatMessageType,
    UiChatProps,
    ChatAction,
    UiChatSubmitPayload,
    UiChatTicketStatusValue
  } from "./types";
  import { defaultChatMessage } from "@/utils/constants/chat";

  dayjs.extend(utc);
  dayjs.extend(timezonePlugin);

  const {
    ticket,
    messages = [],
    currentUserUuid,
    showManagerAlert = false,
    managerAlertSeconds,
    ticketLoading = false,
    isCreateTicket = false,
    sendingLoading = false
  } = defineProps<UiChatProps>();

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
    (e: "submit", payload: UiChatSubmitPayload): void;
    (e: "attach", files: File[]): void;
  }>();

  const footerRef = ref<InstanceType<typeof UiChatFooter>>();
  const canShowDefaultMessage = ref(!isCreateTicket);
  let defaultMessageTimer: ReturnType<typeof setTimeout> | null = null;

  const resolvedTimezone = computed<string>(() => {
    return config.uiChat.timezone || dayjs.tz.guess();
  });

  const parseByTimezone = (datetime: string) => {
    const parsed = dayjs(datetime);
    return parsed.isValid() ? parsed.tz(resolvedTimezone.value) : null;
  };

  const getDate = (datetime: string): string => {
    const parsed = parseByTimezone(datetime);
    return parsed?.isValid() ? parsed.format(config.uiChat.dateFormat) : datetime.split(/[T\s]/)[0] || datetime;
  };
  const isOwnMessage = (msg: UiChatMessageType): boolean => msg.user.uuid === currentUserUuid;

  const isEmpty = computed<boolean>(() => !messages.length || !ticket || !currentUserUuid);
  const hasTicketStatus = computed<boolean>(() => {
    return typeof ticket?.status?.value !== "undefined";
  });

  const isClosedTicket = computed<boolean>(() => {
    if (!hasTicketStatus.value) return false;
    return (
      ticket?.status?.value === UiChatTicketStatusValue.MANAGER_CLOSED ||
      ticket?.status?.value === UiChatTicketStatusValue.USER_CLOSED
    );
  });

  const canShowFooter = computed<boolean>(() => {
    if (!isCreateTicket && !hasTicketStatus.value) return false;
    if (hasTicketStatus.value && isClosedTicket.value) return false;
    return true;
  });

  const shouldDelayDefaultMessage = computed(() => isCreateTicket && isEmpty.value && !ticketLoading);

  const actualMessages = computed<UiChatMessageType[]>(() => {
    if (!isEmpty.value) return messages;
    if (!canShowDefaultMessage.value) return [];
    const now = dayjs().tz(resolvedTimezone.value).format(config.uiChat.dateTimeFormat);
    return [defaultChatMessage(config.uiChat.translations.defaultMessage, now)];
  });

  const groupedMessages = computed(() => {
    const groups: Record<string, UiChatMessageType[]> = {};
    for (const msg of actualMessages.value) {
      const date = getDate(msg.created_at);
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    }
    for (const date in groups) {
      groups[date].sort((a, b) => {
        return (parseByTimezone(a.created_at)?.valueOf() ?? 0) - (parseByTimezone(b.created_at)?.valueOf() ?? 0);
      });
    }
    return groups;
  });

  const clearInputAndFiles = () => {
    footerRef.value?.clearInputAndFiles();
  };

  watch(shouldDelayDefaultMessage, (shouldDelay) => {
      if (defaultMessageTimer) {
        clearTimeout(defaultMessageTimer);
        defaultMessageTimer = null;
      }
      if (!shouldDelay) {
        canShowDefaultMessage.value = true;
        return;
      }
      canShowDefaultMessage.value = false;
      defaultMessageTimer = setTimeout(() => {
        canShowDefaultMessage.value = true;
      }, 1000);
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (defaultMessageTimer) {
      clearTimeout(defaultMessageTimer);
      defaultMessageTimer = null;
    }
  });

  defineExpose({ clearInputAndFiles });
</script>

<template>
  <div class="ui-chat">
    <UiChatHeader
      :ticket="ticket"
      :is-empty="isEmpty"
      :is-closed-ticket="isClosedTicket"
      :ticket-loading="ticketLoading"
      @action-ticket="(v) => emit('action-ticket', v)"
    />
    <div class="ui-chat__body">
      <Transition v-if="!ticketLoading" name="alert" mode="out-in" appear>
        <UiChatManagerAlert v-if="showManagerAlert" :seconds="managerAlertSeconds" />
      </Transition>
      <template v-if="!ticketLoading">
        <div v-for="(groupMessages, date) in groupedMessages" :key="date" class="ui-chat__group">
          <div class="ui-chat__group-date">
            <span>{{ date }}</span>
          </div>
          <UiChatMessage v-for="msg in groupMessages" :key="msg.id" :message="msg" :is-own="isOwnMessage(msg)" />
        </div>
      </template>
    </div>
    <UiChatFooter
      v-if="canShowFooter"
      ref="footerRef"
      :sending-loading="sendingLoading"
      @submit="(p) => emit('submit', p)"
      @attach="(f) => emit('attach', f)"
    />
  </div>
</template>

<style lang="scss">
  .ui-chat {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-separator-border-primary);
    border-radius: 16px;
    background: var(--color-background-primary);
    overflow: hidden;
    &__body {
      display: flex;
      flex-direction: column-reverse;
      overflow-x: clip;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 24px;
      gap: 0;
      height: 415px;
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 0 16px 0 0;
        background: transparent;
        margin: 15px 0;
      }
      &::-webkit-scrollbar-thumb {
        background: #cbd1db;
        border-radius: 16px;
        &:hover {
          background: #aaadb3;
          background-clip: padding-box;
        }
      }
    }
    &__group {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: flex-end;
      &-date {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
        span {
          padding: 4px 12px;
          border-radius: 4px;
          background: var(--color-background-secondary);
          color: var(--color-text-secondary);
          font-size: 10px;
          line-height: 125%;
          font-weight: 500;
        }
      }
    }
    &__alert-slot {
      display: flex;
      justify-content: center;
      min-height: 0;
    }
  }
</style>
