import type { FunctionComponent } from "react";
import { clsx, type ClassValue } from "clsx";
import compact from "lodash/compact";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const iconsx = (
  ...inputs: (FunctionComponent | boolean)[]
): FunctionComponent => {
  return compact(inputs)[0] as FunctionComponent;
};
