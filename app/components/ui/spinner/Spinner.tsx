import { Spinner } from '@chakra-ui/react'
import {FC} from 'react'
import styles from './Spinner.module.scss'

export const SpinnerComponent: FC = () => {
  return (
    <div className={styles.spinner}>
      <Spinner color='red.500' />
    </div>
  )
}
