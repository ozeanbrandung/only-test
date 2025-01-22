import React from "react";
import { Carousel } from "../../modules/carousel";
import { Layout } from "../../shared";
import data from "../../app/data.json";

export const Home: React.FC = () => {
  return (
    <Layout>
      <Carousel data={data} />
      <Carousel data={data} />
    </Layout>
  );
};
