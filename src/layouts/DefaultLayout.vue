<script setup lang="ts">
  import UiLayout from "@/lib/components/UiLayout/UiLayout.vue";
  import UiLayoutMenu from "@/lib/components/UiLayoutMenu/UiLayoutMenu.vue";

  import { ref } from "vue";

  import { UiIconButton, UiProfileMenu } from "@/lib";
  import { NAME_PROJECT } from "@/utils/constants/general.ts";
  import { menu,menuItems } from "@/utils/constants/menu";

  const menuCollapsed = ref<boolean>(false);

  function toggleMenu() {
    menuCollapsed.value = !menuCollapsed.value;
  }
</script>

<template>
  <UiLayout v-model="menuCollapsed" :is-menu-collapsed="menuCollapsed">
    <template #header>
      <div class="header">
        <UiIconButton iconName="menu  1" iconType="100" size="md" @click="toggleMenu" />
        <b>{{ NAME_PROJECT }}</b>
        <UiProfileMenu
          avatar="https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504/avatarki.-2.jpg"
          user-email="example@gmail.com"
          :menu-items="menuItems"
          status="pending"
        />
      </div>
    </template>
    <template #sidebar-desktop>
      <UiLayoutMenu :route-items="menu" :collapsed="menuCollapsed" />
    </template>
    <template #sidebar-mobile>
      <UiLayoutMenu class="drawer-menu" :route-items="menu" />
    </template>
    <template #default>
      <div class="main">
        <slot></slot>
      </div>
    </template>
  </UiLayout>
</template>

<style lang="scss">
  .header {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 16px;

    .ui-profile-menu {
      margin-left: auto;
    }
  }

  .ui-layout__main {
    display: flex;
    flex-grow: 1;

    .main {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
