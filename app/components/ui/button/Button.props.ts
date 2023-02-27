import { ButtonOptions } from "@chakra-ui/react"
import { ButtonHTMLAttributes, DetailedHTMLProps, DetailsHTMLAttributes } from "react"

export interface ButtonProps extends DetailsHTMLAttributes<HTMLButtonElement> {
  type: "Delete" | "Update" | "Insert"
}