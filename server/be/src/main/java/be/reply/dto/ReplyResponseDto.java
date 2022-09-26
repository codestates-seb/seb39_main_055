package be.reply.dto;

import be.reply.entity.Reply;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReplyResponseDto {

    private Long replyId;
    private Reply.ReplyStatus replyStatus;
    private String body;
    private UserResponseDto user;
    private Long threadId; // Reply 테이블에는 userId, threadId  2개의 외래키가 있는데...user는 ResponseDto로, thread는 Id로 하는 까닭은?
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
