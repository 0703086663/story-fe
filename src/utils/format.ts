import { format, parse } from 'date-fns'
export const formatDatetime = (value: string) => {
    if (!value) return
  
    const date = parse(value, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
    let formatDate = 'dd/MM/yyyy'
    let formatTime = ''
      return format(new Date(date), `${formatDate} ${formatTime}`)

  }
  