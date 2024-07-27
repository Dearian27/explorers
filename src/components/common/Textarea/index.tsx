import React, {
  ComponentPropsWithoutRef,
  Dispatch,
  FC,
  SetStateAction,
} from "react";

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  min: number;
  max: number;
}

const Textarea: FC<TextareaProps> = ({
  value,
  setValue,
  min,
  max,
  ...props
}) => {
  return (
    <div className="w-full relative inline-flex self-start rounded-md pb-6 border border-gray-400 ">
      <textarea
        className="p-3 w-full outline-none bg-transparent resize-none text-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minLength={min}
        maxLength={max}
        {...props}
      />
      <div className="absolute bottom-2 right-2">
        {value.length}/{max}
      </div>
    </div>
  );
};

export default Textarea;
