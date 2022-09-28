package be.likes.controller;

import be.likes.dto.LikesPatchDto;
import be.likes.dto.LikesPostDto;
import be.likes.entity.Likes;
import be.likes.mapper.LikesMapper;
import be.likes.service.LikesService;
import be.reply.mapper.ReplyMapper;
import be.reply.service.ReplyService;
import be.response.MultiResponseDto;
import be.response.SingleResponseDto;
import be.thread.mapper.ThreadMapper;
import be.thread.service.ThreadImageService;
import be.thread.service.ThreadService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1")
@Validated
@Slf4j
@AllArgsConstructor
public class LikesController {

    private final ThreadService threadService;
    private final UserService userService;
    private final ReplyService replyService;
    private final LikesService likesService;
    private final ThreadMapper threadMapper;
    private final UserMapper userMapper;
    private final ReplyMapper replyMapper;
    private final LikesMapper likesMapper;
    private final ThreadImageService threadImageService;


    /**
     * 댕댕이숲 게시글에 좋아요 등록 API
     **/
    @PostMapping("/user/likes/register")
    public ResponseEntity postLikes(@Valid @RequestBody LikesPostDto likesPostDto) {
        Likes likes = likesMapper.likesPostDtoToLikes(threadService, userService, likesPostDto);
        Likes createdLikes = likesService.createLikes(likes);

        return new ResponseEntity<>(
                new SingleResponseDto<>(likesMapper.likesToLikesResponseDto(
                        replyService, likesService, replyMapper, threadMapper, userMapper, threadImageService, createdLikes)),
                HttpStatus.CREATED);
    }

    /**
     * 댕댕이숲 게시글에 좋아요 등록취소 API
     */
    @PatchMapping("/user/likes/cancel")
    public ResponseEntity patchLikes(@Valid @RequestBody LikesPatchDto likesPatchDto) {
        Likes likes = likesMapper.likesPatchDtoToLikes(threadService, userService, likesPatchDto);

        Likes cancelledLikes = likesService.cancelLikes(likes);

        return new ResponseEntity<>(
                new SingleResponseDto<>(likesMapper.likesToLikesResponseDto(replyService, likesService, replyMapper, threadMapper, userMapper, threadImageService, cancelledLikes)),
                HttpStatus.OK);
    }

    /**
     * 좋아요 등록한 댕댕이숲 게시글 리스트 가져오기 API
     */
    @GetMapping("/user/likes/list")
    public ResponseEntity getLikes(@Positive @RequestParam("page") int page,
                                   @Positive @RequestParam("size") int size) {
        Page<Likes> pageLikes = likesService.findLikes(userService, page-1, size);
        List<Likes> likes = pageLikes.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                likesMapper.likesToLikesResponseDtos(
                        replyService, likesService, replyMapper, threadMapper, userMapper, threadImageService, likes),
                pageLikes), HttpStatus.OK);
    }


}

