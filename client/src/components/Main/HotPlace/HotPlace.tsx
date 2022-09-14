import React, { useEffect, useState } from "react";

import { DUMMY_BUTTON, DUMMY_DATA, DUMMY_IMG_LIST } from "./data";
import PlaceCard from "./PlaceCard/PlaceCard";
import {
  Container,
  SButtonContainer,
  SImgContainer,
  SListContainer,
  SLoading,
  SMainContainer,
  SSection,
} from "./style";

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
