export const padNumber = (value, length = 2) => String(value).padStart(length, "0");

export const formatPageCount = (current, total) =>
  `${padNumber(current + 1)} / ${padNumber(total)}`;
