package be.review.mapper;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.review.dto.ReviewPatchDto;
import be.review.dto.ReviewPostDto;
import be.review.dto.ReviewResponseDto;
import be.review.entity.Review;
import be.review.service.ReviewService;
import be.store.dto.StoreResponseDto;
import be.store.entity.Store;
import be.store.mapper.StoreMapper;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface ReviewMapper {

    default Review reviewPostDtoToReview(StoreService storeService, UserService userService, long storeId, ReviewPostDto reviewPostDto){
        Review review = new Review();

        Store store = storeService.findVerifiedStore(storeId);
        User user = userService.getLoginUser();

        System.out.println("로그인한 유저:"+user.getUserId());
        System.out.println("상점 주인:"+store.getUser().getUserId());
        if(store.getUser() == user){// 만약 스토어 주인이 본인 스토어에 리뷰 달면 에외처리
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_REVIEWER);
        }

        review.setBody(reviewPostDto.getBody());
        review.setScore(reviewPostDto.getScore());
        review.setStore(store);
        review.setUser(user);

        return review;
    }

    default ReviewResponseDto reviewToReviewResponseDto(UserMapper userMapper,Review review){

        ReviewResponseDto reviewResponseDto = new ReviewResponseDto();
        reviewResponseDto.setReviewId(review.getReviewId());
        reviewResponseDto.setCreatedAt(review.getCreatedAt());
        reviewResponseDto.setUpdatedAt(review.getUpdatedAt());
        reviewResponseDto.setReviewStatus(review.getReviewStatus());
        reviewResponseDto.setBody(review.getBody());
        reviewResponseDto.setScore(review.getScore());
        reviewResponseDto.setStoreId(review.getStore().getStoreId());
        System.out.println(review.getStore().getStoreId());

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(review.getUser());
        reviewResponseDto.setUser(userResponseDto);



        return reviewResponseDto;
    }

    default List<ReviewResponseDto> reviewsToReviewResponseDtos(UserMapper userMapper,List<Review> reviews){
        return reviews.stream().map(review -> reviewToReviewResponseDto(userMapper,review)).collect(Collectors.toList());
    };

    default Review reviewPatchDtoToReview(ReviewService reviewService, UserService userService, long reviewId, ReviewPatchDto reviewPatchDto){
        if(userService.getLoginUser()!=reviewService.findUserAtReview(reviewId)){
            //접근 유저가 적은 리뷰가 아니므로 수정 삭제 불가
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_REVIEWER);
        }
        Review review = new Review();

        review.setReviewId(reviewId);
        review.setReviewStatus(reviewPatchDto.getReviewStatus());

        return review;
    }


}
