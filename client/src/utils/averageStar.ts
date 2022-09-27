import { Review } from "../types";

type AverageStar = (reviewList: Review[]) => string;

export const averageStar: AverageStar = (reviewList) => {
  const stars = reviewList?.map((review) => review.score);
  const average = stars.reduce((acc, cur) => acc + cur, 0) / reviewList.length;

  return average.toFixed(1);
};
