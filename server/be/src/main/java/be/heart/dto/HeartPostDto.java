package be.heart.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class HeartPostDto {

    @NotNull(message = "가게 Id를 입력해주세요.")
    private Long storeId;
}
