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
  initPlayers,
  markPlayerAsClone,
  resetNightData,
  setActiveCloneId,
  setIsNight,
  setNextCurrentPlayer,
  setNextDay,
  setPersonInfected,
  setPlayerName,
  setSelectedPlayers,
  setSubmitSelectedPlayers,
} from "../../redux/slices/GameSlice";
import { IPlayer } from "../../redux/slices/types";

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
  startGame: (playersCount: number) => void;
  infectPerson: () => void;
  wasActiveClone: boolean;
  setWasActiveClone: Dispatch<SetStateAction<boolean>>;
}

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
    additionalSettings: { firstInfectDay },
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
      activeCloneId.value === players[currentPlayer + 1]?.id &&
      activeCloneId.startDay <= day
    ) {
      markPlayerAsClone(players[currentPlayer + 1].id);
    }
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
      setActiveCloneId({
        value: players.find((p: IPlayer) => {
          return p?.role === "clone";
        })?.id,
        startDay: firstInfectDay,
      })
    );
  };
  const resetTurnData = () => {
    setWasActiveClone(false);
    if (day === 1) {
      dispatch(setPlayerName({ id: players[currentPlayer]?.id, name }));
      setName("");
    }
    dispatch(setSubmitSelectedPlayers(false));
    dispatch(setSelectedPlayers([]));
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
      dispatch(setNextCurrentPlayer());
      if (
        activeCloneId.value === players[currentPlayer + 1]?.id &&
        activeCloneId.startDay <= day
      ) {
        markPlayerAsClone(players[currentPlayer + 1].id);
      }
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
        startGame,
        infectPerson,
        wasActiveClone,
        setWasActiveClone,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
