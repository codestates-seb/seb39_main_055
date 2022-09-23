import cat from "../../../assets/images/animal/cat.jpg";

interface PostData {
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
}

export const postData: PostData[] = [
  {
    threadId: "1",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "2",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "3",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "4",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "5",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "6",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "7",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "8",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "9",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
  {
    threadId: "10",
    threadStatus: "THREAD_EXIST",
    body: "발톱전용으로 하는데 너무 힘들어서 조언 부탁드려요 ㅠㅠㅠㅠ 어디까지 잘라야하는지 모르겠어요 초보 집사여서ㅠㅠㅠㅠㅠㅠㅠ 어떻게 잡고 어떻게 잘라야 하는지 친절히 알려주실 분 댓글 달아주시면 ...",
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
    ],
    createdAt: "30분 전",
    updatedAt: "30분 전",
  },
];
