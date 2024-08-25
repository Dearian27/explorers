import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Tip from "../../common/Tip";

const PatriotIF = () => {
  const { players, currentPlayer } = useSelector(
    (state: RootState) => state.game.game
  );
  if (!players[currentPlayer]?.role?.roles?.includes("patriot")) return <></>;

  return (
    <Tip
      className="px-4"
      title="Патріотська вірність"
      description="Ви завжди залишаєтесь на стороні добра навіть якщо вас переведуть на бік зла, ви маєте здобути перемогу дослідникам залишившись непомітним, адже ви головна ціль клонів"
    />
  );
};

export default PatriotIF;
