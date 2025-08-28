import { UiFormRule } from "./types";

type RuleName = Exclude<keyof UiFormRule, "message" | "validator">;

export const rules: Record<RuleName, (value: unknown, ruleValue?: unknown) => boolean> = {
  required: required,
  min: min,
  max: max,
  email: email
};

function required(value: unknown) {
  if (Array.isArray(value)) {
    return !!value.length;
  }
  return !!value;
}
function min(value: unknown, ruleValue: unknown) {
  return String(value).length >= Number(ruleValue);
}
function max(value: unknown, ruleValue: unknown) {
  return Number(ruleValue) >= String(value).length;
}

function email(value: unknown): boolean {
  return /^[^@]+@[^.@]+.[^.@]+$/.test(String(value));
}
