import { TDateTypes } from "../types/TDateTypes.type";

const resolveLeadingZeroes = (item: number | string) => {
  if (typeof item === "number") {
    if (item < 10) return "0" + item;
    return "" + item;
  } else {
    if (item.length === 1) return "0" + item;
    return item;
  }
};

const dateMap = new Map<
  TDateTypes,
  ({
    d,
    m,
    y,
    h,
    min,
  }: {
    d?: number;
    m?: number;
    y?: number;
    h?: number;
    min?: number;
  }) => string
>();
dateMap.set(
  "dd/mm/yyyy",
  ({ d, m, y }) => `${resolveLeadingZeroes(d)}/${resolveLeadingZeroes(m)}/${y}`
);
dateMap.set(
  "dd/mm/yyyy hh:mm",
  ({ d, m, y, h, min }) =>
    `${resolveLeadingZeroes(d)}/${resolveLeadingZeroes(
      m
    )}/${y} ${resolveLeadingZeroes(h)}:${resolveLeadingZeroes(min)}`
);
dateMap.set(
  "yyyy-mm-dd",
  ({ d, m, y }) => `${y}-${resolveLeadingZeroes(m)}-${resolveLeadingZeroes(d)}`
);
dateMap.set(
  "dd-mm-yyyy",
  ({ d, m, y }) => `${resolveLeadingZeroes(d)}-${resolveLeadingZeroes(m)}-${y}`
);
dateMap.set(
  "dd-mm-yyyy hh:mm",
  ({ d, m, y, h, min }) =>
    `${resolveLeadingZeroes(d)}-${resolveLeadingZeroes(
      m
    )}-${y} ${resolveLeadingZeroes(h)}:${resolveLeadingZeroes(min)}`
);

export const getDate = (date = new Date(), type: TDateTypes = "dd/mm/yyyy") => {
  const [d, m, y, h, min] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ];
  const output = dateMap.get(type);
  if (output === undefined) {
    return null;
  }
  return output({ d, m, y, h, min });
};
