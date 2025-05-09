export function getMonthYearFromString(dateString) {
  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthNumber = monthIndex + 1;
  return {
    month: monthNumber,
    year: year,
  };
}

