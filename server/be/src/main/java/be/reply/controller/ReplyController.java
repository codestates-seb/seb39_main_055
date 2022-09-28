package be.reply.controller;

import be.reply.dto.ReplyPatchDto;
import be.reply.dto.ReplyPostDto;
import be.reply.entity.Reply;
import be.reply.mapper.ReplyMapper;
import be.reply.service.ReplyService;
import be.response.SingleResponseDto;
import be.thread.service.ThreadService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/v1")
@Validated
@AllArgsConstructor
@Slf4j
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyMapper replyMapper;
    private final UserService userService;
    private final UserMapper userMapper;
    private final ThreadService threadService;

    /**
     * 댕댕이숲 댓글(reply) 작성 API
     */
    @PostMapping("/user/reply/write")
    public ResponseEntity postReply(@Positive @RequestParam("thread-id") long threadId,
                                    @Valid @RequestBody ReplyPostDto replyPostDto) {
        // Request를 처리하기 위한 객체 생성. / 객체를 생성하는 메서드는 replyService에서 정의, 생성 메서드의 매개변수 생성은 mapper에서 만든다.
        Reply reply = replyService.createReply(
                replyMapper.replyPostDtoToReply(threadService, userService, threadId, replyPostDto)); // '특정' 유저의 '작성' 정보

        // 생성된 객체를 처리하여 Response 반환
        return new ResponseEntity<>(
                new SingleResponseDto<>(replyMapper.replyToReplyResponseDto(userMapper, reply)),
                HttpStatus.CREATED);
    }

    /**
     * 댕댕이숲 댓글(reply) 수정 API
     */
    @PatchMapping("/user/reply/{reply-id}")
    public ResponseEntity patchReply(@PathVariable("reply-id") @Positive @NotNull long replyId,
                                     @Valid @RequestBody ReplyPatchDto replyPatchDto) {
        Reply reply = replyMapper.replyPatchDtoToReply(replyService, userService, replyId, replyPatchDto);
        Reply updatedReply = replyService.updateReply(reply);

        return new ResponseEntity<>(
                new SingleResponseDto<>(replyMapper.replyToReplyResponseDto(userMapper, updatedReply)),
                HttpStatus.OK);
    }

    /**
     * 댕댕이숲 댓글(reply) 삭제 API
     */
    @PatchMapping("/user/reply/delete/{reply-id}")
    public ResponseEntity deleteReply(@PathVariable("reply-id") @Positive @NotNull long replyId,
                                      @Valid @RequestBody ReplyPatchDto replyPatchDto) {
        // 실제로 삭제하는 것이 아니라 replyStatus를 REPLY_NOT_EXIST로 변경하는 것.
        Reply reply = replyMapper.replyPatchDtoToReply(replyService, userService, replyId, replyPatchDto);
        Reply deletedReply = replyService.deleteReply(reply);

        return new ResponseEntity<>(
                new SingleResponseDto<>(replyMapper.replyToReplyResponseDto(userMapper, deletedReply)),
                HttpStatus.OK);
    }

}

