import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PhaseLayout = ({
  children,
  dayPhase,
  startDay,
  currentDay,
}: {
  children: React.ReactNode;
  dayPhase?: "night" | "day";
  currentDay?: number;
  startDay?: number;
}) => {
  const { isNight, day } = useSelector((state: RootState) => state.game.game);
  if (
    (dayPhase === "day" && !isNight) ||
    (dayPhase === "night" && isNight) ||
    currentDay === day ||
    startDay <= day
  )
    return <>{children}</>;
};

export default PhaseLayout;
