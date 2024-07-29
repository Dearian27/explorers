import { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface NumberInputProps extends ComponentPropsWithoutRef<"input"> {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  containerClassName?: string;
  buttonsContainerClassName?: string;
  buttonClassName?: string;
  plusClassName?: string;
  minusClassName?: string;
  min?: number;
  styleType?: "default" | "small";
  plusDisabled?: boolean;
  minusDisabled?: boolean;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  setValue,
  min = 0,
  plusDisabled,
  minusDisabled,
  containerClassName = "",
  buttonClassName = "",
  buttonsContainerClassName = "",
  plusClassName = "",
  minusClassName = "",
  styleType = "default",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "inline-flex rounded-[0.2rem] overflow-hidden self-start bg-white",
        containerClassName
      )}
    >
      <input
        readOnly
        value={value}
        type="number"
        className={twMerge(
          "h-16 w-16 bg-transparent text-center text-xl font-bold text-blue-400",
          styleType === "small" && "h-10 w-10 text-lg"
        )}
        {...props}
      />
      <div
        className={twMerge(
          "flex flex-col bg-blue-300",
          buttonsContainerClassName
        )}
      >
        <button
          className={twMerge(
            "flex items-center justify-center h-8 w-8 font-bold hover:bg-blue-400 transition duration-500 disabled:bg-blue-100",
            styleType === "small" && "h-5 w-5 text-xs",
            buttonClassName,
            plusClassName
          )}
          disabled={plusDisabled}
          onClick={() => setValue(value + 1)}
        >
          +
        </button>
        <button
          className={twMerge(
            "flex items-center justify-center h-8 w-8 font-bold  disabled:bg-blue-100 hover:bg-blue-400 transition duration-500",
            styleType === "small" && "h-5 w-5 text-xs",
            buttonClassName,
            minusClassName
          )}
          onClick={() => setValue(value - 1 >= min ? value - 1 : value)}
          disabled={value <= min || minusDisabled}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
