package be.store.entity;

import be.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "STORE_IMAGE")
public class StoreImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeImageId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name ="STATUS")
    private StoreImageStatus storeImageStatus = StoreImageStatus.STORE_IMAGE_EXIST;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String image;

    @ManyToOne
    @JoinColumn(name = "STORE_ID")
    private Store store;

    public enum StoreImageStatus {
        STORE_IMAGE_EXIST("존재하는 장소 사진"),
        STORE_IMAGE_NOT_EXIST("존재하지 않는 장소 사진");

        @Getter
        private String status;

        StoreImageStatus(String status) {
            this.status = status;
        }
    }
}
