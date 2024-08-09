import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../utils/useClickOutside";
import { useGameProps } from "../../../pages/Game/GameProvider";
import { endGame } from "../../../redux/slices/GameSlice";

const Menu = ({ buttonRef }) => {
  const dispatch = useDispatch();
  const { openMenu, setOpenMenu } = useGameProps();
  const { isNight } = useSelector((state: RootState) => state.game.game);
  const menuRef = useRef(null!);
  const [isVisible, setIsVisible] = useState(false);

  useClickOutside([menuRef, buttonRef], () => setOpenMenu(false));

  useEffect(() => {
    if (openMenu) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [openMenu]);

  return (
    <div
      ref={menuRef}
      className={twMerge(
        "absolute z-[400] top-0 bottom-0 left-[0%] -translate-x-10 flex opacity-0 flex-col w-full p-2 bg-light transition duration-300",
        !isNight && openMenu && "translate-x-0 visible opacity-1",
        isVisible ? "visible" : "invisible"
      )}
    >
      <button onClick={() => setOpenMenu(false)}>x</button>
      <div className="text-dark cursor-pointer p-1 ">Ще щось</div>
      <div className="text-dark cursor-pointer p-1">Статистика</div>
      <div
        className="text-accent cursor-pointer p-1"
        onClick={() => dispatch(endGame())}
      >
        Завершити гру
      </div>
    </div>
  );
};

export default Menu;
