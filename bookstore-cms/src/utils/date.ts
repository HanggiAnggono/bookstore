import dayjs from 'dayjs'
// format date using dayjs, accept string
export function formatDate(input: string | number): string {
  return dayjs(input).format('DD/MM/YYYY')
}