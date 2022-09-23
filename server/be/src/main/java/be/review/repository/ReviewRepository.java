package be.review.repository;

import be.review.entity.Review;
import be.store.entity.Store;
import be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByUserAndStoreAndReviewStatus(User user, Store store, Review.ReviewStatus reviewStatus);
}
