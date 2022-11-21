const getMessageError = (data: string | any) => {
  return typeof data === 'string' ? data : "Error del servidor"
}

const pad = (num: number, replace?: string): string => {
  return num.toString().padStart(2, replace || "0")
}

const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
}


const getTodayPlusNDays = (days: number) => {
  const date: Date = new Date();
  date.setDate(date.getDate() + days)

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const getDateTransform = (Date: any) => {
  return `${Date.getFullYear()}-${pad(Date.getMonth() + 1)}-${pad(Date.getDate())}`
}

export {
  getMessageError,
  pad,
  getToday,
  getTodayPlusNDays,
  getDateTransform
}
