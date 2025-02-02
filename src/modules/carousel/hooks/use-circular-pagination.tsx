//TODO: refactor to remove this styles from here
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import data from "../../../app/data.json";
import styles from "../ui/circular-pagination/circular-pagination.module.scss";

gsap.registerPlugin(MotionPathPlugin);

export const useCircularPagination = () => {
  //TODO: refactor code and return circular pagination component from hook to not send ref props
  const circleRef = useRef<SVGSVGElement>(null);
  const buttonsRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonLeft = useRef<HTMLButtonElement>(null);
  const buttonRight = useRef<HTMLButtonElement>(null);

  const [active, setActive] = useState({
    index: 0,
    data: data[0],
  });

  function animateCircle() {
    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    circleRef.current?.prepend(circlePath);

    buttonsRef.current?.[active.index].classList.add(`${styles.active}`);

    //let items = gsap.utils.toArray(buttonsRef.current),
    let items = buttonsRef.current,
      numItems = items.length,
      itemStep = 1 / numItems,
      wrapProgress = gsap.utils.wrap(0, 1),
      snap = gsap.utils.snap(itemStep),
      wrapTracker = gsap.utils.wrap(0, numItems),
      tracker = { item: 0 };

    gsap.set(items, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i) => i / items.length - 0.166,
      },
      scale: 1,
    });

    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(wrapperRef.current, {
      rotation: 360,
      transformOrigin: "center",
      duration: 1,
      ease: "none",
    });

    tl.to(
      items,
      {
        rotation: "-=360",
        transformOrigin: "center center",
        duration: 1,
        ease: "none",
      },
      0,
    );

    tl.to(
      tracker,
      {
        item: numItems,
        duration: 1,
        ease: "none",
        modifiers: {
          item: (value) => wrapTracker(numItems - Math.round(value)),
        },
      },
      0,
    );

    items.forEach(function (el, i) {
      el?.addEventListener("click", function (e) {
        const target = e.target as HTMLSpanElement;
        var current = tracker.item,
          activeItem = i;

        if (i === current) {
          return;
        }

        //set active item to the item that was clicked and remove active class from all items
        const activeElem = buttonsRef.current?.find((item) =>
          item.classList.contains(`${styles.active}`),
        );
        activeElem?.classList.remove(`${styles.active}`);
        items[activeItem].classList.add(`${styles.active}`);

        var diff = current - i;

        if (Math.abs(diff) < numItems / 2) {
          moveWheel(diff * itemStep);
        } else {
          var amt = numItems - Math.abs(diff);

          if (current > i) {
            moveWheel(amt * -itemStep);
          } else {
            moveWheel(amt * itemStep);
          }
        }
      });
    });

    buttonRight.current?.addEventListener("click", function () {
      return moveWheel(-itemStep);
    });

    buttonLeft.current?.addEventListener("click", function () {
      return moveWheel(itemStep);
    });

    function moveWheel(amount, i, index) {
      let progress = tl.progress();
      tl.progress(wrapProgress(snap(tl.progress() + amount)));
      let next = tracker.item;
      tl.progress(progress);

      const activeElem = buttonsRef.current?.find((item) =>
        item.classList.contains(`${styles.active}`),
      );
      activeElem?.classList.remove(`${styles.active}`);
      items[next].classList.add(`${styles.active}`);

      setActive({
        index: next,
        data: data[next],
      });

      gsap.to(tl, {
        progress: snap(tl.progress() + amount),
        modifiers: {
          progress: wrapProgress,
        },
      });
    }
  }

  useEffect(() => {
    if (circleRef.current && buttonsRef.current && wrapperRef.current) animateCircle();
    window.addEventListener("resize", animateCircle);
    return () => {
      window.removeEventListener("resize", animateCircle);
    };
  }, []);

  const handleChangeData = (idx: number, cb?: () => void) => {
    setActive({
      index: idx,
      data: data[idx],
    });
    cb && cb();
  };
  return {
    data: active.data,
    activeIndex: active.index,
    handleChangeData,
    circleRef,
    buttonsRef,
    wrapperRef,
    buttonLeft,
    buttonRight,
  };
};
