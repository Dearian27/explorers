import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MessageProps extends ComponentPropsWithoutRef<"div"> {
  day: number;
  type: "clone";
  children: ReactNode | string;
  className?: string;
  receiverClassName?: string;
  senderClassName?: string;
  receiver?: string;
}

const Message: FC<MessageProps> = ({
  receiver,
  day,
  children,
  type,
  className = "",
  receiverClassName = "",
  senderClassName = "",
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        "btn3d bg-zinc-200 !shadow-zinc-300 text-black flex flex-col font-normal",
        className
      )}
    >
      <span className="text-xl font-medium">
        <span className={senderClassName}>{type === "clone" && "Клон"}</span>{" "}
        {"-> "}
        <span className={twMerge("font-bold text-blue-400", receiverClassName)}>
          {receiver || "???"}
        </span>
      </span>
      <span>{children}</span>
      <span className="self-end text-sm">День: {day}</span>
    </div>
  );
};

export default Message;
