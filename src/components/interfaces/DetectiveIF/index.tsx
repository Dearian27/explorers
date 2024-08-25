import { useSelector } from "react-redux";
import PlayersList from "../../feature/PlayersList";
import { RootState } from "../../../redux/store";
import { twMerge } from "tailwind-merge";

const DetectiveIF = () => {
  const {
    players,
    currentPlayer,
    submitSelection,
    selectedPlayers,
    additionalSettings: { currentCycle, doubleNightCycle },
  } = useSelector((state: RootState) => state.game.game);

  if (
    !players[currentPlayer].role?.roles.includes("detective") ||
    !(currentCycle > 0 || !doubleNightCycle) //? якщо цикл не перший (для двоциклової ночі) або якщо не двоциклова ніч (детектив перевіряє на другому циклі ночі)
  )
    return;

  return (
    <div className="inline-flex items-center flex-col gap-2">
      <PlayersList
        filter="you"
        maxSelected={1}
        submitSelectedClassName={twMerge(
          players[selectedPlayers[0]]?.isClone === false &&
            "bg-blue-300 border-blue-400"
        )}
      />
      {submitSelection && (
        <h2
          className={twMerge(
            "text-xl font-bold text-blue-400",
            players[selectedPlayers[0]].isClone && "text-red-400"
          )}
        >
          {players[selectedPlayers[0]].isClone ? "Клон" : "Дослідник"}
        </h2>
      )}
    </div>
  );
};

export default DetectiveIF;
