export const toNumber = (s: string | undefined): number | undefined => {
  return s !== undefined
    ? +s.replaceAll(',', '').replaceAll('$', '')
    : undefined;
};
