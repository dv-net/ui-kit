<script setup lang="ts">
  const modelValue = defineModel<boolean>();
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="ui-overlay">
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss">
  .ui-overlay {
    position: fixed;
    z-index: 9999;
    width: 100vw;
    height: 100dvh;
    background: rgb(0 0 0 / 50%);
    inset: 0;
  }
</style>
