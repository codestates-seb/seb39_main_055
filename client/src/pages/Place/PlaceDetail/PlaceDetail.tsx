import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getPlaceDetail } from "../../../apis/place";
import { LoadingSpinner, Slider } from "../../../components";
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
  padding: 35px 0;
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

const PlaceDetail = () => {
  const params = useParams();
  const { data, isLoading } = useQuery(["place", params.id], () =>
    getPlaceDetail(params.id as string)
  );

  if (isLoading) {
    return (
      <SLoadingContainer>
        <LoadingSpinner />
      </SLoadingContainer>
    );
  }

  console.log(data);

  return (
    <SContainer>
      <main>
        <SImagesContainer>
          <Slider
            imageList={data?.storeImages.map((image) => image.storeImage)}
          />
        </SImagesContainer>
        <Header data={data} />
        <SDescriptionContainer>
          <SH2>시설 개요</SH2>
          <SP>{data?.body}</SP>
        </SDescriptionContainer>
        <Info data={data} />
      </main>
      <SReviewContainer>
        <SH2>
          리뷰 <SStrong>{data?.reviews.data.length}</SStrong>
        </SH2>
        <ReviewForm />
        <SReviewListContainer>
          {data?.reviews.data.map((data) => (
            <ReviewCard
              key={data.reviewId}
              storeId={data.storeId}
              reviewId={data.reviewId}
              user={data.user}
              updatedAt={data.updatedAt}
              body={data.body}
              score={data.score}
            />
          ))}
        </SReviewListContainer>
      </SReviewContainer>
    </SContainer>
  );
};

export default PlaceDetail;
