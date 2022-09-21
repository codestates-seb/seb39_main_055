package be.thread.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
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

    private List<ThreadImagePostDtos> threadImages;
}
