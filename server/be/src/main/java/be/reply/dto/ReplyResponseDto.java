package be.reply.dto;

import be.reply.entity.Reply;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReplyResponseDto {
    private Long replyId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Reply.ReplyStatus replyStatus;
    private UserResponseDto user;
    private Long threadId;
    private String body;
}

