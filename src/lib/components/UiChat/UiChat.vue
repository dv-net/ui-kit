<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";
  import UiSelect from "@/lib/components/UiSelect/UiSelect.vue";

  import { ref } from "vue";

  type ChatAction = "remind-ticket" | "change-operator" | "close-ticket";

  const emit = defineEmits<{
    (e: "action-ticket", value: ChatAction): void;
  }>();

  const message = ref("");

  const actionsValue = ref(null);
  const actionsOptions = [
    { value: "remind-ticket", label: "Remind about ticket", icon: "notification  2", color: "" },
    { value: "change-operator", label: "Change operator", icon: "swap-horizontal  1", color: "" },
    { value: "close-ticket", label: "Close ticket", icon: "trash  1", color: "var(--color-text-negative)" }
  ];

  const onActionChange = () => {
    const action = actionsValue.value;
    if (action) emit("action-ticket", action);
    actionsValue.value = null;
  };
</script>

<template>
  <div class="ui-chat">
    <!-- Header -->
    <div class="ui-chat__header">
      <div class="ui-chat__header-content">
        <div class="ui-chat__header-icon">
          <UiIcon name="headphones  1" type="400" size="sm" />
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
      <div class="ui-chat__header-actions">
        <UiSelect
          v-model="actionsValue"
          :options="actionsOptions"
          placeholder="Actions"
          size="sm"
          placement="bottom-end"
          popper-class="ui-chat__actions-popper"
          @change="onActionChange"
        >
          <template #selected>
            <span>Actions</span>
          </template>
          <template #default="{ option }">
            <div class="ui-chat__action-item" :style="option.color && { color: option.color }">
              <UiIcon :name="option.icon" type="400" size="xs" />
              <span>{{ option.label }}</span>
            </div>
          </template>
        </UiSelect>
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
    --ui-chat-padding: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
    border: 1px solid var(--color-separator-border-primary);
    border-radius: 16px;
    background: var(--color-background-primary);
    overflow: hidden;

    @media screen and (min-width: 768px) {
      --ui-chat-padding: 24px;
    }

    // Header
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: var(--ui-chat-padding);
      background: var(--color-background-secondary);
      flex-shrink: 0;
    }

    &__header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-grow: 1;
      overflow: hidden;
      max-width: 100%;
    }

    &__header-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      background: var(--color-background-tertiary);
      border-radius: 50%;
      color: var(--color-state-accent);
    }

    &__header-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
    }

    &__header-ticket {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
    }

    &__header-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 125%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 50%;
    }

    &__header-id {
      white-space: nowrap;
      color: var(--color-text-secondary);
      font-size: 14px;
      font-weight: 400;
      line-height: 142%;
      flex-shrink: 0;
    }

    &__header-support {
      display: flex;
      align-items: baseline;
      gap: 0.45em;
      line-height: 125%;
    }

    &__header-name {
      color: var(--color-text-tertiary);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: -0.11px;
    }

    &__header-status {
      font-size: 12px;
      color: var(--color-state-positive);
    }

    &__header-actions {
      position: relative;
      flex-shrink: 0;
    }

    &__action-item {
      display: flex;
      align-items: center;
      gap: 10px;
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

  .ui-chat__actions-popper {
    .ui-dropdown__content {
      min-width: 230px;
    }
  }
</style>
