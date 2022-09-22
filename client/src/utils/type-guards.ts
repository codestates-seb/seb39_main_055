export function isKeyOf<T>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

export function isArrayOfString(value: unknown): value is string[] {
  if (!Array.isArray(value)) return false;

  return value.length > 0 && value.every((item) => typeof item === "string");
}
