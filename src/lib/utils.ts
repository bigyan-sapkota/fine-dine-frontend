import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BACKEND_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return err.response?.data.message || err.message;
  } else if (err instanceof Error) {
    return err.message;
  }
  return "Unknown error occurred!";
};

export const redirectToLogin = () => {
  return window.open(
    `${BACKEND_URL}/api/auth/login/google?redirect=${location.origin}`,
    "_blank",
  );
};
