"use client";
import setupLocatorUI from "@locator/runtime";
import { ReactNode } from "react";
export const Provider = ({ children }: { children: ReactNode }) => {
  if (process.env.NODE_ENV === "development") {
    setupLocatorUI();
  }
  return <>{children}</>;
};
