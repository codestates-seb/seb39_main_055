import { TbDots } from "react-icons/tb";
import styled from "styled-components";

import like from "../../../assets/icons/like.svg";
import yellowLike from "../../../assets/icons/like-yellow.svg";
import cat from "../../../assets/images/animal/cat.jpg";

export const SMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 150px;

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

export const SUserInfo = styled.div`
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

// export const SLikeContainer = styled.section
//   & > img {

//   }
// `

const PostDetail = () => {
  return (
    <div>
      <SMainContainer>
        <h1>댕댕이숲</h1>
        <SUtils>
          <SUserInfo>
            <img src={cat} alt="profile" />
            <span>멍멍냥</span>
            <span>30분 전</span>
          </SUserInfo>
          <TbDots />
        </SUtils>
        <SImageContainer>
          <img src={cat} alt="animal" />
        </SImageContainer>
        <SBody>
          발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요ㅠㅠㅠㅠ 어디까지
          잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게
          잘라야 하는지 친절이 알려주실 분 댓글 달아주시면 정말
          감사하겠습니다ㅠㅠㅠ 제발 도와주세요!!ㅠㅠㅠㅠ
        </SBody>
        <div>
          <img src={yellowLike} alt="yellow-heart" />
          <span>20</span>
        </div>
      </SMainContainer>
      <section>
        <div>
          <span>댓글</span>
          <span>10</span>
        </div>
        <form>
          <input type="text" placeholder="다양한 이야기를 공유해주세요 :)" />
          <button type="submit">입력</button>
        </form>
        <div>
          <div>
            {/* <img src={cat} alt="profile" /> */}
            <span>우리집 댕댕이</span>
          </div>
          <p>
            각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!
          </p>
          <div>
            <span>1시간 전</span>
            <span>좋아요</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
