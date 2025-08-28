<script setup>
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<style lang="scss">
  @import "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";

  body {
    font-family: Roboto, sans-serif;
    font-size: 14px;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .pointer {
    @media (hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .global-title {
    font-size: 32px;
    text-decoration: underline;
  }

  .global-top {
    display: flex;
    align-items: center;
    gap: 24px;

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
</style>
