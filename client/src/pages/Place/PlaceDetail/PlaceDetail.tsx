import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getPlaceDetail } from "../../../apis/place";
import { LoadingSpinner, Slider } from "../../../components";
import { DUMMY_DATA } from "./data";
import Header from "./Header/Header";
import Info from "./Info/Info";

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
  padding: 35px 0;
`;

export const SLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 380px);
`;

const PlaceDetail = () => {
  // const data = DUMMY_DATA;
  // const isLoading = false;
  const params = useParams();
  const { data, isLoading } = useQuery(["place"], () =>
    getPlaceDetail(params.id as string)
  );

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
      <section>리뷰</section>
    </SContainer>
  );
};

export default PlaceDetail;
