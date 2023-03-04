import { IBase } from './Base-interface'
import { IHero } from './Hero-interface'
import { ITabs } from './Tabs-interface'

export interface IPage extends IBase {
	name: string
	hero: IHero[]
	tabs: ITabs[]
}
