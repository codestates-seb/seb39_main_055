package be.thread.dto;

import be.thread.entity.ThreadImage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

//@Builder // 이걸 삭제하면 ThreadMapper에서 List<ThreadImageResponseDtos>를 builder로 구현할 수 없다. 이유를 명확히 확인할 것.
@Getter
@Setter
public class ThreadImageResponseDtos {

    private Long threadImageId;
    private String threadImage;
    private ThreadImage.ThreadImageStatus threadImageStatus;

}
