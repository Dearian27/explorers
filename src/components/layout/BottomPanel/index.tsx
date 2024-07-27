import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

interface BottomPanelProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const BottomPanel: FC<BottomPanelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "fixed max-w-[780px] mx-auto bottom-0 h-16 flex items-center px-4 gap-2 w-full bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BottomPanel;
