import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Slide } from "../slide";
//import { Navigation, Pagination } from "swiper/modules";
import { CircularPagination } from "../circular-pagination";
import { SlideScrollButtons } from "../slide-scroll-buttons";
import { MobileCarouselPagination } from "../mobile-carousel-pagination";
import { IDataItem } from "modules/carousel/types/types";
import styles from "./swiper-carousel.module.scss";
import { CarouselNavigationButtons } from "../carousel/carousel-navigation-buttons";

interface IProps {
  handleChangeData: (idx: number, cb?: () => void) => void;
  activeIndex: number;
  className?: string;
  circleRef: React.RefObject<SVGSVGElement>;
  buttonsRef: React.RefObject<HTMLDivElement[]>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  buttonRight: React.RefObject<HTMLButtonElement>;
  buttonLeft: React.RefObject<HTMLButtonElement>;
  data: IDataItem[];
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
  data,
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

      <CarouselNavigationButtons
        activeIndex={activeIndex}
        data={data}
        buttonLeft={buttonLeft}
        buttonRight={buttonRight}
        swiperRef={swiperRef}
      />

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
