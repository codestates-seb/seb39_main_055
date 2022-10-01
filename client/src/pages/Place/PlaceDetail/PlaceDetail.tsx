import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { usePlaceDetail } from "../../../apis";
import { ButtonWhite, LoadingSpinner, Slider } from "../../../components";
import { addPlaceToLocalStorage } from "../../../utils";
import Header from "./Header/Header";
import Info from "./Info/Info";
import ReviewCard from "./ReviewCard/ReviewCard";
import ReviewForm from "./ReviewForm/ReviewForm";
import {
  SButtonContainer,
  SContainer,
  SDescriptionContainer,
  SH2,
  SImagesContainer,
  SLoadingContainer,
  SP,
  SReviewContainer,
  SReviewListContainer,
  SStrong,
} from "./style";

const PlaceDetail = () => {
  const params = useParams();
  const reviewRef = useRef<HTMLUListElement>(null);

  const {
    detailData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    reviewData,
  } = usePlaceDetail(params.id as string);

  useEffect(() => {
    if (isSuccess && detailData) {
      addPlaceToLocalStorage(detailData);
    }
  }, [isSuccess, detailData]);

  if (isLoading) {
    return (
      <SLoadingContainer>
        <LoadingSpinner />
      </SLoadingContainer>
    );
  }

  return (
    <SContainer>
      <main>
        <SImagesContainer>
          <Slider
            imageList={detailData?.storeImages.map((image) => image.storeImage)}
          />
        </SImagesContainer>
        <Header data={detailData} reviewRef={reviewRef} />
        <SDescriptionContainer>
          <SH2>시설 개요</SH2>
          <SP>{detailData?.body}</SP>
        </SDescriptionContainer>
        <Info data={detailData} />
      </main>
      <SReviewContainer>
        <SH2>
          리뷰{" "}
          <SStrong>
            {reviewData?.pages[0].data.reviews.pageInfo.totalElements}
          </SStrong>
        </SH2>
        <ReviewForm isEdit={false} data={detailData} />
        <SReviewListContainer ref={reviewRef}>
          {reviewData?.pages.map((page) => {
            return page?.data.reviews.data.map((data) => (
              <ReviewCard
                key={data.reviewId}
                reviewId={data.reviewId}
                user={data.user}
                updatedAt={data.updatedAt}
                body={data.body}
                score={data.score}
              />
            ));
          })}
        </SReviewListContainer>
        {hasNextPage && (
          <SButtonContainer>
            <ButtonWhite
              onClick={() => fetchNextPage()}
              isPending={isFetchingNextPage}
            >
              리뷰 더 보기
            </ButtonWhite>
          </SButtonContainer>
        )}
      </SReviewContainer>
    </SContainer>
  );
};

export default PlaceDetail;
