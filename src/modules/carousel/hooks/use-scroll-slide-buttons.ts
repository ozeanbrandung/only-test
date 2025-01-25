import React, { useRef, useEffect } from "react";

//TODO: remove from here!
import styles from "../ui/slide-scroll-buttons/slide-scroll-buttons.module.scss";

export const useScrollSlideButtons = (
  activeIndex: number,
  slideRef: React.RefObject<HTMLDivElement[]>,
  handleButtonsVisibilityOnScrollFnRef: React.RefObject<() => void>,
) => {
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

  return {
    handleScrollSlide,
    scrollButtonRef,
    scrollButtonRefLeft,
  };
};
