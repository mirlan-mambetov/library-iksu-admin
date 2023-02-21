'use client'
import { useAuth } from "@/hooks/use.auth"
import { useRouter } from "next/router"
import { NextResponse } from "next/server"
import { useEffect } from "react"

export const ProtectRoute = ({ children }) => {
  const { isLogged, isLoading } = useAuth()
  const {pathname, push} = useRouter()
  useEffect(() => {
   const check = () => {
    if (!isLogged) return push('/')
    else if (isLogged) return push('/dashboard')
   }
   check()
  }, [isLogged])
    
  return children
}