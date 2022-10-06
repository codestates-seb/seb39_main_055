package be.review.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class ReviewPostDto {

    @NotBlank(message = "리뷰 내용을 적어주세요")
    private String body;

    @NotNull(message = "별점을 입력해주세요")
    private Integer score;

}
