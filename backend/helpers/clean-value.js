export const cleanValue = (value) => {
  if (value === undefined || value === "" || value === " ") {
    return null;
  }
  return value;
};
