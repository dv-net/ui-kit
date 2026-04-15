<script setup lang="ts">
  import UiChatMessageAttachments from "./UiChatMessageAttachments.vue";

  import { computed } from "vue";

  import type { UiChatMessage } from "./types";

  import { HTTP_URL_REGEX } from "@/utils/constants/general";

  const { message, isOwn = false } = defineProps<{
    message: UiChatMessage;
    isOwn?: boolean;
  }>();

  const getTime = (datetime: string) => datetime.split(" ")[1]?.slice(0, 5);

  const escapeHtml = (value: string): string => {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  };

  const formattedMessage = computed(() => {
    const text = message.message?.trim();
    if (!text) return "";
    const safeText = escapeHtml(text);
    return safeText.replace(HTTP_URL_REGEX, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  });
</script>

<template>
  <div class="ui-chat__message" :class="{ 'ui-chat__message--own': isOwn }">
    <div class="ui-chat__message-bubble">
      <UiChatMessageAttachments v-if="message.attachments?.length" :attachments="message.attachments" />
      <div class="ui-chat__message-info">
        <p v-if="formattedMessage" class="ui-chat__message-text" v-html="formattedMessage"></p>
        <span class="ui-chat__message-time">{{ getTime(message.created_at) }}</span>
      </div>
    </div>
    <svg
      class="ui-chat__message-tail"
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
    >
      <path d="M0.403418 3.2C-0.585437 1.88153 0.355327 0 2.00342 0H7.00342V12L0.403418 3.2Z" fill="currentColor" />
    </svg>
  </div>
</template>

<style lang="scss">
  .ui-chat {
    &__message {
      position: relative;
      display: flex;
      justify-content: flex-start;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      &--own {
        justify-content: flex-end;

        .ui-chat__message-bubble {
          border-radius: 12px 0 12px 12px;
          background: var(--color-advertisement-info);
        }

        .ui-chat__message-tail {
          right: auto;
          left: 100%;
          color: var(--color-advertisement-info);
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
        position: relative;
        display: flex;
        width: fit-content;
        max-width: 80%;
        flex-direction: column;
        padding: 8px 12px;
        border-radius: 0 12px 12px;
        background: var(--color-background-secondary);
        gap: 8px;
        overflow-wrap: anywhere;
      }

      &-info {
        display: flex;
        width: 100%;
        gap: 12px;
      }

      &-text {
        margin: 0;
        color: var(--color-text-primary);
        font-size: 14px;
        line-height: 125%;
        white-space: pre-line;

        a {
          color: var(--color-text-link, #2563eb);
          text-decoration: underline;
          text-underline-offset: 2px;

          &:hover {
            text-decoration: none;
          }
        }
      }

      &-time {
        align-self: flex-end;
        margin-left: auto;
        color: var(--color-text-secondary);
        font-size: 10px;
        line-height: 125%;
        white-space: nowrap;
      }
    }
  }
</style>
