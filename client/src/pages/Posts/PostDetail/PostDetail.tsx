import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { useParams } from "react-router-dom";

import { usePostDetail } from "../../../apis";
import {
  ButtonWhite,
  LoadingSpinner,
  LoginModal,
  NoResult,
  Slider,
  useModal,
} from "../../../components";
import { useAppSelector } from "../../../redux";
import PostForm from "./PostForm/PostForm";
import ReplyCard from "./ReplyCard/ReplyCard";
import {
  SBody,
  SButtonContainer,
  SCommentHeader,
  SContainer,
  SImageContainer,
  SLikeContainer,
  SListContainer,
  SLoadingContainer,
  SMainContainer,
} from "./style";
import UserCard from "./UserCard/UserCard";

const PostDetail = () => {
  const params = useParams();
  const { openModal } = useModal();
  const [isLike, setIsLike] = useState(false);
  const { userInfos, loginStatus } = useAppSelector((state) => state.user);

  const {
    data,
    isLoading,
    registerHeartMutate,
    cancelHeartMutate,
    registerReplyMutate,
    replyData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostDetail(Number(params.id));

  const handleHeartClick = () => {
    if (!loginStatus) {
      openModal(<LoginModal />);
      return;
    }

    if (!isLike) {
      registerHeartMutate(data?.threadId as number);
    } else {
      cancelHeartMutate(data?.threadId as number);
    }
  };

  useEffect(() => {
    if (data?.likesUserId.includes(userInfos?.userId as number)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [userInfos, data]);

  if (isLoading) {
    return (
      <SLoadingContainer>
        <LoadingSpinner />
      </SLoadingContainer>
    );
  }

  return (
    <SContainer>
      <SMainContainer>
        <h1>댕댕이숲</h1>
        <UserCard data={data} />
        {(data?.threadImages?.length as number) > 0 ? (
          <SImageContainer>
            <Slider
              imageList={data?.threadImages?.map((image) => image.image)}
            />
          </SImageContainer>
        ) : (
          <NoResult
            title="등록된 이미지가 없습니다."
            comment1="댕냥이 자랑, 고민거리, 산책친구 등"
            comment2="다양한 이야기를 댕댕이 숲에 외쳐보세요!"
          />
        )}
        <SBody>{parse(data?.body as string)}</SBody>
        <SLikeContainer isLike={isLike}>
          <HiOutlineHeart onClick={handleHeartClick} />
          <span>{data?.likesUserId.length}</span>
        </SLikeContainer>
      </SMainContainer>
      <SCommentHeader>
        <span>댓글</span>
        <span>{data?.replies.pageInfo.totalElements}</span>
      </SCommentHeader>
      <PostForm
        isEdit={false}
        submitCallback={(body) =>
          registerReplyMutate({ postId: Number(params.id), body })
        }
      />
      <SListContainer>
        {replyData?.pages.map((page) => {
          return page?.data.replies.data.map((data) => (
            <ReplyCard key={data.replyId} reply={data} />
          ));
        })}
      </SListContainer>
      {hasNextPage && (
        <SButtonContainer>
          <ButtonWhite onClick={fetchNextPage} isPending={isFetchingNextPage}>
            더 보기
          </ButtonWhite>
        </SButtonContainer>
      )}
    </SContainer>
  );
};

export default PostDetail;
