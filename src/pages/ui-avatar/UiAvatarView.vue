<script lang="ts" setup>
  import UiDragAndDrop from "@/lib/components/UiDragAndDrop/UiDragAndDrop.vue";
  import UiInput from "@/lib/components/UiInput/UiInput.vue";

  import { useObjectUrl } from "@vueuse/core";
  import { computed, ref } from "vue";

  import { UiAvatar, UiRadio, UiRadioGroup } from "@/lib";
  import { AvatarSizeType, AvatarStatusType } from "@/lib/components/UiAvatar/types";
  import { FileToUpload } from "@/lib/components/UiDragAndDrop/types";

  const size = ref<AvatarSizeType>("lg");
  const status = ref<AvatarStatusType>("pending");
  const email = ref("test@test");
  const avatar = ref<FileToUpload[]>([]);
  const url = useObjectUrl(computed(() => avatar.value[0]?.file));
</script>

<template>
  <div class="page">
    <h1 class="global-title">UiAvatar</h1>
    <div class="grid">
      <div class="grid__header">Size</div>
      <UiRadioGroup size="sm" v-model="size">
        <UiRadio value="sm">sm</UiRadio>
        <UiRadio value="md">md</UiRadio>
        <UiRadio value="lg">lg</UiRadio>
      </UiRadioGroup>
    </div>
    <div class="grid">
      <div class="grid__header">Status</div>
      <UiRadioGroup size="sm" v-model="status">
        <UiRadio value="pending">pending</UiRadio>
        <UiRadio value="success">success</UiRadio>
        <UiRadio value="reject">reject</UiRadio>
      </UiRadioGroup>
    </div>
    <div class="grid">
      <div class="grid__header">Email</div>
      <UiInput v-model="email" />
    </div>
    <div class="grid">
      <div class="grid__header">Avatar</div>
      <UiDragAndDrop :multiple="false" v-model="avatar" />
    </div>
    <div class="grid">
      <div class="grid__header">Example</div>
      <div class="example">
        <UiAvatar :avatar="url" :size="size" :status="status" :email="email" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .example {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
</style>
