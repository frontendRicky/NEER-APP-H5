import { useEffect, useState } from "react";

// 倒计时hook
export const useCountdown = () => {
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>();

  useEffect(() => {
    if (time == 0) {
      if (timer) clearInterval(timer);
      setTimer(null);
    }
  }, [time]);

  function start(newTime: number) {
    // console.log("new time is:", newTime);
    setTime(newTime);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    if (newTime > 0) {
      setTimer(
        setInterval(() => {
          setTime((prevTime: number) => {
            // console.log("time tick...", prevTime);
            if (prevTime == 0) {
              return prevTime;
            }
            return prevTime - 1000;
          });
        }, 1000)
      );
    }
  }

  return { time, start };
};