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

    private void verifyExistReview(User user, Store store){ //중복 리뷰인지 확인(리뷰어는 하나의 스토어에 대해 단 하나의 리뷰만 달 수 있음)
        Optional<Review> review = reviewRepository.findByUserAndStoreAndReviewStatus(user,store, Review.ReviewStatus.REVIEW_EXIST);
        if(review.isPresent()){ //중복 리뷰일 시 예외처리
            System.out.println("여기라고?");
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_REVIEWER);
        }
    }
}
