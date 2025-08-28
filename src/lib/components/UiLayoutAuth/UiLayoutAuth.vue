<template>
  <div class="ui-layout-auth">
    <div class="ui-layout-auth__content">
      <slot></slot>
      <div class="ui-layout-auth__lang-wrapper">
        <slot name="lang-select"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .ui-layout-auth {
    display: flex;
    min-height: 100lvh;
    align-items: center;
    justify-content: center;
    padding: 16px;

    &__content {
      display: flex;
      width: 100%;
      max-width: 456px;
      flex-direction: column;
      align-items: center;
    }

    &__lang-wrapper {
      width: 100%;
      padding: 16px;
      border: 1px solid #F3F3F3;
      border-radius: 12px;
      margin-top: 40px;
      background: #F7F9FB;
    }
  }
</style>