package be.reply.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class ReplyPostDto {

    @Positive
    private Long replyId;

    @NotBlank(message = "내용을 입력해 주세요.")
    private String body;
}
