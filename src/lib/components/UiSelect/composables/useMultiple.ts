import { Ref } from "vue";

export function useMultiple(modelValue: Ref<string[]>) {
  function setModelValueItem(value: string) {
    if (modelValue.value.includes(value)) {
      modelValue.value = modelValue.value.filter((item) => item !== value);
    } else {
      modelValue.value.push(value);
    }
  }
  return { setModelValueItem };
}
