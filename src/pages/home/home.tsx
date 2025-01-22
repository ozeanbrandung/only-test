import React from "react";
import { Carousel } from "../../modules/carousel";
import { Layout } from "../../shared";
import styles from "./home.module.scss";
import data from "../../app/data.json";
import { HomeHeader } from "../../modules/carousel/header";

export const Home: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Carousel data={data} />
      <Carousel data={data} />
    </Layout>
  );
};
