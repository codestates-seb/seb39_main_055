package be.thread.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class ThreadPostDto {


    @NotBlank(message = "내용을 입력해 주세요.")
    private String body;

    private List<ThreadImageDto> threadImages;
}
