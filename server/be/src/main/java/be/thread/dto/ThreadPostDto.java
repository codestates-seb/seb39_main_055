package be.thread.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
public class ThreadPostDto {

    @Positive
    private Long threadId;

    @NotBlank(message = "내용을 입력해 주세요.")
    @Size(min = 10, message = "내용은 10자 이상 입력해 주세요.")
    private String body;

    // threadImage는 필수로 안 해도 괜찮지 않을까?
    @NotEmpty(message = "당신의 반려동물 사진을 올려주세요~ ^^")
    private List<ThreadImagePostDtos> threadImages;
}
