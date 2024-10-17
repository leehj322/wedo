import { forwardRef, InputHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variant = cva(
  [
    "w-full",
    "rounded-xl border border-solid border-primary hover:border-brand-border focus:border-brand-border",
    "p-4",
    "text-default-light placeholder:text-placeHolder",
  ],
  {
    variants: {
      boxSize: {
        default: "h-11 tab:h-12",
        sm: "h-11",
        md: "h-12",
        lg: "h-12 tab:h-14",
      },
      fontSize: {
        default: "md-normal tab:lg-normal",
        sm: "md-normal",
        lg: "lg-normal",
      },
      padding: {
        default: "py-[10px] tab:py-3",
        xs: "py-[6px] tab:py-2",
        sm: "px-3 py-[10px]",
        md: "max-tab:py-3",
        lg: "tab:px-6",
      },
      bgColor: {
        default: "bg-input-default",
        white: "bg-white",
      },
      error: {
        true: "border-danger",
      },
    },
    compoundVariants: [
      {
        boxSize: "sm",
        fontSize: "sm",
        padding: "sm",
        className: "font-medium",
      },
    ],
    defaultVariants: {
      boxSize: "default",
      fontSize: "default",
      padding: "default",
      bgColor: "default",
    },
  },
);

type Props = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof variant> & {
    errorMessage?: string;
  };

export default forwardRef<HTMLInputElement, Props>(function Input(
  {
    boxSize,
    fontSize,
    padding,
    bgColor,
    error,
    errorMessage,
    className,
    ...props
  },
  ref,
) {
  return (
    <section className="flex w-full flex-col gap-y-2">
      <input
        className={cn(
          variant({ boxSize, fontSize, padding, bgColor, error, className }),
        )}
        ref={ref}
        {...props}
      />
      {errorMessage && <p className="md-medium text-danger">{errorMessage}</p>}
    </section>
  );
});
