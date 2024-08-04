import React, { ComponentPropsWithoutRef, FC } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { RootState } from "../../../redux/store";

interface PlayerListItemProps extends ComponentPropsWithoutRef<"button"> {
  playerId: number;
  isSelected: boolean;
  isSubmitted?: boolean;
  submitClassName?: string;
}

const ListItem: FC<PlayerListItemProps> = ({
  playerId,
  isSelected,
  isSubmitted,
  submitClassName,
  ...props
}) => {
  const selectedPlayers = useSelector(
    (state: RootState) => state.game.game.selectedPlayers
  );

  return (
    <button
      {...props}
      className={twMerge(
        "h-12 w-12 text-xl cursor-pointer font-bold active:translate-y-1 rounded-lg border-[0.25rem] bg-main border-light text-dark  transition flex items-center justify-center",
        isSelected && "bg-light border-dark translate-y-1",
        isSubmitted && selectedPlayers.includes(playerId) && submitClassName
      )}
    >
      {playerId + 1}
    </button>
  );
};

export default ListItem;
