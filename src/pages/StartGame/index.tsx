/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import NumberInput from "../../components/common/NumberInput";
import Roles from "../../components/feature/Roles";
import BottomPanel from "../../components/layout/BottomPanel";
import Button from "../../components/common/Button";
import { twMerge } from "tailwind-merge";
import rolesJSON from "../../assets/data/roles.json";
import { IPlayer, RoleParams } from "../../redux/slices/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  initPlayers,
  setActiveCloneId,
  setIsGameStarted,
  setNextDay,
} from "../../redux/slices/GameSlice";

const StartGame = () => {
  const dispatch = useDispatch();
  const {
    additionalSettings: { firstInfectDay },
  } = useSelector((state: RootState) => state.game.game);
  const [playersCount, setPlayersCount] = useState<number>(5);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roles, setRoles] = useState<(RoleParams & { count: number })[]>(
    //@ts-expect-error #fix me
    rolesJSON.map((el) => ({ ...el, count: el.minCount || 0 }))
  );
  const [activeRoles, setActiveRoles] = useState<
    (RoleParams & { count: number })[]
  >(roles.map((el) => ({ ...el, count: el.minCount || 0 })));

  const [errorText, setErrorText] = useState("");
  const [startDisabled, setStartDisabled] = useState(true);

  const checkChosenRoles = () => {
    //! return true if is not allowed
    if (activeRoles.reduce((acc, role) => acc + role.count, 0) > playersCount) {
      setErrorText("Кількість ролей не співпадає із к-стю гравців");
      setStartDisabled(true);
    } else if (
      activeRoles.reduce((acc, role) => acc + role.count, 0) !== playersCount
    ) {
      setStartDisabled(true);
    } else if (
      activeRoles.reduce(
        (acc, role) => (role.isEvil ? acc + role.count : acc),
        0
      ) >=
      playersCount / 2
    ) {
      setErrorText("Кількість клонів має бути меншою за половину гравців");
      setStartDisabled(true);
    } else if (!activeRoles.find((role) => role.isEvil)) {
      setErrorText("Кількість клонів має бути мінімум 1");
      setStartDisabled(true);
    } else {
      setErrorText("");
      setStartDisabled(false);
    }
  };

  useMemo(() => {
    checkChosenRoles();
  }, [activeRoles, playersCount]);

  function shuffleArray(array: Array<IPlayer>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // обмін значень
    }
    return array;
  }

  const normalizeRoles: () => (RoleParams & {
    count: number;
    isActive: boolean;
  })[] = () => {
    return activeRoles
      ?.filter((role) => role.count > 0)
      .reduce((acc, role) => {
        const expanded = Array(role.count).fill({ name: role.name });
        return acc.concat(expanded);
      }, []);
  };

  const startGameHandler = () => {
    const players: IPlayer[] = shuffleArray(
      normalizeRoles().map((role) => {
        return {
          id: 0,
          disabledCellIds: [],
          role: role.name,
          name: "",
          isClone: role.name === "clone" ? true : false,
        };
      })
    ).map((p, id: number) => ({
      ...p,
      disabledCellIds: [id],
      id,
    }));
    dispatch(initPlayers(players));
    dispatch(setNextDay());
    dispatch(
      setActiveCloneId({
        value: players.find((p: IPlayer) => {
          return p?.role === "clone";
        })?.id,
        startDay: firstInfectDay,
      })
    );
    dispatch(setIsGameStarted(true));
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Кількість гравців</h2>
        <NumberInput
          // containerClassName="self-center"
          min={4}
          value={playersCount}
          setValue={setPlayersCount}
        />
      </div>

      <h2 className="text-xl font-bold">Ролі</h2>
      <Roles
        roles={activeRoles}
        setRoles={setActiveRoles}
        playersCount={playersCount}
      />

      <BottomPanel className="flex justify-end z-10">
        <div
          className={twMerge(
            "absolute bg-zinc-50 top-0 transition duration-500 w-full left-0 text-red-400 text-md font-medium text-center py-1 -z-10",
            errorText && "translate-y-[-100%] transition"
          )}
        >
          {errorText}
        </div>
        <Button
          onClick={() => startGameHandler()}
          disabled={startDisabled}
          className="bg-cyan-400 shadow-cyan-600"
        >
          Розпочати гру
        </Button>
      </BottomPanel>
    </>
  );
};

export default StartGame;
