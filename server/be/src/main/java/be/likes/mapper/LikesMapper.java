package be.likes.mapper;

import be.likes.dto.LikesPatchDto;
import be.likes.dto.LikesPostDto;
import be.likes.dto.LikesResponseDto;
import be.likes.entity.Likes;
import be.likes.service.LikesService;
import be.reply.mapper.ReplyMapper;
import be.reply.service.ReplyService;
import be.thread.dto.ThreadResponseDto;
import be.thread.entity.Thread;
import be.thread.mapper.ThreadMapper;
import be.thread.service.ThreadImageService;
import be.thread.service.ThreadService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface LikesMapper {

    default Likes likesPostDtoToLikes(ThreadService threadService, UserService userService, LikesPostDto likesPostDto) {

        User user = userService.getLoginUser(); // request http 헤더의 토큰에 해당하는 유저 불러옴
        Thread thread = threadService.findVerifiedThread(likesPostDto.getThreadId()); //유저가 좋아요 누른 댕댕이숲 글 불러오기
        Likes likes = new Likes();

        likes.setThread(thread);
        likes.setUser(user);

        return likes;
    }

    default LikesResponseDto likesToLikesResponseDto(
            ReplyService replyService, LikesService likesService, ReplyMapper replyMapper,
            ThreadMapper threadMapper, UserMapper userMapper, ThreadImageService threadImageService,
            Likes likes) {

        LikesResponseDto likesResponseDto = new LikesResponseDto();
        likesResponseDto.setLikesId(likes.getLikesId());
        likesResponseDto.setLikesStatus(likes.getLikesStatus());
        likesResponseDto.setUpdatedAt(likes.getUpdatedAt());
        likesResponseDto.setCreatedAt(likes.getCreatedAt());

        ThreadResponseDto threadResponseDto = threadMapper.threadToThreadResponseDto(
                replyService, likesService, replyMapper, userMapper, threadImageService,
                likes.getThread());
        likesResponseDto.setThread(threadResponseDto);

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(likes.getUser());
        likesResponseDto.setUser(userResponseDto);

        return likesResponseDto;
    }

    default Likes likesPatchDtoToLikes(
            ThreadService threadService, UserService userService, LikesPatchDto likesPatchDto) {

        User user = userService.getLoginUser(); // request http 헤더의 토큰에 해당하는 유저 불러옴
        Thread thread = threadService.findVerifiedThread(likesPatchDto.getThreadId()); // 유저가 좋아요 누른 댕댕이숲 게시글 불러오기
        Likes likes = new Likes();

        likes.setLikesStatus(likesPatchDto.getLikesStatus());
        likes.setThread(thread);
        likes.setUser(user);

        return likes;
    }

    default List<LikesResponseDto> likesToLikesResponseDtos(
            ReplyService replyService, LikesService likesService, ReplyMapper replyMapper,
            ThreadMapper threadMapper, UserMapper userMapper, ThreadImageService threadImageService,
            List<Likes> likes) {
        return likes.stream().map(like -> likesToLikesResponseDto(
                        replyService, likesService, replyMapper, threadMapper, userMapper, threadImageService, like))
                .collect(Collectors.toList());
    }

}
