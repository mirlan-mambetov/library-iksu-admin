import { IBase } from './Base-interface'
import { IHero } from './Hero-interface'
import { IJournal } from './Journal-interface'
import { ITabs } from './Tabs-interface'
import { IVestnikArhiv } from './Vestnik-interface'

export interface IPage extends IBase {
	name: string
	hero: IHero[]
	tabs: ITabs[]
	journal: IJournal[]
}
