import React, { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

interface PlayerListItemProps extends ComponentPropsWithoutRef<"button"> {
  playerId: number;
  isSelected: boolean;
}

const ListItem: FC<PlayerListItemProps> = ({
  playerId,
  isSelected,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        "h-8 w-8 cursor-pointer font-bold  rounded-md bg-gray-300 hover:bg-gray-200 transition flex items-center justify-center",
        isSelected && "bg-gray-200 border-[0.2rem] border-gray-400"
      )}
    >
      {playerId + 1}
    </button>
  );
};

export default ListItem;
