import React from "react";

import clsx from "clsx";

import { UIHeader1 } from "@/shared/ui-kit";

import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <UIHeader1 className={clsx(styles.h1)}>
      <div className={styles.line} />
      Исторические даты
    </UIHeader1>
  );
};
