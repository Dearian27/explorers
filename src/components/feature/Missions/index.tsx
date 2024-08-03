import { twMerge } from "tailwind-merge";

const Missions = () => {
  const missionsData = [
    { id: 1, players: [1, 2, 3], isSucceed: true },
    { id: 2, players: [1, 4, 0], isSucceed: true },
    { id: 3, players: [2, 3, 4], isSucceed: false },
    { id: 4, players: [], isSucceed: null },
    { id: 5, players: [], isSucceed: null },
  ];

  return (
    <div className="flex gap-2 p-4 justify-center">
      {missionsData.map((mission) => (
        <div
          key={mission.id}
          className={twMerge(
            "h-14 w-14 rounded-full  border-4 flex items-center border-light justify-center font-bold text-white text-xl",
            mission.players.length &&
              mission.isSucceed &&
              "bg-blue-400 border-white",
            mission.players.length &&
              !mission.isSucceed &&
              "bg-red-400 border-white"
          )}
        >
          {mission.players.length ? mission.id : ""}
        </div>
      ))}
    </div>
  );
};

export default Missions;
