package be.thread.dto;

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
    private int likes;
    private UserResponseDto user;
    private List<ThreadImageResponseDtos> threadImages;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
