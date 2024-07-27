import { ReactNode } from "react";

const Message = ({
  day,
  children,
  type,
}: {
  day: number;
  type: "clone";
  children: ReactNode | string;
}) => {
  console.log(type);
  return (
    <div>
      <span>
        {type === "clone" && "Клон"} {"->"} ???
      </span>
      <span>{children}</span>
      <span>День: {day}</span>
    </div>
  );
};

export default Message;
