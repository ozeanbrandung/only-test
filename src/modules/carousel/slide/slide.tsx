import React, { Ref, RefObject } from "react";
import styles from "./slide.module.scss";
import clsx from "clsx";

interface IProps {
  items: { date: number; text: string }[];

  className?: string;
  slideRef: RefObject<HTMLDivElement[]>;
  handleScroll?: () => void;
}

export const Slide: React.FC<IProps> = ({ items, slideRef, handleScroll, className }) => {
  return (
    <div
      className={clsx(styles.slide, className)}
      ref={(el) => slideRef.current?.push(el)}
      onScroll={handleScroll}
    >
      {items.map(({ date, text }) => (
        <article key={date} className={styles.article}>
          <h3 className={styles.date}>{date}</h3>
          <p className={styles.text}>{text}</p>
        </article>
      ))}
    </div>
  );
};
