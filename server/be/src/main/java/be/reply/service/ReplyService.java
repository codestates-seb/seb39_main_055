package be.reply.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.likes.repository.LikesRepository;
import be.reply.entity.Reply;
import be.reply.repository.ReplyRepository;
import be.thread.entity.Thread;
import be.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final LikesRepository likesRepository;

    /**
     * Reply 작성
     */
    @Transactional
    public Reply createReply(Reply reply) {
        // 같은 내용의 Reply가 있어도 괜찬다. 또한 동일 유저가 하나의 thread에 대해 여러 개의 댓글을 달아도 괜찮다. (댓글이 일종의 문답 기능을 할 수 있기 때문에)

        return replyRepository.save(reply);
    }

    /**
     * Reply 수정
     */
    @Transactional
    public Reply updateReply(Reply reply) {
        Reply findReply = findVerifiedReply(reply.getReplyId()); // reply가 DB에 없으면 예외처리.

        log.info("댓글 존재함 {}", reply.getReplyId().toString());

        Optional.ofNullable(reply.getBody())
                .ifPresent(replyBody -> findReply.setBody(replyBody)); // 댓글 내용 수정

        Optional.ofNullable(reply.getUpdatedAt())
                .ifPresent(replyUpdateAt -> findReply.setUpdatedAt(replyUpdateAt)); // 업데이트 날짜 수정

        Optional.ofNullable(reply.getReplyStatus())
                .ifPresent(replyStatus -> findReply.setReplyStatus(replyStatus)); // 댓글 삭제 (실제 삭제가 아니라 replyStatus 변경)

        return findReply;
    }

    /**
     * reply가 DB에 없으면 예외 처리. 있다면 해당 reply 리턴.
     */
    public Reply findVerifiedReply(long replyId) {
        Optional<Reply> optionalReply = replyRepository.findById(replyId);

        // DB에 저장된 댓글이 없으면 예외 발생
        Reply findReply = optionalReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));

        // 만일 삭제된 댓글일 경우, 예외 발생
        if(findReply.getReplyStatus()==Reply.ReplyStatus.REPLY_NOT_EXIST) {
            throw new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND);
        }

        return findReply;
    }

    /**
     * reply가 DB에 있다면, 해당 reply 작성 유저 반환.
     * DB에 없다면 예외처리.
     */
    public User findReplyUser(long replyId) {
        Reply findReply = findVerifiedReply(replyId);
        return findReply.getUser();
    }

    /**
     * reply 삭제 (존재하지 않음 상태로 변경)
     */
    @Transactional
    public Reply deleteReply(Reply reply) {
        Reply findReply = findVerifiedReply(reply.getReplyId()); // reply가 DB에 없으면 예외처리.

        // replyId로 reply를 불러와서 replyStatus를 '존재하지 않음' 상태로 변경.
        findReply.setReplyStatus(Reply.ReplyStatus.REPLY_NOT_EXIST);

        return findReply;
    }

    public Page<Reply> findExistRepliesToPaginationAndSort(
            Thread thread, Integer replyPage, Integer replySize, String replySort) { // thread의 reply중 status가 true인 것만 페이지네이션 정렬해서 반환
        Page<Reply> findReplies = replyRepository.findByThreadAndReplyStatus(
                PageRequest.of(replyPage-1, replySize, Sort.by(replySort).descending()),
                thread, Reply.ReplyStatus.REPLY_EXIST
        );
        return findReplies;
    }

    public List<Reply> findExistReplies(List<Reply> replies) { // reply중 status가 true인 것만 반환
        return replies.stream().map(reply -> replyRepository.findByReplyIdAndReplyStatus(
                reply.getReplyId(), Reply.ReplyStatus.REPLY_EXIST)).collect(Collectors.toList());
    }

}
