import "./styles.css";
import ClickNHold from "react-click-n-hold";

const Cover = ({ onComplete, currentPlayer, name = "" }) => {
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
        {name && (
          <span className="text-slate-400 font-extrabold text-xl">{name}</span>
        )}
        <button className="text-white animated mt-6">УТРИМАТИ</button>
      </div>
    </ClickNHold>
  );
};

export default Cover;
