export const inspect = <TParams, TKey extends keyof TParams>(
  params: TParams,
  excludedkeys: TKey[]
): string => {
  let result: string = '';

  const keys: TKey[] = (Object.keys(params) as TKey[])
    .filter((key) => !excludedkeys.includes(key))
    .sort();

  const maxlength: number = Math.max(
    ...keys.map((key) => key.toString().length)
  );

  for (const key of keys) {
    const value: unknown = params[key];
    if (value !== undefined)
      result += `\n${key.toString().padEnd(maxlength, ' ')} ${value}`;
  }

  return result;
};
