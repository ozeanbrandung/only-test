import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Slide } from "../slide/slide";
//import { Navigation, Pagination } from "swiper/modules";
import styles from "./swiper-carousel.module.scss";
import { Arrow } from "../../../../shared";
import { CircularPagination } from "../circular-pagination/circular-pagination";
import data from "../../../../app/data.json";
import { SlideScrollButtons } from "../slide-scroll-buttons";
import { MobileCarouselPagination } from "../mobile-carousel-pagination";

interface IProps {
  handleChangeData: (idx: number, cb?: () => void) => void;
  activeIndex: number;
  className?: string;
  circleRef: React.RefObject<SVGSVGElement>;
  buttonsRef: React.RefObject<HTMLDivElement[]>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  buttonRight: React.RefObject<HTMLButtonElement>;
  buttonLeft: React.RefObject<HTMLButtonElement>;
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
  buttonLeft,
  buttonRight,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRef = useRef<HTMLDivElement[] | null>([]);
  const handleButtonsVisibilityOnScrollFnRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  function onScrollSlide() {
    handleButtonsVisibilityOnScrollFnRef.current && handleButtonsVisibilityOnScrollFnRef.current();
  }

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
              <Slide items={dataItem.items} slideRef={slideRef} handleScroll={onScrollSlide} />
            </SwiperSlide>
          ))}
        </Swiper>

        <SlideScrollButtons
          slideRef={slideRef}
          activeIndex={activeIndex}
          handleButtonsVisibilityOnScrollFnRef={handleButtonsVisibilityOnScrollFnRef}
        />
      </div>

      <nav className={styles.buttons}>
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

      <MobileCarouselPagination data={data} swiperRef={swiperRef} activeIndex={activeIndex} />

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
