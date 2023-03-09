export interface IPaginateProps {
	totalPage: number
	handler: ({ selected }: { selected: number }) => void
	initialPage: number
}
