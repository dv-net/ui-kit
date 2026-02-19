<script setup lang="ts">
  import UiChatMessageAttachments from "./UiChatMessageAttachments.vue";
  import type { UiChatMessage } from "./types";

  const props = defineProps<{
    message: UiChatMessage;
    isOwn?: boolean;
  }>();

  const getTime = (datetime: string) => datetime.split(" ")[1]?.slice(0, 5);
</script>

<template>
  <div class="ui-chat__message" :class="{ 'ui-chat__message--own': isOwn }">
    <div class="ui-chat__message-bubble">
      <UiChatMessageAttachments v-if="message.attachments?.length" :attachments="message.attachments" />
      <div class="ui-chat__message-info">
        <p v-if="message.message?.trim()" class="ui-chat__message-text">{{ message.message }}</p>
        <span class="ui-chat__message-time">{{ getTime(message.created_at) }}</span>
      </div>
    </div>
    <svg class="ui-chat__message-tail" xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M0.403418 3.2C-0.585437 1.88153 0.355327 0 2.00342 0H7.00342V12L0.403418 3.2Z" fill="currentColor"/>
    </svg>
  </div>
</template>

<style lang="scss">
  .ui-chat {
    &__message {
      display: flex;
      justify-content: flex-start;
      position: relative;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      &--own {
        justify-content: flex-end;
        .ui-chat__message-bubble {
          background: var(--color-advertisement-info);
          border-radius: 12px 0 12px 12px;
        }
        .ui-chat__message-tail {
          color: var(--color-advertisement-info);
          right: auto;
          left: 100%;
          transform: scaleX(-1);
        }
      }
      &-tail {
        position: absolute;
        top: 0;
        right: 100%;
        color: var(--color-background-secondary);
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
        position: relative;
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
