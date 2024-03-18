export const styles = (obj: { [key: string]: string | undefined }) => {
  return Object.entries(obj)
    .filter(([key, value]) => key !== undefined && value !== undefined)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
};
