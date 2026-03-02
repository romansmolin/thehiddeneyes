import { ReactNode } from "react"

export type HowItWorksVariant = "variant-01" | "variant-02" | "variant-03"

export interface HowItWorksStep {
  title: string
  description: string
  icon?: ReactNode
}

export interface HowItWorksSectionProps {
  variant?: HowItWorksVariant
  title?: string
  titleHighlight?: string
  subtitle?: string
  steps?: HowItWorksStep[]
  imageSrc?: string
  imageAlt?: string
  className?: string
}
