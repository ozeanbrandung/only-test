import { useLayoutEffect, useState } from "react";

function getRandomNumber(initial: number, target: number) {
  if (initial > target) {
    return Math.floor(Math.random() * (initial - target) + target);
  } else {
    return Math.floor(Math.random() * (target - initial) + initial);
  }
}
export const useAnimateNumbers = (from: number, to: number) => {
  const [state, setState] = useState({ from, to });

  useLayoutEffect(() => {
    if (from !== state.from || to !== state.to) {
      let interval: NodeJS.Timeout;
      let times = 20;

      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          from: getRandomNumber(prev.from, from),
        }));
        setState((prev) => ({
          ...prev,
          to: getRandomNumber(prev.to, to),
        }));
        if (times === 0) {
          clearInterval(interval);
          setState({ from, to });
        }
        times--;
      }, 100);
    }
  }, [from, to]);

  return state;
};
