import { onMounted, ref } from "vue";

import { UiFormRule } from "./types";
import { rules } from "./validations";

export function useValidation(models: Record<string, unknown>) {
  const errors = ref({} as Record<string, string[]>);

  function validation(fieldName: string, fieldValue: string, rule: UiFormRule) {
    for (const [ruleName, ruleValue] of Object.entries(rule)) {
      if (rules[ruleName] && ruleValue) {
        setError(rules[ruleName](fieldValue, ruleValue), fieldName, rule.message);
      } else if (ruleName === "validator") {
        setError(ruleValue(), fieldName, rule.message);
      }
    }
  }

  function setError(isValid: boolean, fieldName: string, errorMessage: string) {
    if (isValid) {
      errors.value[fieldName] = errors.value[fieldName].filter((error: string) => error !== errorMessage);
    } else {
      if (!errors.value[fieldName].includes(errorMessage)) {
        errors.value[fieldName].push(errorMessage);
      }
    }
  }

  onMounted(() => {
    errors.value = Object.keys(models).reduce(
      (acc, item) => {
        acc[item] = [];
        return acc;
      },
      {} as Record<string, string[]>
    );
  });

  return { validation, errors };
}
