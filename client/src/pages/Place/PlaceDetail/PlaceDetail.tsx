/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
import React, { useRef } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getPlaceDetail, usePlaceDetail } from "../../../apis/place";
import { ButtonWhite, LoadingSpinner, Slider } from "../../../components";
import { Store } from "../../../types";
import { axiosInstance } from "../../../utils";
import Header from "./Header/Header";
import Info from "./Info/Info";
import ReviewCard from "./ReviewCard/ReviewCard";
import ReviewForm from "./ReviewForm/ReviewForm";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 380px);

  @media screen and (max-width: 1130px) {
    padding: 20px;
  }
`;

export const SImagesContainer = styled.section`
  height: 600px;
  margin-top: 80px;
`;

export const SDescriptionContainer = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 35px 0;
`;

export const SH2 = styled.h2`
  color: #000000;
  font-size: 26px;
  margin-bottom: 25px;
`;

export const SP = styled.p`
  color: #434343;
  font-size: 18px;
  line-height: 40px;
`;

export const SReviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`;

export const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 380px);
`;

export const SStrong = styled.strong`
  color: #ffc109;
`;

export const SReviewListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 100px;
`;

export const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const PlaceDetail = () => {
  const params = useParams();
  const reviewRef = useRef<HTMLUListElement>(null);

  const {
    detailData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    reviewData,
  } = usePlaceDetail(params.id as string);

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
          {reviewData?.pages.map((page, index) => {
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
