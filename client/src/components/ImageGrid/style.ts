import styled from "styled-components";

export const SContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 10px;
  border-radius: 20px;

  & > img:first-child {
    grid-column: span 2;
    grid-row: span 2;
    border-radius: 20px 0 0 20px;
  }

  & > img:nth-child(3) {
    border-radius: 0 20px 0 0;
  }

  & > img:nth-child(5) {
    border-radius: 0 0 20px 0;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;

    & > img:first-child {
      border-radius: 20px 20px 0 0;
    }

    & > img:nth-child(3) {
      border-radius: 0;
    }

    & > img:nth-child(4) {
      border-radius: 0 0 0 20px;
    }

    & > img:nth-child(5) {
      border-radius: 0 0 20px 0;
    }
  }
`;

export const SButton = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;

  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 1px 3px 10px hsla(0, 0%, 0%, 0.05),
    1px 2px 4px hsla(0, 0%, 0%, 0.05), 0 4px 8px hsla(0, 0%, 0%, 0.1);
  transition: all 0.4s;

  &:hover {
    scale: 1.1;
    background-color: #ffc107;
  }
`;

export const SSliderContainer = styled.div`
  height: 500px;

  & > img {
    border-radius: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakPoints.tablet}) {
    height: 400px;
  }
`;
