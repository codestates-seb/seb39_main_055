package be.store.entity;

import be.audit.BaseEntity;
import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "STORE")
public class Store extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private StoreStatus storeStatus = StoreStatus.STORE_EXIST;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String addressName;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String body;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String homepage;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    public enum StoreStatus {
        STORE_EXIST("존재하는 장소"),
        STORE_NOT_EXIST("존재하지 않는 장소");

        @Getter
        private String status;

        StoreStatus(String status) {
            this.status = status;
        }
    }
}
