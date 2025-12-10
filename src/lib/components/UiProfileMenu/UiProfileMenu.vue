<script setup lang="ts">
  import UiProfileMenuItem from "@/lib/components/UiProfileMenu/components/UiProfileMenuItem.vue";

  import { UiAvatar, UiDropdown } from "@/lib";
  import { UiProfileMenuProps } from "@/lib/components/UiProfileMenu/types.ts";

  defineProps<UiProfileMenuProps>();
  const isOpen = defineModel<boolean>("modelValue", { default: false });

  function closeMenu() {
    isOpen.value = false;
  }
</script>

<template>
  <div class="ui-profile-menu" :class="{ 'is-active': isOpen, 'is-default': !menuItems.length }">
    <UiDropdown
      :fit-content-width="false"
      :teleport="false"
      placement="bottom-end"
      popper-class="ui-profile-menu--dropdown"
      v-model="isOpen"
    >
      <template #reference>
        <div class="ui-profile-menu--trigger">
          <UiAvatar :avatar="avatar" :status="status" :email="userEmail" clickable/>
        </div>
      </template>
      <div class="ui-profile-menu--items">
        <div class="ui-profile-menu--header">
          <UiAvatar :avatar="avatar" :status="status" size="md" :email="userEmail" />
          <div class="ui-profile-menu--header__info">
            <p class="ui-profile-menu--header__email">{{ userEmail ?? "-" }}</p>
          </div>
        </div>
        <div
          class="ui-profile-menu--group"
          :class="{
            'is-empty': !group.length || group.every((item) => typeof item.isShow === 'boolean' && !item.isShow)
          }"
          v-for="(group, index) in menuItems"
          :key="index"
        >
          <template v-for="item in group" :key="item.name">
            <slot
              v-if="$slots[`menu-item-${item.name}`] && !!item.isShow"
              :name="`menu-item-${item.name}`"
              :item="item"
              :index="item.name"
              :closeMenu="closeMenu"
            />
            <UiProfileMenuItem v-else @closeMenu="closeMenu" :item="item" />
          </template>
        </div>
      </div>
    </UiDropdown>
  </div>
</template>

<style lang="scss">
  .ui-profile-menu {
    &--header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--color-separator-border-primary);
      margin-bottom: 6px;
      background: color-mix(in srgb, #fff 100%, var(--color-background-accent) 3%);
      gap: 16px;

      &__info {
        overflow: hidden;
      }

      &__email {
        overflow: hidden;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &--dropdown {
      width: 315px;

      .ui-dropdown__content {
        max-height: unset;
      }
    }

    &--group {
      &:not(:last-child, .is-empty)::after {
        display: block;
        width: 100%;
        height: 1px;
        margin: 6px 0;
        background-color: var(--color-separator-border-primary);
        content: "";
      }

      &:last-child {
        margin-bottom: 6px;
      }
    }
  }
</style>
