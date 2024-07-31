import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PhaseLayout = ({
  children = null,
  dayPhase = null,
  startDay = null,
  currentDay = null,
  cycle = null,
}: {
  children: React.ReactNode;
  dayPhase?: "night" | "day";
  currentDay?: number;
  startDay?: number;
  cycle?: number;
}) => {
  const {
    isNight,
    day,
    additionalSettings: { currentCycle },
  } = useSelector((state: RootState) => state.game.game);

  const isDayPhaseValid =
    dayPhase === null ||
    (dayPhase === "day" && !isNight) ||
    (dayPhase === "night" && isNight);
  const isCurrentDayValid = currentDay === null || currentDay === day;
  const isStartDayValid = startDay === null || startDay <= day;
  const isCycleValid = cycle === null || cycle === currentCycle;

  if (isDayPhaseValid && isCurrentDayValid && isStartDayValid && isCycleValid)
    return <>{children}</>;
};

export default PhaseLayout;
