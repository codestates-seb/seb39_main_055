package be.reply.entity;

import be.audit.BaseEntity;
import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import be.thread.entity.Thread;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "REPLY")
public class Reply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private ReplyStatus replyStatus = ReplyStatus.REPLY_EXIST;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String body;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "THREAD_ID")
    private Thread thread;

    public enum ReplyStatus {
        REPLY_EXIST("존재하는 댓글"),
        REPLY_NOT_EXIST("존재하지 않는 댓글");

        @Getter
        private String status;

        ReplyStatus(String status) {
            this.status = status;
        }
    }


}
