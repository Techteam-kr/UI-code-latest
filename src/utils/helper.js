export const preventEvent = (e) => {
  if (e && e.stopPropagation) {
    e.stopPropagation();
    e.preventDefault();
  }
};
