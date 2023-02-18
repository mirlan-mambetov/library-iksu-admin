import { NextPage } from "next"

export type AuthFields = {
  email: string
  password: string
}

export type RolesType = {
  onlyGuest?: boolean
  onlyModerators?: boolean
  onlyAdmin?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & RolesType
export type ComponentTypeAuth = {Component: RolesType}