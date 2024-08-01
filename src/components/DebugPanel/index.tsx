import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { twMerge } from "tailwind-merge";

const DebugPanel = () => {
  const {
    game: {
      players,
      playersCount,
      day,
      currentPlayer,
      activeCloneId,
      additionalSettings: { currentCycle, maxCycle },
    },
  } = useSelector((state: RootState) => state.game);

  if (import.meta.env.MODE !== "development") return;

  return (
    <div className="fixed top-2 right-2 w-80 bg-dark text-main flex flex-col gap-1 rounded-md p-2 font-mono">
      <p className={twMerge(players.length !== playersCount && "text-accent")}>
        players: {players.length} (playersCount: {playersCount})
        {players.length !== playersCount && " !!!!"}
      </p>
      <p
        className={twMerge(
          currentPlayer !== players[currentPlayer]?.id && "text-accent"
        )}
      >
        currentPlayer: {currentPlayer} / {players[currentPlayer]?.id} (index/id)
      </p>
      <p>
        day: {day} | cycle: {currentCycle}/{maxCycle}
      </p>
      <div className="flex flex-wrap gap-1">
        {players.map((p) => (
          <div
            className={twMerge(
              "bg-black px-2 py-1 rounded-md flex gap-1 items-center transition duration-500",
              players[currentPlayer]?.id === p.id && "bg-light text-dark"
            )}
          >
            {p?.id} {p.name} ({p.role})
            {p.isClone && (
              <div
                className={twMerge(
                  "h-2 w-2 bg-accent",
                  activeCloneId.value === p.id && "h-3 w-3  bg-orange-500"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <p>
        activeCloneId: {activeCloneId?.value} (start day:{" "}
        {activeCloneId?.startDay})
      </p>
    </div>
  );
};

export default DebugPanel;
