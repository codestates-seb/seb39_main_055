import { reviews } from "../../../constants";
import ReviewCard from "./ReviewCard/ReviewCard";
import {
  SCardBox,
  SCardSection,
  SH1,
  SH2,
  SHgroup,
  SReviewSection,
} from "./style";

const Review = () => {
  return (
    <SReviewSection>
      <SHgroup>
        <SH1>제가 가봤는데요!</SH1>
        <SH2>직접 경험한 사람들의 생생한 경험담을 확인해보세요.</SH2>
      </SHgroup>
      <SCardSection>
        <SCardBox>
          {reviews.map((e) => (
            <ReviewCard
              reviewImg={e.reviewImg}
              loc={e.loc}
              place={e.place}
              review={e.review}
              rating={e.rating}
              reviewer={e.reviewer}
              userImg={e.userImg}
              key={e.place}
            />
          ))}
        </SCardBox>
      </SCardSection>
    </SReviewSection>
  );
};

export default Review;
