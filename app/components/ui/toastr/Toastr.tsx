import { Stack, useToast } from '@chakra-ui/react'
import { FC } from 'react'
import { ToastrProps } from './Toastr.props'



export const Toastr: FC<ToastrProps> = ({message, statuses}) => {
  const toastr = useToast()

  return (
    <Stack isInline spacing={2}>
      {toastr({
        title: `${message}`,
        status: statuses,
        isClosable: true,
      })}
    </Stack>
  )
}
