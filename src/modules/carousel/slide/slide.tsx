import React from "react";
import styles from "./slide.module.scss";
import clsx from "clsx";

interface IProps {
  items: { date: number; text: string }[];

  className?: string;
}

export const Slide: React.FC<IProps> = ({ items, className }) => {
  return (
    <div className={clsx(styles.slide, className)}>
      {items.map(({ date, text }) => (
        <article key={date} className={styles.article}>
          <h3 className={styles.date}>{date}</h3>
          <p className={styles.text}>{text}</p>
        </article>
      ))}
    </div>
  );
};
