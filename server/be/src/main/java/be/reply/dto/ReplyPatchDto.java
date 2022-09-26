package be.reply.dto;

import be.reply.entity.Reply;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyPatchDto {

    private String body;
    private Reply.ReplyStatus replyStatus;
}

