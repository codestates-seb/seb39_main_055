package be.thread.dto;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

@Getter
public class ThreadImagePostDtos {

    @Positive
    private Long threadImageId;

    @NotEmpty(message = "당신의 반려동물 사진을 올려주세요~")
    private String image;
}

