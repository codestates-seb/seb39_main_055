import dummyImg from "../../assets/images/test.png";
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
  distance: string;
  storeName: string;
  meanRating: number;
  reviews: number;
}

const PlaceCard = ({
  image,
  alt,
  location,
  distance,
  storeName,
  meanRating,
  reviews,
}: PlaceCardProps) => {
  return (
    <SList>
      <SImg src={dummyImg} alt="fgsfg" />
      <SHeader>
        <STopBox>
          <SH2>경기 가평군</SH2>
          <SP>12km</SP>
        </STopBox>
        <SH1>도그더왈츠 애견펜션</SH1>
        <SBar />
      </SHeader>
      <SFooter>
        <SStarSVG />
        <SRatingP>4.5 (12)</SRatingP>
      </SFooter>
    </SList>
  );
};

export default PlaceCard;
