import React from "react";
import styles from "./layout.module.scss";
import clsx from "clsx";

export const Layout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <main className={clsx(styles.layout, className)}>{children}</main>;
};
