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
  addMissionVote,
  clearSelectedPlayers,
  markPlayerAsClone,
  resetNightRoundData,
  setMissionData,
  setCurrentPlayer,
  setIsNight,
  setIsVoting,
  setNextCurrentMission,
  setNextCurrentPlayer,
  setNextCycle,
  setNextDay,
  setNextVotingCurrentPlayer,
  setPersonInfected,
  setPlayerName,
  setSelectedPlayers,
  setSubmitSelectedPlayers,
  setVotingCurrentPlayer,
  setMissionStatus,
  setIsVotingResult,
} from "../../redux/slices/GameSlice";
import { VoteAnswerVariants } from "../../types";

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
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  endVoting: () => void;
  voteHandler: () => void;
  startVoting: () => void;
  votingAnswer: VoteAnswerVariants;
  setVotingAnswer: Dispatch<SetStateAction<VoteAnswerVariants>>;
  checkIsIntroductionNight: () => boolean;
  nextMission: () => void;
  showVoteCard: (playerId: number) => void;
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
    voting: { data: missions, currentMission, votingCurrentPlayer },
    additionalSettings: {
      doubleNightCycle,
      currentCycle,
      maxCycle,
      introductoryNight,
    },
  } = useSelector((state: RootState) => state.game.game);
  const dispatch = useDispatch();

  const [redTeamPoints, setRedTeamPoints] = useState(0);
  const [blueTeamPoints, setBlueTeamPoints] = useState(0);

  const [wasActiveClone, setWasActiveClone] = useState(false);
  const [playerInterfaceShow, setPlayerInterfaceShow] = useState(-1);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [timerEnd, setTimerEnd] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [votingAnswer, setVotingAnswer] = useState<VoteAnswerVariants>("");

  const checkIsIntroductionNight = () => introductoryNight && day === 1;

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
        receiptDay: doubleNightCycle ? day : day + 1,
        receiversId: selectedPlayers,
      })
    ); //!FIX ME (id)
    setMessage("");
  };

  const startVoting = () => {
    dispatch(setIsVoting(true));
    dispatch(setCurrentPlayer(selectedPlayers[0])); //? before mission.players was configured
    dispatch(
      setMissionData({
        mission: { ...missions[currentMission], players: selectedPlayers },
      })
    );
    dispatch(clearSelectedPlayers());
  };

  const voteHandler = () => {
    dispatch(
      addMissionVote({
        playerId: players[currentPlayer].id,
        isSuccess: votingAnswer === "yes" ? true : false,
      })
    );
    setVotingAnswer("");
    if (votingCurrentPlayer === missions[currentMission].players.length - 1) {
      endVoting();
    } else {
      dispatch(setNextVotingCurrentPlayer());
    }
  };

  const endVoting = () => {
    dispatch(setMissionStatus());
    dispatch(setVotingCurrentPlayer(0));
    dispatch(setCurrentPlayer(0));
    dispatch(setIsVoting(false));
    dispatch(setIsVotingResult(true));
  };

  const nextMission = () => {
    dispatch(setIsVotingResult(false));
    dispatch(setNextCurrentMission());
  };
  const showVoteCard = (playerId: number) => {
    //?in current mission
    dispatch(
      setMissionData({
        mission: {
          ...missions[currentMission],
          votings: missions[currentMission].votings.map((vote) => {
            if (vote.playerId === playerId) return { ...vote, isShown: true };
            return vote;
          }),
        },
      })
    );
  };

  const checkSettingClone = (currentIndex = null) => {
    if (
      activeCloneId.value ===
        players[currentIndex !== null ? currentIndex : currentPlayer + 1]?.id &&
      (activeCloneId.startDay <= day ||
        (doubleNightCycle &&
          (currentCycle > 0 || currentPlayer === players.length - 1)))
    ) {
      dispatch(
        markPlayerAsClone(
          players[currentIndex !== null ? currentIndex : currentPlayer + 1].id
        )
      );
    }
  };
  const toggleNightHandler = () => {
    dispatch(setIsNight(!isNight));
    checkSettingClone();
  };

  const resetTurnData = () => {
    setWasActiveClone(false);
    if (day === 1 && currentCycle === 0) {
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
      checkSettingClone();
      dispatch(setNextCurrentPlayer());
    } else if (
      doubleNightCycle &&
      currentCycle < maxCycle &&
      !checkIsIntroductionNight()
    ) {
      checkSettingClone(0); //? check first player
      dispatch(setNextCycle());
      dispatch(resetNightRoundData());
    } else endNight();
  };
  const endNight = () => {
    dispatch(setIsNight(!isNight));
    dispatch(resetNightRoundData());
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
        openMenu,
        setOpenMenu,
        endVoting,
        startVoting,
        voteHandler,
        votingAnswer,
        setVotingAnswer,
        checkIsIntroductionNight,
        nextMission,
        showVoteCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
