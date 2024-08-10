import Button from "../../common/Button";
import { useGameProps } from "../../../pages/Game/GameProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Timer from "../../feature/Timer";
import { setSubmitSelectedPlayers } from "../../../redux/slices/GameSlice";

const PlayerNightBottomIF = () => {
  const {
    // checkIsActiveClone,
    // wasActiveClone,
    setNextPlayer,
    name,
    timerEnd,
    setTimerEnd,
    // infectPerson,
    checkIsIntroductionNight,
  } = useGameProps();
  const {
    players,
    selectedPlayers,
    currentPlayer,
    submitSelection,
    playersCount,
    day,
    additionalSettings: { currentCycle, doubleNightCycle },
  } = useSelector((state: RootState) => state.game.game);
  const dispatch = useDispatch();

  return (
    <>
      {!checkIsIntroductionNight() && (
        <>
          {players[currentPlayer]?.role === "detective" &&
            (currentCycle > 0 || !doubleNightCycle) && (
              <Button
                disabled={!selectedPlayers.length}
                freezeActive={true}
                clickedClassName="!text-blue-200 !shadow-none"
                className="btn3d bg-blue-400 shadow-blue-500"
                onClick={() =>
                  !submitSelection && dispatch(setSubmitSelectedPlayers(true))
                }
              >
                Перевірити
              </Button>
            )}
          {/* {(checkIsActiveClone(players[currentPlayer]?.id) ||
            wasActiveClone) && (
          
          )} */}
        </>
      )}
      <Button
        disabled={
          (day === 1 && !name && !players[currentPlayer]?.name) ||
          (currentPlayer === 0 &&
            !timerEnd &&
            currentCycle === 0 &&
            !checkIsIntroductionNight())
        }
        onClick={() => setNextPlayer()}
        className="btn3d bg-cyan-400 shadow-cyan-500"
      >
        {currentPlayer === playersCount - 1 ? "Завершити ніч" : "Завершити хід"}
        {currentPlayer === 0 &&
          currentCycle === 0 &&
          !checkIsIntroductionNight() && (
            <>
              {" "}
              <Timer duration={10} onEnd={() => setTimerEnd(true)} />
            </>
          )}
      </Button>
    </>
  );
};

export default PlayerNightBottomIF;
