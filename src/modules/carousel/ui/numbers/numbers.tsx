import React from "react";
import clsx from "clsx";
import { useAnimateNumbers } from "../../hooks/useAnimateNumbers";
import styles from "./numbers.module.scss";

export const Numbers: React.FC<{ from: number; to: number; className?: string }> = ({
  from,
  to,
  className,
}) => {
  const { from: animatedFrom, to: animatedTo } = useAnimateNumbers(from, to);

  return (
    <div className={clsx(styles.numbers, className)}>
      <span className={styles.from}>{animatedFrom}</span>
      <span className={styles.to}>{animatedTo}</span>
    </div>
  );
};
