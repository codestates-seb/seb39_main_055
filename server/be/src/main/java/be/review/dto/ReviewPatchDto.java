package be.review.dto;

import be.review.entity.Review;
import lombok.Getter;

@Getter
public class ReviewPatchDto {

    //리뷰 삭제
    private Review.ReviewStatus reviewStatus;

    //리뷰 수정
    private String body;
    private Integer score;
}
