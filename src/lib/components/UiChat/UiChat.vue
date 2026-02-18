<script setup lang="ts">
  import UiChatHeader from "./UiChatHeader.vue";
  import UiChatFooter from "./UiChatFooter.vue";
  import UiChatMessage from "./UiChatMessage.vue";
  import { computed } from "vue";
  import type { UiChatMessage as UiChatMessageType, UiChatProps, ChatAction } from "./types";

  const {
    ticket = undefined,
    messages = [],
    currentUserUuid = ""
  } = defineProps<UiChatProps>();

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
    (e: "submit"): void;
    (e: "attach"): void;
  }>();

  const getDate = (datetime: string) => datetime.split(" ")[0];
  const isOwnMessage = (msg: UiChatMessageType) => msg.user.uuid === currentUserUuid;

  const groupedMessages = computed(() => {
    const groups: Record<string, UiChatMessageType[]> = {};
    for (const msg of messages) {
      const date = getDate(msg.created_at);
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    }
    return groups;
  });
</script>

<template>
  <div class="ui-chat">
    <UiChatHeader :ticket="ticket" @action-ticket="(v) => emit('action-ticket', v)" />

    <!-- Body -->
    <div class="ui-chat__body">
      <div v-for="(groupMessages, date) in groupedMessages" :key="date" class="ui-chat__group">
        <div class="ui-chat__group-date">
          <span>{{ date }}</span>
        </div>

        <UiChatMessage
          v-for="msg in groupMessages"
          :key="msg.id"
          :message="msg"
          :is-own="isOwnMessage(msg)"
        />
      </div>
    </div>

    <UiChatFooter @submit="emit('submit')" @attach="emit('attach')" />
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
