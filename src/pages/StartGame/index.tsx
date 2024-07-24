import { useState } from "react";
import PlayersList from "../../components/PlayersList";
import NumberInput from "../../components/NumberInput";
import Roles from "../../components/Roles";
import BadVisionedText from "../../components/BadVisionedText";
import Textarea from "../../components/Textarea";

const StartGame = () => {
  const [playersCount, setPlayersCount] = useState<number>(5);
  const [messageValue, setMessageValue] = useState("");
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Кількість гравців</h2>
        <NumberInput
          // containerClassName="self-center"
          min={5}
          value={playersCount}
          setValue={setPlayersCount}
        />
      </div>
      <PlayersList maxSelected={1} />
      <PlayersList maxSelected={3} />

      <h2 className="text-xl font-bold">Ролі</h2>
      <Roles playersCount={10} />

      <Textarea
        min={5}
        max={350}
        value={messageValue}
        setValue={setMessageValue}
      />
      <BadVisionedText text={"Я причешу зачіску"} />
      <BadVisionedText
        text={"Кліпну одним оком коли буде черга гравця номер 4"}
      />
    </>
  );
};

export default StartGame;
