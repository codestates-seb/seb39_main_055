import { AiOutlineLine } from "react-icons/ai";
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
}

const Container = styled.div``;

const Image = styled.img`
  ${mobile(css`
    width: 400px;
    flex-wrap: wrap;
  `)}
`;

const Category = styled.div`
  margin: 10px 0px;
  color: #ffc107;
  font-size: 14px;
`;

const TextTitle = styled.div`
  color: ${({ theme }) => theme.colors.black500};
  font-size: 26px;
`;

const TextLine1 = styled.div`
  color: ${({ theme }) => theme.colors.black400};
  margin-bottom: 3px;
  font-size: 16px;

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
  margin-top: 10px;
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
}: RecommendProps) => {
  return (
    <Container>
      <section>
        <div>
          <Image src={image} alt={alt} />
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
    </Container>
  );
};

export default ScrollContents;
