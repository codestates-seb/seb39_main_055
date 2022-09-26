package be.store.dto;

import be.heart.dto.HeartResponseDto;
import be.review.dto.ReviewResponseDto;
import be.store.entity.Store;
import be.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class StoreResponseDto {
    private Long storeId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Store.StoreStatus storeStatus;
    private String category;
    private Double longitude;
    private Double latitude;
    private String storeName;
    private String addressName;
    private String body;
    private String phone;
    private String homepage;
    private UserResponseDto user;
    private List<StoreImageResponseDto> storeImages;

    //리뷰추가
    private List<ReviewResponseDto> reviews;

    //해당 store를 heart누른 유저id 추가 // 클라이언트에서 해당 유저가 하트를 눌렀으면 하트를 눌렀다는 표시를 해주어야 하기 때문에 추가
    private List<Long> heartUserId;

}
