package be.thread.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.thread.entity.Thread;
import be.thread.repository.ThreadRepository;
import be.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class ThreadService {

    private final ThreadRepository threadRepository;
    private final ThreadImageService threadImageService;

    /**
     * Thread 작성 관련 biz logic
     */
    @Transactional
    public Thread createThread(Thread thread) {
        // 같은 thread이 있는지 확인할 방법이 없다. (thread는 제목 field가 없어서, 동일 제목이 있는지 비교할 수도 없다.)

        return threadRepository.save(thread);
    }

    /**
     * Thread 수정 관련 biz logic
     */
    @Transactional
    public Thread updateThread(Thread thread) {
        Thread findThread = findVerifiedThread(thread.getThreadId()); // thread가 DB에 없으면 예외처리.

        Optional.ofNullable(thread.getBody()) // 본문 수정
                .ifPresent(findThread::setBody);

        Optional.ofNullable(thread.getUpdatedAt()) // 업데이트 날짜 수정
                .ifPresent(findThread::setUpdatedAt);

        Optional.ofNullable(thread.getThreadStatus()) // 글 삭제 (실제로 삭제하는 것이 아니라 threaaStatus를 변경시키는 것...)
                .ifPresent(findThread::setThreadStatus);

        Thread updatedThread = threadRepository.save(findThread);

        if(thread.getThreadImages().isEmpty()) {
            // 수정된 글에 이미지가 없다면, 등록되어 있는 이미지는 삭제 (= 사용하지 않는 상태로 변경)
            threadImageService.deleteThreadImages(thread);

        } else {
            log.info("이미지 수정 {}",thread.getThreadImages().toString()); // 새롭게 올라온 이미지가 있다면
            threadImageService.deleteThreadImages(thread); // 등록되어 있는 이미지는 삭제 (= 사용하지 않는 상태로 변경)
            threadImageService.createThreadImages(thread.getThreadImages()); // 이후 새롭게 추가된 이미지 등록
        }

        updatedThread.setThreadImages(threadImageService.findVerifiedThreadImages(updatedThread));

        return updatedThread;
    }

    /**
     * thread가 DB에 없으면 에외처리.
     * 있다면 해당 글을 작성한 유저 정보 반환.
     */
    public User findThreadUser(long threadId) {
        Thread findThread = findVerifiedThread(threadId);
        return findThread.getUser();
    }

    /**
     * thread가 DB에 없으면 에외처리.
     * 있다면 해당 thread 리턴.
     */
    public Thread findVerifiedThread(long threadId) {
        Optional<Thread> optionalThread = threadRepository.findById(threadId);
        Thread findThread = optionalThread.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.THREAD_NOT_FOUND));
        return findThread;
    }

    public Thread likeThread(long threadId, int likes) {
        Thread findThread = findVerifiedThread(threadId); // 작성한 글이 DB에 없다면 예외 처리
        findThread.setLikes(likes);
        Thread updatedThread = threadRepository.save(findThread);
        // Status가 THREAD_IMAGE_EXIST만 표시
        updatedThread.setThreadImages(threadImageService.findVerifiedThreadImages(updatedThread));
        return updatedThread;
    }

}
