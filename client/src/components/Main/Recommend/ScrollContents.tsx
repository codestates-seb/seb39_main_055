import { AiOutlineLine } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { mobile } from "../../../assets";

interface RecommendProps {
  id: number;
  image: string;
  category: string;
  title: string;
  date: string;
  alt: string;
  textTitle: string;
  textLine1: string;
  textLine2: string;
  link: string;
  isEven: boolean;
}
// const SContainer = styled.div
//   display: flex;
//   gap: 10px;
//   flex-wrap: no-wrap;
//   overflow-x: scroll;
//   overflow-y: hidden;
//   height: 500px;
//   border: 1px solid black;

//   & > section {
//     flex: 0 0 auto;
//     width: 300px;
//     height: 100%;
//     border: 1px solid red;
//   }

//   & > section:nth-child(2n) {
//     height: 80%;
//   }

//   & > section > div:first-child {
//     border: 1px solid blue;
//     height: 70%;
//   }

//   & > section > div:last-child {
//     border: 1px solid blue;
//     height: 30%;
//   }
// ;

const SContainer = styled.div`
  :hover {
    opacity: 0.7;
    transition: 0.3s ease-out;
  }

  :not(:hover) {
    transition: 0.3s ease-out;
  }
`;

const Image = styled.img<{ isEven: boolean }>`
  width: 342px;
  height: ${({ isEven }) => (isEven ? "338px" : "445px")};
  object-fit: cover;

  ${mobile(css`
    width: 400px;
    flex-wrap: wrap;
  `)}
`;

const Category = styled.div`
  margin: 10px 0px;
  color: ${({ theme }) => theme.colors.orange500};
  font-size: 14px;
`;

const TextTitle = styled.div`
  color: ${({ theme }) => theme.colors.black500};
  font-size: 25px;
`;

const TextLine1 = styled.div`
  color: ${({ theme }) => theme.colors.black400};
  margin-bottom: 3px;
  font-size: 14px;

  ${mobile(css`
    width: 300px;
    flex-wrap: wrap;
  `)}
`;

const TextLine2 = styled.div`
  color: ${({ theme }) => theme.colors.black400};
  margin-bottom: 3px;
  font-size: 16px;

  ${mobile(css`
    width: 300px;
    flex-wrap: wrap;
  `)}
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.black100};
  margin: 10px 0px 15px 0px;
  font-size: 12px;
`;

const ScrollContents = ({
  id,
  image,
  category,
  title,
  date,
  alt,
  textTitle,
  textLine1,
  textLine2,
  link,
  isEven,
}: RecommendProps) => {
  const navigate = useNavigate();
  return (
    <SContainer onClick={() => navigate(`/place/${id}`)}>
      <section>
        <div>
          <Image src={image} alt={alt} isEven={isEven} />
        </div>
        <div>
          <Category>{category}</Category>
          <TextTitle>{textTitle}</TextTitle>
          <AiOutlineLine size={30} />
          <TextLine1>{textLine1}</TextLine1>
          <TextLine2>{textLine2}</TextLine2>
          <Date>{date}</Date>
        </div>
      </section>
    </SContainer>
  );
};

export default ScrollContents;
