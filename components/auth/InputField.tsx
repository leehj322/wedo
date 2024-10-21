import { InputHTMLAttributes, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import Image from "next/image";

import Input from "@/@common/Input";
import VisibleOffIcon from "@/public/images/visibility_off.png";
import VisibleOnIcon from "@/public/images/visibility_on.png";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasVisibleTrigger?: boolean;
}

export function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  hasVisibleTrigger = false,
  ...field
}: InputFieldProps & Omit<ControllerRenderProps<T>, "ref">) {
  const [isVisible, setIsVisible] = useState(!hasVisibleTrigger);

  return (
    <div className="space-y-2">
      <FormItem className="relative space-y-3">
        <FormLabel className="!lg-medium">{label}</FormLabel>
        <FormControl>
          <Input
            className="bg-white"
            type={!isVisible ? type : "text"}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        {hasVisibleTrigger && (
          <button
            type="button"
            className="absolute right-[20px] top-[35px]"
            onClick={() => setIsVisible((p) => !p)}
          >
            {isVisible && (
              <Image
                width={24}
                height={24}
                src={VisibleOnIcon}
                alt="visible on"
              />
            )}
            {!isVisible && (
              <Image
                width={24}
                height={24}
                src={VisibleOffIcon}
                alt="visible off"
              />
            )}
          </button>
        )}
      </FormItem>
      <FormMessage />
    </div>
  );
}

export default function FormProviderField<T extends FieldValues>({
  label,
  type,
  placeholder,
  hasVisibleTrigger = false,
  ...props
}: InputFieldProps & UseControllerProps<T>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field: { ref, ...rest } }) => (
        <InputField
          label={label}
          type={type}
          placeholder={placeholder}
          hasVisibleTrigger={hasVisibleTrigger}
          {...rest}
        />
      )}
    />
  );
}