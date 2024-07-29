/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addMessage,
  markPlayerAsClone,
  resetNightData,
  setIsNight,
  setNextCurrentPlayer,
  setNextDay,
  setPersonInfected,
  setPlayerName,
  setSelectedPlayers,
  setSubmitSelectedPlayers,
} from "../../redux/slices/GameSlice";

interface GameContextParams {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  redTeamPoints: number;
  setRedTeamPoints: Dispatch<SetStateAction<number>>;
  blueTeamPoints: number;
  setBlueTeamPoints: Dispatch<SetStateAction<number>>;
  playerInterfaceShow: number;
  setPlayerInterfaceShow: Dispatch<SetStateAction<number>>;
  setNextPlayer: () => void;
  endNight: () => void;
  toggleNightHandler: () => void;
  sendCloneMessage: () => void;
  checkIsActiveClone: (id: number) => boolean;
  infectPerson: () => void;
  wasActiveClone: boolean;
  setWasActiveClone: Dispatch<SetStateAction<boolean>>;
  timerEnd: boolean;
  setTimerEnd: Dispatch<SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextParams>(null!);

export const useGameProps = () => {
  const props = useContext(GameContext);
  if (!props) throw new Error("GameProvider props is not provided");
  return props;
};

export const GameProvider = ({ children }) => {
  const {
    currentPlayer,
    players,
    isNight,
    selectedPlayers,
    day,
    activeCloneId,
    submitSelection,
    messages,
  } = useSelector((state: RootState) => state.game.game);
  const dispatch = useDispatch();

  const [redTeamPoints, setRedTeamPoints] = useState(0);
  const [blueTeamPoints, setBlueTeamPoints] = useState(0);

  const [wasActiveClone, setWasActiveClone] = useState(false);
  const [playerInterfaceShow, setPlayerInterfaceShow] = useState(-1);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [timerEnd, setTimerEnd] = useState(false);

  const checkIsActiveClone = (id: number) => {
    return activeCloneId.value === id && day >= activeCloneId.startDay;
  };

  const sendCloneMessage = () => {
    dispatch(
      addMessage({
        type: "clone",
        id: messages[messages.length - 1]?.id
          ? messages[messages.length - 1]?.id + 1
          : 0,
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
    if (
      activeCloneId.value === players[currentPlayer]?.id &&
      activeCloneId.startDay <= day
    ) {
      dispatch(markPlayerAsClone(players[currentPlayer].id));
    }
  };

  const resetTurnData = () => {
    setWasActiveClone(false);
    if (day === 1) {
      dispatch(setPlayerName({ id: players[currentPlayer]?.id, name }));
      setName("");
    }
    dispatch(setSubmitSelectedPlayers(false));
    dispatch(setSelectedPlayers([]));
    setTimerEnd(false);
  };
  const infectPerson = () => {
    setWasActiveClone(true);
    dispatch(setSubmitSelectedPlayers(true));
    dispatch(setPersonInfected(selectedPlayers[0]));
  };
  const setNextPlayer = () => {
    if (submitSelection && message) sendCloneMessage();
    resetTurnData();
    if (currentPlayer < players.length - 1) {
      if (
        activeCloneId.value === players[currentPlayer + 1]?.id &&
        activeCloneId.startDay <= day
      ) {
        dispatch(markPlayerAsClone(players[currentPlayer + 1].id));
      }
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
    <GameContext.Provider
      value={{
        // ...value,
        redTeamPoints,
        setRedTeamPoints,
        blueTeamPoints,
        setBlueTeamPoints,
        playerInterfaceShow,
        setPlayerInterfaceShow,
        message,
        setMessage,
        name,
        setName,
        setNextPlayer,
        endNight,
        toggleNightHandler,
        sendCloneMessage,
        checkIsActiveClone,
        infectPerson,
        wasActiveClone,
        setWasActiveClone,
        timerEnd,
        setTimerEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
