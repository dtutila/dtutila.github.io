export const isChristmasSeason = (date = new Date()) => {
  const month = date.getMonth();
  return month === 10 || month === 11;
};

export const isHalloweenSeason = (date = new Date()) => {
  const month = date.getMonth();
  return month === 9 || (month === 10 && date.getDate() <= 2);
};
