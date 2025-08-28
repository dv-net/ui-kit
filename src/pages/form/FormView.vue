<script setup lang="ts">
  import UiLink from "@/lib/components/UiLink/UiLink.vue";

  import { computed, reactive, ref } from "vue";

  import { UiButton, UiDragAndDrop, UiForm, UiFormItem, UiInput, UiSelect, UiTextarea, UiTooltip } from "@/lib";
  import { UiFormRules } from "@/lib/components/UiForm/types";

  const data = reactive({
    name: "",
    email: "",
    select: [],
    textarea: "",
    file: [],
    repeat: ""
  });
  const form = ref();
  const lang = ref(false);
  const error = ref("");
  const message = computed(() => (lang.value ? "Required" : "Required"));

  async function submit() {
    if (await form.value.validate()) {
      data.email = "";
      alert("Form sent successfully");
    }
  }
  const rules = computed<UiFormRules>(() => {
    return {
      email: [
        {
          required: true,
          message: message.value
        },
        {
          email: true,
          message: "Invalid email"
        }
      ],
      select: [
        {
          required: true,
          message: message.value
        }
      ],
      textarea: [
        {
          required: true,
          message: message.value
        },
        {
          validator: () => data.textarea.length > 5,
          message: "Custom validation"
        }
      ],
      file: [
        {
          required: true,
          message: message.value
        }
      ]
    };
  });
</script>

<template>
  <div class="page">
    <h1 class="global-title">Form</h1>

    <div class="grid">
      <div class="grid__header">Form example</div>
      <div>
        <UiForm :rules="rules" ref="form" :model="data">
          <UiFormItem :error="error" name="email">
            <template #label>
              <UiTooltip text="Content tooltip">
                Input whith <UiLink>template</UiLink>
              </UiTooltip>
            </template>
            <UiInput v-model="data.email" />
          </UiFormItem>
          <UiFormItem :error="error" name="select" label="Select">
            <UiSelect
              multiple
              with-search
              :options="[
                { value: 'Value 1', label: 'Value 1' },
                { value: 'Value 2', label: 'Value 2' }
              ]"
              v-model="data.select"
            >
              <template #default="{ option }">{{ option.value }}</template>
            </UiSelect>
          </UiFormItem>
          <UiFormItem :error="error" label="TextArea" name="textarea" notation="Notation">
            <UiTextarea v-model="data.textarea" />
          </UiFormItem>
          <UiFormItem :error="error" label="File" name="file">
            <UiDragAndDrop v-model="data.file" />
          </UiFormItem>
          <UiButton @click="submit">Submit</UiButton>
        </UiForm>
        <div class="btns">
          <UiButton mode="neutral" @click="error = 'Backend error'">Set error</UiButton>
          <UiButton mode="neutral" @click="error = ''">Clear error</UiButton>
          <UiButton mode="neutral" @click="form.resetValidate()">Reset validation</UiButton>
          <UiButton mode="neutral" @click="lang = !lang">{{ lang ? "ru" : "en" }}</UiButton>
        </div>
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
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .btns {
      display: flex;
      margin-top: 32px;
      gap: 12px;
    }
  }
</style>
