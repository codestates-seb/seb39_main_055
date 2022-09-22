package be.thread.entity;

import be.audit.BaseEntity;
import be.heart.entity.Heart;
import be.reply.entity.Reply;
import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "THREAD")
public class Thread extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long threadId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private ThreadStatus threadStatus = ThreadStatus.THREAD_EXIST;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String body;

    @Column(nullable = false)
    private Integer likes;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<ThreadImage> threadImages;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Reply> replies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public enum ThreadStatus {
        THREAD_EXIST("존재하는 글"),
        THREAD_NOT_EXIST("존재하지 않는 글");

        @Getter
        private String status;

        ThreadStatus(String status) {
            this.status = status;
        }
    }
}
