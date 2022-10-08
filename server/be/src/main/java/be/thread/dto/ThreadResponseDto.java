package be.thread.dto;

import be.reply.dto.ReplyResponseDto;
import be.thread.entity.Thread;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ThreadResponseDto {

    private Long threadId;
    private Thread.ThreadStatus threadStatus;
    private String body;
    //    private int likes;
    private UserResponseDto user;
    private List<ThreadImageResponseDtos> threadImages;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 댓글 추가
    private List<ReplyResponseDto> replies;

    // thread에 좋아요 누른 유저 id 추가.
    private List<Long> likesUserId;

}