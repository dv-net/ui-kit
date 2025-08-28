<script setup lang="ts">
  import { UiTagProps } from "@/lib/components/UiTag/types.ts";

  withDefaults(defineProps<UiTagProps>(), {
    size: "md",
    text: "",
    mode: "neutral",
    pointer: false
  });
</script>

<template>
  <div class="ui-tag" :class="[size, mode, { pointer }]">
    <span class="ui-tag__text">{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
  @use "sass:map";

  $mode-background-colors: (
    "positive": var(--color-background-positive),
    "warning": var(--color-background-warning),
    "negative": var(--color-background-negative),
    "accent": var(--color-background-info),
    "neutral": var(--color-background-tertiary)
  );
  $mode-text-colors: (
    "positive": var(--color-text-positive),
    "warning": var(--color-text-warning),
    "negative": var(--color-text-negative),
    "accent": var(--color-text-accent),
    "neutral": var(--color-text-primary)
  );

  @mixin set-colors {
    @each $name, $glyph in $mode-background-colors {
      &.#{$name} {
        background: $glyph;
        color: map.get($mode-text-colors, $name);
      }
    }
  }

  .ui-tag {
    $text: #{&}__text;

    @include set-colors;

    display: inline-block;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    line-height: 0;

    #{$text} {
      font-weight: 500;
    }

    &.pointer {
      cursor: pointer;
    }

    &.sm {
      padding: 4px 12px;

      #{$text} {
        font-size: 10px;
        line-height: 12px;
      }
    }

    &.md {
      padding: 4px 12px;

      #{$text} {
        font-size: 12px;
        line-height: 16px;
      }
    }

    &.lg {
      padding: 8px 12px;

      #{$text} {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
</style>
