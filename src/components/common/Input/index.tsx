import { ComponentPropsWithoutRef, FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  containerClassName?: string;
  max?: number;
  className?: string;
  value: string;
}

const Input: FC<InputProps> = ({
  containerClassName = "",
  max,
  className,
  value,
  ...props
}) => {
  useEffect(() => {
    setInputValueLength(value.length);
  }, [value]);
  const [inputValueLength, setInputValueLength] = useState(0);
  return (
    <div
      className={twMerge(
        "btn3d bg-slate-200 inline-block text-black p-1 focus:translate-y-1 shadow-none max-w-72",
        containerClassName
      )}
    >
      <input
        value={value}
        maxLength={max || 10000}
        className={twMerge(
          "w-full px-3 py-2 rounded-md bg-white outline-none",
          max && "pr-10",
          className
        )}
        {...props}
      />
      {max && (
        <span className="absolute font-bold top-1/2 translate-y-[-50%] right-3 text-gray-400">
          {max - inputValueLength}
        </span>
      )}
    </div>
  );
};

export default Input;
