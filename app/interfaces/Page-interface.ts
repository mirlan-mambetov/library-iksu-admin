import { IBase } from "./Base-interface"
import { IHero } from "./Hero-interface"

export interface IPage extends IBase {
	name: string
	hero: IHero[]
}