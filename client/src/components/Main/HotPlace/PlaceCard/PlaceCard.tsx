/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useNavigate } from "react-router-dom";
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
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 20px;

    & > span {
      color: ${({ theme }) => theme.colors.black200};
      font-size: 14px;
    }

    & > p {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: ${({ theme }) => theme.colors.black500};
      font-size: 18px;
    }
  }
`;

interface Prop {
  storeId: string;
  img: string;
  location: string;
  name: string;
}

const PlaceCard = ({ img, location, name, storeId }: Prop) => {
  const navigate = useNavigate();
  const [province, district] = location.match(/(.*?)[시|구|군]/g)!;

  if (province.length <= 3) {
    location = `${province}${district}`;
  }
  if (province.length > 3) {
    location = province;
  }

  return (
    <SContainer onClick={() => navigate(`/place/${storeId}`)}>
      <img src={img} alt="place" />
      <div>
        <span>{location}</span>
        <p>{name}</p>
      </div>
    </SContainer>
  );
};

export default PlaceCard;
