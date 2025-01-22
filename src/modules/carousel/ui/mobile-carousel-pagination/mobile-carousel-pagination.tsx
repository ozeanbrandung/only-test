import React from "react";
import styles from "./mobile-carousel-pagination.module.scss";
import clsx from "clsx";
import { IDataItem } from "modules/carousel/types/types";
import { Swiper as SwiperType } from "swiper";

interface IProps {
  className?: string;
  data: IDataItem[];
  swiperRef: React.RefObject<SwiperType | null>;
  activeIndex: number;
}

export const MobileCarouselPagination: React.FC<IProps> = ({
  className,
  data,
  swiperRef,
  activeIndex,
}) => {
  return (
    <nav className={clsx(styles.pagination, className)}>
      {data.map((dataItem, index) => (
        <span
          key={dataItem.title}
          className={clsx(styles.bullet, { [styles.bulletActive]: index === activeIndex })}
          onClick={() => swiperRef.current?.slideTo(index)}
        />
      ))}
    </nav>
  );
};
