package be.likes.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LikesPostDto {

    @NotNull(message = "댕댕이숲 게시글 Id를 입력해주세요.")
    private Long threadId;
}
