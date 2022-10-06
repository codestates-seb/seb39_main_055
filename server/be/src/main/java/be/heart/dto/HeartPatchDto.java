package be.heart.dto;

import be.heart.entity.Heart;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class HeartPatchDto {

    //하트 취소
    @NotNull(message = "하트를 취소하고자 하는 가게 ID를 입력해주세요")
    private Long storeId;

    @NotNull(message = "HEART_NOT_EXIST 를 입력해주세요")
    private Heart.HeartStatus heartStatus;
}
