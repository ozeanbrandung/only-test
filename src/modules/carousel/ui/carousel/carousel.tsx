import React from "react";

import { useCircularPagination } from "@/modules/carousel/hooks/use-circular-pagination";
import { Header } from "@/modules/carousel/ui/header";
import { Numbers } from "@/modules/carousel/ui/numbers";
import { SwiperCarousel } from "@/modules/carousel/ui/swiper-carousel";

import dataJSON from "@/app/data.json";

import styles from "./carousel.module.scss";

export const Carousel: React.FC = () => {
  const {
    activeIndex,
    handleChangeData,
    data,
    circleRef,
    buttonsRef,
    wrapperRef,
    buttonLeft,
    buttonRight,
  } = useCircularPagination();

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
          buttonLeft={buttonLeft}
          buttonRight={buttonRight}
          data={dataJSON}
        />
      </div>
    </div>
  );
};
