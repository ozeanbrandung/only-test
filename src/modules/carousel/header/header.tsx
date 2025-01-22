import React from "react";
import styles from "./header.module.scss";
import clsx from "clsx";
import { UIHeader1 } from "../../../shared/ui-kit";
import { HeaderLine } from "./header-line";

export const Header: React.FC = () => {
  return (
    <UIHeader1 className={clsx(styles.h1)}>
      <HeaderLine className={styles.line} />
      Исторические даты
    </UIHeader1>
  );
};
