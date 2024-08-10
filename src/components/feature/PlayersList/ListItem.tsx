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
        "h-7 w-7 text-base cursor-pointer font-bold rounded-md  bg-transparent  text-[#252525] transition duration-500 flex items-center justify-center",
        isSelected && "text-white bg-[#252525] translate-y-0.5",
        isSubmitted && selectedPlayers.includes(playerId) && submitClassName
      )}
    >
      {playerId + 1}
    </button>
  );
};

export default ListItem;
