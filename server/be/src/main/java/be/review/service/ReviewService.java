package be.review.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.review.entity.Review;
import be.review.repository.ReviewRepository;
import be.store.entity.Store;
import be.store.repository.StoreRepository;
import be.user.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public Review createReview(Review review){
        verifyExistReview(review.getUser(),review.getStore());//중복 리뷰인지 확인(리뷰어는 하나의 스토어에 대해 단 하나의 리뷰만 달 수 있음)

        return reviewRepository.save(review);
    }

    @Transactional
    public Review updateReview(Review review){
        Review findReview = findVerifiedReview(review.getReviewId());//만약 리뷰가 DB에 없거나 삭제된 리뷰면 예외 발생

        Optional.ofNullable(review.getUpdatedAt())//업데이트 날짜수정
                .ifPresent(reviewUpdatedAt -> findReview.setUpdatedAt(reviewUpdatedAt));

        Optional.ofNullable(review.getReviewStatus())//리뷰 삭제
                .ifPresent(reviewStatus -> findReview.setReviewStatus(reviewStatus));

        return findReview;
    }

    private void verifyExistReview(User user, Store store){ //중복 리뷰인지 확인(리뷰어는 하나의 스토어에 대해 단 하나의 리뷰만 달 수 있음)
        Optional<Review> review = reviewRepository.findByUserAndStoreAndReviewStatus(user,store, Review.ReviewStatus.REVIEW_EXIST);
        if(review.isPresent()){ //중복 리뷰일 시 예외처리
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_REVIEWER);
        }
    }
    public User findUserAtReview(long reviewId){//해당 리뷰의 주인 유저 반환
        Review findReview = findVerifiedReview(reviewId);// 만약 리뷰가 DB에 없거나 삭제된 리뷰이면 예외발생
        return findReview.getUser();
    }
    public Review findVerifiedReview(long reviewId){
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);

        Review findReview = optionalReview.orElseThrow(()-> //만일 db에 저장된 스토어 정보 없으면 예외발생
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        if(findReview.getReviewStatus() == Review.ReviewStatus.REVIEW_NOT_EXIST){// 만일 삭제된 리뷰라면 예외발생
            throw new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND);
        }

        return findReview;
    }
}
