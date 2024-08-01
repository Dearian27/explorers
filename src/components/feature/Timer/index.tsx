import { useState, useEffect } from "react";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const Timer = ({ duration, onEnd, isPaused = false }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);
  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
      return;
    }

    if (isPaused) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onEnd, isPaused]);

  return <>{formatTime(timeLeft)}</>;
};

export default Timer;
