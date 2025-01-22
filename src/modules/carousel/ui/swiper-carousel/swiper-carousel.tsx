import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Slide } from "../slide/slide";
//import { Navigation, Pagination } from "swiper/modules";
import styles from "./swiper-carousel.module.scss";
import { Arrow } from "../../../../shared";
import clsx from "clsx";
import { CircularPagination } from "../circular-pagination/circular-pagination";
import data from "../../../../app/data.json";

interface IProps {
  handleChangeData: (idx: number, cb?: () => void) => void;
  activeIndex: number;
  className?: string;
  circleRef: React.RefObject<SVGSVGElement>;
  buttonsRef: React.RefObject<HTMLDivElement[]>;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

function getFormattedInfo(activeIndex: number, total: number) {
  const first = (activeIndex + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const second = total.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  return `${first}/${second}`;
}

export const SwiperCarousel: React.FC<IProps> = ({
  handleChangeData,
  activeIndex,
  buttonsRef,
  circleRef,
  wrapperRef,
  className,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRef = useRef<HTMLDivElement[] | null>([]);
  const scrollButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollButtonRefLeft = useRef<HTMLButtonElement | null>(null);

  function handleScrollSlide(direction: "left" | "right") {
    const el = slideRef.current?.[activeIndex];
    //console.log(slideRef.current?)
    if (el) {
      //console.log(slideRef.current)
      if (direction === "left") {
        el.scrollBy({ left: -200, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 200, behavior: "smooth" });
      }

      //el.scrollBy({ left: 200, behavior: "smooth" });

      // if (el.scrollWidth - el.scrollLeft - el.clientWidth < 1) {
      //   scrollButtonRef.current?.classList.add(styles.hidden);
      // }
    }
  }

  const handleOnScroll = () => {
    const el = slideRef.current?.[activeIndex];
    if (el) {
      if (el.scrollWidth - el.scrollLeft - el.clientWidth < 1) {
        scrollButtonRef.current?.classList.add(styles.hidden);
        //scrollButtonRefLeft.current?.classList.remove(styles.hidden);
      } else {
        scrollButtonRef.current?.classList.remove(styles.hidden);
        //scrollButtonRefLeft.current?.classList.add(styles.hidden);
      }

      if (el.scrollLeft < 1) {
        scrollButtonRefLeft.current?.classList.add(styles.hidden);
      } else {
        scrollButtonRefLeft.current?.classList.remove(styles.hidden);
      }
    }
  };

  useEffect(() => {
    if (slideRef.current?.[activeIndex] && scrollButtonRef.current) {
      if (slideRef.current[activeIndex].scrollWidth > slideRef.current[activeIndex].clientWidth) {
        scrollButtonRef.current.classList.remove(styles.hidden);
      } else {
        scrollButtonRef.current.classList.add(styles.hidden);
      }
    }
  }, [activeIndex]);

  //console.log(activeIndex);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <>
      <div className={styles.carouselWrapper}>
        <Swiper
          className={className}
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
            handleChangeData(swiper.activeIndex);
          }}
          allowTouchMove={false}
          //modules={[Navigation, Pagination]}
          onSlideChange={(swiper) => {
            console.log("change", swiper.activeIndex);
            handleChangeData(swiper.activeIndex);
          }}
          loop={true}
          // breakpoints={{
          //   640: {
          //     slidesPerView: 1
          //   },
          //   1000: {
          //     slidesPerView: 2
          //   },
          //   1300: {
          //     slidesPerView: 4
          //   }
          // }}
        >
          {data.map((dataItem) => (
            <SwiperSlide key={dataItem.title}>
              <Slide items={dataItem.items} slideRef={slideRef} handleScroll={handleOnScroll} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={clsx(styles.scrollButton, styles.scrollButtonLeft, styles.hidden)}
          onClick={() => handleScrollSlide("left")}
          ref={scrollButtonRefLeft}
        >
          <Arrow className={styles.arrowLeft} />
        </button>

        <button
          className={clsx(styles.scrollButton, styles.scrollButtonRight, styles.hidden)}
          onClick={() => handleScrollSlide("right")}
          ref={scrollButtonRef}
        >
          <Arrow className={styles.arrowRight} />
        </button>
      </div>

      <nav className={styles.buttons}>
        <div className={styles.info}>{getFormattedInfo(activeIndex, data.length)}</div>

        <button id="prev" className={styles.prevBtn} onClick={() => swiperRef.current?.slidePrev()}>
          <Arrow />
        </button>
        <button id="next" className={styles.nextBtn} onClick={() => swiperRef.current?.slideNext()}>
          <Arrow className={styles.arrowRight} />
        </button>
      </nav>

      <nav className={styles.pagination}>
        {data.map((dataItem, index) => (
          <span
            key={dataItem.title}
            className={clsx(styles.bullet, { [styles.bulletActive]: index === activeIndex })}
            onClick={() => swiperRef.current?.slideTo(index)}
          />
        ))}
      </nav>

      <CircularPagination
        className={styles.circularPagination}
        activeIndex={activeIndex}
        data={data}
        buttonsRef={buttonsRef}
        circleRef={circleRef}
        wrapperRef={wrapperRef}
      />
    </>
  );
};
