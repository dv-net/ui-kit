<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";
  import UiSelect from "@/lib/components/UiSelect/UiSelect.vue";
  import UiTextarea from "@/lib/components/UiTextarea/UiTextarea.vue";
  import UiTooltip from "@/lib/components/UiTooltip/UiTooltip.vue";

  import { ref } from "vue";

  type ChatAction = "remind-ticket" | "change-operator" | "close-ticket";

  interface ChatActionOption {
    value: ChatAction;
    label: string;
    icon: string;
    color?: string;
  }

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
  }>();

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

  const ATTACH_MAX_FILES = 10;
  const ATTACH_FORMATS = "jpg, jpeg, png, heic & heif";

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
            <span class="ui-chat__header-title">Тема обращения</span>
            <span class="ui-chat__header-id">Тикет №1234</span>
          </div>
          <div class="ui-chat__header-support">
            <span class="ui-chat__header-name">Sofia</span>
            <span class="ui-chat__header-status">Online</span>
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
    <div class="ui-chat__body" style="min-height: 400px"></div>

    <!-- Footer -->
    <div class="ui-chat__footer">
      <UiTooltip>
        <template #text>
          <p class="ui-chat__footer-tooltip">
            <span>Maximum files: {{ ATTACH_MAX_FILES }}</span>
            <span>Supports formats: {{ ATTACH_FORMATS }}</span>
          </p>
        </template>
        <slot name="footer-left">
          <ui-icon-button
            icon-name="attach-file_add"
            type="clear"
            icon-type="100"
            icon-color="#1968e5"
            size="xl"
            style="margin-left: -16px"
          />
        </slot>
      </UiTooltip>
      <div class="ui-chat__footer-input">
        <UiTextarea v-model="message" size="auto" placeholder="Ваше сообщение" submitOnEnter />
      </div>
      <slot name="footer-right">
        <ui-icon-button
          icon-name="play-circle"
          type="clear"
          icon-type="100"
          icon-color="#1968e5"
          size="xl"
          style="margin-right: -16px"
        />
      </slot>
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
      flex-direction: column;
      flex-grow: 1;
      min-height: 0;
      overflow: hidden;
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
