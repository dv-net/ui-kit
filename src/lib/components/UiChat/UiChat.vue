<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";
  import UiSelect from "@/lib/components/UiSelect/UiSelect.vue";
  import UiTextarea from "@/lib/components/UiTextarea/UiTextarea.vue";
  import UiTooltip from "@/lib/components/UiTooltip/UiTooltip.vue";
  import { ref, computed } from "vue";

  type ChatAction = "remind-ticket" | "change-operator" | "close-ticket";

  interface ChatActionOption {
    value: ChatAction;
    label: string;
    icon: string;
    color?: string;
  }

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

  export interface UiChatTicketStatus {
    name: string;
    value: number;
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

  const props = withDefaults(
    defineProps<{
      ticket?: UiChatTicket;
      messages?: UiChatMessage[];
      currentUserUuid?: string;
    }>(),
    {
      ticket: undefined,
      messages: () => [],
      currentUserUuid: "",
    }
  );

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
    (e: "submit"): void;
    (e: "attach"): void;
  }>();

  const ATTACH_MAX_FILES = 10;
  const ATTACH_FORMATS = "jpg, jpeg, png, heic & heif";
  const message = ref("");
  const actionsValue = ref<ChatAction | null>(null);
  const actionsOptions: ChatActionOption[] = [
    {
      value: "remind-ticket",
      label: "Remind about ticket",
      icon: "notifications-active"
    },
    { value: "change-operator", label: "Change operator", icon: "sync-alt" },
    {
      value: "close-ticket",
      label: "Close ticket",
      icon: "delete",
      color: "var(--color-text-negative)"
    }
  ];

  const getDate = (datetime: string) => datetime.split(" ")[0];
  const getTime = (datetime: string) => datetime.split(" ")[1]?.slice(0, 5);
  const isOwnMessage = (msg: UiChatMessage) => msg.user.uuid === props.currentUserUuid;

  const groupedMessages = computed(() => {
    const groups: Record<string, UiChatMessage[]> = {};
    for (const msg of props.messages) {
      const date = getDate(msg.created_at);
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    }
    return groups;
  });

  const onActionChange = () => {
    if (actionsValue.value) {
      emit("action-ticket", actionsValue.value);
    }
    actionsValue.value = null;
  };
</script>

<template>
  <div class="ui-chat">
    <!-- Header -->
    <div class="ui-chat__header">
      <div class="ui-chat__header-content">
        <div class="ui-chat__header-icon">
          <ui-icon name="support-agent  2" type="100" />
        </div>
        <div class="ui-chat__header-info">
          <div class="ui-chat__header-ticket">
            <span class="ui-chat__header-title">{{ ticket?.subject }}</span>
            <span class="ui-chat__header-id">Тикет №{{ ticket?.id }}</span>
          </div>
          <div class="ui-chat__header-support">
            <span class="ui-chat__header-name">{{ ticket?.support_name }}</span>
            <span class="ui-chat__header-status">{{ ticket?.status.name }}</span>
          </div>
        </div>
      </div>
      <div class="ui-chat__actions">
        <ui-select
          v-model="actionsValue"
          :options="actionsOptions"
          size="sm"
          placement="bottom-end"
          :fit-content-width="false"
          :teleport="false"
          @change="onActionChange"
        >
          <template #selected>
            <span class="ui-chat__actions-selected">Actions</span>
          </template>
          <template #default="{ option }">
            <span class="ui-chat__actions-item" :style="option.color && { color: option.color }">
              <UiIcon :name="option.icon" type="400" size="sm" />
              <span>{{ option.label }}</span>
            </span>
          </template>
        </ui-select>
      </div>
    </div>

    <!-- Body -->
    <div class="ui-chat__body">
      <div
        v-for="(groupMessages, date) in groupedMessages"
        :key="date"
        class="ui-chat__group"
      >
        <div class="ui-chat__group-date">
          <span>{{ date }}</span>
        </div>

        <div
          v-for="msg in groupMessages"
          :key="msg.id"
          class="ui-chat__message"
          :class="{ 'ui-chat__message--own': isOwnMessage(msg) }"
        >
          <div class="ui-chat__message-bubble">
            <div v-if="msg.attachments?.length" class="ui-chat__message-attachments">
              <img
                v-for="attachment in msg.attachments"
                :key="attachment.uuid"
                :src="attachment.url"
                :alt="attachment.title"
                class="ui-chat__message-attachment"
              />
            </div>
            <div class="ui-chat__message-info">
              <p v-if="msg.message?.trim()" class="ui-chat__message-text">{{ msg.message }}</p>
              <span class="ui-chat__message-time">{{ getTime(msg.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="ui-chat__footer">
      <UiTooltip>
        <template #text>
          <p class="ui-chat__footer-tooltip">
            <span>Maximum files: {{ ATTACH_MAX_FILES }}</span>
            <span>Supports formats: {{ ATTACH_FORMATS }}</span>
          </p>
        </template>
        <div style="margin-left: -16px" @click="emit('attach')">
          <slot name="footer-left">
            <ui-icon-button icon-name="attach-file_add" type="clear" icon-type="100" icon-color="#1968e5" size="xl" />
          </slot>
        </div>
      </UiTooltip>
      <div class="ui-chat__footer-input">
        <UiTextarea v-model="message" size="auto" placeholder="Ваше сообщение" submitOnEnter @submit="emit('submit')" />
      </div>
      <div style="margin-right: -16px" @click="emit('submit')">
        <slot name="footer-right">
          <ui-icon-button icon-name="send  1" type="clear" icon-type="100" icon-color="#1968e5" size="xl" />
        </slot>
      </div>
    </div>
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
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: var(--color-background-secondary);
      &-content {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        background: var(--color-background-info);
        border-radius: 50%;
        color: var(--color-separator-border-accent);
      }
      &-info {
        display: flex;
        flex-direction: column;
      }
      &-ticket {
        display: flex;
        align-items: center;
        gap: 0.45em;
      }
      &-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 125%;
      }
      &-id {
        color: var(--color-separator-border-contrast-secondary);
        font-size: 14px;
        font-weight: 400;
        line-height: 142%;
      }
      &-support {
        display: flex;
        align-items: center;
        gap: 0.45em;
        line-height: 125%;
      }
      &-name {
        color: var(--color-text-secondary);
        font-size: 11px;
        font-weight: 400;
        letter-spacing: -0.11px;
      }
      &-status {
        font-size: 12px;
        color: var(--color-text-accent);
      }
    }
    &__actions {
      .ui-dropdown__content {
        min-width: 230px;
      }
      &-selected {
        min-width: 80px;
      }
      &-item {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        gap: 8px;
        min-width: 200px;
      }
    }
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
    &__footer {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 24px;
      background: var(--color-background-secondary);
      &-input {
        flex-grow: 1;
      }
      &-tooltip {
        font-size: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .ui-textarea {
        padding: 6px 12px;
      }
    }
  }
</style>
