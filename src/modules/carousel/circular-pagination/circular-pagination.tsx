import React, { useEffect, useRef } from "react";
import styles from "./circular-pagination.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export const CircularPagination: React.FC<{ className?: string }> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // useEffect(() => {
  //   const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
  //   circlePath.id = "circlePath";
  //   svgRef.current?.prepend(circlePath);

  //   let buttons: HTMLDivElement[] = gsap.utils.toArray(`.${styles.button}`),
  //     buttonsCount = buttons.length,
  //     buttonStep = 1 / buttonsCount,
  //     wrapProgress = gsap.utils.wrap(0, 1),
  //     snap = gsap.utils.snap(buttonStep),
  //     wrapTracker = gsap.utils.wrap(0, buttonsCount),
  //     tracker = { button: 0 };

  //   gsap.set(buttons, {
  //     motionPath: {
  //       path: circlePath,
  //       align: circlePath,
  //       alignOrigin: [0.5, 0.5],
  //       end: (i) => i / buttons.length,
  //     },
  //     scale: 0.9,
  //   });

  //   const tl = gsap.timeline({ paused: true, reversed: true });

  //   tl.to(`.${styles.wrapper}`, {
  //     rotation: 360,
  //     transformOrigin: "center",
  //     duration: 1,
  //     ease: "none",
  //   });

  //   tl.to(
  //     buttons,
  //     {
  //       rotation: "-=360",
  //       transformOrigin: "center",
  //       duration: 1,
  //       ease: "none",
  //     },
  //     0,
  //   );

  //   tl.to(
  //     tracker,
  //     {
  //       item: buttonsCount,
  //       duration: 1,
  //       ease: "none",
  //       modifiers: {
  //         button(value) {
  //           return wrapTracker(buttonsCount - Math.round(value));
  //         },
  //       },
  //     },
  //     0,
  //   );

  //   buttons.forEach((el: HTMLDivElement, i: number) => {
  //     el.addEventListener("click", function () {
  //       let current = tracker.button,
  //         activeItem = i;

  //       if (i === current) {
  //         return;
  //       }

  //       //set active item to the item that was clicked and remove active class from all items
  //       document
  //         .querySelector(`.${styles.button}.${styles.active}`)
  //         ?.classList.remove(`${styles.active}`);
  //       buttons[activeItem].classList.add(`${styles.active}`);

  //       const diff = current - i;

  //       if (Math.abs(diff) < buttonsCount / 2) {
  //         moveWheel(diff * buttonStep);
  //       } else {
  //         const amt = buttonsCount - Math.abs(diff);

  //         if (current > i) {
  //           moveWheel(amt * -1 * buttonStep);
  //         } else {
  //           moveWheel(amt * buttonStep);
  //         }
  //       }
  //     });
  //   });

  //   function moveWheel(amount: number) {
  //     let progress = tl.progress();
  //     tl.progress(wrapProgress(snap(tl.progress() + amount)));
  //     let next = tracker.button;
  //     tl.progress(progress);
  //     //console.log(document.querySelector(`.${styles.button}.${styles.active}`))

  //     document
  //       .querySelector(`.${styles.button}.${styles.active}`)
  //       ?.classList.remove(`${styles.active}`);
  //     buttons[next].classList.add(`${styles.active}`);

  //     gsap.to(tl, {
  //       progress: snap(tl.progress() + amount),
  //       modifiers: {
  //         progress: wrapProgress,
  //       },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    document.querySelector(`.${styles.svg}`).prepend(circlePath);

    let items = gsap.utils.toArray(`.${styles.button}`),
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
        end: (i) => i / items.length,
      },
      scale: 0.9,
    });

    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(`.${styles.wrapper}`, {
      rotation: 360,
      transformOrigin: "center",
      duration: 1,
      ease: "none",
    });

    tl.to(
      items,
      {
        rotation: "-=360",
        transformOrigin: "center",
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
          item(value) {
            return wrapTracker(numItems - Math.round(value));
          },
        },
      },
      0,
    );

    items.forEach(function (el, i) {
      el.addEventListener("click", function () {
        var current = tracker.item,
          activeItem = i;

        if (i === current) {
          return;
        }

        //set active item to the item that was clicked and remove active class from all items
        document
          .querySelector(`.${styles.button}.${styles.active}`)
          .classList.remove(`${styles.active}`);
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

    // document.getElementById('next').addEventListener("click", function () {
    //   return moveWheel(-itemStep);
    // });

    // document.getElementById('prev').addEventListener("click", function () {
    //   return moveWheel(itemStep);
    // });

    function moveWheel(amount, i, index) {
      let progress = tl.progress();
      tl.progress(wrapProgress(snap(tl.progress() + amount)));
      let next = tracker.item;
      tl.progress(progress);

      document
        .querySelector(`.${styles.button}.${styles.active}`)
        .classList.remove(`.${styles.active}`);
      items[next].classList.add("active");

      gsap.to(tl, {
        progress: snap(tl.progress() + amount),
        modifiers: {
          progress: wrapProgress,
        },
      });
    }
  }, []);

  return (
    <nav className={clsx(styles.circularPagination, className)}>
      {/* <div className="container"> */}
      <div className={styles.wrapper}>
        <div className={clsx(styles.button, styles.active)}>
          <span className={styles.dot}>1</span>
        </div>
        <div className={styles.button}>
          <span className={styles.dot}>2</span>
        </div>
        <div className={styles.button}>
          <span className={styles.dot}>3</span>
        </div>
        <div className={styles.button}>
          <span className={styles.dot}>4</span>
        </div>
        <div className={styles.button}>
          <span className={styles.dot}>5</span>
        </div>
        <div className={styles.button}>
          <span className={styles.dot}>6</span>
        </div>
        {/* <div className={styles.button}>7</div>
        <div className={styles.button}>8</div> */}
        <svg viewBox="0 0 300 300" ref={svgRef} className={styles.svg}>
          <circle
            id="holder"
            fill="none"
            stroke="#42567A"
            strokeWidth="1"
            strokeMiterlimit="1"
            cx="151"
            cy="151"
            r="150"
          />
        </svg>
        {/* </div> */}
      </div>
    </nav>
  );
};
