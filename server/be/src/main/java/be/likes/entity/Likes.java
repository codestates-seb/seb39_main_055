package be.likes.entity;

import be.audit.BaseEntity;
import be.thread.entity.Thread;
import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Likes extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likesId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private Likes.LikesStatus likesStatus = Likes.LikesStatus.LIKES_EXIST;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Thread_ID")
    private Thread thread;

    public enum LikesStatus {
        LIKES_EXIST("존재하는 like"),
        LIKES_NOT_EXIST("존재하지 않는 like");

        @Getter
        private String status;

        LikesStatus(String status) {
            this.status = status;
        }
    }

}
