/* eslint-disable @typescript-eslint/no-unused-vars */
import BottomPanel from "../../components/layout/BottomPanel";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./styles.css";
import PhaseLayout from "../../components/layout/PhaseLayout";
import Cover from "./Cover";
import { useGameProps } from "./GameProvider";
import { twMerge } from "tailwind-merge";
import InterceptorIF from "../../components/interfaces/InterceptorIF";
import PlayersMessagesIF from "../../components/interfaces/PlayersMessagesIF";
import PlayerRoleTitle from "../../components/interfaces/PlayerRoleTitle";
import PlayerNightBottomIF from "../../components/interfaces/PlayerBottomIF";
import PlayerNameInputIF from "../../components/interfaces/PlayerNameInputIF";
import Menu from "../../components/layout/Menu";
import { useRef } from "react";
import DetectiveIF from "../../components/interfaces/DetectiveIF";
import CloneIF from "../../components/interfaces/CloneIF";
import DayIF from "../../components/interfaces/DayIF";

const Game = () => {
  const { toggleNightHandler, votingAnswer, voteHandler } = useGameProps();

  const {
    currentPlayer,
    players,
    day,
    voting: { isVoting },
    additionalSettings: { introductoryNight },
  } = useSelector((state: RootState) => state.game.game);

  const buttonRef = useRef(null!);

  return (
    <>
      <Menu buttonRef={buttonRef} />
      <PhaseLayout dayPhase="night">
        <div className="w-full h-full p-4 pb-16 gap-4 flex flex-col">
          <Cover name={players[currentPlayer]?.name} />
          <PlayerRoleTitle />
          <PlayerNameInputIF />

          {((introductoryNight && day !== 1) || !introductoryNight) && (
            <>
              <CloneIF />
              <PlayersMessagesIF />
              <DetectiveIF />
              <InterceptorIF />
            </>
          )}
        </div>
      </PhaseLayout>

      <PhaseLayout dayPhase="day">
        <DayIF menuBtnRef={buttonRef} />
      </PhaseLayout>

      <BottomPanel className="justify-end">
        <PhaseLayout dayPhase="night">
          <PlayerNightBottomIF />
        </PhaseLayout>
        <PhaseLayout dayPhase="day">
          {isVoting ? (
            <Button
              disabled={!votingAnswer}
              onClick={() => voteHandler()}
              className="btn3d bg-cyan-400 shadow-cyan-500"
            >
              Підтвердити
            </Button>
          ) : (
            <button
              onClick={() => toggleNightHandler()}
              className="btn3d bg-cyan-400 shadow-cyan-500"
            >
              Розпочати ніч
            </button>
          )}
        </PhaseLayout>
      </BottomPanel>
    </>
  );
};

export default Game;
