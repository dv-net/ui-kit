<script setup lang="ts">
  import UiChatAttachments from "./UiChatAttachments.vue";
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";
  import UiTextarea from "@/lib/components/UiTextarea/UiTextarea.vue";
  import UiTooltip from "@/lib/components/UiTooltip/UiTooltip.vue";

  import { ref, computed } from "vue";

  import { config } from "@/lib/config";
  import { ATTACH_MAX_FILES, ATTACH_FORMATS } from "@/utils/constants/chat";
  import type { UiChatSubmitPayload } from "./types";

  defineProps<{ isEmpty: boolean }>();

  const emit = defineEmits<{
    (e: "submit", payload: UiChatSubmitPayload): void;
    (e: "attach", files: File[]): void;
  }>();

  const message = ref<string | null>(null);
  const files = ref<File[]>([]);
  const attachmentsRef = ref<InstanceType<typeof UiChatAttachments>>();

  const isMaxFiles = computed<boolean>(() => files.value.length >= ATTACH_MAX_FILES);

  const onSubmit = () => {
    if (!message.value) return;
    emit("submit", { message: message.value, files: files.value });
  };
</script>

<template>
  <div class="ui-chat__footer-wrapper">
    <div class="ui-chat__footer">
      <UiTooltip v-if="!isMaxFiles">
        <template #text>
          <p class="ui-chat__footer-tooltip">
            <span>{{ config.uiChat.translations.maxFiles }}: {{ ATTACH_MAX_FILES }}</span>
            <span>{{ config.uiChat.translations.supportsFormats }}: {{ ATTACH_FORMATS }}</span>
          </p>
        </template>
        <div style="margin-left: -16px" @click="attachmentsRef?.openFileDialog()">
          <slot name="footer-left">
            <ui-icon-button icon-name="attach-file_add" type="clear" icon-type="100" icon-color="#1968e5" size="xl" />
          </slot>
        </div>
      </UiTooltip>
      <div class="ui-chat__footer-input">
        <UiTextarea
          v-model="message"
          size="auto"
          :placeholder="config.uiChat.translations.messagePlaceholder"
          submitOnEnter
          @submit="onSubmit"
          is-empty-value-null
        />
      </div>
      <div style="margin-right: -16px" @click="onSubmit">
        <slot name="footer-right">
          <ui-icon-button
            icon-name="send"
            type="clear"
            icon-type="400"
            icon-color="#1968e5"
            size="xl"
            :disabled="!message"
          />
        </slot>
      </div>
    </div>
    <UiChatAttachments
      ref="attachmentsRef"
      :max-files="ATTACH_MAX_FILES"
      :class="['ui-chat__footer-attachments', { 'ui-chat__footer-attachments--empty': !files.length }]"
      @change="(f) => { files = f; emit('attach', f); }"
    />
  </div>
</template>

<style lang="scss">
  .ui-chat {
    &__footer {
      background: var(--color-background-secondary);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 24px;
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
      &-attachments {
        padding: 24px;
        &--empty {
          padding: 0;
        }
      }
    }
  }
</style>
