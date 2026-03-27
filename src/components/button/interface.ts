import { ReactNode } from "react"
import { PressableProps } from "react-native"

type ButtonVariant = "primary" | "outline" | "ghost"
type ButtonSize = "small" | "medium" | "large"

export interface ButtonProperties extends PressableProps {
  title: string
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}