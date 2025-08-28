<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";

  import { config, UiIcon } from "@/lib";

  const props = withDefaults(
    defineProps<{
      id: string;
      top: number;
      message: string;
      type?: "success" | "error";
      isHTMLMessage?: boolean;
    }>(),
    {
      type: "error",
      isHTMLMessage: true
    }
  );

  const emit = defineEmits(["remove", "delete-from-list"]);
  const show = ref(false);

  const styleComputed = computed(() => {
    return `top: ${props.top}px`;
  });

  onMounted(() => {
    setTimeout(() => {
      emit("delete-from-list", props.id);
      show.value = false;
    }, 5000);
    show.value = true;
  });
</script>

<template>
  <transition name="notification" @after-leave="emit('remove')">
    <div v-show="show" class="ui-notification" :style="styleComputed">
      <div class="ui-notification__top">
        <ui-icon v-if="type === 'error'" name="block" type="400" color="#DD4C1E" />
        <ui-icon v-else name="check-circle" type="400" color="#1F9649" />
        <span class="ui-notification__title">
          {{
            type === "error"
              ? config.uiNotification.translations.error
              : config.uiNotification.translations.success + "!"
          }}
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
