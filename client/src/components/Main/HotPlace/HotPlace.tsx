import React, { useEffect, useState } from "react";
import styled from "styled-components";

import img1 from "../../../assets/images/carousel/1.png";
import img2 from "../../../assets/images/main-review/r1.png";
import img3 from "../../../assets/images/main-review/r2.png";
import img4 from "../../../assets/images/main-review/r3.png";
import img5 from "../../../assets/images/main-review/r4.png";
import img6 from "../../../assets/images/main-review/r5.png";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import PlaceCard from "./PlaceCard/PlaceCard";

export const Container = styled.div`
  box-shadow: 0px 0px 5px grey;
  & > header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    padding: 50px 10px;
    background-color: #f8f8fa;

    & > h3 {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 38px;
    }

    & > p {
      color: ${({ theme }) => theme.colors.black100};
      font-size: 20px;
    }
  }
`;

export const SSection = styled.section`
  display: flex;
  height: 500px;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    height: 1000px;
  }
`;

export const SImgContainer = styled.div`
  flex-basis: 50%;
  height: 500px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    animation: fadein 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const SMainContainer = styled.main`
  flex-basis: 50%;
  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 20px 0 0 0;
  }
`;

export const SButtonContainer = styled.div`
  display: flex;
  align-items: center;

  .active {
    color: ${({ theme }) => theme.colors.black500};
  }

  & > button {
    flex-grow: 1;
    padding: 0;
    border: none;
    color: ${({ theme }) => theme.colors.black200};
    background-color: inherit;
    font-size: 14px;
  }

  & > div {
    width: 1px;
    height: 13px;
    margin: 0 10px 3px 10px;
    background-color: ${({ theme }) => theme.colors.black200};
  }

  & > div:last-child {
    display: none;
  }
`;

export const SListContainer = styled.ul`
  position: relative;
  height: 420px;
  margin-top: 20px;
  padding: 5px;
  overflow-y: scroll;

  & > li:last-child {
    margin-bottom: 0;
  }
`;

export const SLoading = styled(LoadingSpinner)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const DUMMY_DATA = [
  {
    id: 1,
    img: img1,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 2,
    img: img2,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 3,
    img: img3,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 4,
    img: img4,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 5,
    img: img5,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 6,
    img: img6,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 7,
    img: img1,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 8,
    img: img2,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 9,
    img: img3,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
  {
    id: 10,
    img: img4,
    location: "경남 고성군",
    name: "고성 에세이더레지던스던펜션",
  },
];

const DUMMY_BUTTON = [
  {
    id: 0,
    name: "숙소",
  },
  {
    id: 1,
    name: "미용",
  },
  {
    id: 2,
    name: "카페",
  },
  {
    id: 3,
    name: "맛집",
  },
  {
    id: 4,
    name: "운동장",
  },
  {
    id: 5,
    name: "동물병원",
  },
];

const DUMMY_IMG_LIST = [img1, img2, img3, img4, img5, img6];

const HotPlace = () => {
  const [data, setData] = useState(DUMMY_DATA);
  const [buttonIndex, setButtonIndex] = useState<string | number>(0);
  const [imageIndex, setImageIndex] = useState(0);
  const isLoading = false;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) =>
        prev === DUMMY_IMG_LIST.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBtnClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log((event.target as HTMLButtonElement).value);
    setButtonIndex(Number((event.target as HTMLButtonElement).value));
  };

  return (
    <Container>
      <header>
        <h3>요즘 많이 찾는 핫플</h3>
        <p>나의 반려동물과 함께 잊지못할 추억을 쌓아보세요.</p>
      </header>
      <SSection>
        <SImgContainer>
          <img src={DUMMY_IMG_LIST[imageIndex]} alt="hotel" />
        </SImgContainer>
        <SMainContainer>
          <SButtonContainer>
            {DUMMY_BUTTON.map((el, idx) => (
              <React.Fragment key={el.id}>
                <button
                  type="button"
                  value={el.id}
                  className={idx === buttonIndex ? "active" : ""}
                  onClick={handleBtnClick}
                >
                  {el.name}
                </button>
                <div />
              </React.Fragment>
            ))}
          </SButtonContainer>
          <SListContainer>
            {isLoading ? (
              <SLoading />
            ) : (
              data.map((el) => (
                <PlaceCard
                  key={el.id}
                  img={el.img}
                  location={el.location}
                  name={el.name}
                />
              ))
            )}
          </SListContainer>
        </SMainContainer>
      </SSection>
    </Container>
  );
};

export default HotPlace;
