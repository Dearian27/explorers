/* eslint-disable @typescript-eslint/no-unused-vars */
import BottomPanel from "../../components/layout/BottomPanel";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./styles.css";
import PhaseLayout from "../../components/layout/PhaseLayout";
import PlayersList from "../../components/feature/PlayersList";
import Textarea from "../../components/common/Textarea";
import Cover from "./Cover";
import Input from "../../components/common/Input";
import { useGameProps } from "./GameProvider";
import { twMerge } from "tailwind-merge";
import Timer from "../../components/feature/Timer";
import InterceptorIF from "../../components/interfaces/InterceptorIF";
import PlayersMessagesIF from "../../components/interfaces/PlayersMessagesIF";
import PlayerRoleTitle from "../../components/interfaces/PlayerRoleTitle";
import PlayerNightBottomIF from "../../components/interfaces/PlayerBottomIF";
import PlayerNameInputIF from "../../components/interfaces/PlayerNameInputIF";
import Menu from "../../components/layout/Menu";
import { useRef } from "react";
import SpeechTimer from "../../components/feature/SpeechTimer";
import DetectiveIF from "../../components/interfaces/DetectiveIF";
import Missions from "../../components/feature/Missions";
import { setIsVoting } from "../../redux/slices/GameSlice";
import PlayerVotingIF from "../../components/interfaces/PlayerVotingIF";

const Game = () => {
  const {
    blueTeamPoints,
    setBlueTeamPoints,
    checkIsActiveClone,
    toggleNightHandler,
    setMessage,
    message,
    wasActiveClone,
    setOpenMenu,
    votingAnswer,
    startVoting,
    voteHandler,
  } = useGameProps();

  const {
    currentPlayer,
    players,
    selectedPlayers,
    day,
    voting: { isVoting, data: missions, currentMission },
    additionalSettings: { currentCycle },
  } = useSelector((state: RootState) => state.game.game);
  const dispatch = useDispatch();

  const buttonRef = useRef(null!);

  return (
    <>
      <Menu buttonRef={buttonRef} />
      <PhaseLayout dayPhase="night">
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-col">
          <Cover name={players[currentPlayer]?.name} />
          <PlayerRoleTitle />
          {/* <h2 className="flex flex-col">
            <span>Ніч: {day}</span>
          </h2> */}
          <PlayerNameInputIF />

          {(checkIsActiveClone(players[currentPlayer]?.id) ||
            wasActiveClone) && (
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

          <PlayersMessagesIF />
          <DetectiveIF />
          <InterceptorIF />
        </div>
      </PhaseLayout>

      <PhaseLayout dayPhase="day">
        {isVoting ? (
          <div className="w-full h-full p-4 pb-16 gap-4 flex flex-1 flex-col">
            <Cover name={players[currentPlayer]?.name} />
            <PlayerVotingIF />
          </div>
        ) : (
          <div>
            <header className="w-full bg-gray-100 p-4 flex justify-between">
              <h1 className="text-md font-bold">День: {day}</h1>
              <button
                ref={buttonRef}
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                Меню
              </button>
            </header>
            <div className="flex-1 flex flex-col">
              <div className="flex bg-blue-200 self-start">
                <input
                  readOnly
                  value={blueTeamPoints}
                  type="number"
                  className="h-16 w-16 bg-transparent text-center text-[1.4rem] font-bold text-blue-400"
                />
                <div className="flex flex-col bg-blue-300">
                  <button
                    className="h-8 w-8 font-bold"
                    onClick={() => setBlueTeamPoints((prev) => prev + 1)}
                  >
                    +
                  </button>
                  <button
                    className="h-8 w-8 font-bold"
                    onClick={() =>
                      setBlueTeamPoints((prev) => (prev ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                </div>
              </div>
              <SpeechTimer />

              <div className="flex flex-col gap-4 self-center items-center my-4 p-4 pt-2 border border-dark rounded-md bg-main">
                <h1 className="text-xl font-bold">Голосування</h1>
                {currentMission < missions?.length && (
                  <h2 className="-mt-4 text-md font-bold text-light">
                    2 гравці
                  </h2>
                )}
                <PlayersList maxSelected={players?.length} />
                {/* //* додати день під результатом голосування */}
                {currentMission < missions?.length && (
                  <Button
                    disabled={
                      selectedPlayers.length !==
                      missions[currentMission]?.playersCapacity
                    }
                    // disabled={} //* disable якщо не було місії у цьому ходу або модалку висвітити при спробі
                    onClick={() => startVoting()}
                    className="bg-light shadow-[#a19182]"
                  >
                    Розпочати
                  </Button>
                )}
              </div>
              <Missions />
            </div>
          </div>
        )}
      </PhaseLayout>

      <BottomPanel className="justify-end">
        <PhaseLayout dayPhase="night">
          <PlayerNightBottomIF />
        </PhaseLayout>
        <PhaseLayout dayPhase="day">
          {isVoting ? (
            <Button
              disabled={!votingAnswer}
              onClick={() => voteHandler()}
              className="btn3d bg-cyan-400 shadow-cyan-500"
            >
              Підтвердити
            </Button>
          ) : (
            <button
              onClick={() => toggleNightHandler()}
              className="btn3d bg-cyan-400 shadow-cyan-500"
            >
              Розпочати ніч
            </button>
          )}
        </PhaseLayout>
      </BottomPanel>
    </>
  );
};

export default Game;
