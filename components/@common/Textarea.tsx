import { forwardRef, TextareaHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variant = cva(
  [
    "w-full",
    "rounded-xl border border-solid border-primary",
    "bg-input-default",
    "text-default-light placeholder:text-placeHolder",
  ],
  {
    variants: {
      boxSize: {
        default: "h-[75px]",
        sm: "h-[50px]",
        md: "h-[6.5rem]",
        lg: "h-60",
      },
      fontSize: {
        default: "md-normal tab:lg-normal",
        sm: "md-normal",
        lg: "lg-normal",
      },
      padding: {
        default: "px-4 py-3",
        lg: "p-4 max-tab:py-2 tab:px-6",
      },
    },
    compoundVariants: [
      {
        boxSize: ["md", "lg"],
        fontSize: "default",
        padding: "lg",
        className: "!leading-[26px]",
      },
    ],
    defaultVariants: {
      boxSize: "default",
      fontSize: "default",
      padding: "default",
    },
  },
);

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof variant>;

export default forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { boxSize, fontSize, padding, className, ...props },
  ref,
) {
  return (
    <textarea
      className={cn(variant({ boxSize, fontSize, padding, className }))}
      ref={ref}
      {...props}
    />
  );
});
