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
    showVoteCard,
  } = useGameProps();
  const {
    players,
    currentPlayer,
    day,
    selectedPlayers,
    voting: { isVoting, data: missions, currentMission, isVotingResult },
  } = useSelector((state: RootState) => state.game.game);

  const showedCards = missions[currentMission]?.votings.reduce(
    (acc, next) => (next.isShown ? acc + 1 : acc),
    0
  );

  const votingTitle = `Голосування${
    currentMission < missions?.length
      ? " (" + missions[currentMission]?.playersCapacity + " гравців)"
      : ""
  }`;

  return (
    <>
      {isVoting ? (
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-1 flex-col">
          <Cover name={players[currentPlayer]?.name} />
          <PlayerVotingIF />
        </div>
      ) : isVotingResult ? (
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-1 flex-col justify-center items-center">
          <h1
            className={twMerge(
              "opacity-0 transition duration-300",
              showedCards === missions[currentMission].votings.length &&
                "opacity-100"
            )}
          >
            {missions[currentMission].status}
          </h1>
          <div className="flex flex-wrap gap-2">
            {missions[currentMission].votings.map((vote) => {
              return (
                <VoteCard
                  onClick={() => showVoteCard(vote.playerId)}
                  isFlipped={vote.isShown}
                  key={vote.playerId}
                  status={vote.isSuccess ? "success" : "fail"}
                />
              );
            })}
          </div>
          <div className="font-bold">
            <span className="text-[#59afff]">{showedCards}</span>/
            {missions[currentMission].players.length}
          </div>
          {showedCards === missions[currentMission].votings.length && (
            <Button onClick={() => nextMission()}>Ok</Button>
          )}
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
          <div className="flex-1 flex flex-col p-4">
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

            <PlayersList title={votingTitle} maxSelected={players?.length} />
            {currentMission < missions?.length && (
              <button
                disabled={
                  selectedPlayers.length !==
                  missions[currentMission]?.playersCapacity
                }
                // disabled={} //* disable якщо не було місії у цьому ходу або модалку висвітити при спробі
                onClick={() => startVoting()}
                className="bg-dark text-white self-end py-2 px-3 rounded-md font-bold mt-2 transition duration-300 disabled:bg-zinc-400 disabled:text-zinc-200"
              >
                Розпочати
              </button>
            )}

            {/* //* додати день під результатом голосування */}
            <Missions />
          </div>
        </div>
      )}
    </>
  );
};

export default DayIF;
