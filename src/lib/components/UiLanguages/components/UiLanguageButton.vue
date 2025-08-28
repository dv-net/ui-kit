<script setup lang="ts">
  import UiFlagIcon from "@/lib/components/UiFlagIcon/UiFlagIcon.vue";

  import { UiIcon } from "@/lib";
  import { UiLanguagesButtonProps } from "@/lib/components/UiLanguages/types";

  const emits = defineEmits(["change"]);
  defineProps<UiLanguagesButtonProps>();
</script>

<template>
  <button
    @click="emits('change', locale)"
    :key="locale?.isoCode"
    class="ui-languages--modal__item"
    :class="{ 'is-active': locale?.isoCode === selected?.isoCode }"
  >
    <UiFlagIcon class="ui-languages--modal__item__flag" :isoCode="locale?.isoCode ?? ''" />
    <span>{{ locale.name }} <span v-if="locale?.nativeName"> ({{ locale?.nativeName }})</span></span>
    <UiIcon v-if="locale?.isoCode === selected?.isoCode" color="var(--color-icon-accent)" name="done" type="400" />
  </button>
</template>
