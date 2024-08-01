import React, { useState } from "react";
import Button from "../../common/Button";
import Timer from "../Timer";
import { twMerge } from "tailwind-merge";

const SpeechTimer = () => {
  const [time, setTime] = useState<null | number>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <div className="border border-dark rounded-md p-2 self-center flex flex-col items-center gap-2">
      <div className="flex gap-1">
        <Button
          onClick={() => setTime(30)}
          className={twMerge(
            "py-1 px-2 bg-transparent border border-dark rounded-md text-md text-dark shadow-none",
            time === 30 && "bg-dark text-white"
          )}
        >
          30
        </Button>
        <Button
          onClick={() => setTime(60)}
          className={twMerge(
            "py-1 px-2 bg-transparent border border-dark rounded-md text-md text-dark shadow-none",
            time === 60 && "bg-dark text-white"
          )}
        >
          1:00
        </Button>
        <Button
          onClick={() => setTime(90)}
          className={twMerge(
            "py-1 px-2 bg-transparent border border-dark rounded-md text-md text-dark shadow-none",
            time === 90 && "bg-dark text-white"
          )}
        >
          1:30
        </Button>
      </div>
      <div className="text-2xl font-bold">
        {time ? (
          <Timer isPaused={isPaused} duration={time} onEnd={() => setTime(0)} />
        ) : (
          0
        )}
      </div>
      {time > 0 && (
        <div className="flex gap-2">
          <Button
            onClick={() => setTime(0)}
            className={twMerge(
              "py-1 px-2 bg-transparent border border-dark rounded-md text-md text-dark shadow-none",
              "bg-dark text-white"
            )}
          >
            Reset
          </Button>
          <Button
            onClick={() => setIsPaused((prev) => !prev)}
            className={twMerge(
              "py-1 px-2 bg-transparent border border-dark rounded-md text-md text-dark shadow-none",
              "bg-dark text-white"
            )}
          >
            {isPaused ? "Продовжити" : "Пауза"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SpeechTimer;
