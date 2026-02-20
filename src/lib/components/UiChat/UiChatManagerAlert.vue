<script setup lang="ts">
  import { computed } from "vue";
  import { config } from "@/lib/config";

  const { seconds } = defineProps<{
    seconds?: number;
  }>();

  const alertText = computed(() => {
    const base = config.uiChat.translations.managerAlert;
    if (!seconds) return base;
    return `${base}: ${seconds} sec`;
  });
</script>

<template>
  <div class="ui-chat-alert">
    <div class="ui-chat-alert__inner">
      <div class="ui-chat-alert__animation">
        <div class="ui-chat-alert__icons">
          <div v-for="item in 2" :key="item" class="ui-chat-alert__icon-wrap">
            <svg class="ui-chat-alert__icon" width="34" viewBox="0 0 34 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.5"
                d="M30.0002 26.6667C29.9958 28.6544 29.2042 30.5595 27.7986 31.9651C26.393 33.3707 24.4879 34.1623 22.5002 34.1667H22.1502C21.8243 34.9081 21.2902 35.539 20.6127 35.9828C19.9352 36.4266 19.1434 36.6641 18.3335 36.6667H15.0002C13.8951 36.6667 12.8353 36.2277 12.0539 35.4463C11.2725 34.6649 10.8335 33.6051 10.8335 32.5C10.8335 31.3949 11.2725 30.3351 12.0539 29.5537C12.8353 28.7723 13.8951 28.3333 15.0002 28.3333H18.3335C19.1434 28.3359 19.9352 28.5734 20.6127 29.0172C21.2902 29.461 21.8243 30.0919 22.1502 30.8333H22.5002C23.6052 30.8333 24.665 30.3943 25.4464 29.6129C26.2278 28.8315 26.6668 27.7717 26.6668 26.6667C26.6668 26.2246 26.8424 25.8007 27.155 25.4882C27.4675 25.1756 27.8915 25 28.3335 25C28.7755 25 29.1994 25.1756 29.512 25.4882C29.8246 25.8007 30.0002 26.2246 30.0002 26.6667Z"
                fill="currentColor"
              />
              <path
                d="M33.3333 19.2667V22.4C33.3325 23.5167 32.9578 24.6009 32.2691 25.4799C31.5805 26.3588 30.6173 26.982 29.5333 27.25L27.4667 27.7667C26.9758 27.888 26.4638 27.8961 25.9694 27.7904C25.475 27.6846 25.0111 27.4677 24.6129 27.1562C24.2146 26.8447 23.8925 26.4467 23.6708 25.9922C23.4491 25.5378 23.3337 25.0389 23.3333 24.5333V17.1333C23.3333 16.2493 23.6845 15.4014 24.3096 14.7763C24.9348 14.1512 25.7826 13.8 26.6667 13.8V13.3333C26.6667 10.6812 25.6131 8.13763 23.7377 6.26227C21.8624 4.3869 19.3188 3.33333 16.6667 3.33333C14.0145 3.33333 11.471 4.3869 9.5956 6.26227C7.72024 8.13763 6.66667 10.6812 6.66667 13.3333V13.8C7.55072 13.8 8.39857 14.1512 9.02369 14.7763C9.64881 15.4014 10 16.2493 10 17.1333V24.5333C10.0007 25.041 9.88552 25.5422 9.66311 25.9985C9.4407 26.4549 9.11699 26.8544 8.71667 27.1667C8.12735 27.6162 7.40784 27.8619 6.66667 27.8667C6.39148 27.8652 6.1174 27.8317 5.85 27.7667L3.78333 27.25C2.70241 26.9788 1.74306 26.3543 1.05762 25.4756C0.372179 24.5969 -6.38203e-05 23.5144 8.20714e-09 22.4V19.2667C0.00632581 18.2379 0.329813 17.2362 0.926346 16.3981C1.52288 15.56 2.36342 14.9262 3.33333 14.5833V13.3333C3.33333 9.79711 4.73809 6.40573 7.23858 3.90524C9.73906 1.40476 13.1304 0 16.6667 0C20.2029 0 23.5943 1.40476 26.0948 3.90524C28.5952 6.40573 30 9.79711 30 13.3333V14.5833C30.9699 14.9262 31.8105 15.56 32.407 16.3981C33.0035 17.2362 33.327 18.2379 33.3333 19.2667Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="ui-chat-alert__text">
        {{ alertText }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .ui-chat-alert {
    display: grid;
    grid-template-rows: 1fr;
    width: max-content;
    max-width: 100%;
    position: sticky;
    inset-block-end: 0;
    z-index: 5;
    margin-block-start: auto;
    margin-inline: auto;

    @media (hover: hover) {
      &:hover {
        .ui-chat-alert__animation {
          background: var(--color-state-accent, #3b82f6);
          border-color: var(--color-state-accent, #3b82f6);
          color: var(--color-white, #fff);
        }
      }
    }

    &.alert-enter-active,
    &.alert-leave-active {
      transition:
        grid-template-rows 1s ease,
        translate 0.5s ease,
        scale 0.5s ease,
        opacity 0.25s ease;
    }

    &.alert-enter-active {
      transition-delay: 0s, 0.5s, 0.5s, 0.5s;
    }

    &.alert-enter-from,
    &.alert-leave-to {
      translate: 0% 100%;
      opacity: 0;
      scale: 0 0;
      grid-template-rows: 0fr;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      overflow: hidden;
      padding-block-start: 52px;
    }

    &__animation {
      display: flex;
      align-items: center;
      width: 54px;
      aspect-ratio: 1/1;
      background: var(--color-background-primary, #fff);
      border: 2px solid var(--color-background-primary, #fff);
      border-radius: 50%;
      position: relative;
      color: var(--color-state-accent, #3b82f6);
      margin-block-end: 24px;
      transition-property: color, border-color, background;
      transition-duration: 1.2s;
      transition-timing-function: ease;

      &::before,
      &::after {
        content: '';
        position: absolute;
        border-radius: inherit;
        translate: -50% -50%;
        inset-inline-start: 50%;
        inset-block-start: 50%;
        aspect-ratio: 1/1;
        max-width: none;
        background: var(--bg);
        animation: ui-chat-alert-scale 2.5s ease infinite;
        color: var(--color-state-accent, #3b82f6);
      }

      &::before {
        width: 145%;
        z-index: -1;
        --bg: hsl(from currentColor h s l / 8%);
      }

      &::after {
        width: 175%;
        z-index: -2;
        --bg: hsl(from currentColor h s l / 6%);
      }
    }

    &__icons {
      flex-grow: 1;
      display: flex;
      align-items: center;
      align-self: stretch;
      overflow: hidden;
    }

    &__icon-wrap {
      width: 100%;
      flex-shrink: 0;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        animation: ui-chat-alert-slide 1.5s ease-in-out infinite;
      }

      &:last-child {
        scale: 0.1 0.1;
        animation: ui-chat-alert-slide2 1.5s ease-in-out infinite;
      }
    }

    &__icon {
      width: 34px;
      height: auto;
    }

    &__text {
      min-width: 257px;
      max-width: 100%;
      width: max-content;
      padding-inline: 24px;
      padding-block: 8px;
      min-height: 32px;
      background: linear-gradient(
        180deg,
        var(--color-background-primary, #fff) 0%,
        var(--color-background-secondary, #f8f8f8) 100%
      );
      border: 1px solid var(--color-separator-border-primary, #e5e7eb);
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      font-size: 14px;
      line-height: 125%;
      text-align: center;
      color: var(--color-text-primary);
      margin-inline: auto;
    }
  }

  @keyframes ui-chat-alert-scale {
    50% {
      scale: 0.75 0.75;
    }
  }

  @keyframes ui-chat-alert-slide {
    85%,
    to {
      translate: -100% 0%;
      scale: 0.1 0.1;
    }
  }

  @keyframes ui-chat-alert-slide2 {
    85%,
    to {
      translate: -100% 0%;
      scale: 1 1;
    }
  }
</style>
