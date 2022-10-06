package be.likes.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.likes.entity.Likes;
import be.likes.repository.LikesRepository;
import be.thread.entity.Thread;
import be.user.entity.User;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LikesService {

    LikesRepository likesRepository;

    @Transactional
    public Likes createLikes(Likes likes) {
        verifyExistLikes(likes.getUser(), likes.getThread()); // 이미 좋아요를 눌렀는지 확인

        return likesRepository.save(likes);
    }

    private void verifyExistLikes(User user, Thread thread) {
        Optional<Likes> optionalLikes = likesRepository.findByUserAndThreadAndLikesStatus(user, thread, Likes.LikesStatus.LIKES_EXIST);

        if(optionalLikes.isPresent()) //
            throw new BusinessLogicException(ExceptionCode.HEART_EXIST);
    }

    @Transactional
    public Likes cancelLikes(Likes likes) {
        Likes findLikes = findExistLikes(likes.getUser(), likes.getThread()); // 등록된 좋아요가 아니면 예외 반환

        Optional.ofNullable(likes.getLikesStatus())
                .ifPresent(likesStatus -> findLikes.setLikesStatus(likesStatus));

        return findLikes;
    }

    /**
     * 이미 등록된 좋아요가 있다면 예외 처리
     */
    public Likes findExistLikes(User user, Thread thread) {
        Optional<Likes> likes = likesRepository.findByUserAndThreadAndLikesStatus(user, thread, Likes.LikesStatus.LIKES_EXIST);
        if(!likes.isPresent()) throw new BusinessLogicException(ExceptionCode.LIKES_NOT_FOUND);
        return likes.get();
    }

    public Page<Likes> findLikes(UserService userService, int page, int size) { // 유저가 등록한 좋아요에 pagenation과 최신순 sort 구현
        User user = userService.getLoginUser(); // 해당 토큰의 유저 가져오기
        Page<Likes> likes = likesRepository.findByUserAndLikesStatus( // 삭제된 좋아요 빼고 해당 유저의 전체 좋아요 가져옴.
                PageRequest.of(page, size, Sort.by("createdAt").descending()),
                user,
                Likes.LikesStatus.LIKES_EXIST);
//        verifiedNoLikes(likes); // findAllLikes 안에 반환된 데이터가 없으면 예외 발생

        return likes;
    }

//    private void verifiedNoLikes(Page<Likes> likes) {
//        if(likes.getTotalElements() == 0) {
//            throw new BusinessLogicException(ExceptionCode.LIKES_NOT_FOUND);
//        }
//    }

    public List<Likes> findExistLikesByThread(Thread thread) { //해당 thread의 likes중에 Status가 LIKES_EXIST인 것만 반환
        return likesRepository.findByThreadAndLikesStatus(thread, Likes.LikesStatus.LIKES_EXIST);
    }

}
