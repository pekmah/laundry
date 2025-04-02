import { IImage } from "types/laundry";

export const getRandomImageUrl = (images: IImage[]): string => {
  if (images.length) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].url;
  }
  return "";
};
