<script setup lang="ts">
  import type { UiChatMessage } from "./types";

  const props = defineProps<{
    message: UiChatMessage;
    isOwn?: boolean;
  }>();

  const getTime = (datetime: string) => datetime.split(" ")[1]?.slice(0, 5);
</script>

<template>
  <div
    class="ui-chat__message"
    :class="{ 'ui-chat__message--own': isOwn }"
  >
    <div class="ui-chat__message-bubble">
      <div v-if="message.attachments?.length" class="ui-chat__message-attachments">
        <img
          v-for="attachment in message.attachments"
          :key="attachment.uuid"
          :src="attachment.url"
          :alt="attachment.title"
          class="ui-chat__message-attachment"
        />
      </div>
      <div class="ui-chat__message-info">
        <p v-if="message.message?.trim()" class="ui-chat__message-text">{{ message.message }}</p>
        <span class="ui-chat__message-time">{{ getTime(message.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .ui-chat {
    &__message {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      &--own {
        justify-content: flex-end;
        .ui-chat__message-bubble {
          background: var(--color-background-info);
          border-radius: 12px 0 12px 12px;
        }
      }
      &-bubble {
        padding: 8px 12px;
        max-width: 80%;
        width: fit-content;
        background: var(--color-background-secondary);
        border-radius: 0 12px 12px 12px;
        word-break: break-word;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      &-attachments {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      &-attachment {
        max-width: 200px;
        max-height: 200px;
        border-radius: 8px;
        object-fit: cover;
        cursor: pointer;
      }
      &-info {
        display: flex;
        width: 100%;
        gap: 12px;
      }
      &-text {
        font-size: 14px;
        line-height: 125%;
        margin: 0;
        white-space: pre-line;
      }
      &-time {
        align-self: flex-end;
        font-size: 10px;
        line-height: 125%;
        white-space: nowrap;
        color: var(--color-text-secondary);
        margin-left: auto;
      }
    }
  }
</style>
