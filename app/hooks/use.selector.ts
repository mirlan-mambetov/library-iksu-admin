import {useSelector as useReduxSelector, TypedUseSelectorHook} from 'react-redux'
import { TypeRootState } from '@/../store'

export const useSelector: TypedUseSelectorHook<TypeRootState> = useReduxSelector