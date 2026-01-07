// utils/formData.ts
export function objectToFormData(
  obj: Record<string, any>,
  form?: FormData,
  parentKey?: string
): FormData {
  const formData = form || new FormData();

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value === null || value === undefined) continue;

    if (value instanceof File) {
      // Handle file uploads
      formData.append(fullKey, value);
    } else if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((v, index) => {
        if (typeof v === "object" && !(v instanceof File)) {
          objectToFormData(v, formData, `${fullKey}[${index}]`);
        } else {
          formData.append(`${fullKey}[${index}]`, v);
        }
      });
    } else if (typeof value === "object") {
      // Nested objects
      objectToFormData(value, formData, fullKey);
    } else {
      // Primitive types
      formData.append(fullKey, String(value));
    }
  }

  return formData;
}
