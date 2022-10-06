package be.reply.mapper;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.reply.dto.ReplyPatchDto;
import be.reply.dto.ReplyPostDto;
import be.reply.dto.ReplyResponseDto;
import be.reply.entity.Reply;
import be.reply.service.ReplyService;
import be.thread.entity.Thread;
import be.thread.service.ThreadService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReplyMapper {

    default Reply replyPostDtoToReply(ThreadService threadService, UserService userService, long threadId, ReplyPostDto replyPostDto) {
        Reply reply = new Reply();

        Thread thread = threadService.findVerifiedThread(threadId); // 존재하지 않는 thread라면 예외 처리
        User user = userService.getLoginUser(); // 로그인한 유저인지 확인.

        reply.setBody(replyPostDto.getBody());
        reply.setThread(thread);
        reply.setUser(user);

        return reply;
    }

    default ReplyResponseDto replyToReplyResponseDto(UserMapper userMapper, Reply reply) {
        ReplyResponseDto replyResponseDto = new ReplyResponseDto();
        replyResponseDto.setReplyId(reply.getReplyId());
        replyResponseDto.setReplyStatus(reply.getReplyStatus());
        replyResponseDto.setBody(reply.getBody());
        replyResponseDto.setThreadId(reply.getThread().getThreadId());
        replyResponseDto.setCreatedAt(reply.getCreatedAt());
        replyResponseDto.setUpdatedAt(reply.getUpdatedAt());

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(reply.getUser());
        replyResponseDto.setUser(userResponseDto);

        return replyResponseDto;
    }

    default Reply replyPatchDtoToReply(
            ReplyService replyService, UserService userService, long replyId, ReplyPatchDto replyPatchDto) {

        // 로그인 유저 = reply 작성유저가 아니라면, 예외 처리. (수정 권한이 없기 때문에)
        if(userService.getLoginUser() != replyService.findReplyUser(replyId)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }

        Reply reply = new Reply();
        reply.setReplyId(replyId);
        reply.setBody(replyPatchDto.getBody());
        reply.setReplyStatus(replyPatchDto.getReplyStatus());

        return reply;
    }

    default List<ReplyResponseDto> repliesToReplyResponseDtos(UserMapper userMapper, List<Reply> replies) {
        // 모든 댓글만 가지고 ReplyResponseDtos반환
        return replies.stream()
                .filter(reply -> reply != null)
                .map(reply -> replyToReplyResponseDto(userMapper, reply))
                .collect(Collectors.toList());
    }

    default List<ReplyResponseDto> repliesToExistReplyResponseDtos(ReplyService replyService,
                                                                   UserMapper userMapper,
                                                                   List<Reply> replies) {
        // 존재하는 댓글(REPLY_EXIST 상태)만 ReplyResponseDtos로 반환
        if(replies == null) {
            System.out.println("댓글 상태가 REPLY_EXIST 또는 REPLY_NOT_EXIST 인지 상관 없이 DB에 존재하지 않습니다");
            return new ArrayList<>();
        } else {
            replies = replyService.findExistReplies(replies); // reply 중 status가 REPLY_EXIST인 것만 반환
            return replies.stream()
                    .filter(reply -> reply != null)
                    .map(reply -> replyToReplyResponseDto(userMapper, reply))
                    .collect(Collectors.toList());
        }
    }

}

