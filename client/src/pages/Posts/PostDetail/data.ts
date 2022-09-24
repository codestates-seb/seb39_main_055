import cat from "../../../assets/images/animal/cat.jpg";
import pension1 from "../../../assets/images/mypage/pension2.png";
import pension2 from "../../../assets/images/mypage/pension3.png";

export interface PostData {
  threadId: string;
  threadStatus: string;
  body: string;
  likes: number;
  user: {
    ninkname: string;
    email: string;
    image: string;
    userStatus: string;
    longitude: string;
    latitude: string;
    userRole: string;
  };
  threadImages: {
    threadImageId: string;
    image: string;
    threadImageStatus: string;
  }[];
  createdAt: string;
  updatedAt: string;
  replyList: {
    replyId: string;
    replyBody: string;
    createdAt: string;
    user: {
      ninkname: string;
      email: string;
      image: string;
      userStatus: string;
      longitude: string;
      latitude: string;
      userRole: string;
    };
  }[];
}

export const detailData: PostData = {
  threadId: "1",
  threadStatus: "THREAD_EXIST",
  body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주세여",
  likes: 10,
  user: {
    ninkname: "멍멍냥",
    email: "test@gmail.com",
    image: cat,
    userStatus: "test",
    longitude: "37",
    latitude: "124",
    userRole: "test",
  },
  threadImages: [
    { image: cat, threadImageId: "1", threadImageStatus: "Test" },
    { image: pension1, threadImageId: "2", threadImageStatus: "Test" },
    { image: pension2, threadImageId: "3", threadImageStatus: "Test" },
  ],
  createdAt: "30분 전",
  updatedAt: "30분 전",
  replyList: [
    {
      replyId: "1",
      replyBody:
        "각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!",
      createdAt: "30분 전",
      user: {
        ninkname: "우리집댕댕이",
        email: "우리집댕댕이",
        image: cat,
        userStatus: "우리집댕댕이",
        longitude: "우리집댕댕이",
        latitude: "우리집댕댕이",
        userRole: "우리집댕댕이",
      },
    },
    {
      replyId: "2",
      replyBody:
        "각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!",
      createdAt: "30분 전",
      user: {
        ninkname: "우리집댕댕이",
        email: "우리집댕댕이",
        image: cat,
        userStatus: "우리집댕댕이",
        longitude: "우리집댕댕이",
        latitude: "우리집댕댕이",
        userRole: "우리집댕댕이",
      },
    },
    {
      replyId: "3",
      replyBody:
        "각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!",
      createdAt: "30분 전",
      user: {
        ninkname: "우리집댕댕이",
        email: "우리집댕댕이",
        image: cat,
        userStatus: "우리집댕댕이",
        longitude: "우리집댕댕이",
        latitude: "우리집댕댕이",
        userRole: "우리집댕댕이",
      },
    },
    {
      replyId: "4",
      replyBody:
        "각잡고 자르려고 하지 마시고, 아이들 편히 자고 있을 때 잘라보세요!",
      createdAt: "30분 전",
      user: {
        ninkname: "우리집댕댕이",
        email: "우리집댕댕이",
        image: cat,
        userStatus: "우리집댕댕이",
        longitude: "우리집댕댕이",
        latitude: "우리집댕댕이",
        userRole: "우리집댕댕이",
      },
    },
  ],
};
