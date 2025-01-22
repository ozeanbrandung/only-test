import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./slide-scroll-buttons.module.scss";
import { Arrow } from "../../../../shared";

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
  const scrollButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollButtonRefLeft = useRef<HTMLButtonElement | null>(null);

  function handleScrollSlide(direction: "left" | "right") {
    const el = slideRef.current?.[activeIndex];
    if (el) {
      if (direction === "left") {
        el.scrollBy({ left: -200, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  }

  const handleOnScroll = () => {
    const el = slideRef.current?.[activeIndex];
    if (el) {
      if (el.scrollWidth - el.scrollLeft - el.clientWidth < 1) {
        scrollButtonRef.current?.classList.add(styles.hidden);
      } else {
        scrollButtonRef.current?.classList.remove(styles.hidden);
      }

      if (el.scrollLeft < 1) {
        scrollButtonRefLeft.current?.classList.add(styles.hidden);
      } else {
        scrollButtonRefLeft.current?.classList.remove(styles.hidden);
      }
    }
  };

  handleButtonsVisibilityOnScrollFnRef.current = handleOnScroll;

  useEffect(() => {
    if (slideRef.current?.[activeIndex] && scrollButtonRef.current) {
      if (slideRef.current[activeIndex].scrollWidth > slideRef.current[activeIndex].clientWidth) {
        scrollButtonRef.current.classList.remove(styles.hidden);
      } else {
        scrollButtonRef.current.classList.add(styles.hidden);
      }
    }
  }, [activeIndex]);

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
