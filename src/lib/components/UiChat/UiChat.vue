<script setup lang="ts">
  import UiChatHeader from "./UiChatHeader.vue";
  import UiChatFooter from "./UiChatFooter.vue";
  import UiChatMessage from "./UiChatMessage.vue";
  import UiChatManagerAlert from "./UiChatManagerAlert.vue";
  import { computed, ref } from "vue";
  import dayjs from "dayjs";
  import { config } from "@/lib/config";
  import {
    UiChatMessage as UiChatMessageType,
    UiChatProps,
    ChatAction,
    UiChatSubmitPayload,
    UiChatTicketStatusValue
  } from "./types";
  import { defaultChatMessage } from "@/utils/constants/chat";

  const {
    ticket,
    messages = [],
    currentUserUuid,
    showManagerAlert = false,
    managerAlertSeconds,
    ticketLoading = false,
    sendingLoading = false
  } = defineProps<UiChatProps>();

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
    (e: "submit", payload: UiChatSubmitPayload): void;
    (e: "attach", files: File[]): void;
  }>();

  const footerRef = ref<InstanceType<typeof UiChatFooter>>();

  const getDate = (datetime: string): string => datetime.split(" ")[0];
  const isOwnMessage = (msg: UiChatMessageType): boolean => msg.user.uuid === currentUserUuid;

  const isEmpty = computed<boolean>(() => !messages.length || !ticket || !currentUserUuid);
  const isClosedTicket = computed<boolean>(
    () =>
      !ticket ||
      ticket.status.value === UiChatTicketStatusValue.MANAGER_CLOSED ||
      ticket.status.value === UiChatTicketStatusValue.USER_CLOSED
  );

  const actualMessages = computed<UiChatMessageType[]>(() => {
    if (!isEmpty.value) return messages;
    const now = dayjs().format("DD.MM.YYYY HH:mm");
    return [defaultChatMessage(config.uiChat.translations.defaultMessage, now)];
  });

  const groupedMessages = computed(() => {
    const groups: Record<string, UiChatMessageType[]> = {};
    for (const msg of actualMessages.value) {
      const date = getDate(msg.created_at);
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    }
    return groups;
  });

  const clearInputAndFiles = () => {
    footerRef.value?.clearInputAndFiles();
  };

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
      <Transition name="alert" mode="out-in" appear>
        <UiChatManagerAlert v-if="showManagerAlert" :seconds="managerAlertSeconds" />
      </Transition>

      <div v-for="(groupMessages, date) in groupedMessages" :key="date" class="ui-chat__group">
        <div class="ui-chat__group-date">
          <span>{{ date }}</span>
        </div>
        <UiChatMessage v-for="msg in groupMessages" :key="msg.id" :message="msg" :is-own="isOwnMessage(msg)" />
      </div>
    </div>
    <UiChatFooter
      ref="footerRef"
      :is-empty="isEmpty"
      :is-closed-ticket="isClosedTicket"
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
      gap: 16px;
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
  }
</style>
