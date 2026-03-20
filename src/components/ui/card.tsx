import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Structure
        "relative flex flex-col gap-6 rounded-[22px] py-6",
        "overflow-hidden",

        // Glass fill — higher opacity than before for crisp frosted read
        "bg-white/68 dark:bg-white/10",

        // Backdrop: blur + heavy saturation lift + faint brightness
        "backdrop-blur-[28px] backdrop-saturate-[2.0] [backdrop-filter:blur(28px)_saturate(2)_brightness(1.02)]",
        "dark:[backdrop-filter:blur(28px)_saturate(1.6)_brightness(1)]",

        // Directional border — asymmetric to simulate a curved glass surface:
        // top+left: bright catch-light | right+bottom: dim shadow edge
        "border-0",
        "[border-top:1px_solid_rgba(255,255,255,0.90)]",
        "[border-left:1px_solid_rgba(255,255,255,0.80)]",
        "[border-right:1px_solid_rgba(255,255,255,0.38)]",
        "[border-bottom:1px_solid_rgba(255,255,255,0.30)]",
        "dark:[border-top:1px_solid_rgba(255,255,255,0.18)]",
        "dark:[border-left:1px_solid_rgba(255,255,255,0.14)]",
        "dark:[border-right:1px_solid_rgba(255,255,255,0.06)]",
        "dark:[border-bottom:1px_solid_rgba(255,255,255,0.05)]",

        // Layered shadow:
        //  ① inner top highlight (specular rim inside the glass)
        //  ② outer indigo ambient (card floats above bg blooms)
        //  ③ micro shadow for crisp grounding
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.22),0_4px_24px_rgba(99,102,241,0.08),0_1px_4px_rgba(0,0,0,0.05)]",
        "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_24px_rgba(0,0,0,0.25),0_1px_4px_rgba(0,0,0,0.15)]",

        // Text
        "text-gray-900 dark:text-white",

        className
      )}
      {...props}
    >
      {/*
        Specular sheen — the mirror highlight stripe.
        from-5%/to-95% keeps it away from the corners so it
        doesn't look clipped against the rounded border.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent from-[5%] via-white/90 to-transparent to-[95%]"
      />

      {/*
        Corner radial glow — larger and softer than before.
        Simulates the "lens flare" reflection in a glass object's top-left.
        blur-3xl at w-36/h-36 blends with the background bloom without
        creating a harsh hot-spot.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 -top-8 h-36 w-36
          rounded-full bg-white/40 blur-3xl dark:bg-white/[0.08]"
      />

      {/* Content sits above all overlays */}
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
        // Text shadow: slightly stronger than before — the cooler bg base
        // needs a touch more depth separation on the text
        "drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
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
        "text-gray-500/90 dark:text-white/50",
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
        // Footer divider uses the same gradient-line language as the top sheen
        "[.border-t]:pt-6 [.border-t]:border-t [.border-t]:border-white/25",
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