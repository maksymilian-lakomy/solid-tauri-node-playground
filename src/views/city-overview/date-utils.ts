const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDate = (date: Date): string => {
  const stringifiedDay = days[date.getDay() - 1];
  const stringifiedMonth = months[date.getMonth()];

  return `${stringifiedDay}, ${date.getDate()} ${stringifiedMonth}`;
};
