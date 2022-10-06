package be.review.dto;

import be.review.entity.Review;
import be.store.dto.StoreResponseDto;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Review.ReviewStatus reviewStatus;
    private UserResponseDto user;
    private Long storeId;
    private String body;
    private Integer score;
}
