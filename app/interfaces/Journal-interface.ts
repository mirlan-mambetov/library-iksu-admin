import { IBase } from './Base-interface'

export interface IJournal extends IBase {
	title: string
	subtitle: string
	description: string
	image?: string
	journalHead: IJournalHead[]
}
export interface IJournalHead extends IBase {
	title: string
	items: IJournalHeadItems[]
}
export interface IJournalHeadItems extends IBase {
	title: string
	description: string
}
