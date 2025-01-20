import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Slide } from "../slide/slide";
//import { Navigation, Pagination } from "swiper/modules";
import styles from "./swiper-carousel.module.scss";
import { Arrow } from "../../../shared";
import clsx from "clsx";
import { CircularPagination } from "../circular-pagination/circular-pagination";
import data from "../../../app/data.json";

interface IProps {
  handleChangeData: (idx: number, cb?: () => void) => void;
  activeIndex: number;
  className?: string;
}

function getFormattedInfo(activeIndex: number, total: number) {
  const first = (activeIndex + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const second = total.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  return `${first}/${second}`;
}

export const SwiperCarousel: React.FC<IProps> = ({ handleChangeData, activeIndex, className }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRef = useRef<HTMLDivElement[] | null>([]);
  const scrollButtonRef = useRef<HTMLButtonElement | null>(null);

  function handleScrollSlide() {
    //console.log(slideRef.current?)
    if (slideRef.current?.[activeIndex]) {
      //console.log(slideRef.current)
      slideRef.current[activeIndex].scrollBy({ left: 200, behavior: "smooth" });
    }
  }

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
              <Slide items={dataItem.items} slideRef={slideRef} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={clsx(styles.scrollButton, styles.hidden)}
          onClick={handleScrollSlide}
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
      />
    </>
  );
};
