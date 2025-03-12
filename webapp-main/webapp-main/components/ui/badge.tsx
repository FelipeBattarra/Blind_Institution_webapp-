import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive/10 text-destructive",
        outline: "text-foreground",
        open: "border-transparent bg-blue-500/10 text-blue-500",
        underReview: "border-transparent bg-yellow-500/10 text-yellow-500",
        pendingApproval: "border-transparent bg-orange-500/10 text-orange-500",
        approved: "border-transparent bg-green-500/10 text-green-500",
        rejected: "border-transparent bg-red-500/10 text-red-500",
        closed: "border-transparent bg-gray-500/10 text-gray-500",
        primary: "border-transparent bg-blue-500/10 text-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
