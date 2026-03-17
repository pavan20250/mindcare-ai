import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Mirror / liquid glass base
        "relative flex flex-col gap-6 rounded-3xl py-6",
        // Layered glass background — white/60 gives frosted look on light bg without colour cast
        "bg-white/60 dark:bg-white/10",
        // Backdrop blur for the frosted-mirror effect
        "backdrop-blur-2xl backdrop-saturate-[1.8]",
        // Specular border — brighter top-left, dimmer bottom-right
        "border border-white/30 dark:border-white/10",
        // Subtle inner highlight ring to simulate a reflective surface
        "ring-1 ring-inset ring-white/20 dark:ring-white/10",
        // Depth shadow
        "shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)]",
        // Sheen overlay via a pseudo-element — requires Tailwind arbitrary variant
        // We implement it as a real child div below in the JSX so it works without config changes
        "overflow-hidden",
        // Text
        "text-gray-900 dark:text-white",
        className
      )}
      {...props}
    >
      {/* Specular sheen — the "mirror" highlight stripe across the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
      {/* Soft radial glow in top-left corner to simulate light reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rounded-full bg-white/20 blur-2xl dark:bg-white/10"
      />
      {/* Content sits above overlays */}
      <div className="relative z-10 flex flex-col gap-6 w-full">
        {props.children as React.ReactNode}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold tracking-tight",
        // Slight text shadow for depth on the glass surface
        "drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm",
        "text-gray-600/80 dark:text-white/50",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6",
        // Hairline separator rendered as a gradient line (mirrors the top sheen)
        "[.border-t]:pt-6 [.border-t]:border-t [.border-t]:border-white/20",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}