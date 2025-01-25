import React from "react";

import { IDataItem } from "@/modules/carousel/types/types";
import { Arrow } from "@/shared";
import clsx from "clsx";
import { Swiper as SwiperType } from "swiper";

import styles from "./carousel-navigation-buttons.module.scss";

function getFormattedInfo(activeIndex: number, total: number) {
  const first = (activeIndex + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const second = total.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  return `${first}/${second}`;
}

interface IProps {
  activeIndex: number;
  data: IDataItem[];
  buttonLeft: React.RefObject<HTMLButtonElement>;
  buttonRight: React.RefObject<HTMLButtonElement>;
  swiperRef: React.RefObject<SwiperType | null>;
  className?: string;
}

export const CarouselNavigationButtons: React.FC<IProps> = ({
  activeIndex,
  data,
  buttonLeft,
  buttonRight,
  swiperRef,
  className,
}) => {
  return (
    <nav className={clsx(styles.buttons, className)}>
      <div className={styles.info}>{getFormattedInfo(activeIndex, data.length)}</div>

      <button
        ref={buttonLeft}
        className={styles.prevBtn}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <Arrow />
      </button>
      <button
        ref={buttonRight}
        className={styles.nextBtn}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <Arrow className={styles.arrowRight} />
      </button>
    </nav>
  );
};
