import BottomPanel from "../../components/layout/BottomPanel";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./styles.css";
import PhaseLayout from "../../components/layout/PhaseLayout";
import PlayersList from "../../components/feature/PlayersList";
import Textarea from "../../components/common/Textarea";
import Cover from "./Cover";
import Message from "../../components/common/Message";
import Input from "../../components/common/Input";
import BadVisionedText from "../../components/feature/BadVisionedText";
import { useGameProps } from "./GameProvider";
import { twMerge } from "tailwind-merge";
import { setIsGameStarted } from "../../redux/slices/GameSlice";
import Timer from "../../components/feature/Timer";

const Game = () => {
  const {
    playerInterfaceShow,
    setPlayerInterfaceShow,
    name,
    setName,
    blueTeamPoints,
    setBlueTeamPoints,
    setRedTeamPoints,
    redTeamPoints,
    infectPerson,
    setNextPlayer,
    checkIsActiveClone,
    toggleNightHandler,
    startGame,
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
    messages,
    submitSelection,
    additionalSettings: { isInterceptorsViewClear },
  } = useSelector((state: RootState) => state.game.game);
  const dispatch = useDispatch();

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
          <h1
            className={twMerge(
              "text-2xl font-bold self-center uppercase",
              players[currentPlayer]?.isClone && "text-red-500"
            )}
          >
            {players[currentPlayer]?.role}
          </h1>
          {players[currentPlayer]?.isClone &&
            players[currentPlayer].role !== "clone" && (
              <h1
                className={twMerge(
                  "text-md font-semibold self-center text-red-600 mt-[-1.2rem]"
                )}
              >
                уражений клоном
              </h1>
            )}
          <h2 className="flex flex-col">
            <span>Ніч: {day}</span>
          </h2>
          <PhaseLayout currentDay={1}>
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
          {messages
            ?.filter(
              (message) =>
                message.type === "clone" &&
                message.receiptDay === day &&
                message.receiversId.includes(players[currentPlayer].id)
            )
            ?.map((message, index) => (
              <Message
                receiver={"YOU"}
                key={index}
                day={message.sendDay}
                type={message.type}
              >
                {message.text}
              </Message>
            ))}
          {players[currentPlayer]?.role === "interceptor" && (
            <>
              {messages
                ?.filter(
                  (message) =>
                    message.type === "clone" && message.receiptDay === day
                )
                ?.map((message, index) => (
                  <Message
                    key={index}
                    day={message.sendDay}
                    type={message.type}
                  >
                    {message.text}
                  </Message>
                ))}
            </>
          )}
        </div>
      </PhaseLayout>

      <PhaseLayout dayPhase="day">
        <div>
          <header className="w-full bg-gray-200 p-4 flex justify-between">
            <h1>День: {day}</h1>
            <h1>
              Клонів:{" "}
              {players.reduce((acc, next) => (next.isClone ? acc + 1 : acc), 0)}
              /{players.length}
            </h1>
            <Button onClick={() => dispatch(setIsGameStarted(true))}>
              Other screen
            </Button>
          </header>
          <div className="flex-1 flex flex-col">
            <Message
              type="clone"
              className="max-w-[60%]  bg-yellow-300 !shadow-none"
              receiverClassName="text-amber-500"
              senderClassName="text-amber-500"
              day={1}
            >
              {isInterceptorsViewClear ? (
                <BadVisionedText text="some text about last night" />
              ) : (
                "some text about last night"
              )}
            </Message>
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
            <div className="flex bg-red-200 self-start">
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
            </div>
          </div>
        </div>
      </PhaseLayout>
      <BottomPanel className="justify-end">
        <PhaseLayout dayPhase="night">
          <span>
            {currentPlayer}/{players[currentPlayer]?.id}
          </span>
          {(checkIsActiveClone(players[currentPlayer]?.id) ||
            wasActiveClone) && (
            <Button
              disabled={!selectedPlayers.length}
              freezeActive={true}
              styleType="blood"
              clickedClassName="!text-red-300"
              className="btn3d bg-rose-700 !shadow-red-800"
              onClick={() => !submitSelection && infectPerson()}
            >
              INFECT
            </Button>
          )}
          <Button
            disabled={
              (day === 1 && !name) || (currentPlayer === 0 && !timerEnd)
            }
            onClick={() => setNextPlayer()}
            className="btn3d bg-cyan-400 shadow-cyan-500"
          >
            {currentPlayer === playersCount - 1
              ? "Завершити ніч"
              : "Завершити хід"}
            {currentPlayer === 0 && (
              <>
                {" "}
                <Timer duration={10} onEnd={() => setTimerEnd(true)} />
              </>
            )}
          </Button>
        </PhaseLayout>
        <PhaseLayout dayPhase="day">
          {day === 0 ? (
            <button
              onClick={() => startGame(5)}
              className="btn3d bg-cyan-400 shadow-cyan-500"
            >
              Розпочати гру
            </button>
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
