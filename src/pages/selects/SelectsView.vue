<script setup lang="ts">
  import UiRadio from "@/lib/components/UiRadio/UiRadio.vue";
  import UiSelect from "@/lib/components/UiSelect/UiSelect.vue";
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { onMounted, ref } from "vue";

  import { UiRadioGroup } from "@/lib";
  import { SelectType } from "@/lib/components/UiSelect/types";
  const data = ref([]);
  async function onLoadMore() {
    console.log(333);
    return await new Promise((res) => {
      isLoading.value = true;
      setTimeout(() => {
        data.value.push(...data.value, ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        isLoading.value = false;
        res(true);
      }, 3000);
    });
  }
  const virtual = ref([]);
  onMounted(async () => {
    options.value = await test();
    data.value = await test();
  });

  function test() {
    isLoading.value = true;
    return new Promise((res) => {
      setTimeout(() => {
        res([
          {
            value: "option2",
            label: "Option 2"
          }
        ]);
        isLoading.value = false;
      }, 2000);
    });
  }

  // const items = computed(() => {
  //   const res: number[] = [];
  //   for (let index = 0; index < 1000; index++) {
  //     res.push(index);
  //   }
  //   return res;
  // });

  const options = ref<{ value: string; label: string }[] | null>(null);

  // const menuItems = ref<ProfileMenuItem[]>([
  //   {
  //     iconName: "home",
  //     label: "At general",
  //     path: "/"
  //   },
  //   {
  //     iconName: "logout",
  //     label: "Logout",
  //     action: () => console.log("hello")
  //   }
  // ]);

  const isFilled = ref(false);
  const isLoading = ref(false);
  const isError = ref(false);
  const isDisabled = ref(false);
  const withSearch = ref(false);
  const clearable = ref(false);
  const multiple = ref(false);
  const type = ref<SelectType>("outside");
  const selectValue = ref([]);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Selects</h1>

    <div class="grid">
      <div class="grid__header">Controls</div>
      <div class="flex-row">
        <div class="flex-row">
          <h3>Filled</h3>
          <UiSwitch v-model="isFilled" />
        </div>
        <div class="flex-row">
          <h3>Disabled</h3>
          <UiSwitch v-model="isDisabled" />
        </div>
        <div class="flex-row">
          <h3>Error</h3>
          <UiSwitch v-model="isError" />
        </div>
        <div class="flex-row">
          <h3>With search</h3>
          <UiSwitch v-model="withSearch" />
        </div>
        <div class="flex-row">
          <h3>Clearable</h3>
          <UiSwitch v-model="clearable" />
        </div>
        <div class="flex-row">
          <h3>Multiple</h3>
          <UiSwitch v-model="multiple" />
        </div>
        <div class="flex-row">
          <h3>Loading</h3>
          <UiSwitch v-model="isLoading" />
        </div>
        <div class="flex-row">
          <h3>Type</h3>
          <UiRadioGroup v-model="type">
            <UiRadio value="default">Default</UiRadio>
            <UiRadio value="inside">Inside</UiRadio>
            <UiRadio value="outside">Outside</UiRadio>
          </UiRadioGroup>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">36px(sm)</div>
      <div>
        <UiSelect
          :type="type"
          v-model="selectValue"
          :options="options ?? []"
          :filled="isFilled"
          :error="isError"
          :disabled="isDisabled"
          :with-search="withSearch"
          :loading="isLoading"
          :clearable="clearable"
          :multiple="multiple"
          placeholder="Label"
          popper-class="popperClass"
          size="sm"
        >
          <template #header> <h3>template #header</h3> </template>
          <template #footer><h3>template #footer</h3></template>
        </UiSelect>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">44px(md)</div>
      <div>
        <UiSelect
          :type="type"
          v-model="selectValue"
          :options="[]"
          :searchFn="() => []"
          :filled="isFilled"
          :error="isError"
          :disabled="isDisabled"
          :with-search="withSearch"
          :loading="isLoading"
          :clearable="clearable"
          :multiple="multiple"
          popper-class="popperClass"
          :optionClass="() => 'test-class'"
        >
        </UiSelect>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">52px(lg)</div>
      <div>
        <UiSelect
          :type="type"
          v-model="selectValue"
          :options="options ?? []"
          :filled="isFilled"
          :error="isError"
          :loading="isLoading"
          :disabled="isDisabled"
          :with-search="withSearch"
          :clearable="clearable"
          placeholder="Label"
          size="lg"
        >
        </UiSelect>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">56px(xl)</div>
      <div>
        <UiSelect
          :type="type"
          v-model="selectValue"
          :options="[]"
          :filled="isFilled"
          :error="isError"
          :disabled="isDisabled"
          :loading="isLoading"
          :with-search="withSearch"
          :clearable="clearable"
          placeholder="Label"
          size="xl"
          :multiple="multiple"
        >
        </UiSelect>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Virtual</div>
      <div>
        <UiSelect
          @search="(e) => console.log(e)"
          custom-search
          :loading="isLoading"
          is-virtual-list
          @changeInfinityScroll="onLoadMore"
          with-search
          v-model="virtual"
          :options="data"
        >
          <template #header>
            <button @click="data = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11]">132</button>
          </template>
        </UiSelect>
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

  .option {
    margin: 0;
  }

  .test {
    width: 100%;
    height: 100px;
    background: grey;
  }

  .margin-bottom {
    margin-bottom: 30px;
  }

  .width-full {
    width: 100%;
  }

  .flex-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;


  }
</style>
