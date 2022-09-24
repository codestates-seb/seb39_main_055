import {
  SArticle,
  SFooter,
  SH3,
  SImg,
  SName,
  SP,
  SPlaceHeader,
  SRating,
  SReviewerP,
  SReviewImg,
  SReviewP,
  SStarSVG,
} from "./style";

interface ReviewCardProps {
  reviewImg: string;
  loc: string;
  place: string;
  review: string;
  rating: string;
  reviewer: string;
  userImg: string;
}

const ReviewCard = ({
  reviewImg,
  loc,
  place,
  review,
  rating,
  reviewer,
  userImg,
}: ReviewCardProps) => {
  return (
    <SArticle>
      <SReviewImg src={reviewImg} alt="review image" />
      <SPlaceHeader>
        <SP>{loc}</SP>
        <SH3>{place}</SH3>
      </SPlaceHeader>
      <SReviewP>{review}</SReviewP>
      <SFooter>
        <SStarSVG />
        <SRating>{rating}</SRating>
        <SReviewerP>
          <SName>{reviewer}</SName>
          <SImg src={userImg} alt={`image of ${reviewer}`} loading="lazy" />
        </SReviewerP>
      </SFooter>
    </SArticle>
  );
};

export default ReviewCard;
