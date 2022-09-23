import { HiOutlineHeart } from "react-icons/hi";
import { TbDots } from "react-icons/tb";
import styled from "styled-components";

import like from "../../../assets/icons/like.svg";
import yellowLike from "../../../assets/icons/like-yellow.svg";
import cat from "../../../assets/images/animal/cat.jpg";

export const SMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  border-bottom: 3px solid #dbdbdb;

  & > h1 {
    color: #707070;
    font-size: 32px;
    font-family: "ONE-Mobile-Bold";
  }
`;

export const SUtils = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0 50px 0;

  svg {
    font-size: 50px;
    color: #a5a5a5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #161616;
    }
  }
`;

export const SUserInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "Noto Sans KR", sans-serif;

  & > img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span:nth-child(2) {
    font-size: 20px;
    color: #161616;
    font-weight: 600;
  }

  & > span:nth-child(3) {
    font-size: 18px;
    color: #a5a5a5;
  }
`;

export const SImageContainer = styled.section`
  width: 100%;
  height: 650px;
  border-radius: 17px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 17px;
  }
`;

export const SBody = styled.p`
  margin: 100px 0;
  color: #161616;
  font-size: 18px;
  line-height: 35px;
`;

export const SLikeContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;

  & > svg {
    cursor: pointer;
    font-size: 30px;
    color: #ffc107;
    fill: #ffc107;
    transition: all 0.3s;
  }

  & > span {
    color: #161616;
    font-size: 20px;
    font-weight: 600;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 55px 0;

  & > header {
    font-size: 18px;

    & > span:first-child {
      color: #161616;
      margin-right: 10px;
    }

    & > span:last-child {
      color: #ffc107;
    }
  }
`;

export const SInputContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  margin-top: 18px;
  padding: 5px 20px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;

  & > input {
    width: 90%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 15px;
    font-family: "ONE-Mobile-Regular";

    &::placeholder {
      color: #dbdbdb;
      font-family: "ONE-Mobile-Regular";
    }
  }

  & > button {
    width: 65px;
    height: 100%;
    color: #161616;
    background-color: #dbdbdb;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-family: "ONE-Mobile-Regular";
    transition: all 0.4s;

    &:hover {
      color: #ffffff;
      background-color: #ffc107;
    }
  }
`;

export const SListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 107px;
`;

export const SList = styled.li`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
  padding-bottom: 40px;
`;

export const SUtils2 = styled.section`
  flex-basis: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 30px;
    color: #a5a5a5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #161616;
    }
  }
`;

export const SUserInfo2 = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  & > span {
    font-size: 16px;
    color: #161616;
  }
`;

export const SBody2 = styled.p`
  flex-grow: 1;
  line-height: 35px;
`;

export const SBottom = styled.section`
  flex-basis: 15px;
  display: flex;
  align-items: center;
  gap: 17px;
  color: #a5a5a5;
  font-size: 14px;

  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > svg {
      margin-right: 2px;
      font-size: 20px;
      fill: red;
      color: red;
    }

    & > span {
      padding-top: 2px;
    }
  }
`;

const PostDetail = () => {
  return (
    <>
      <SMainContainer>
        <h1>댕댕이숲</h1>
        <SUtils>
          <SUserInfo>
            <img src={cat} alt="profile" />
            <span>멍멍냥</span>
            <span>30분 전</span>
          </SUserInfo>
          {/** 클릭시 모달창 */}
          <TbDots />
        </SUtils>
        <SImageContainer>
          {/** 슬라이드 */}
          <img src={cat} alt="animal" />
        </SImageContainer>
        <SBody>
          발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요ㅠㅠㅠㅠ 어디까지
          잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게
          잘라야 하는지 친절이 알려주실 분 댓글 달아주시면 정말
          감사하겠습니다ㅠㅠㅠ 제발 도와주세요!!ㅠㅠㅠㅠ
        </SBody>
        <SLikeContainer>
          {/** 클릭시 하트 변경 */}
          <HiOutlineHeart />
          {/* <img src={yellowLike} alt="yellow-heart" /> */}
          {/* <img src={like} alt="heart" /> */}
          <span>20</span>
        </SLikeContainer>
      </SMainContainer>
      <section>
        <SForm>
          <header>
            <span>댓글</span>
            <span>10</span>
          </header>
          <SInputContainer>
            {/** focus시 스타일 변경 */}
            <input type="text" placeholder="다양한 이야기를 공유해주세요 :)" />
            <button type="submit">입력</button>
          </SInputContainer>
        </SForm>
        <SListContainer>
          <SList>
            <SUtils2>
              <SUserInfo2>
                <img src={cat} alt="profile" />
                <span>우리집 댕댕이</span>
              </SUserInfo2>
              <TbDots />
            </SUtils2>
            <SBody2>
              각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!
            </SBody2>
            <SBottom>
              <span>30분 전</span>
              <div>
                <HiOutlineHeart />
                <span>좋아요</span>
              </div>
            </SBottom>
          </SList>
          <SList>
            <SUtils2>
              <SUserInfo2>
                <img src={cat} alt="profile" />
                <span>우리집 댕댕이</span>
              </SUserInfo2>
              <TbDots />
            </SUtils2>
            <SBody2>
              각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!
            </SBody2>
            <SBottom>
              <span>30분 전</span>
              <div>
                <HiOutlineHeart />
                <span>좋아요</span>
              </div>
            </SBottom>
          </SList>
          <SList>
            <SUtils2>
              <SUserInfo2>
                <img src={cat} alt="profile" />
                <span>우리집 댕댕이</span>
              </SUserInfo2>
              <TbDots />
            </SUtils2>
            <SBody2>
              각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!
            </SBody2>
            <SBottom>
              <span>30분 전</span>
              <div>
                <HiOutlineHeart />
                <span>좋아요</span>
              </div>
            </SBottom>
          </SList>
          <SList>
            <SUtils2>
              <SUserInfo2>
                <img src={cat} alt="profile" />
                <span>우리집 댕댕이</span>
              </SUserInfo2>
              <TbDots />
            </SUtils2>
            <SBody2>
              각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!
            </SBody2>
            <SBottom>
              <span>30분 전</span>
              <div>
                <HiOutlineHeart />
                <span>좋아요</span>
              </div>
            </SBottom>
          </SList>
        </SListContainer>
      </section>
    </>
  );
};

export default PostDetail;
