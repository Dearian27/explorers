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
    <div className="w-full relative inline-flex self-start rounded-md border btn3d bg-slate-200 text-black p-1 focus:translate-y-1 shadow-none">
      <textarea
        className="p-3 w-full outline-none bg-transparent resize-none text-md bg-white rounded-md pb-6"
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
