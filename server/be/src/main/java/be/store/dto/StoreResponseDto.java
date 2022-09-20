package be.store.dto;

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

}
