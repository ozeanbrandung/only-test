import React, { useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Slide } from "../slide/slide";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./swiper-carousel.module.scss";
import { Arrow } from "./arrow";

interface IProps {
  data: {
    title: string;
    from: number;
    to: number;
    items: { date: number; text: string }[];
  }[];
}

export const SwiperCarousel: React.FC<IProps> = ({ data }) => {
  //const swiper = useSwiper();

  const swiperRef = useRef<SwiperType | null>(null);
  console.log(swiperRef);
  return (
    <>
      <Swiper
        //scrollbar={{ draggable: false }}
        //className={styles.swiperCarousel}
        //wrapperClass={styles.wrapper}
        //slideClass={styles.slide}
        //navigation={true}
        //pagination={true}
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        // navigation={{
        //   nextEl: `.${styles.nextBtn}`, //'.review-swiper-button-next',
        //   prevEl: `.${styles.prevBtn}`, //'.review-swiper-button-prev',
        // }}
        allowTouchMove={false}
        //spaceBetween={50}
        //slidesPerView={1}
        //modules={[Navigation, Pagination]}
        onSlideChange={() => console.log("slide change")}
        //onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((dataItem) => (
          <SwiperSlide key={dataItem.title}>
            <Slide items={dataItem.items} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>

      <nav className={styles.buttons}>
        <button className={styles.prevBtn} onClick={() => swiperRef.current?.slidePrev()}>
          <Arrow />
        </button>
        <button className={styles.nextBtn} onClick={() => swiperRef.current?.slideNext()}>
          <Arrow className={styles.arrowRight} />
        </button>
      </nav>
    </>
  );
};
