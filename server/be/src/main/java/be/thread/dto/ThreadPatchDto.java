package be.thread.dto;

import be.thread.entity.Thread;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ThreadPatchDto {

    private long threadId;
    private String body;
    private List<ThreadImageDtos> threadImages;
    private Thread.ThreadStatus threadStatus;

}
