const generateDateData = () => {
  let dateData = []
  for (let date = 1; date <= 31; date++) {
    dateData.push(date)
  }
  return dateData
}

const generateMonthData = () => {
  let monthData = []
  for (let month = 1; month <= 12; month++) {
    monthData.push(month)
  }
  return monthData
}

const generateYearData = () => {
  let yearData = []
  for (let year = 1950; year <= 2050; year++) {
    yearData.push(year)
  }
  return yearData
}

export const helper = {
  generateDateData,
  generateMonthData,
  generateYearData
}
