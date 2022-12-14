import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 380px);

  @media screen and (max-width: 1130px) {
    padding: 20px;
  }
`;

export const SImagesContainer = styled.section`
  margin-top: 80px;
`;

export const SDescriptionContainer = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 35px 0;
  white-space: pre-wrap;
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
  margin-top: 100px;

  & > li {
    margin-bottom: 40px;
  }
`;

export const SSortButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-bottom: 15px;
`;

export const SSortButton = styled.button<{ isClicked: boolean }>`
  color: ${({ isClicked }) => (isClicked ? "ffffff" : "#707070")};
  background-color: inherit;
  border: none;
  transition: all 0.4s;
`;

export const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;
