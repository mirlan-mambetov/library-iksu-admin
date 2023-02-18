import { useAuth } from "@/hooks/use.auth"
import { useRouter } from "next/router"

export const ProtectRoute = ({ children }) => {
  const { isLogged, isLoading } = useAuth()
  const {pathname, push} = useRouter()
  if (isLoading || (!isLogged && window.location.pathname !== '/'))
  push('/')
  else if (isLogged && window.location.pathname === '/')
  push('/dashboard')
    
  return children
}