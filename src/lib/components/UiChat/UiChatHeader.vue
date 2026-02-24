<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiSelect from "@/lib/components/UiSelect/UiSelect.vue";
  import { computed, ref } from "vue";
  import { config } from "@/lib/config";
  import type { UiChatTicket, ChatAction, ChatActionOption } from "./types";

  const {
    ticket,
    isEmpty,
    isClosedTicket,
    ticketLoading = false
  } = defineProps<{
    ticket: UiChatTicket | null | undefined;
    isEmpty: boolean;
    isClosedTicket: boolean;
    ticketLoading?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
  }>();

  const actionsValue = ref<ChatAction | null>(null);
  const actionsOptions = computed<ChatActionOption[]>(() => [
    {
      value: "remind-ticket",
      label: config.uiChat.translations.remindAboutTicket,
      icon: "notifications-active"
    },
    {
      value: "change-operator",
      label: config.uiChat.translations.changeOperator,
      icon: "sync-alt"
    },
    {
      value: "close-ticket",
      label: config.uiChat.translations.closeTicket,
      icon: "delete",
      color: "var(--color-text-negative)"
    }
  ]);

  const isShowActionSelect = computed<boolean>(() => !isEmpty && !isClosedTicket);

  const onActionChange = () => {
    if (actionsValue.value) {
      emit("action-ticket", actionsValue.value);
    }
    actionsValue.value = null;
  };
</script>

<template>
  <div class="ui-chat__header">
    <div class="ui-chat__header-content">
      <div class="ui-chat__header-icon">
        <ui-icon name="support-agent  2" type="100" />
      </div>
      <div class="ui-chat__header-info">
        <div class="ui-chat__header-ticket">
          <span class="ui-chat__header-title">
            {{ ticket?.subject || config.uiChat.translations.newTicket }}
          </span>
          <span v-if="ticket?.id" class="ui-chat__header-id">
            {{ config.uiChat.translations.ticket }} #{{ ticket.id }}
          </span>
        </div>
        <div class="ui-chat__header-support">
          <span class="ui-chat__header-name">
            {{ ticket?.support_name || "Sofia" }}
          </span>
          <span class="ui-chat__header-status">Online</span>
        </div>
      </div>
    </div>
    <div v-if="isShowActionSelect" class="ui-chat__actions">
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
          <span class="ui-chat__actions-selected">{{ config.uiChat.translations.actions }}</span>
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
</template>

<style lang="scss">
  .ui-chat {
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
        min-width: 0;
        overflow: hidden;
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
        min-width: 0;
        overflow: hidden;
      }
      &-ticket {
        display: flex;
        align-items: center;
        gap: 0.45em;
      }
      &-title {
        max-width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: 500;
        line-height: 125%;
        color: var(--color-text-primary);
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
      flex-shrink: 0;
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
  }
</style>
