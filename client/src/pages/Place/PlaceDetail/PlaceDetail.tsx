import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { usePlaceDetail } from "../../../apis";
import { ButtonWhite, LoadingSpinner } from "../../../components";
import { ImageGrid } from "../../../components/ImageGrid/ImageGrid";
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
  SSortButton,
  SSortButtonContainer,
  SStrong,
} from "./style";

const PlaceDetail = () => {
  const params = useParams();
  const reviewRef = useRef<HTMLUListElement>(null);
  const [buttonIdx, setButtonIdx] = useState(0);
  const [sortOption, setSortOption] = useState("createdAt");

  const handleSortBtnClick = (option: string, index: number) => {
    setButtonIdx(index);
    if (option === "최신순") setSortOption("createdAt");
    if (option === "별점높은순") setSortOption("score");
  };

  const {
    detailData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    reviewData,
  } = usePlaceDetail(params.id as string, sortOption);

  const reviewList = useMemo(
    () =>
      reviewData
        ? reviewData.pages.flatMap(({ data }) => data.reviews.data)
        : [],
    [reviewData]
  );

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
          <ImageGrid
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
          <SSortButtonContainer>
            {["최신순", "별점높은순"].map((el, index) => (
              <SSortButton
                key={el}
                value={el}
                isClicked={index === buttonIdx}
                onClick={(e) =>
                  handleSortBtnClick(
                    (e.target as HTMLButtonElement).value,
                    index
                  )
                }
              >
                {el}
              </SSortButton>
            ))}
          </SSortButtonContainer>
          {reviewList.map((data) => (
            <ReviewCard
              key={data.reviewId}
              reviewId={data.reviewId}
              user={data.user}
              updatedAt={data.updatedAt}
              body={data.body}
              score={data.score}
            />
          ))}
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
