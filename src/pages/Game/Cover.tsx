import "./styles.css";
import ClickNHold from "react-click-n-hold";

const Cover = ({ onComplete, currentPlayer }) => {
  const time = 1.2;
  return (
    <ClickNHold
      time={time}
      onStart={() => {}}
      onClickNHold={() => onComplete()}
      onEnd={() => {}}
    >
      <div className="background">
        <span className="text-white font-bold text-3xl">
          Гравець {currentPlayer}
        </span>
        <button className="text-white animated">УТРИМАТИ</button>
      </div>
    </ClickNHold>
  );
};

export default Cover;
