<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { computed, useAttrs } from "vue";

  import { UiButtonProps } from "./types";

  import { UiLoading } from "@/lib";

  const attrs = useAttrs();

  const props = withDefaults(defineProps<UiButtonProps>(), {
    size: "lg",
    disabled: false,
    loading: false,
    nativeType: "button",
    type: "primary",
    mode: "accent",
    leftIconType: "400",
    leftIconName: "",
    leftIconColor: "",
    leftIconSize: "sm",
    rightIconType: "400",
    rightIconName: "",
    rightIconColor: "",
    rightIconSize: "sm"
  });
  const currentTag = computed(() => (attrs.href ? "a" : props.to ? "router-link" : "button"));
</script>

<template>
  <component
    v-bind="attrs"
    :is="currentTag"
    class="ui-button"
    :target="target"
    :to="to"
    :class="[
      `size-${size}`,
      `type-${type}`,
      `mode-${mode}`,
      {
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    :type="nativeType"
    :style="outlineTypeColor && type === 'outline' && { '--color-state-accent': outlineTypeColor }"
  >
    <span v-if="leftIconName" class="ui-button__icon-slot">
      <UiIcon :type="leftIconType" :name="leftIconName" :color="leftIconColor" :size="leftIconSize" />
    </span>
    <span v-if="$slots.default" class="ui-button__content">
      <slot />
    </span>
    <span v-if="rightIconName" class="ui-button__icon-slot">
      <UiIcon :type="rightIconType" :name="rightIconName" :color="rightIconColor" :size="rightIconSize" />
    </span>
    <UiLoading :is-show="loading" icon-size="fill" />
  </component>
</template>

<style lang="scss">
  @use "./style/index";
</style>
