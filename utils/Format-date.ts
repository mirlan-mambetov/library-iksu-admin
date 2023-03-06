import dayjs from "dayjs"

export const formatDate = (date: any, options?: string) => {
  if (options) {
		return dayjs(date).format(`${options}`)
	} else {
		return dayjs(date).format(`MMM-YYYY`)
	}
}