package be.thread.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ThreadImagePostDtos {

    @Positive
    private Long threadImageId;

    private String image;
}
