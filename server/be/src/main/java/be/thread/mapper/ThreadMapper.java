package be.thread.mapper;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.likes.entity.Likes;
import be.likes.service.LikesService;
import be.reply.dto.ReplyResponseDto;
import be.reply.entity.Reply;
import be.reply.mapper.ReplyMapper;
import be.reply.service.ReplyService;
import be.response.MultiResponseDto;
import be.store.entity.StoreImage;
import be.thread.dto.*;
import be.thread.entity.Thread;
import be.thread.entity.ThreadImage;
import be.thread.service.ThreadImageService;
import be.thread.service.ThreadService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ThreadMapper {

    default Thread threadPostDtoToThread(UserService userService, ThreadPostDto threadPostDto) {
        Thread thread = new Thread();


        // 하나의 thread에 1장 or 여러 장의 image를 올릴 수도 있고, image 업로드 없이 thread를 등록할 수도 있다.
        if(threadPostDto.getThreadImages() == null) {
            System.out.printf("첨부된 사진이 없음");
        } else {
            List<ThreadImage> threadImages = threadImageDtosToThreadImages(threadPostDto.getThreadImages(), thread);
            thread.setThreadImages(threadImages);
        }

        thread.setBody(threadPostDto.getBody());
        thread.setUser(userService.getLoginUser());

        return thread;
    }

    default List<ThreadImage> threadImageDtosToThreadImages(List<ThreadImageDto> threadImageDtos, Thread thread) {
        return threadImageDtos.stream().map(threadImageDto -> {
            ThreadImage threadImage = new ThreadImage();
            threadImage.addThread(thread); // thread가 생성되어야만 threadImage를 업로드 할 수 있으니까?
            threadImage.setImage(threadImageDto.getImage());
            return threadImage;
        }).collect(Collectors.toList());
    }

    default Thread threadPatchDtoToThread(ThreadService threadService, UserService userService,long threadId, ThreadPatchDto threadPatchDto) {

        // 로그인 유저 = thread를 작성한 유저가 아니라면, 예외 처리. (수정 권한이 없기 때문에)
        if(userService.getLoginUser().getUserId() != threadService.findThreadUser(threadId).getUserId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }

        Thread thread = new Thread();
        thread.setThreadId(threadId);

        thread.setBody(threadPatchDto.getBody()); // thread 본문 수정


        // changing from StoreImageDto to StoreImage
        if(threadPatchDto.getThreadImages()==null){
            System.out.printf("이미지 아무것도 안들어옴!!");
        }else{//이미지 한개 이상 들어왔을 때 -> 해당 이미지들을 Store객체에 넣어준다.
            List<ThreadImage> threadImages = threadImageDtosToThreadImage(threadPatchDto.getThreadImages(),thread);
            thread.setThreadImages(threadImages);
        }
//        // thread 수정 시, 첨부된 이미지가 하나도 없다면 -> 빈 ArrayList 반환
//        if(threadPatchDto.getThreadImages() == null) {
//            threadPatchDto.setThreadImages(new ArrayList<>());
//        }
//        // thread 수정 시, 첨부된 이미지가 하나 이상 있다면 -> 해당 이미지를 등록
//        List<ThreadImage> threadImages = threadImageDtosToThreadImage(threadPatchDto.getThreadImages(), thread);
//        thread.setThreadImages(threadImages);

        thread.setThreadStatus(threadPatchDto.getThreadStatus());

        return thread;
    }

    default List<ThreadImage> threadImageDtosToThreadImage(List<ThreadImageDto> threadImageDtos, Thread thread) {
        //
        return threadImageDtos.stream().map(threadImageDto -> {
            ThreadImage threadImage = new ThreadImage();
            threadImage.addThread(thread);
            threadImage.setImage(threadImageDto.getImage());
            return threadImage;
        }).collect(Collectors.toList());
    }


    default ThreadResponseDto threadToThreadResponseDto(ReplyService replyService,
                                                        LikesService likesService,
                                                        ReplyMapper replyMapper,
                                                        UserMapper userMapper,
                                                        ThreadImageService threadImageService,
                                                        Thread thread) {

        ThreadResponseDto threadResponseDto = new ThreadResponseDto();

        // Thread -> ThreadResponseDto
        threadResponseDto.setThreadId(thread.getThreadId());
        threadResponseDto.setThreadStatus(thread.getThreadStatus());
        threadResponseDto.setBody(thread.getBody());
        threadResponseDto.setCreatedAt(thread.getCreatedAt());
        threadResponseDto.setUpdatedAt(thread.getUpdatedAt());

        // thread 작성자 추가
        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(thread.getUser());
        threadResponseDto.setUser(userResponseDto);

        // threadImage 추가. 단, 이미지가 없으면 본문(body)만 response로 전달되어야 함.
        threadResponseDto.setThreadImages(threadImagesToThreadImageResponseDtos(
                threadImageService.findVerifiedThreadImages(thread)
        ));

        // 댓글 추가
        List<ReplyResponseDto> replyResponseDtos
                = replyMapper.repliesToExistReplyResponseDtos(replyService, userMapper, thread.getReplies());
        threadResponseDto.setReplies(replyResponseDtos);

        // 좋아요
        List<Likes> likes = likesService.findExistLikesByThread(thread);
        List<Long> likesUserId = likes.stream()
                .map(like -> like.getUser().getUserId())
                .collect(Collectors.toList());
        threadResponseDto.setLikesUserId(likesUserId);

        System.out.println(threadResponseDto);
        return threadResponseDto;
    }

    default List<ThreadResponseDto> threadsTothreadResponseDtos(ReplyService replyService,
                                                                LikesService likesService,
                                                                ReplyMapper replyMapper,
                                                                UserMapper userMapper,
                                                                ThreadImageService threadImageService,
                                                                List<Thread> threads){
        return threads.stream()
                .map(thread -> threadToThreadResponseDto(
                        replyService, likesService, replyMapper, userMapper,
                        threadImageService, thread))
                .collect(Collectors.toList());
    }

    default List<ThreadImageResponseDtos> threadImagesToThreadImageResponseDtos(List<ThreadImage> threadImages) {
        return threadImages
                .stream()
                .map(threadImage -> {
                    ThreadImageResponseDtos threadImageResponseDtos = new ThreadImageResponseDtos();
                    threadImageResponseDtos.setThreadImage(threadImage.getImage());
                    threadImageResponseDtos.setThreadImageStatus(threadImage.getThreadImageStatus());
                    return threadImageResponseDtos;
                }).collect(Collectors.toList());
    }

    default ThreadAndReplyResponseDto threadToThreadAndReplyResponseDto(
            ReplyService replyService, LikesService likesService, ReplyMapper replyMapper,
            UserMapper userMapper, ThreadImageService threadImageService,
            Thread thread, Integer replyPage, Integer replySize, String replySort) {

        ThreadAndReplyResponseDto threadAndReplyResponseDto = new ThreadAndReplyResponseDto();
        threadAndReplyResponseDto.setThreadId(thread.getThreadId());
        threadAndReplyResponseDto.setCreatedAt(thread.getCreatedAt());
        threadAndReplyResponseDto.setUpdatedAt(thread.getUpdatedAt());
        threadAndReplyResponseDto.setThreadStatus(thread.getThreadStatus());
        threadAndReplyResponseDto.setBody(thread.getBody());

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(thread.getUser());
        threadAndReplyResponseDto.setUser(userResponseDto);

        threadAndReplyResponseDto.setThreadImages(threadImagesToThreadImageResponseDtos( // thread(게시글)에 대한 이미지 속성 추가
                threadImageService.findVerifiedThreadImages(thread) // 해당 게시글 속 이미지 중, status가 THREAD_IMAGE_EXIST만 반환
        ));

        Page<Reply> pageReplies = replyService.findExistRepliesToPaginationAndSort(
                thread, replyPage, replySize, replySort); //thread의 reply중 status가 true인 것만 페이지네이션 정렬해서 반환
        List<Reply> replies = pageReplies.getContent();
        System.out.println(pageReplies.getContent());
        threadAndReplyResponseDto.setReplies(new MultiResponseDto<>(
                replyMapper.repliesToReplyResponseDtos(userMapper, replies), pageReplies
        ));

        List<Likes> likes = likesService.findExistLikesByThread(thread); // 해당 thread의 likes중에 Status가 LIKES_EXIST인 것만 반환
        List<Long> likesUserId = likes.
                stream().map(like -> like.getUser().getUserId()).collect(Collectors.toList());
        threadAndReplyResponseDto.setLikesUserId(likesUserId);

        return threadAndReplyResponseDto;
    }

}