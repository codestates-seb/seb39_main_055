package be.thread.mapper;

import be.thread.dto.ThreadImagePostDtos;
import be.thread.dto.ThreadImageResponseDtos;
import be.thread.dto.ThreadPostDto;
import be.thread.dto.ThreadResponseDto;
import be.thread.entity.Thread;
import be.thread.entity.ThreadImage;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ThreadMapper {

    default Thread threadPostDtoToThread(UserService userService, ThreadPostDto threadPostDto) {
        Thread thread = new Thread();

        thread.setLikes(0); // thread 생성되는 순간, 좋아요(likes)는 당연히 0개

        // 하나의 thread에 1장 or 여러 장의 image를 올릴 수도 있고, image 업로드 없이 thread를 등록할 수도 있다.
        if(threadPostDto.getThreadImages() == null) {
            System.out.printf("첨부된 사진이 없음");
        } else {
            List<ThreadImage> threadImages = threadImagePostDtosToThreadImages(threadPostDto.getThreadImages(), thread);
            thread.setThreadImages(threadImages);
        }

        thread.setBody(threadPostDto.getBody());
        thread.setUser(userService.getLoginUser());

        return thread;
    }

    default List<ThreadImage> threadImagePostDtosToThreadImages(List<ThreadImagePostDtos> threadImagePostDtos, Thread thread) {
        return threadImagePostDtos.stream().map(threadImagePostDto -> {
            ThreadImage threadImage = new ThreadImage();
            threadImage.addThread(thread); // thread가 생성되어야만 threadImage를 업로드 할 수 있으니까?
            threadImage.setImage(threadImagePostDto.getImage());
            return threadImage;
        }).collect(Collectors.toList());
    }

    default ThreadResponseDto threadToThreadResponseDto(UserMapper userMapper, Thread thread) {

        ThreadResponseDto threadResponseDto = new ThreadResponseDto();

        // threadImage 추가. 단, 이미지가 없으면 본문(body)만 response로 전달되어야 함.
        List<ThreadImage> threadImages = thread.getThreadImages();
        threadResponseDto.setThreadImages(threadImagesToThreadImageResponseDtos(thread.getThreadImages()));

        // Thread -> ThreadResponseDto
        threadResponseDto.setThreadId(thread.getThreadId());
        threadResponseDto.setThreadStatus(thread.getThreadStatus());
        threadResponseDto.setBody(thread.getBody());
        threadResponseDto.setLikes(thread.getLikes());

        // thread 작성자 추가
        User user = thread.getUser();
        threadResponseDto.setUser(userMapper.userToUserResponseDto(user));

        // 작성일자, 수정일자 추가
        threadResponseDto.setCreatedAt(thread.getCreatedAt());
        threadResponseDto.setUpdatedAt(thread.getUpdatedAt());

        return threadResponseDto;
    }

    default List<ThreadImageResponseDtos> threadImagesToThreadImageResponseDtos(List<ThreadImage> threadImages) {
        return threadImages
                .stream()
                .map(threadImage -> ThreadImageResponseDtos
                        .builder()
                        .threadImageId(threadImage.getThreadImageId())
                        .image(threadImage.getImage())
                        .threadImageStatus(threadImage.getThreadImageStatus())
                        .build())
                .collect(Collectors.toList());
    }
}
