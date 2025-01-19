import React from "react";
import styles from "./ui-header1.module.scss";
import clsx from "clsx";

export const UIHeader1: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <h1 className={clsx(styles.h1, className)}>{children}</h1>;
};
