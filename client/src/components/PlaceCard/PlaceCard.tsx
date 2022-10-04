/* eslint-disable consistent-return */
/* eslint-disable react/display-name */
import axios from "axios";
import { memo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import {
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
  }: PlaceCardProps) => {
    const storeLink = `/place/${storeId}`;
    const { data } = useQuery(
      ["place", "mainPicture", storeId],
      async () => {
        const { data } = await axios.get(
          "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
          {
            responseType: "blob",
          }
        );

        const imageURL = URL.createObjectURL(data);

        return imageURL;
      },
      { suspense: true }
    );

    /* useEffect(() => {
      if (!data) return;

      return () => URL.revokeObjectURL(data);
    }, [data]); */

    return (
      <SList>
        <SaLink to={storeLink}>
          <SImg src={image} alt={alt} />
        </SaLink>
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
