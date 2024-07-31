import React from "react";
import Button from "../../common/Button";
import { useGameProps } from "../../../pages/Game/GameProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Timer from "../../feature/Timer";

const PlayerBottomIF = () => {
  const {
    checkIsActiveClone,
    wasActiveClone,
    setNextPlayer,
    name,
    timerEnd,
    setTimerEnd,
    infectPerson,
  } = useGameProps();
  const {
    players,
    selectedPlayers,
    currentPlayer,
    submitSelection,
    playersCount,
    day,
    additionalSettings: { currentCycle },
  } = useSelector((state: RootState) => state.game.game);
  return (
    <>
      {(checkIsActiveClone(players[currentPlayer]?.id) || wasActiveClone) && (
        <Button
          disabled={!selectedPlayers.length}
          freezeActive={true}
          styleType="blood"
          clickedClassName="!text-red-300"
          className="btn3d bg-accent !shadow-red-800"
          onClick={() => !submitSelection && infectPerson()}
        >
          INFECT
        </Button>
      )}
      <Button
        disabled={
          (day === 1 && !name && !players[currentPlayer]?.name) ||
          (currentPlayer === 0 && !timerEnd && currentCycle === 0)
        }
        onClick={() => setNextPlayer()}
        className="btn3d bg-cyan-400 shadow-cyan-500"
      >
        {currentPlayer === playersCount - 1 ? "Завершити ніч" : "Завершити хід"}
        {currentPlayer === 0 && currentCycle === 0 && (
          <>
            {" "}
            <Timer duration={10} onEnd={() => setTimerEnd(true)} />
          </>
        )}
      </Button>
    </>
  );
};

export default PlayerBottomIF;
