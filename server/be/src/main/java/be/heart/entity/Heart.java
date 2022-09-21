package be.heart.entity;

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
@Table(name = "HEART")
public class Heart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private HeartStatus heartStatus = HeartStatus.HEART_EXIST;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "STORE_ID")
    private Store store;

    public enum HeartStatus{
        HEART_EXIST("존재하는 하트"),
        HEART_NOT_EXIST("존재하지 않는 하트");

        @Getter
        private String status;

        HeartStatus(String status) {
            this.status = status;
        }
    }
}
