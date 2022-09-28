import {
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
  /* distance: string; */
  storeName: string;
  averageRating: number;
  reviews: number;
}

const PlaceCard = ({
  image,
  alt,
  location,
  /* distance, */
  storeName,
  averageRating,
  reviews,
}: PlaceCardProps) => {
  return (
    <SList>
      <SImg src={image} alt={alt} />
      <SHeader>
        <STopBox>
          <SH2>{location}</SH2>
          <SP>12km</SP>
        </STopBox>
        <SH1>{storeName}</SH1>
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
};

export default PlaceCard;
