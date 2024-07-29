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
        "h-10 w-10 text-lg cursor-pointer font-bold active:translate-y-1 rounded-lg bg-gray-300 hover:bg-gray-200 transition flex items-center justify-center",
        isSelected &&
          "bg-gray-200 border-[0.2rem] border-gray-400 translate-y-1",
        isSubmitted && selectedPlayers.includes(playerId) && submitClassName
      )}
    >
      {playerId + 1}
    </button>
  );
};

export default ListItem;
