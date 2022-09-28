package be.likes.dto;

import be.likes.entity.Likes;
import be.thread.dto.ThreadResponseDto;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class LikesResponseDto {

    private long likesId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Likes.LikesStatus likesStatus;
    private UserResponseDto user;
    private ThreadResponseDto thread;
}
