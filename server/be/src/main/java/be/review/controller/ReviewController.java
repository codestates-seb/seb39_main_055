package be.review.controller;

import be.response.SingleResponseDto;
import be.review.dto.ReviewPostDto;
import be.review.entity.Review;
import be.review.mapper.ReviewMapper;
import be.review.service.ReviewService;
import be.store.entity.StoreImage;
import be.store.mapper.StoreMapper;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/v1")
@Validated
@Slf4j
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper mapper;
    private final StoreService storeService;
    private final UserService userService;
    private final UserMapper userMapper;
    private final StoreMapper storeMapper;
    private final StoreImageService storeImageService;

    /**
     * 리뷰작성 API
     * **/
    @PostMapping("/user/review/write")
    public ResponseEntity postReview(@Positive @RequestParam("store-id") long storeId,
                                     @Valid @RequestBody ReviewPostDto reviewPostDto){
        Review review = reviewService.createReview(
                mapper.reviewPostDtoToReview(storeService,userService,storeId,reviewPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reviewToReviewResponseDto(userMapper,review)), HttpStatus.CREATED);
    }


}
