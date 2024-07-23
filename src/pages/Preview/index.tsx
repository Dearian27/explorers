import { useDispatch } from "react-redux";
import { setGameStatus } from "../../redux/slices/GameSlice";

const Preview = () => {
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setGameStatus(true));
  };

  return (
    <>
      <header>Preview</header>
      <button onClick={() => startGame()}>Start</button>
    </>
  );
};

export default Preview;
