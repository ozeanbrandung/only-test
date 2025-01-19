import React, { useState } from "react";
import { Numbers } from "./numbers/numbers";
import styles from "./carousel.module.scss";

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
    <section>
      <Numbers from={from} to={to} className={styles.numbers}/>
      {/* <button type="button" onClick={handleChange}>change</button> */}
    </section>
  );
};
