package be.thread.entity;

import be.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "THREAD_IMAGE")
public class ThreadImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long threadImageId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private ThreadImageStatus threadImageStatus = ThreadImageStatus.THREAD_IMAGE_EXIST;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String image;

    @ManyToOne
    @JoinColumn(name = "THREAD_ID")
    private Thread thread;

    public void addThread(Thread thread) {
        this.thread = thread;
    }

    public enum ThreadImageStatus {
        THREAD_IMAGE_EXIST("존재하는 사진"),
        THREAD_IMAGE_NOT_EXIST("존재하지 않는 사진");

        @Getter
        private String status;

        ThreadImageStatus(String status) {
            this.status = status;
        }
    }
}
