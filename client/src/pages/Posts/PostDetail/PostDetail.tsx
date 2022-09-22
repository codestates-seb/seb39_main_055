import like from "../../../assets/icons/like.svg";
import yellowLike from "../../../assets/icons/like-yellow.svg";
import cat from "../../../assets/images/animal/cat.png";

const PostDetail = () => {
  return (
    <div>
      <section>
        <h1>댕댕이숲</h1>
        <div>
          <img src={cat} alt="profile" />
          <span>멍멍냥</span>
          <span>30분 전</span>
        </div>
        <div>
          <img src={cat} alt="animal" />
        </div>
        <p>
          발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요ㅠㅠㅠㅠ 어디까지
          잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게
          잘라야 하는지 친절이 알려주실 분 댓글 달아주시면 정말
          감사하겠습니다ㅠㅠㅠ 제발 도와주세요!!ㅠㅠㅠㅠ
        </p>
        <div>
          <img src={yellowLike} alt="yellow-heart" />
          <span>20</span>
        </div>
      </section>
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
            <img src={cat} alt="profile" />
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
