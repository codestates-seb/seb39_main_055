/* eslint-disable consistent-return */
import { ReactNode, useCallback, useEffect, useState } from "react";

import { SCarouselBox, SItemBox, SNext, SPrev } from "./style";

const classNameMatcher = (itemId: number, indexArr: number[]) => {
  const currentI = indexArr.findIndex((i) => i === itemId);

  if (currentI === 1) {
    return "main";
  }
  if (currentI === 0) {
    return "left";
  }
  if (currentI === 2) {
    return "right";
  }

  return "";
};

interface CarouselItem {
  item: ReactNode;
  id: number;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel = ({ items }: CarouselProps) => {
  if (items.length < 3) {
    const concatenation = items.map((e, i) => ({ ...e, id: i + items.length }));
    items = items.concat(concatenation);
  }
  const N = items.length;
  const [index, setIndex] = useState([N - 1, 0, 1]);

  const mainIndexer = useCallback(
    (command: "next" | "prev") => {
      const step = command === "next" ? 1 : -1;
      const nextIndex: number[] = [];

      for (let i = 0; i < index.length; i += 1) {
        nextIndex[i] = (((index[i] + step) % N) + N) % N;
      }

      setIndex(nextIndex);
    },
    [index]
  );

  useEffect(() => {
    const timer = setTimeout(() => mainIndexer("next"), 2500);

    return () => clearTimeout(timer);
  }, [mainIndexer]);

  return (
    <SCarouselBox>
      <SPrev onClick={() => mainIndexer("prev")} />
      {items.map((e) => (
        <SItemBox key={e.id} className={`${classNameMatcher(e.id, index)}`}>
          {e.item}
        </SItemBox>
      ))}
      <SNext onClick={() => mainIndexer("next")} />
    </SCarouselBox>
  );
};

export default Carousel;
