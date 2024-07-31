import DebugPanel from "./components/DebugPanel";
import Game from "./pages/Game";
import { GameProvider } from "./pages/Game/GameProvider";
// import Preview from "./pages/Preview";
import StartGame from "./pages/StartGame";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const isGameStarted = useSelector(
    (state: RootState) => state.game.isGameStarted
  );
  return (
    <div className="relative flex flex-col items-stretch mx-auto max-w-[780px] min-h-[100dvh] bg-main">
      <DebugPanel />
      {isGameStarted ? (
        <GameProvider>
          <Game />
        </GameProvider>
      ) : (
        <StartGame />
      )}
    </div>
  );
}

export default App;
