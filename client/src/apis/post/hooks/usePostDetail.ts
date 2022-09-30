import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import {
  cancelPostHeart,
  getInfiniteReply,
  getPostDetail,
  registerPostHeart,
  registerReply,
} from "../post";

export const usePostDetail = (postId: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["post", postId], () =>
    getPostDetail(postId)
  );

  const { mutate: registerHeartMutate } = useMutation(registerPostHeart, {
    onSuccess: () => queryClient.invalidateQueries(["post", postId]),
  });

  const { mutate: cancelHeartMutate } = useMutation(cancelPostHeart, {
    onSuccess: () => queryClient.invalidateQueries(["post", postId]),
  });

  const { mutate: registerReplyMutate } = useMutation(registerReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId]);
      queryClient.invalidateQueries(["reply", postId]);
    },
  });

  const {
    data: replyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["reply", postId],
    ({ pageParam = 1 }) => getInfiniteReply(postId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { totalPages } = lastPage.data.replies.pageInfo;
        if (lastPage.nextPage <= totalPages) {
          return lastPage.nextPage;
        }
        return undefined;
      },
    }
  );

  return {
    data,
    isLoading,
    registerHeartMutate,
    cancelHeartMutate,
    registerReplyMutate,
    replyData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
