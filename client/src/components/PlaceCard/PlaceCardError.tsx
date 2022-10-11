/* eslint-disable react/display-name */
import { memo } from "react";
import { Link } from "react-router-dom";

import { Rectangle } from "../Skeleton/Skeleton";
import { PlaceCardProps } from "./PlaceCard";
import {
  EmptyHeartSVG,
  FillHeartSVG,
  SaLink,
  SBar,
  SFooter,
  SH1,
  SH2,
  SHeader,
  SList,
  SP,
  SRatingP,
  SStarSVG,
  STopBox,
} from "./style";

type PlaceCardErrorProps = Omit<PlaceCardProps, "image" | "alt">;

const PlaceCardError = memo(
  ({
    location,
    distance,
    storeName,
    averageRating,
    reviews,
    storeId,
    isLiked,
  }: PlaceCardErrorProps) => {
    const storeLink = `/place/${storeId}`;

    return (
      <SList>
        <SaLink to={storeLink}>
          <Rectangle width="100%" height="235px" />
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

export default PlaceCardError;
