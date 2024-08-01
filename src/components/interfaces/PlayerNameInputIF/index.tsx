import { useGameProps } from "../../../pages/Game/GameProvider";
import Input from "../../common/Input";
import PhaseLayout from "../../layout/PhaseLayout";

const PlayerNameInputIF = () => {
  const { name, setName } = useGameProps();
  return (
    <>
      <PhaseLayout cycle={0} currentDay={1}>
        <Input
          max={10}
          containerClassName="self-center"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </PhaseLayout>
    </>
  );
};

export default PlayerNameInputIF;
