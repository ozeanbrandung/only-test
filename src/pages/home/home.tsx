import React from "react";
import { Carousel } from "../../modules/carousel";
import { Layout, UIHeader1 } from "../../shared";
import styles from "./home.module.scss";
import clsx from "clsx";
import { HeaderLine } from "./header-line";
import data from "../../app/data.json";

export const Home: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <UIHeader1 className={clsx(styles.h1)}>
        <HeaderLine className={styles.line} />
        Исторические даты
      </UIHeader1>
      <Carousel data={data} />
    </Layout>
  );
};
