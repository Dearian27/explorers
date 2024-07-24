import { FC, useState } from "react";
import ListItem from "./ListItem";

interface PlayersListProps {
  maxSelected?: number;
  filter?: "you" | "evil";
  onSelect?: (selected: number | number[]) => void;
}

const filterPlayers = (players, filter) => {
  return players;
};

const PlayersList: FC<PlayersListProps> = ({
  maxSelected = 1,
  filter = "you",
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  const handleSelect = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    } else if (maxSelected === 1) {
      setSelectedPlayers([playerId]);
    } else if (maxSelected > selectedPlayers.length) {
      setSelectedPlayers((prev) => [...prev, playerId]);
    }
  };

  const players = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {filterPlayers(players, filter).map((player) => {
        return (
          <ListItem
            isSelected={selectedPlayers.includes(player.id)}
            onClick={() => handleSelect(player.id)}
            playerId={player.id}
          />
        );
      })}
    </div>
  );
};

export default PlayersList;
