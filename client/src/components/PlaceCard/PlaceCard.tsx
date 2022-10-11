/* eslint-disable consistent-return */
/* eslint-disable react/display-name */
import axios, { AxiosError } from "axios";
import { memo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { queryClient } from "../../utils";
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
    const { data: src, refetch } = useQuery(
      ["place", "mainPicture", storeId],
      async () => {
        let imageURL;

        try {
          const { data } = await axios.get(`${image}`, {
            responseType: "blob",
          });

          imageURL = URL.createObjectURL(data);
        } catch (err) {
          console.log(err);
          if (!(err instanceof AxiosError)) return;
          const { response } = err;

          // AWS CORS 에러 발생 시: HTTP 응답 코드(status)가 0
          if (response?.status === 0) {
            // 캐시된 이미지 CORS 에러 발생 시 캐시 무효화
            console.log("캐시 무효화");
            queryClient.invalidateQueries(["place", "mainPicture", storeId]);
          }
        }

        return imageURL;
      },
      {
        onSuccess: async (data) => {
          if (data) return;
          const { data: refreshed } = await refetch();

          console.log("onSuccess", refreshed);
          // CORS 에러 발생 시 onSuccess 콜백 실행 but. data === undefined
        },
        suspense: true,
        retry: 1,
        staleTime: 1 * 60 * 60 * 1000,
      }
    );

    return (
      <SList>
        <SaLink to={storeLink}>
          <SImg src={src} alt={alt} crossOrigin="anonymous" />
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
