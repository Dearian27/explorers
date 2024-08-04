import React from "react";
import PlayersList from "../../feature/PlayersList";
import Textarea from "../../common/Textarea";
import { useGameProps } from "../../../pages/Game/GameProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CloneIF = () => {
  const { checkIsActiveClone, message, setMessage, wasActiveClone } =
    useGameProps();
  const { players, currentPlayer } = useSelector(
    (state: RootState) => state.game.game
  );
  return (
    <>
      {(checkIsActiveClone(players[currentPlayer]?.id) || wasActiveClone) && (
        <>
          <h1 className="text-xl font-semibold">Виберіть вашу жертву:</h1>
          <PlayersList
            filter={players[currentPlayer]?.disabledCellIds}
            maxSelected={1}
          />
          <Textarea
            value={message}
            setValue={setMessage}
            min={0}
            max={35}
            placeholder="Повідомлення (необов'язково)"
          />
        </>
      )}
    </>
  );
};

export default CloneIF;
