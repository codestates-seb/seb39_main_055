/* eslint-disable consistent-return */
/* eslint-disable react/display-name */
import axios from "axios";
import { memo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { queryClient } from "../../utils";
import { Rectangle } from "../Skeleton/Skeleton";
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

export interface PlaceCardProps {
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

async function invalidateImageCache(image: string, storeId: string) {
  const { data } = await axios.get<Blob>(image, {
    responseType: "blob",
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  queryClient.invalidateQueries(["place", "mainPicture", storeId]);
  return data;
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
    const { data: src } = useQuery(
      ["place", "mainPicture", storeId],
      async () => {
        let imageBlob: Blob;

        try {
          const { data } = await axios.get<Blob>(image, {
            responseType: "blob",
          });

          imageBlob = data;
        } catch (err) {
          // AWS CORS 에러 발생 시, 이미지 캐시 무효화
          const data = await invalidateImageCache(image, storeId);

          imageBlob = data;
        }

        return URL.createObjectURL(imageBlob);
      },
      {
        suspense: true,
        retry: 1,
        staleTime: 1 * 60 * 60 * 1000,
      }
    );

    return (
      <SList>
        <SaLink to={storeLink}>
          {src ? (
            <SImg src={src} alt={alt} crossOrigin="anonymous" />
          ) : (
            <Rectangle width="100%" height="235px" />
          )}
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
