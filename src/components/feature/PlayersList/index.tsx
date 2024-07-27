import { FC } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedPlayers } from "../../../redux/slices/GameSlice";
import { IPlayer } from "../../../redux/slices/types";

interface PlayersListProps {
  maxSelected?: number;
  filter?: "you" | "evil";
  onSelect?: (selected: number | number[]) => void;
}

const filterPlayers = (players, filter) => {
  console.log(filter);
  return players;
};

const PlayersList: FC<PlayersListProps> = ({
  maxSelected = 1,
  filter = "you",
}) => {
  const dispatch = useDispatch();
  const { players, submitSelection, selectedPlayers } = useSelector(
    (state: RootState) => state.game.game
  );

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
            submitClassName="bg-red-300 border-red-400"
          />
        );
      })}
    </div>
  );
};

export default PlayersList;
