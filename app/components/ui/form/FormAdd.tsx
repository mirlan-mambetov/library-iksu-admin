import { ModalComponentInitialContext } from '@/contexts/Modal-component'
import {FC, useContext} from 'react'
import { UpdateHero } from './hero/Update-hero'

export const FormAdd: FC = () => {
  const {updatedId, updatedName} = useContext(ModalComponentInitialContext)

  switch(updatedName) {
    case "UPDATEHERO":
      return <UpdateHero/>
  }
}
