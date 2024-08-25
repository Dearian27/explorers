import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { RootState } from "../../../redux/store";

const PlayerRoleTitle = () => {
  const { players, currentPlayer } = useSelector(
    (state: RootState) => state.game.game
  );
  return (
    <>
      <h1
        className={twMerge(
          "text-2xl font-bold self-center uppercase",
          !players[currentPlayer].role?.roles?.includes("patriot") &&
            players[currentPlayer]?.isClone &&
            "text-red-500"
          // players[currentPlayer].role?.roles?.includes("patriot") &&
          //   players[currentPlayer]?.isClone &&
          //   "text-[#59afff]"
        )}
      >
        {players[currentPlayer]?.role.name}
      </h1>
      {players[currentPlayer]?.isClone &&
        players[currentPlayer].role.name !== "clone" && (
          <h1
            className={twMerge(
              "text-md font-semibold self-center text-red-600 mt-[-1.2rem]"
            )}
          >
            уражений клоном
          </h1>
        )}
    </>
  );
};

export default PlayerRoleTitle;
