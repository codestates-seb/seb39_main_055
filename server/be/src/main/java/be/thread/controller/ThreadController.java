package be.thread.controller;

import be.response.SingleResponseDto;
import be.thread.dto.ThreadPostDto;
import be.thread.entity.Thread;
import be.thread.mapper.ThreadMapper;
import be.thread.service.ThreadService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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

    /**
     * thread 작성 API
     */
    @PostMapping("/user/thread/write")
    public ResponseEntity postThread(@Valid @RequestBody ThreadPostDto threadPostDto) {
        // Request를 처리하기 위한 객체 생성. / 객체를 생성하는 메서드는 threadService에서 정의, 생성 메서드의 매개변수 생성은 mapper에서 만든다.
        Thread thread = threadService.createThread(
                threadMapper.threadPostDtoToThread(userService,threadPostDto)); // '특정 유저'의 '작성' 정보

        // 생성된 객체를 처리하여 Response 반환
        return new ResponseEntity<>(
                new SingleResponseDto<>(threadMapper.threadToThreadResponseDto(userMapper,thread)), HttpStatus.CREATED);
    }

}
