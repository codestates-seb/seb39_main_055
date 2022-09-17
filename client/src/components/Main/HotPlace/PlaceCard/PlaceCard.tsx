import styled from "styled-components";

export const SContainer = styled.li`
  display: flex;
  height: 100px;
  width: 99%;
  margin-bottom: 10px;
  box-shadow: 0px 0px 1px grey;
  transition: 0.4s all;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  & > img {
    width: 40%;
    height: 100%;
    object-fit: cover;
  }

  & > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 20px;

    & > span {
      color: ${({ theme }) => theme.colors.black200};
      font-size: 12px;
    }

    & > p {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 14px;
    }
  }
`;

interface Prop {
  img: string;
  location: string;
  name: string;
}

const PlaceCard = ({ img, location, name }: Prop) => {
  return (
    <SContainer>
      <img src={img} alt="place" />
      <div>
        <span>{location}</span>
        <p>{name}</p>
      </div>
    </SContainer>
  );
};

export default PlaceCard;
