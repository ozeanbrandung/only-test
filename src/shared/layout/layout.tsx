import React from "react";

import clsx from "clsx";

import styles from "./layout.module.scss";

export const Layout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <main className={clsx(styles.layout, className)}>{children}</main>;
};
