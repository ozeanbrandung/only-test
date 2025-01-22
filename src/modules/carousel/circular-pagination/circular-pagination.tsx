import React, { useEffect, useRef } from "react";
import styles from "./circular-pagination.module.scss";
import clsx from "clsx";
// import gsap from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// gsap.registerPlugin(MotionPathPlugin);

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
  activeIndex,
  data,
  circleRef,
  buttonsRef,
  wrapperRef,
  className,
}) => {
  //const svgRef = useRef<SVGSVGElement>(null);

  return (
    <nav className={clsx(styles.circularPagination, className)}>
      {/* <div className="container"> */}
      <div className={styles.wrapper} ref={wrapperRef}>
        {data.map((item, idx) => (
          <div
            key={item.title}
            className={styles.button}
            // className={clsx(styles.button, {[styles.active]: activeIndex === idx})}
            //onClick={() => console.log(idx)}
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
        <svg viewBox="0 0 530 530" /* ref={svgRef} */ className={styles.svg} ref={circleRef}>
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
        {/* </div> */}
      </div>
    </nav>
  );
};
