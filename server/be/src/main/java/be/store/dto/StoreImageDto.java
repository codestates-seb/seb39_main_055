package be.store.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class StoreImageDto {

    @NotBlank(message = "이미지 url을 기입해주세요")
    private String storeImage;

}
