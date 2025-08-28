<script lang="ts" setup>
  import { ref } from "vue";

  import { UiConfirmProps } from "./types";

  import { config, UiButton, UiTooltip } from "@/lib";

  const emits = defineEmits<{
    success: [void];
    reject: [void];
    close: [void];
  }>();
  const props = withDefaults(defineProps<UiConfirmProps>(), {
    position: "top"
  });

  const isShow = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  async function successHandler() {
    if (!props.method) return;
    isLoading.value = true;
    try {
      await props.method();
    } catch (error: unknown) {
      console.error(error);
    } finally {
      isLoading.value = false;
      isShow.value = false;
    }
  }

  function rejectHandler() {
    emits("reject");
    isShow.value = false;
  }
</script>
<template>
  <div class="ui-confirm">
    <UiTooltip
      v-model="isShow"
      showEvent="click"
      :position="position"
      :popperClass="`${popperClass ? popperClass : ''} ui-confirm__tooltip`"
      :title="title"
      :text="text"
      isShowIconClose
      @close="$emit('close')"
      :tabindex="-1"
    >
      <UiTooltip :tabindex="-1" @click="isShow = true" v-if="tooltipText" :disabled="isShow" :text="tooltipText">
        <slot name="default" :loading="isLoading" />
      </UiTooltip>
      <slot v-else name="default" :loading="isLoading" />
      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>
      <template v-if="$slots.text" #text>
        <slot name="text" />
      </template>
      <template #append>
        <slot name="actions" :success="successHandler" :reject="rejectHandler" :isLoading="isLoading">
          <div class="ui-confirm__actions">
            <UiButton
              :disabled="isDisableSuccessButton"
              :loading="isLoading"
              @click="successHandler"
              size="sm"
              class="w-full"
            >
              {{ config.uiConfirm.translations.confirmBtn }}
            </UiButton>
            <UiButton @click="rejectHandler" type="secondary" size="sm" class="w-full">
              {{ config.uiConfirm.translations.cancelBtn }}
            </UiButton>
          </div>
        </slot>
      </template>
    </UiTooltip>
  </div>
</template>
<style lang="scss">
  .ui-confirm {
    &__actions {
      display: flex;
      padding-top: 8px;
      gap: 8px;
    }
  }
</style>
