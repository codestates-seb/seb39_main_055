package be.review.entity;

import be.audit.BaseEntity;
import be.store.entity.Store;
import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "REVIEW")
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private ReviewStatus reviewStatus = ReviewStatus.REVIEW_EXIST;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String body;

    @Column(nullable = false)
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_ID")
    private Store store;

    public enum ReviewStatus {
        REVIEW_EXIST("존재하는 후기"),
        REVIEW_NOT_EXIST("존재하지 않는 후기");

        @Getter
        private String status;

        ReviewStatus(String status) {
            this.status = status;
        }
    }
}
