import React from "react";
import PlayersList from "../../feature/PlayersList";
import Textarea from "../../common/Textarea";
import { useGameProps } from "../../../pages/Game/GameProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Tip from "../../common/Tip";

const CloneIF = () => {
  const {
    checkIsActiveClone,
    message,
    setMessage,
    wasActiveClone,
    infectPerson,
  } = useGameProps();
  const { players, currentPlayer, selectedPlayers, submitSelection } =
    useSelector((state: RootState) => state.game.game);
  return (
    <>
      {(checkIsActiveClone(players[currentPlayer]?.id) || wasActiveClone) && (
        <>
          <PlayersList
            title="Виберіть вашу жертву:"
            filter={players[currentPlayer]?.disabledCellIds}
            maxSelected={1}
          />
          <Tip
            className="px-4"
            title="Заразити гравця"
            description="Ви обираєте жертву, щоб перевести на свою сторону, вибравши її номер. Додатково варто написати повідомлення так, щоб жертва упізнала вас, але не впізнав слідчий."
          />
          <Textarea
            value={message}
            setValue={setMessage}
            min={0}
            max={35}
            placeholder="Повідомлення (необов'язково)"
          />
          <button
            disabled={!selectedPlayers.length}
            onClick={() => !submitSelection && infectPerson()}
            className="self-end py-2.5 px-6 rounded-xl bg-secondary text-[#FF3C45] disabled:text-[#72727C] font-bold transition ease-in-out active:translate-y-1"
          >
            Заразити
          </button>
        </>
      )}
    </>
  );
};

export default CloneIF;
