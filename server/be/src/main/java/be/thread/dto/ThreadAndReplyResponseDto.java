package be.thread.dto;

import be.reply.dto.ReplyResponseDto;
import be.response.MultiResponseDto;
import be.thread.entity.Thread;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class ThreadAndReplyResponseDto {

    private Long threadId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Thread.ThreadStatus threadStatus;
    private String body;
    private UserResponseDto user;
    private List<ThreadImageResponseDtos> threadImages;

    // 댓글 추가
    private MultiResponseDto<ReplyResponseDto> replies;

    // 해당 thread를 likes누른 유저id 추가 // 클라이언트에서 해당 유저가 좋아요를 눌렀으면 좋아요를 눌렀다는 표시를 해주어야 하기 때문에 추가
    private List<Long> likesUserId;

}
