<script setup lang="ts">
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";
  import UiTextarea from "@/lib/components/UiTextarea/UiTextarea.vue";
  import UiTooltip from "@/lib/components/UiTooltip/UiTooltip.vue";
  import { ref } from "vue";
  import { config } from "@/lib/config";

  defineProps<{
    isEmpty: boolean;
  }>();

  const emit = defineEmits<{
    (e: "submit"): void;
    (e: "attach"): void;
  }>();

  const ATTACH_MAX_FILES: number = 10;
  const ATTACH_FORMATS: string = "jpg, jpeg, png, heic & heif";
  const message = ref<string | null>(null);
</script>

<template>
  <div class="ui-chat__footer">
    <UiTooltip>
      <template #text>
        <p class="ui-chat__footer-tooltip">
          <span>{{ config.uiChat.translations.maxFiles }}: {{ ATTACH_MAX_FILES }}</span>
          <span>{{ config.uiChat.translations.supportsFormats }}: {{ ATTACH_FORMATS }}</span>
        </p>
      </template>
      <div style="margin-left: -16px" @click="emit('attach')">
        <slot name="footer-left">
          <ui-icon-button icon-name="attach-file_add" type="clear" icon-type="100" icon-color="#1968e5" size="xl" />
        </slot>
      </div>
    </UiTooltip>
    <div class="ui-chat__footer-input">
      <UiTextarea v-model="message" size="auto" :placeholder="config.uiChat.translations.messagePlaceholder" submitOnEnter @submit="emit('submit')" is-empty-value-null />
    </div>
    <div style="margin-right: -16px" @click="emit('submit')">
      <slot name="footer-right">
        <ui-icon-button icon-name="send" type="clear" icon-type="400" icon-color="#1968e5" size="xl" :disabled="!message" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
  .ui-chat {
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
