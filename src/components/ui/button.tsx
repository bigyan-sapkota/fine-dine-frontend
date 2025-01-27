import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, LucideIcon } from "lucide-react";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center relative justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:brightness-[1.15]",
        gradient:
          "bg-gradient-to-br from-pink-400 to-pink-500 text-primary-foreground shadow hover:brightness-[1.15]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary:
          "after:custom-transition relative z-50 bg-primary font-semibold text-white after:absolute after:-right-2.5 after:-z-10 after:hidden after:h-[145%] after:w-[90%] after:rounded-lg after:border-4 after:border-primary after:content-[''] hover:after:w-2/5 after:lg:block",
        common:
          "bg-primary text-white font-semibold border-2 border-primary hover:bg-white hover:text-primary custom-transition",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "rounded-md px-8 text-base py-2 lg:py-3",
        lg: "h-10 rounded-md px-8 py-7",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  Icon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      children,
      Icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span
          className={cn("inline-flex items-center justify-center", {
            "opacity-0": loading,
          })}
        >
          <span className="inline-flex items-center justify-center">
            {children}
          </span>
          {Icon && <Icon className="ml-2 size-4" />}
        </span>
        {loading && (
          <span className="absolute grid place-items-center">
            {<Loader2 className="size-4 animate-spin" />}
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
