import ClickNHold from "react-click-n-hold";
import "./style.css";

const HoldButton = ({ onComplete }) => {
  return (
    <ClickNHold
      time={2}
      onStart={() => {}}
      onClickNHold={() => onComplete()}
      onEnd={() => {}}
    >
      <button className="btn3d bg-pink-300 shadow-pink-500 ">УТРИМАТИ</button>
    </ClickNHold>
  );
};

export default HoldButton;
