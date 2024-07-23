import Home from "./pages/Home";
import Preview from "./pages/Preview";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const isGameStarted = useSelector(
    (state: RootState) => state.game.isGameStarted
  );
  return (
    <div className="flex flex-col items-stretch mx-auto max-w-[780px] h-[100vh] bg-gray-50">
      {isGameStarted ? <Home /> : <Preview />}
    </div>
  );
}

export default App;
