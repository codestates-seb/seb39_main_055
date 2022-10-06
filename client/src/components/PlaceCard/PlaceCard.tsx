/* eslint-disable consistent-return */
/* eslint-disable react/display-name */
import axios from "axios";
import { memo, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import {
  EmptyHeartSVG,
  FillHeartSVG,
  SaLink,
  SBar,
  SFooter,
  SH1,
  SH2,
  SHeader,
  SImg,
  SList,
  SP,
  SRatingP,
  SStarSVG,
  STopBox,
} from "./style";

interface PlaceCardProps {
  image: string;
  alt: string;
  location: string;
  distance: number;
  storeName: string;
  averageRating: number;
  reviews: number;
  storeId: string;
  isLiked: boolean;
}

const PlaceCard = memo(
  ({
    image,
    alt,
    location,
    distance,
    storeName,
    averageRating,
    reviews,
    storeId,
    isLiked,
  }: PlaceCardProps) => {
    const storeLink = `/place/${storeId}`;
    const imageRef = useRef<HTMLImageElement>(null);
    const { data } = useQuery(
      ["place", "mainPicture", storeId],
      async () => {
        const { data } = await axios.get(image, {
          responseType: "blob",
        });

        const imageURL = URL.createObjectURL(data);

        return imageURL;
      },
      {
        suspense: true,
        staleTime: 1 * 60 * 60 * 1000, // 1시간
      }
    );

    /* useEffect(() => {
      if (!imageRef.current) return;

      const imageEl = imageRef.current;
      const { naturalHeight, naturalWidth } = imageEl || {
        naturalHeight: 1,
        naturalWidth: 0,
      };
      const ratio = naturalWidth / naturalHeight;
      // 사진 비율이 16:9가 아닐 때, max-width: 100%로 해줘야 부모 요소에 꽉참
      if (ratio < 1.5) {
        imageEl.style.maxWidth = "100%";
        imageEl.style.maxHeight = "max-content";
      }
    }, []); */

    return (
      <SList>
        <SaLink to={storeLink}>
          <SImg src={data} alt={alt} ref={imageRef} />
        </SaLink>
        {isLiked ? <FillHeartSVG /> : <EmptyHeartSVG />}

        <SHeader>
          <STopBox>
            <SH2>{location}</SH2>
            <SP>{distance}km</SP>
          </STopBox>
          <Link to={storeLink}>
            <SH1>{storeName}</SH1>
          </Link>
          <SBar />
        </SHeader>

        <SFooter>
          <SStarSVG />
          <SRatingP>
            {averageRating} ({reviews})
          </SRatingP>
        </SFooter>
      </SList>
    );
  }
);

export default PlaceCard;
