import React, { useState } from "react";
import { Numbers } from "./numbers/numbers";
import styles from "./carousel.module.scss";
import { SwiperCarousel } from "./swiper-carousel/swiper-carousel";
import data from "@/app/data.json";

export const Carousel: React.FC = () => {
  const [{ from, to }, setState] = useState({ from: 1000, to: 2000 });
  // const handleChange = () => {
  //   setState((prev) => {
  //     return {
  //       ...prev,
  //       from: Math.round(1000 + Math.random() * 1000),
  //       to: Math.round(1500 + Math.random() * 524),
  //     }
  //   })
  // }

  //console.log(from, to)
  return (
    <>
      <Numbers from={from} to={to} className={styles.numbers} />
      <h2 className={styles.h2}>Литература</h2>
      <hr className={styles.line} />
      <>
        <SwiperCarousel data={data} />
      </>

      {/* <button type="button" onClick={handleChange}>change</button> */}
      <div className={styles.horizontalLine}/>
      <div className={styles.verticalLine}/>
    </>
  );
};
