<script setup lang="ts">
  import UiChatFooter from "./UiChatFooter.vue";
  import UiChatHeader from "./UiChatHeader.vue";
  import UiChatManagerAlert from "./UiChatManagerAlert.vue";
  import UiChatMessage from "./UiChatMessage.vue";

  import dayjs from "dayjs";
  import timezonePlugin from "dayjs/plugin/timezone";
  import utc from "dayjs/plugin/utc";
  import { computed, nextTick, onUnmounted, ref, watch } from "vue";

  import {
    ChatAction,
    UiChatMessage as UiChatMessageType,
    UiChatProps,
    UiChatSubmitPayload,
    UiChatTicketStatusValue
  } from "./types";

  import { useBreakpoints } from "@/lib/composables/useBreakpoints.ts";
  import { config } from "@/lib/config";
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
    enableReopenTicket = false,
    sendingLoading = false
  } = defineProps<UiChatProps>();

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
    (e: "submit", payload: UiChatSubmitPayload): void;
    (e: "attach", files: File[]): void;
    (e: "read", payload: { ticketId: number }): void;
  }>();

  const { isDesktop } = useBreakpoints();

  const footerRef = ref<InstanceType<typeof UiChatFooter>>();
  const chatBodyRef = ref<HTMLDivElement>();
  const canShowDefaultMessage = ref(!isCreateTicket);
  let defaultMessageTimer: ReturnType<typeof setTimeout> | null = null;
  let readDelay: ReturnType<typeof setTimeout> | null = null;
  let observerMessageMap = new WeakMap<Element, UiChatMessageType>();
  let readObserver: IntersectionObserver | null = null;

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

  const messageById = computed(() => {
    const map = new Map<number, UiChatMessageType>();
    for (const msg of actualMessages.value) {
      map.set(msg.id, msg);
    }
    return map;
  });

  const onIntersectionObserverRead = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const message = observerMessageMap.get(entry.target);
      if (!message) continue;
      const isSupportMessage = !!currentUserUuid && !isOwnMessage(message);
      if (!message.ticket_id || message.id <= 0 || !isSupportMessage || message.updated_at !== message.created_at) {
        continue
      }
      if (readDelay) {
        clearTimeout(readDelay);
      }
      readDelay = setTimeout(() => {
        emit("read", { ticketId: message.ticket_id });
      }, 3000);
      break;
    }
  };

  const reconnectReadObserver = async () => {
    await nextTick();
    readObserver?.disconnect();
    observerMessageMap = new WeakMap<Element, UiChatMessageType>();
    if (!chatBodyRef.value || ticketLoading) return;
    readObserver = new IntersectionObserver(onIntersectionObserverRead, {
      root: chatBodyRef.value,
      rootMargin: "0px",
      threshold: 0.6
    });
    const messageNodes = chatBodyRef.value.querySelectorAll<HTMLElement>("[data-chat-message-id]");
    messageNodes.forEach((node) => {
      const id = Number(node.dataset.chatMessageId);
      const message = messageById.value.get(id);
      if (!message) return;
      observerMessageMap.set(node, message);
      readObserver?.observe(node);
    });
  };

  const clearInputAndFiles = () => {
    footerRef.value?.clearInputAndFiles();
  };

  watch(
    shouldDelayDefaultMessage,
    (shouldDelay) => {
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

  watch(groupedMessages, () => {
      void reconnectReadObserver();
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (defaultMessageTimer) {
      clearTimeout(defaultMessageTimer);
      defaultMessageTimer = null;
    }
    if (readDelay) {
      clearTimeout(readDelay);
      readDelay = null;
    }
    readObserver?.disconnect();
    readObserver = null;
  });

  defineExpose({ clearInputAndFiles });
</script>

<template>
  <div class="ui-chat">
    <div class="ui-chat__top" v-if="isDesktop">
      <span class="ui-chat__top-title">
        {{ ticket?.subject || config.uiChat.translations.newTicket }}
      </span>
      <span v-if="ticket?.id" class="ui-chat__top-id"> {{ config.uiChat.translations.ticket }} #{{ ticket.id }} </span>
    </div>
    <div class="ui-chat__wrapper">
      <UiChatHeader
        :ticket="ticket"
        :is-empty="isEmpty"
        :is-closed-ticket="isClosedTicket"
        :ticket-loading="ticketLoading"
        :enable-reopen-ticket="enableReopenTicket"
        @action-ticket="(v) => emit('action-ticket', v)"
      />
      <div ref="chatBodyRef" class="ui-chat__body" :class="{ 'mobile-layout': isDesktop }">
        <Transition v-if="!ticketLoading" name="alert" mode="out-in" appear>
          <UiChatManagerAlert v-if="showManagerAlert" :seconds="managerAlertSeconds" />
        </Transition>
        <template v-if="!ticketLoading">
          <div v-for="(groupMessages, date) in groupedMessages" :key="date" class="ui-chat__group">
            <div class="ui-chat__group-date">
              <span>{{ date }}</span>
            </div>
            <div v-for="msg in groupMessages" :key="msg.id" class="ui-chat__message-observer" :data-chat-message-id="msg.id">
              <UiChatMessage :message="msg" :is-own="isOwnMessage(msg)" />
            </div>
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
  </div>
</template>

<style lang="scss">
  .ui-chat {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__top {
      display: flex;
      flex-direction: column;
      gap: 6px;

      &-title {
        display: block;
        overflow: hidden;
        max-width: 100%;
        color: var(--color-text-primary);
        font-size: 20px;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-id {
        color: #686c77;
        font-size: 14px;
        font-weight: 400;
      }
    }

    &__wrapper {
      display: flex;
      overflow: hidden;
      flex-direction: column;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 16px;
      background: var(--color-background-primary);
    }

    &__body {
      display: flex;
      overflow: clip auto;
      height: 415px;
      flex-direction: column-reverse;
      padding: 24px;
      gap: 0;
      overscroll-behavior: contain;

      &.mobile-layout {
        padding: 16px;
      }

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 0 16px 0 0;
        margin: 15px 0;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 16px;
        background: #cbd1db;

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
          font-weight: 500;
          line-height: 125%;
        }
      }
    }

    &__message-observer {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    &__alert-slot {
      display: flex;
      min-height: 0;
      justify-content: center;
    }
  }
</style>
