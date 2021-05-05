export const airDateFormat = (air_date) => {
  if(air_date === null) {
    return ''
  }
  let [year, month, day] = air_date.split('-');
  month =
    month === '01'
      ? 'January'
      : month === '02'
      ? 'February'
      : month === '03'
      ? 'March'
      : month === '04'
      ? 'April'
      : month === '05'
      ? 'May'
      : month === '06'
      ? 'June'
      : month === '07'
      ? 'July'
      : month === '08'
      ? 'August'
      : month === '09'
      ? 'September'
      : month === '10'
      ? 'October'
      : month === '11'
      ? 'November'
      : month === '12'
      ? 'December'
      : '';
  return [year, month, day];
};
