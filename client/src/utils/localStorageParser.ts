//
function isNullableItem(value: string | null): value is null {
  return [null, "undefined"].includes(value);
}

export default function localStorageParser<T = unknown>(key: string): T | null {
  const data = localStorage.getItem(key);

  // localStorage Item이 빈 문자열("")일 수 있으므로 !data는 사용하지 않음
  if (isNullableItem(data)) return null;

  return JSON.parse(data);
}
