package be.store.dto;

import be.store.entity.StoreImage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreImageResponseDto {
    private StoreImage.StoreImageStatus storeImageStatus;
    private String storeImage;
}
