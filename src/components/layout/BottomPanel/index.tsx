import { ComponentPropsWithoutRef, FC } from "react";

interface BottomPanelProps extends ComponentPropsWithoutRef<"div"> {}

const BottomPanel: FC<BottomPanelProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default BottomPanel;
