<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from "vue";

  import { config, UiIcon } from "@/lib";
  import { UiNotificationType } from "@/lib/composables/useNotification/types.ts";
  import { isMobileDevice } from "@/lib/helpers/is-mobile-device";

  const props = withDefaults(
    defineProps<{
      id: string;
      top: number;
      title?: string;
      message: string;
      type?: UiNotificationType;
      isHTMLMessage?: boolean;
      pauseOnHover?: boolean;
      duration?: number;
    }>(),
    {
      type: "error",
      isHTMLMessage: true,
      pauseOnHover: true,
      duration: 5000
    }
  );

  const emit = defineEmits(["remove", "delete-from-list"]);
  const show = ref(false);
  const timerId = ref<ReturnType<typeof setTimeout> | null>(null);

  const styleComputed = computed(() => {
    return `top: ${props.top}px`;
  });

  const shouldPauseOnHover = computed(() => {
    return props.pauseOnHover && !isMobileDevice();
  });

  const hideNotification = () => {
    emit("delete-from-list", props.id);
    show.value = false;
  };

  const startTimer = () => {
    if (timerId.value) {
      clearTimeout(timerId.value);
    }
    timerId.value = setTimeout(() => {
      hideNotification();
    }, props.duration);
  };

  const pauseTimer = () => {
    if (timerId.value && shouldPauseOnHover.value) {
      clearTimeout(timerId.value);
      timerId.value = null;
    }
  };

  const resumeTimer = () => {
    if (shouldPauseOnHover.value) {
      startTimer();
    }
  };

  onMounted(() => {
    startTimer();
    show.value = true;
  });

  onUnmounted(() => {
    if (timerId.value) {
      clearTimeout(timerId.value);
    }
  });
</script>

<template>
  <transition name="notification" @after-leave="emit('remove')">
    <div
      v-show="show"
      class="ui-notification"
      :style="styleComputed"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <div class="ui-notification__top">
        <ui-icon v-if="type === 'error'" name="block" type="400" color="#DD4C1E" />
        <ui-icon v-else-if="type === 'success'" name="check-circle" type="400" color="#1F9649" />
        <ui-icon v-else name="error" type="400" color="#B4FF29" />

        <span :class="['ui-notification__title', `${type}`]">
          <template v-if="title">{{ title }}</template>
          <template v-else>
            {{
              type === "error"
                ? config.uiNotification.translations.error
                : type === "success"
                  ? config.uiNotification.translations.success + "!"
                  : title || config.uiNotification.translations.infoTitle
            }}
          </template>
        </span>
      </div>
      <div v-if="isHTMLMessage" v-html="message" class="ui-notification__text" />
      <div v-else class="ui-notification__text">{{ message }}</div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
  .ui-notification {
    position: fixed;
    z-index: 1000;
    right: 16px;
    display: flex;
    max-width: 330px;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    background-color: #222;
    color: white;
    transition: top 0.3s;

    &__top {
      display: flex;
      align-items: center;
      padding-bottom: 8px;
      gap: 4px;
    }

    &__title {
      color: #f7a700;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;

      &.info {
        color: #b4ff29;
      }
    }

    &__text {
      max-height: 400px;
      padding-top: 8px;
      border-top: 1px solid rgb(255 255 255 / 20%);
      color: white;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      overflow-wrap: break-word;
      overflow-y: auto;
      white-space: pre-line;
    }
  }

  .notification-enter-active {
    transition: transform 0.3s ease;
  }

  .notification-leave-active {
    transition: opacity 0.3s ease;
  }

  .notification-enter-from {
    transform: translateX(calc(100% + 16px));
  }

  .notification-leave-to {
    opacity: 0;
  }
</style>
