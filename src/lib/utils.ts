import axios, { AxiosError } from "axios";
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

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    );
    console.log(process.env.NEXT_PUBLIC_IMGBB_KEY);
    return data.data.display_url;
  } catch (error) {
    const message = `Could not upload image ! ${error instanceof Error ? error.message : ""}`;
    throw new Error(message);
  }
};

export const imageToDataUri = (file: File): Promise<string> => {
  console.log(imageToDataUri);
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => {
      const result = event.target?.result?.toString();
      resolve(result || "");
    });
  });
};

export const formatPrice = (price: number, prefix = true): string => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(price);
  if (prefix) return "Rs. " + formattedPrice;
  return formattedPrice;
};

export const concatenateSearchParams = (
  url: string,
  params: Record<string, string | boolean | number | undefined | null>,
) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }
  const searchString = searchParams.toString();
  if (searchString) url += "?" + searchString;
  return url;
};
