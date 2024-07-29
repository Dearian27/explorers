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
    <div className={twMerge("fixed bottom-0 mx-auto w-full max-w-[780px]")}>
      <div
        className={twMerge(
          "mx-auto  h-16 flex items-center px-4 gap-2 w-full  max-w-[780px] bg-gray-100",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomPanel;
