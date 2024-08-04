import { twMerge } from "tailwind-merge";
import { useGameProps } from "../../../pages/Game/GameProvider";

const PlayerVotingIF = () => {
  const { votingAnswer, setVotingAnswer } = useGameProps();

  return (
    <div className="flex flex-1 flex-col justify-between">
      <h1 className="text-2xl font-bold self-center uppercase">Голосування</h1>
      <div className="flex gap-4 pb-4">
        <button
          onClick={() => setVotingAnswer("no")}
          className={twMerge(
            "border-2 border-accent w-1/2 rounded-lg p-5 text-accent text-2xl font-bold transition",
            votingAnswer === "no" && "bg-accent text-white"
          )}
        >
          Проти
        </button>
        <button
          onClick={() => setVotingAnswer("yes")}
          className={twMerge(
            "border-2 border-cyan-500 w-1/2 rounded-lg p-5 text-cyan-500 text-2xl font-bold transition",
            votingAnswer === "yes" && "bg-cyan-500 text-white"
          )}
        >
          За
        </button>
      </div>
    </div>
  );
};

export default PlayerVotingIF;
