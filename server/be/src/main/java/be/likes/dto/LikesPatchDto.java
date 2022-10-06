package be.likes.dto;

import be.likes.entity.Likes;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LikesPatchDto {

    @NotNull(message = "좋아요를 취소하려는 댕댕이숲 게시글의 ID를 입력해주세요.")
    private Long threadId;

    @NotNull(message = "LIKES_NOT_EXIST를 입력해주세요.")
    private Likes.LikesStatus likesStatus;
}
