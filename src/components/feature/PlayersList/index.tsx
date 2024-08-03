import { FC } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedPlayers } from "../../../redux/slices/GameSlice";
import { IPlayer } from "../../../redux/slices/types";
import { twMerge } from "tailwind-merge";

interface PlayersListProps {
  maxSelected?: number;
  onSelect?: (selected: number | number[]) => void;
  filter?: number[] | null | "you";
  submitSelectedClassName?: string;
}

const PlayersList: FC<PlayersListProps> = ({
  maxSelected = 1,
  filter = null,
  submitSelectedClassName,
}) => {
  const dispatch = useDispatch();
  const { players, submitSelection, selectedPlayers, currentPlayer } =
    useSelector((state: RootState) => state.game.game);

  const filterPlayers = (
    players: IPlayer[],
    filter: number[] | null | "you"
  ) => {
    if (Array.isArray(filter)) {
      return players.filter((player) => !filter.includes(player.id));
    }
    if (filter === "you") {
      return players.filter(
        (player) => player.id !== players[currentPlayer].id
      );
    }
    return players;
  };

  const handleSelect = (playerId: number) => {
    if (submitSelection) return;
    if (selectedPlayers.includes(playerId)) {
      dispatch(
        setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId))
      );
    } else if (maxSelected === 1) {
      dispatch(setSelectedPlayers([playerId]));
    } else if (maxSelected > selectedPlayers.length) {
      dispatch(setSelectedPlayers([...selectedPlayers, playerId]));
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {filterPlayers(players, filter).map((player: IPlayer) => {
        return (
          <ListItem
            key={player.id}
            isSelected={selectedPlayers.includes(player.id)}
            onClick={() => handleSelect(player.id)}
            playerId={player.id}
            isSubmitted={submitSelection}
            submitClassName={twMerge(
              "bg-red-300 border-red-400",
              submitSelectedClassName
            )}
          />
        );
      })}
    </div>
  );
};

export default PlayersList;
