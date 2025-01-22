import React from "react";
import { Numbers } from "./numbers/numbers";
import styles from "./carousel.module.scss";
import { SwiperCarousel } from "./swiper-carousel/swiper-carousel";
import { useCircularPagination } from "./circular-pagination/use-circular-pagination";
import { Layout } from "../../shared";
import { Header } from "./header";

export const Carousel: React.FC = () => {
  const { activeIndex, handleChangeData, data, circleRef, buttonsRef, wrapperRef } =
    useCircularPagination();

  return (
    <div className={styles.carousel}>
      <Header />
      <div>
        <div className={styles.horizontalLine} />
        <div className={styles.verticalLine} />
        <Numbers from={data?.from} to={data?.to} className={styles.numbers} />
        <h2 className={styles.h2}>{data.title}</h2>
        <hr className={styles.line} />
        <>
          <SwiperCarousel
            handleChangeData={handleChangeData}
            activeIndex={activeIndex}
            circleRef={circleRef}
            buttonsRef={buttonsRef}
            wrapperRef={wrapperRef}
          />
        </>
      </div>
    </div>
  );
};
