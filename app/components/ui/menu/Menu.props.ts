import { IMenuLink } from '@/interfaces/Menu-link.interface'
import { DetailsHTMLAttributes } from 'react'

export interface IMenuProps extends DetailsHTMLAttributes<HTMLUListElement> {
	items: IMenuLink[]
}
