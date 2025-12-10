<script lang="ts" setup>
  import AvatarMask from "./components/AvatarMask.vue";

  import { computed, useId } from "vue";

  import { AvatarStatusType, UiAvatarProps } from "./types";

  import { UiIcon } from "@/lib";

  const { email = null, size = "sm", status = "reject", avatar, clickable } = defineProps<UiAvatarProps>();
  const avatarFromEmail = computed(() => (email ? (email[0] ?? "") + (email[1] ?? "") : null));
  const id = useId();
  const statuses = computed<Record<AvatarStatusType, { icon: string; color: string }>>(() => {
    return {
      success: {
        icon: "check-circle  1",
        color: "var(--color-icon-positive)"
      },
      pending: {
        icon: "person-kyc",
        color: "var(--color-icon-warning)"
      },
      reject: {
        icon: "cancel  1",
        color: "var(--color-icon-negative)"
      },
      default: {
        icon: "cancel  1",
        color: "var(--color-icon-tertiary)"
      }
    };
  });
</script>

<template>
  <div
    class="ui-avatar"
    :class="[`size-${size}`, { clickable }]"
    :style="{ color: statuses[email ? status : 'default'].color }"
  >
    <AvatarMask isTransparent class="ui-avatar__mask" />
    <svg class="ui-avatar__inner">
      <mask :id="id">
        <AvatarMask />
      </mask>

      <foreignObject :mask="`url(#${id})`" width="100%" height="100%">
        <div class="ui-avatar__avatar">
          <img v-if="avatar" :src="avatar" />
          <template v-else-if="avatarFromEmail">{{ avatarFromEmail }}</template>
          <template v-else>-</template>
        </div>
      </foreignObject>
    </svg>
    <div class="ui-avatar__status">
      <UiIcon type="100" :name="statuses[status].icon" size="fill" />
    </div>
  </div>
</template>
<style lang="scss">
  .ui-avatar {
    position: relative;
    border-radius: 50%;
    user-select: none;

    &.clickable {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          scale: 1.05;
          transition: var(--transition);
        }
      }
    }

    &__inner {
      width: 100%;
      height: 100%;
    }

    &__status {
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      width: 8px;
      height: 8px;
      align-items: center;
      justify-content: center;
    }

    &__avatar {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--color-background-tertiary);
      color: var(--color-text-accent);
      font-weight: 500;
      text-transform: uppercase;

      img {
        max-width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__mask {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
    }

    &.size-sm {
      width: 32px;
      height: 32px;
      flex: 0 0 32px;
      font-size: 13px;
    }

    &.size-md {
      width: 40px;
      height: 40px;
      flex: 0 0 40px;
      font-size: 16px;

      .ui-avatar__status {
        width: 12px;
        height: 12px;
      }
    }

    &.size-lg {
      width: 62px;
      height: 62px;
      flex: 0 0 62px;
      font-size: 16px;

      .ui-avatar__status {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
