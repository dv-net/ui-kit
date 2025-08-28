<script lang="ts" setup>
  import { ref } from "vue";

  import { UiInput, UiLink, UiRadio, UiRadioGroup, UiSwitch } from "@/lib";
  import { UiLinkMode, UiLinkSize } from "@/lib/components/UiLink/types";
  const size = ref<UiLinkSize>("lg");
  const mode = ref<UiLinkMode>("primary");
  const text = ref("link");
  const disabled = ref(false);
  const type = ref<"to" | "href">("to");
</script>
<template>
  <div class="page">
    <h1 class="global-title">UiLink</h1>

    <div class="grid">
      <div class="grid__header">Disabled</div>
      <div class="flex-row"><UiSwitch v-model="disabled" /></div>
    </div>

    <div class="grid">
      <div class="grid__header">Size</div>
      <div class="flex-row">
        <UiRadioGroup size="sm" v-model="size">
          <UiRadio value="sm">sm</UiRadio>
          <UiRadio value="md">md</UiRadio>
          <UiRadio value="lg">lg</UiRadio>
          <UiRadio value="xl">xl</UiRadio>
        </UiRadioGroup>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Mode</div>
      <div class="flex-row">
        <UiRadioGroup size="sm" v-model="mode">
          <UiRadio value="primary">primary</UiRadio>
          <UiRadio value="secondary">secondary</UiRadio>
        </UiRadioGroup>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Navigation type</div>
      <div class="flex-row">
        <UiRadioGroup size="sm" v-model="type">
          <UiRadio value="to">to</UiRadio>
          <UiRadio value="href">href</UiRadio>
        </UiRadioGroup>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Text</div>
      <div class="flex-row"><UiInput v-model="text" /></div>
    </div>

    <div class="grid">
      <div class="grid__header">Example</div>
      <div class="flex-row example">
        <UiLink
          :href="type === 'href' ? 'https://google.com' : undefined"
          :to="type === 'to' ? '/summary' : undefined"
          :disabled="disabled"
          :size="size"
          :mode="mode"
          >{{ text }}</UiLink
        >
      </div>
    </div>
  </div>
</template>
