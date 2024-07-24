import Preview from "./pages/Preview";
import StartGame from "./pages/StartGame";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const isGameStarted = useSelector(
    (state: RootState) => state.game.isGameStarted
  );
  return (
    <div className="flex flex-col items-stretch mx-auto max-w-[780px] h-[100vh] bg-gray-50 p-4 gap-4">
      {isGameStarted ? <StartGame /> : <Preview />}
    </div>
  );
}

export default App;
