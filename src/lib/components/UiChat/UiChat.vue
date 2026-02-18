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
      <div class="ui-chat__entry">
        <button>
          <svg
            data-v-b1c095be=""
            width="20"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              d="M7.3332 27.0255C5.47678 27.0255 3.89301 26.3699 2.5819 25.0588C1.27079 23.7477 0.615234 22.1639 0.615234 20.3075V5.487C0.615234 4.14727 1.09227 3.00037 2.04633 2.0463C3.0004 1.09226 4.1473 0.615234 5.48703 0.615234C6.82679 0.615234 7.9737 1.09226 8.92777 2.0463C9.88181 3.00037 10.3588 4.14727 10.3588 5.487V16.8203H9.17937V5.487C9.17937 4.45316 8.82224 3.57931 8.10797 2.86547C7.3937 2.15162 6.51933 1.7947 5.48487 1.7947C4.45042 1.7947 3.57679 2.15162 2.86397 2.86547C2.15115 3.57931 1.79473 4.45316 1.79473 5.487V20.3075C1.79473 21.8426 2.33609 23.1494 3.4188 24.228C4.50149 25.3067 5.80303 25.846 7.32343 25.846C7.99148 25.846 8.62166 25.7362 9.21397 25.5165C9.80628 25.2968 10.3417 24.9896 10.8204 24.5947V26.046C10.3093 26.3588 9.75928 26.6003 9.17043 26.7703C8.58157 26.9404 7.96916 27.0255 7.3332 27.0255ZM13.9999 25.3332V21.3332H9.99987V19.9998H13.9999V15.9998H15.3332V19.9998H19.3332V21.3332H15.3332V25.3332H13.9999ZM7.3332 20.6665V21.846C6.48533 21.846 5.76909 21.5535 5.18447 20.9686C4.59987 20.3836 4.30757 19.6675 4.30757 18.8203V5.487H5.48703V18.8203C5.48703 19.3434 5.66397 19.7819 6.01783 20.1357C6.37168 20.4896 6.81013 20.6665 7.3332 20.6665ZM12.8717 12.9742V5.487H14.0512V12.9742H12.8717Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <div class="ui-chat__entry-input">
          <textarea v-model="message" class="ui-chat__textarea" rows="1" placeholder="Ваше сообщение..." />
        </div>
        <button>
          <svg
            data-v-b1c095be=""
            width="26"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              d="M0 21.6663V0.333008L25.3333 10.9997L0 21.6663ZM2 18.5663L20.1333 10.9997L2 3.33301V8.93301L10.0667 10.9997L2 12.9997V18.5663Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
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
      &-actions {
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
      padding: 12px 24px;
      background: var(--color-background-secondary);
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
