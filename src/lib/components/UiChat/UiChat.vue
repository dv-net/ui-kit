<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";
  import UiSelect from "@/lib/components/UiSelect/UiSelect.vue";

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
      <div class="actions">
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
            <span class="actions__selected">Actions</span>
          </template>
          <template #default="{ option }">
            <span class="actions__item" :style="option.color && { color: option.color }">
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
      <div class="ui-chat__entry">
        <UiIconButton iconName="attachment  1" iconType="400" size="md" />
        <div class="ui-chat__entry-input">
          <textarea v-model="message" class="ui-chat__textarea" rows="1" placeholder="Ваше сообщение..." />
        </div>
        <UiIconButton iconName="send  2" iconType="400" size="md" />
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
      .actions {
        .ui-dropdown__content {
          min-width: 230px;
        }
        &__selected {
          min-width: 80px;
        }
        &__item {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          gap: 8px;
          min-width: 200px;
        }
      }
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

    // Body
    &__body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      min-height: 0;
      overflow: hidden;
    }

    // Footer
    &__footer {
      flex-shrink: 0;
      margin-block-start: auto;
      border-radius: 0 0 16px 16px;
    }

    &__entry {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: calc(var(--ui-chat-padding) / 2) var(--ui-chat-padding);
      background: var(--color-background-secondary);
      border-radius: inherit;
    }

    &__entry-input {
      flex-grow: 1;
      min-width: 0;
    }

    &__textarea {
      width: 100%;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      background: var(--color-background-primary);
      color: var(--color-text-primary);
      resize: none;
      min-height: 36px;
      max-height: 140px;
      line-height: 1.4;

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }
  }
</style>
