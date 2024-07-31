/* eslint-disable @typescript-eslint/no-unused-vars */
import BottomPanel from "../../components/layout/BottomPanel";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
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
import PlayerBottomIF from "../../components/interfaces/PlayerBottomIF";

const Game = () => {
  const {
    playerInterfaceShow,
    setPlayerInterfaceShow,
    name,
    setName,
    blueTeamPoints,
    setBlueTeamPoints,
    infectPerson,
    setNextPlayer,
    checkIsActiveClone,
    toggleNightHandler,
    setMessage,
    message,
    wasActiveClone,
    timerEnd,
    setTimerEnd,
  } = useGameProps();

  const {
    currentPlayer,
    players,
    playersCount,
    selectedPlayers,
    day,
    submitSelection,
    additionalSettings: { currentCycle },
  } = useSelector((state: RootState) => state.game.game);
  // const dispatch = useDispatch();

  return (
    <>
      <PhaseLayout dayPhase="night">
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-col">
          {playerInterfaceShow !== currentPlayer && (
            <Cover
              name={players[currentPlayer]?.name}
              currentPlayer={currentPlayer + 1}
              onComplete={() => {
                setPlayerInterfaceShow(currentPlayer);
              }}
            />
          )}
          <PlayerRoleTitle />
          <h2 className="flex flex-col">
            <span>Ніч: {day}</span>
          </h2>
          <PhaseLayout cycle={0} currentDay={1}>
            <Input
              max={10}
              containerClassName="self-center"
              placeholder="Ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </PhaseLayout>

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

          <InterceptorIF />
        </div>
      </PhaseLayout>

      <PhaseLayout dayPhase="day">
        <div>
          <header className="w-full bg-gray-100 p-4 flex justify-between">
            <h1 className="text-md font-bold">День: {day}</h1>
            <h1>
              Клонів:{" "}
              {players.reduce((acc, next) => (next.isClone ? acc + 1 : acc), 0)}
              /{players.length}
              (тимчасово)
            </h1>
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
            {/* <div className="flex bg-red-200 self-start">
              <input
                readOnly
                value={redTeamPoints}
                type="number"
                className="h-16 w-16 bg-transparent text-center text-[1.4rem] font-bold text-red-400"
              />
              <div className="flex flex-col  bg-red-300">
                <button
                  className="h-8 w-8 font-bold"
                  onClick={() => setRedTeamPoints((prev) => prev + 1)}
                >
                  +
                </button>
                <button
                  onClick={() =>
                    setRedTeamPoints((prev) => (prev ? prev - 1 : prev))
                  }
                  className="h-8 w-8 font-bold"
                >
                  -
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </PhaseLayout>
      <BottomPanel className="justify-end">
        <PhaseLayout dayPhase="night">
          <PlayerBottomIF />
        </PhaseLayout>
        <PhaseLayout dayPhase="day">
          <button
            onClick={() => toggleNightHandler()}
            className="btn3d bg-cyan-400 shadow-cyan-500"
          >
            Розпочати ніч
          </button>
        </PhaseLayout>
      </BottomPanel>
    </>
  );
};

export default Game;
