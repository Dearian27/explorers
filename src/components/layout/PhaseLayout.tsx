import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PhaseLayout = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "night" | "day";
}) => {
  const isNight = useSelector((state: RootState) => state.game.game.isNight);
  if ((type === "day" && !isNight) || (type === "night" && isNight))
    return <>{children}</>;
};

export default PhaseLayout;
