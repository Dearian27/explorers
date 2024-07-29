import { useState, useEffect } from "react";

const Timer = ({ duration, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onEnd]);

  return <>{timeLeft}</>;
};

export default Timer;
