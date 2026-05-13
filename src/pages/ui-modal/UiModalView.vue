<script setup lang="ts">
  import UiButton from "@/lib/components/UiButton/UiButton.vue";
  import UiModal from "@/lib/components/UiModal/UiModal.vue";

  import { ref } from "vue";

  import { UiForm, UiFormItem, UiInput } from "@/lib";

  const isShow = ref<boolean>(false);
  const isShowCustomModal = ref<boolean>(false);
  const valueInput = ref<string | null>(null);

  const handleSubmit = async () => {
    try {
      for (let i = 1; i <= 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`);
        const data = await response.json();
        console.log(`Request data #${i}:`, data);
      }
      isShow.value = false;
    } catch (error) {
      console.error("Error while executing requests:", error);
    }
  };
</script>

<template>
  <div class="page">
    <h1 class="global-title">Modal</h1>

    <div class="grid">
      <div class="grid__header">Basic</div>
      <div>
        <ui-button mode="neutral" @click="isShow = true">Open</ui-button>
        <ui-modal v-model="isShow" padding="40" width="400">
          <ui-form @submit.prevent="handleSubmit">
            <ui-form-item label="Value">
              <ui-input v-model="valueInput" is-empty-value-null />
            </ui-form-item>
            <ui-button mode="neutral" native-type="submit">Send</ui-button>
          </ui-form>
        </ui-modal>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Custom</div>
      <div>
        <ui-button type="secondary" @click="isShowCustomModal = true">Open custom modal</ui-button>
        <ui-modal v-model="isShowCustomModal" popper-class="custom-modal" :teleport="false">
          <div class="block">
            <span>Custom Modal</span>
          </div>
        </ui-modal>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        font-size: 18px;
        font-weight: bold;
      }

      :deep(.custom-modal) {
        padding: 32px;

        .ui-modal__content {
          padding: 40px;
          border-radius: 24px;

          .block {
            display: flex;
            width: 300px;
            height: 300px;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
