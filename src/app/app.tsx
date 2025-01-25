import React from "react";

import { Carousel } from "../modules/carousel";
import { Layout } from "../shared";
import data from "./data.json";

export const App: React.FC = () => {
  return (
    <Layout>
      <Carousel data={data} />
      <Carousel data={data} />
    </Layout>
  );
};
