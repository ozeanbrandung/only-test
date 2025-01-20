import React, { useState } from "react";
import { Numbers } from "./numbers/numbers";
import styles from "./carousel.module.scss";
import { SwiperCarousel } from "./swiper-carousel/swiper-carousel";
import { useCircularPagination } from "./circular-pagination/use-circular-pagination";

export const Carousel: React.FC = () => {
  //const {moveWheel} = useCircularPagination();

  //const [activeIndex, setActiveIndex] = useState(0);

  const { activeIndex, handleChangeData, data } = useCircularPagination();

  // const handleChangeData = (idx: number, cb?: () => void) => {
  //   setActiveIndex(idx);
  //  // moveWheel && moveWheel(idx);
  //   cb && cb();
  // };

  return (
    <div>
      <Numbers from={data.from} to={data.to} className={styles.numbers} />
      <h2 className={styles.h2}>{data.title}</h2>
      <hr className={styles.line} />
      <>
        <SwiperCarousel handleChangeData={handleChangeData} activeIndex={activeIndex} />
      </>

      {/* <button type="button" onClick={handleChange}>change</button> */}
      <div className={styles.horizontalLine} />
      <div className={styles.verticalLine} />
    </div>
  );
};
