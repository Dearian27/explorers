import "./styles.css";
import ClickNHold from "react-click-n-hold";
import { useGameProps } from "./GameProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Cover = ({ name = "" }) => {
  const { playerInterfaceShow, setPlayerInterfaceShow } = useGameProps();
  const { currentPlayer } = useSelector((state: RootState) => state.game.game);
  const time = 1.2;

  const HoldCompleteHandler = () => setPlayerInterfaceShow(currentPlayer + 1);
  if (playerInterfaceShow === currentPlayer + 1) return;

  return (
    <ClickNHold
      time={time}
      onStart={() => {}}
      onClickNHold={() => HoldCompleteHandler()}
      onEnd={() => {}}
    >
      <div className="background">
        <span className="text-white font-bold text-3xl">
          Гравець {currentPlayer + 1}
        </span>
        {name && (
          <span className="text-slate-400 font-extrabold text-xl">{name}</span>
        )}
        <button className="text-white animated mt-6">УТРИМАТИ</button>
      </div>
    </ClickNHold>
  );
};

export default Cover;
