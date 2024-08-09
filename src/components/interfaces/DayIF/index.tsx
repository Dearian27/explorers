import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Cover from "../../../pages/Game/Cover";
import PlayerVotingIF from "../PlayerVotingIF";
import { useGameProps } from "../../../pages/Game/GameProvider";
import SpeechTimer from "../../feature/SpeechTimer";
import { twMerge } from "tailwind-merge";
import Button from "../../common/Button";
import PlayersList from "../../feature/PlayersList";
import Missions from "../../feature/Missions";
import VoteCard from "../../feature/VoteCard";

const DayIF = ({ menuBtnRef }) => {
  const {
    setOpenMenu,
    openMenu,
    blueTeamPoints,
    setBlueTeamPoints,
    startVoting,
    nextMission,
  } = useGameProps();
  const {
    players,
    currentPlayer,
    day,
    selectedPlayers,
    voting: { isVoting, data: missions, currentMission, isVotingResult },
  } = useSelector((state: RootState) => state.game.game);

  return (
    <>
      {isVoting ? (
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-1 flex-col">
          <Cover name={players[currentPlayer]?.name} />
          <PlayerVotingIF />
        </div>
      ) : isVotingResult ? (
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-1 flex-col justify-center items-center">
          <div className="flex flex-wrap gap-2">
            <VoteCard status="success" />
            <VoteCard status="success" />
            <VoteCard status="success" />
          </div>
          <Button onClick={() => nextMission()}>Ok</Button>
        </div>
      ) : (
        <div
          className={twMerge(
            "transition duration-300",
            openMenu && "opacity-0 translate-x-10"
          )}
        >
          <header className="w-full bg-gray-100 p-4 flex justify-between">
            <h1 className="text-md font-bold">День: {day}</h1>
            <button
              ref={menuBtnRef}
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
                <h2 className="-mt-4 text-md font-bold text-light">2 гравці</h2>
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
    </>
  );
};

export default DayIF;
