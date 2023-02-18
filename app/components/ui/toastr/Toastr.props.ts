import { ReactNode } from "react";

export interface ToastrProps {
  message: ReactNode
  statuses: "success" | "error" | "warning" | "info" | "loading"
}