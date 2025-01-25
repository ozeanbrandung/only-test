import React from "react";

import { useScrollSlideButtons } from "@/modules/carousel/hooks/use-scroll-slide-buttons";
import { Arrow } from "@/shared";
import clsx from "clsx";

import styles from "./slide-scroll-buttons.module.scss";

interface IProps {
  leftButtonClassName?: string;
  rightButtonClassName?: string;
  slideRef: React.RefObject<HTMLDivElement[]>;
  activeIndex: number;
  handleButtonsVisibilityOnScrollFnRef: React.RefObject<() => void>;
}

export const SlideScrollButtons: React.FC<IProps> = ({
  leftButtonClassName,
  rightButtonClassName,
  slideRef,
  activeIndex,
  handleButtonsVisibilityOnScrollFnRef,
}) => {
  const { handleScrollSlide, scrollButtonRef, scrollButtonRefLeft } = useScrollSlideButtons(
    activeIndex,
    slideRef,
    handleButtonsVisibilityOnScrollFnRef,
  );
  return (
    <>
      <button
        className={clsx(
          styles.scrollButton,
          styles.scrollButtonLeft,
          styles.hidden,
          leftButtonClassName,
        )}
        onClick={() => handleScrollSlide("left")}
        ref={scrollButtonRefLeft}
      >
        <Arrow className={styles.arrowLeft} />
      </button>

      <button
        className={clsx(
          styles.scrollButton,
          styles.scrollButtonRight,
          styles.hidden,
          rightButtonClassName,
        )}
        onClick={() => handleScrollSlide("right")}
        ref={scrollButtonRef}
      >
        <Arrow className={styles.arrowRight} />
      </button>
    </>
  );
};
