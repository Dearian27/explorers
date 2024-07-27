import { useState } from "react";
import BottomPanel from "../../components/layout/BottomPanel";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./styles.css";
import {
  addMessage,
  initPlayers,
  resetNightData,
  setActiveCloneId,
  setIsNight,
  setNextCurrentPlayer,
  setNextDay,
  setPlayerName,
  setSelectedPlayers,
  setSubmitSelectedPlayers,
} from "../../redux/slices/GameSlice";
import PhaseLayout from "../../components/layout/PhaseLayout";
import PlayersList from "../../components/feature/PlayersList";
import Textarea from "../../components/common/Textarea";
import Cover from "./Cover";
import { IPlayer } from "../../redux/slices/types";
import Message from "../../components/common/Message";
import Input from "../../components/common/Input";

function shuffleArray(array: Array<IPlayer>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // обмін значень
  }
  return array;
}

const createStarterRoles: (
  count: number
) => { name: string; role: string; id: number }[] = (playersCount) => {
  return [
    {
      name: "clone",
      count: 1,
    },
    { name: "interceptor", count: 1 },
    { name: "explorer", count: playersCount - 2 },
  ].reduce((acc, role) => {
    const expanded = Array(role.count).fill({ name: role.name });
    return acc.concat(expanded);
  }, []);
};

const Game = () => {
  const dispatch = useDispatch();

  const {
    currentPlayer,
    players,
    isNight,
    playersCount,
    selectedPlayers,
    day,
    activeCloneId,
    messages,
    submitSelection,
  } = useSelector((state: RootState) => state.game.game);
  const [redTeamPoints, setRedTeamPoints] = useState(0);
  const [blueTeamPoints, setBlueTeamPoints] = useState(0);

  const [playerInterfaceShow, setPlayerInterfaceShow] = useState(-1);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const sendCloneMessage = () => {
    dispatch(
      addMessage({
        type: "clone",
        id: 1,
        text: message,
        senderId: players[currentPlayer].id,
        sendDay: day,
        receiptDay: day + 1,
        receiversId: selectedPlayers,
      })
    ); //!FIX ME (id)
    setMessage("");
  };

  const toggleNightHandler = () => {
    dispatch(setIsNight(!isNight));
  };

  const startGame = (playersCount: number) => {
    const players: IPlayer[] = shuffleArray(
      createStarterRoles(playersCount).map((role) => {
        return {
          id: 0,
          disabledCellIds: [],
          role: role.name,
          name: "",
          isClone: role.name === "clone" ? true : false,
        };
      })
    ).map((p, id: number) => ({
      ...p,
      disabledCellIds: [id],
      id,
    }));
    dispatch(initPlayers(players));
    dispatch(setNextDay());
    dispatch(
      setActiveCloneId(
        players.find((p: IPlayer) => {
          return p?.role === "clone";
        })?.id
      )
    );
  };
  const infectPerson = () => {
    dispatch(setSubmitSelectedPlayers(true));
  };
  const setNextPlayer = () => {
    if (submitSelection && message) sendCloneMessage();
    if (day === 1) {
      dispatch(setPlayerName({ id: players[currentPlayer]?.id, name }));
      setName("");
    }
    dispatch(setSubmitSelectedPlayers(false));
    dispatch(setSelectedPlayers([]));
    if (currentPlayer < players.length - 1) {
      dispatch(setNextCurrentPlayer());
    } else {
      endNight();
    }
  };
  const endNight = () => {
    dispatch(setIsNight(!isNight));
    dispatch(resetNightData());
    dispatch(setNextDay());
  };

  return (
    <>
      <PhaseLayout type="night">
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
          <h1 className="text-2xl font-bold self-center uppercase">
            {players[currentPlayer]?.role}
          </h1>
          {day === 1 && (
            <Input
              max={10}
              containerClassName="self-center"
              placeholder="Ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {players[currentPlayer]?.id === activeCloneId && (
            <>
              <PlayersList maxSelected={1} />
              <Textarea
                value={message}
                setValue={setMessage}
                min={0}
                max={35}
              />
            </>
          )}
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

      <PhaseLayout type="day">
        <div>
          <header className="w-full bg-gray-200 p-4 flex justify-between">
            <h1>День: {day}</h1>
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
        <PhaseLayout type="night">
          {players[currentPlayer]?.id === activeCloneId && (
            <Button
              disabled={!selectedPlayers.length}
              freezeActive={true}
              clickedClassName="!text-red-300"
              className="btn3d bg-rose-700 !shadow-red-800"
              onClick={() => infectPerson()}
            >
              INFECT
            </Button>
          )}
          <Button
            disabled={day === 1 && !name}
            onClick={() => setNextPlayer()}
            className="btn3d bg-cyan-400 shadow-cyan-500"
          >
            {currentPlayer === playersCount - 1
              ? "Завершити ніч"
              : "Завершити хід"}
          </Button>
        </PhaseLayout>
        <PhaseLayout type="day">
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
