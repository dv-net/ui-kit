export function getValueByHeaderName<T>(obj: T, path: string, emptyValue: string | boolean) {
  const keys = path.split(".");
  return keys.reduce((acc, key) => {
    if (acc !== null && typeof acc === "object" && key in acc) {
      return acc[key] ?? (emptyValue === false ? String(acc[key]) : emptyValue);
    }

    return emptyValue;
  }, obj);
}
