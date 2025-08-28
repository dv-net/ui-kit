<script setup lang="ts">
  import { provide, ref, watch } from "vue";

  import { FORM_PROVIDE_VALUE } from "./constants";
  import { UiFormProps } from "./types";
  import { useValidation } from "./useValidate";
  const props = defineProps<UiFormProps>();
  const { validation, errors } = useValidation(props.model ?? {});
  const formSubmitCounts = ref(0);
  provide(FORM_PROVIDE_VALUE, {
    model: props.model,
    rules: props.rules,
    validateField: validateField,
    errors: errors,
    formSubmitCounts: formSubmitCounts
  });

  function isValid() {
    return Object.values(errors.value).every((item) => !item.length);
  }

  function validate() {
    if (props.rules) {
      for (const key of Object.keys(props.model ?? {})) {
        if (props.rules[key]) {
          props.rules[key].forEach(() => {
            validateField(key);
          });
        }
      }
      formSubmitCounts.value++;
      const isValidValue = isValid();
      if (isValidValue) {
        resetValidate();
      }
      return isValidValue;
    }
  }

  function validateField(field: string) {
    if (props.rules) {
      if (props.rules[field]) {
        props.rules[field].forEach((item) => {
          if (props.model) {
            validation(field, props.model[field] as string, item);
          }
        });
      }
    }
  }

  function resetValidate() {
    for (const key in errors.value) {
      errors.value[key] = [];
    }
    formSubmitCounts.value = 0;
  }

  function changeLocaleErrors() {
    for (const [key, value] of Object.entries(errors.value)) {
      if (value.length) {
        errors.value[key] = [];
        validateField(key);
      }
    }
  }

  watch(
    () => props.rules,
    () => {
      changeLocaleErrors();
    },
    { deep: true }
  );

  defineExpose({
    validate: validate,
    resetValidate: resetValidate
  });
</script>

<template>
  <form @submit.prevent>
    <slot />
  </form>
</template>
