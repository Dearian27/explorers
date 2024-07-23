import { useState } from "react";

const Home = () => {
  const [redTeamPoints, setRedTeamPoints] = useState(0);
  const [blueTeamPoints, setBlueTeamPoints] = useState(0);

  return (
    <>
      <header className="w-full bg-gray-200 p-4 flex justify-between">
        <h1>header</h1>
      </header>
      <div className="flex-1 flex flex-col">
        <div className="flex bg-blue-200 self-start">
          <input
            readOnly
            value={blueTeamPoints}
            type="number"
            className="h-16 w-16 bg-transparent text-center text-[1.4rem] font-bold text-blue-400"
          />
          <div className="flex flex-col bg-blue-300">
            <button
              className="h-8 w-8 font-bold"
              onClick={() => setBlueTeamPoints((prev) => prev + 1)}
            >
              +
            </button>
            <button
              className="h-8 w-8 font-bold"
              onClick={() =>
                setBlueTeamPoints((prev) => (prev ? prev - 1 : prev))
              }
            >
              -
            </button>
          </div>
        </div>
        <div className="flex bg-red-200 self-start">
          <input
            readOnly
            value={redTeamPoints}
            type="number"
            className="h-16 w-16 bg-transparent text-center text-[1.4rem] font-bold text-red-400"
          />
          <div className="flex flex-col  bg-red-300">
            <button
              className="h-8 w-8 font-bold"
              onClick={() => setRedTeamPoints((prev) => prev + 1)}
            >
              +
            </button>
            <button
              onClick={() =>
                setRedTeamPoints((prev) => (prev ? prev - 1 : prev))
              }
              className="h-8 w-8 font-bold"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-200 p-4 flex justify-between">
        <button className="py-2 px-6 rounded-lg bg-red-500 font-bold text-white">
          Next
        </button>
      </footer>
    </>
  );
};

export default Home;
