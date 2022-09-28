package be.thread.controller;

import be.heart.entity.Heart;
import be.likes.service.LikesService;
import be.reply.mapper.ReplyMapper;
import be.reply.service.ReplyService;
import be.response.MultiResponseDto;
import be.response.SingleResponseDto;
import be.thread.dto.ThreadLikeDto;
import be.thread.dto.ThreadPatchDto;
import be.thread.dto.ThreadPostDto;
import be.thread.entity.Thread;
import be.thread.mapper.ThreadMapper;
import be.thread.service.ThreadImageService;
import be.thread.service.ThreadService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1")
@Validated
@RequiredArgsConstructor
@Slf4j
public class ThreadController {

    private final ThreadService threadService;
    private final ThreadMapper threadMapper;
    private final UserService userService;
    private final UserMapper userMapper;
    private final ReplyService replyService;
    private final ReplyMapper replyMapper;
    private final LikesService likesService;
    private final ThreadImageService threadImageService;

    /**
     * 댕댕이숲 글(thread) 작성 API
     */
    @PostMapping("/user/thread/write")
    public ResponseEntity postThread(@Valid @RequestBody ThreadPostDto threadPostDto) {
        // Request를 처리하기 위한 객체 생성. / 객체를 생성하는 메서드는 threadService에서 정의, 생성 메서드의 매개변수 생성은 mapper에서 만든다.
        Thread thread = threadService.createThread(
                threadMapper.threadPostDtoToThread(userService,threadPostDto)); // '특정 유저'의 '작성' 정보

        // 생성된 객체를 처리하여 Response 반환
        return new ResponseEntity<>(
                new SingleResponseDto<>(threadMapper.threadToThreadResponseDto(
                        userMapper, threadImageService, thread)), HttpStatus.CREATED);
    }

    /**
     * 댕댕이숲 글(thread) 수정 API
     */
    @PatchMapping("/user/thread/{thread-id}")
    public ResponseEntity patchThread(@PathVariable("thread-id") @Positive @NotNull long threadId,
                                      @Valid @RequestBody ThreadPatchDto threadPatchDto) {
        // Request를 처리하기 위한 객체 생성. / 객체를 생성하는 메서드는 threadService에서 정의, 생성 메서드의 매개변수 생성은 mapper에서 만든다.
        Thread thread = threadMapper.threadPatchDtoToThread(threadService, userService, threadId,threadPatchDto);
        Thread updatedThread = threadService.updateThread(thread);

        // 생성된 객체를 처리하여 Response 반환
        return new ResponseEntity<>(
                new SingleResponseDto<>(threadMapper.threadToThreadResponseDto(
                        userMapper,threadImageService, updatedThread)),
                HttpStatus.OK);
    }

//    /**
//     * 댕댕이숲 글(thread) 좋아요 추가 or 취소 API
//     */
//    @PatchMapping("/user/thread/like/{thread-id}")
//    public ResponseEntity likeThread(@PathVariable("thread-id") @Positive @NotNull long threadId,
//                                     @Valid @RequestBody ThreadLikeDto threadLikeDto) {
//        // Request를 처리하기 위한 객체 생성. / 객체를 생성하는 메서드는 threadService에서 정의, 생성 메서드의 매개변수 생성은 mapper에서 만든다.
//        Thread likedThread = threadService.likeThread(threadId, threadLikeDto.getLikes());
//
//        // 생성된 객체를 처리하여 Response 반환
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(threadMapper.threadToThreadResponseDto(userMapper, threadImageService,likedThread)),
//                HttpStatus.OK);
//    }

    /**
     * 댕댕이숲 글(thread) 삭제 API
     * */
    @PatchMapping("/user/thread/delete/{thread-id}")
    public ResponseEntity deleteThread(@PathVariable("thread-id") @Positive @NotNull long threadId,
                                       @Valid @RequestBody ThreadPatchDto threadPatchDto) {
        // Request를 처리하기 위한 객체 생성. / 객체를 생성하는 메서드는 threadService에서 정의, 생성 메서드의 매개변수 생성은 mapper에서 만든다.
        // 실제로 삭제하는 것이 아니라 threadStatus를 THREAD_NOT_EXIST로 변경하는 것.
        Thread thread = threadMapper.threadPatchDtoToThread(threadService, userService, threadId, threadPatchDto);
        Thread deletedThread = threadService.deleteThread(thread);

        // 생성된 객체를 처리하여 Response 반환
        return new ResponseEntity<>(
                new SingleResponseDto<>(threadMapper.threadToThreadResponseDto(
                        userMapper, threadImageService, deletedThread)),
                HttpStatus.OK);
    }

    /**
     * 유저 자신이 쓴 댕댕이의 숲 글 리스트 가져오기 API
     * **/
    @GetMapping("user/thread/list")
    public ResponseEntity getThreads(@Positive @RequestParam("page") int page,
                                    @Positive @RequestParam("size") int size){

        Page<Thread> pageThreads = threadService.findThreads(userService,page-1,size);

        List<Thread> threads = pageThreads.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                threadMapper.threadsTothreadResponseDtos(userMapper,threadImageService,threads),
                pageThreads),HttpStatus.OK);
    }

}