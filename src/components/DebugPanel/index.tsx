import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { twMerge } from "tailwind-merge";

const DebugPanel = () => {
  const {
    game: { players, playersCount, day },
  } = useSelector((state: RootState) => state.game);

  if (import.meta.env.MODE !== "development") return;

  return (
    <div className="fixed top-2 right-2 w-80 bg-dark text-main flex flex-col gap-1 rounded-md p-2 font-mono">
      <p className={twMerge(players.length !== playersCount && "text-accent")}>
        players: {players.length} (playersCount: {playersCount})
        {players.length !== playersCount && " !!!!"}
      </p>
      <p>day: {day}</p>
      <div className="flex flex-wrap gap-1">
        {players.map((p) => (
          <div className="bg-black px-2 py-1 rounded-md flex gap-1 items-center">
            {p.id} {p.name} ({p.role})
            {p.isClone && <div className="h-2 w-2 bg-accent" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;
