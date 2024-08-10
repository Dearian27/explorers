import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { RootState } from "../../../redux/store";
import { TriangleIcon } from "../../../assets/icons";

const Missions = () => {
  const {
    voting: { data: missions, currentMission },
  } = useSelector((state: RootState) => state.game.game);

  return (
    <div className="flex gap-2 my-4 justify-center relative">
      {missions.map((mission) => (
        <div
          key={mission.id}
          className={twMerge(
            "h-14 w-14 rounded-full border-4 flex items-center border-black justify-center text-black font-bold text-xl opacity-70 transition relative",
            mission.status === "success" &&
              "bg-blue-400 border-blue-400 text-white opacity-100",
            mission.status === "failure" &&
              "bg-red-400 border-red-400 text-white opacity-100"
          )}
        >
          {mission?.id === currentMission && (
            <TriangleIcon className="fill-black h-4 absolute left-auto right-auto bottom-[110%]" />
          )}
          <span className="absolute bottom-1.5 right-2.5 text-xs text-black">
            {mission?.minClonesToLose > 1 && mission?.minClonesToLose}
          </span>
          {mission?.playersCapacity || ""}
        </div>
      ))}
    </div>
  );
};

export default Missions;
