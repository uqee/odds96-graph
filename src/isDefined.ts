export const isDefined = (
  value: null | number | string | undefined
): value is number | string => {
  return (
    value !== undefined &&
    value !== null &&
    value !== '' &&
    value !== 'null' &&
    value !== 0 &&
    !Number.isNaN(value)
  );
};
