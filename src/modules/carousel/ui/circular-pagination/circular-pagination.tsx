import React from "react";

import clsx from "clsx";

import styles from "./circular-pagination.module.scss";

interface IProps {
  data: {
    title: string;
    from: number;
    to: number;
    items: { date: number; text: string }[];
  }[];
  activeIndex: number;
  buttonsRef: React.RefObject<HTMLDivElement[]>;
  circleRef: React.RefObject<SVGSVGElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export const CircularPagination: React.FC<IProps> = ({
  data,
  circleRef,
  buttonsRef,
  wrapperRef,
  className,
}) => {
  return (
    <nav className={clsx(styles.circularPagination, className)}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {data.map((item, idx) => (
          <div
            key={item.title}
            className={styles.button}
            ref={(node) => {
              if (node && !buttonsRef.current.includes(node)) {
                buttonsRef.current.push(node);
              }
            }}
          >
            <span className={styles.dot}>{idx + 1}</span>
            <span className={styles.title}>{item.title}</span>
          </div>
        ))}
        <svg viewBox="0 0 530 530" className={styles.svg} ref={circleRef}>
          <circle
            id="holder"
            fill="none"
            stroke="#42567A"
            strokeWidth="1"
            strokeMiterlimit="1"
            cx="265"
            cy="265"
            r="265"
          />
        </svg>
      </div>
    </nav>
  );
};
