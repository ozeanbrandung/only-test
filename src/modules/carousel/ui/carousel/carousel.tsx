import React from "react";
import { useCircularPagination } from "../../hooks/use-circular-pagination";
import { Numbers } from "../numbers";
import { SwiperCarousel } from "../swiper-carousel";
import { Header } from "../header";
import styles from "./carousel.module.scss";

export const Carousel: React.FC = () => {
  const { activeIndex, handleChangeData, data, circleRef, buttonsRef, wrapperRef } =
    useCircularPagination();

  return (
    <div className={styles.carousel}>
      <Header />

      <div className={styles.container}>
        <div className={styles.horizontalLine} />
        <div className={styles.verticalLine} />

        <Numbers from={data?.from} to={data?.to} className={styles.numbers} />

        <h2 className={styles.h2}>{data.title}</h2>
        <hr className={styles.line} />

        <SwiperCarousel
          handleChangeData={handleChangeData}
          activeIndex={activeIndex}
          circleRef={circleRef}
          buttonsRef={buttonsRef}
          wrapperRef={wrapperRef}
        />
      </div>
    </div>
  );
};
