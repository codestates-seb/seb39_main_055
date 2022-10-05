import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { cat1, cat2, cat3, dog1, dog2 } from "../../assets/images/animal";

export const SContainer = styled.div`
  position: absolute;
  left: 0;

  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  height: 180px;
  margin-top: 100px;
  padding: 30px 120px;
  background-color: #ffecb4;
  cursor: pointer;

  @media screen and (max-width: 1650px) {
    display: none;
  }
`;

export const STitle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 300px;
  text-align: center;

  & > h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  & > p {
    line-height: 20px;
  }
`;

export const SImgContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 40px;

  & > img {
    width: 240px;
    height: 120px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const imageList = [cat1, cat2, cat3, dog1, dog2];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <SContainer onClick={() => navigate("/post/list")}>
      <STitle>
        <h2>댕댕이숲</h2>
        <p>
          댕냥이 자랑, 고민거리, 산책친구 등<br />
          다양한 이야기를 댕댕이 숲에 외쳐보세요!
        </p>
      </STitle>
      <SImgContainer>
        {imageList.map((image) => (
          <img key={image} src={image} alt="animal" />
        ))}
      </SImgContainer>
    </SContainer>
  );
};

export default Banner;
