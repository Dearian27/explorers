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
    <div className="w-full relative inline-flex self-start text-blackfocus:translate-y-1 shadow-none">
      <textarea
        className="p-3 w-full min-h-28 outline-none bg-transparent resize-none text-base py-5 px-4 bg-secondary rounded-xl pb-6 placeholder:text-[#72727C]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minLength={min}
        maxLength={max}
        {...props}
      />
      <div className="absolute bottom-5 right-4 font-bold text-[#252525]">
        {value.length}/{max}
      </div>
    </div>
  );
};

export default Textarea;
