import styled, { css } from "styled-components";

import pension from "../../../assets/images/mypage/pension.jpg";

export const heartDummyData = [
  {
    id: 1,
    image: pension,
    category: "숙소",
    title: "제주 솔펜션",
    alt: "제주 솔펜션",
    adress: "제주 제주시",
    text: "제주 솔펜션(객실에서 보는 제주 일출)",
    link: "/",
  },
  {
    id: 1,
    image: pension,
    category: "숙소",
    title: "제주 솔펜션",
    alt: "제주 솔펜션",
    adress: "제주 제주시",
    text: "제주 솔펜션(객실에서 보는 제주 일출)",
    link: "/",
  },
  {
    id: 1,
    image: pension,
    category: "숙소",
    title: "제주 솔펜션",
    alt: "제주 솔펜션",
    adress: "제주 제주시",
    text: "제주 솔펜션(객실에서 보는 제주 일출)",
    link: "/",
  },
  {
    id: 1,
    image: pension,
    category: "숙소",
    title: "제주 솔펜션",
    alt: "제주 솔펜션",
    adress: "제주 제주시",
    textLine1: "제주 솔펜션(객실에서 보는 제주 일출)",
    link: "/",
  },
  {
    id: 1,
    image: pension,
    category: "숙소",
    title: "제주 솔펜션",
    alt: "제주 솔펜션",
    adress: "제주 제주시",
    textLine1: "제주 솔펜션(객실에서 보는 제주 일출)",
    link: "/",
  },
  {
    id: 1,
    image: pension,
    category: "숙소",
    title: "제주 솔펜션",
    alt: "제주 솔펜션",
    adress: "제주 제주시",
    text: "제주 솔펜션(객실에서 보는 제주 일출)",
    link: "/",
  },
];

interface HeartProps {
  image: string;
  category: string;
  alt: string;
  adress: string;
  title: string;
  text: string;
  link: string;
}

const Container = styled.div``;

const Image = styled.img``;

const Category = styled.div`
  margin: 10px 0px;
  color: #ffc107;
  font-size: 14px;
`;

// const TextTitle = styled.div`
//   color: ${({ theme }) => theme.colors.black500};
//   font-size: 26px;
// `;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.black400};
  margin-bottom: 3px;
  font-size: 16px;
`;

const Adress = styled.div`
  color: ${({ theme }) => theme.colors.black100};
  margin: 10px 0px 15px 0px;
  font-size: 16px;
`;

const HeartDummyData = ({
  image,
  category,
  alt,
  adress,
  title,
  text,
  link,
}: HeartProps) => {
  return (
    <Container>
      <section>
        <div>
          <Image src={image} alt={alt} />
        </div>
        <div>
          <Category>{category}</Category>
          <Adress>{adress}</Adress>
          <Text>{text}</Text>
        </div>
      </section>
    </Container>
  );
};

export default HeartDummyData;
