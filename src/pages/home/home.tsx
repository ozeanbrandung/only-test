import React from "react";
import { Carousel } from "../../modules/carousel";
import { Layout, UIHeader1 } from "../../shared";
import styles from "./home.module.scss";
import clsx from "clsx";

export const Home: React.FC = () => {
  return (
    <Layout>
      <UIHeader1 className={clsx(styles.h1)}>Исторические даты</UIHeader1>
      <Carousel className={styles.carousel} />
    </Layout>
  );
};
