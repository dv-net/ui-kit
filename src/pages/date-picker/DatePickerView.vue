<script setup lang="ts">
  import dayjs from "dayjs";

  import UiDatepickerRange from "@/lib/components/UiDatepicker/UiDatepickerRange.vue";
  import { UiButton } from "@/lib";

  import { ref } from "vue";

  const date = ref([]);

  const minDate = ref(dayjs().add(-3, "days").toString());

  const maxDate = ref(dayjs().add(3, "days").toString());
</script>

<template>
  <div class="page">
    <h1 class="global-title">Date Picker</h1>

    <div class="grid">
      <div class="grid__header">Selected</div>
      <div>{{ date }}</div>
    </div>

    <div class="grid">
      <div class="grid__header">32px(xs)</div>
      <UiDatepickerRange v-model="date" clearable />
    </div>

    <div class="grid">
      <div class="grid__header">36px(sm)</div>
      <UiDatepickerRange size="sm" v-model="date" />
    </div>

    <div class="grid">
      <div class="grid__header">44px(md)</div>
      <UiDatepickerRange size="md" v-model="date" />
    </div>

    <div class="grid">
      <div class="grid__header">52px(lg)</div>
      <UiDatepickerRange size="lg" v-model="date" />
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl) disabled</div>
      <UiDatepickerRange size="xl" v-model="date" disabled />
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl) Min Date</div>
      <UiDatepickerRange size="xl" v-model="date" :min-date="minDate" />
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl) Max Date</div>
      <UiDatepickerRange size="xl" v-model="date" :max-date="maxDate" />
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl) AutoApply</div>
      <UiDatepickerRange size="xl" v-model="date" auto-apply />
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl) Single DatePicker</div>
      <UiDatepickerRange size="xl" v-model="date" single />
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl) Custom projection</div>
      <UiDatepickerRange size="xl" v-model="date" hide-slider-arrows>
        <template #trigger="{ selectedDate }">
          <UiButton type="secondary">
            {{ selectedDate }}
          </UiButton>
        </template>
      </UiDatepickerRange>
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
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
</style>
