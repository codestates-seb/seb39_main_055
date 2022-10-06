package be.thread.service;

import be.thread.entity.Thread;
import be.thread.entity.ThreadImage;
import be.thread.repository.ThreadImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThreadImageService {

    ThreadImageRepository threadImageRepository;

    public ThreadImageService(ThreadImageRepository threadImageRepository) {
        this.threadImageRepository = threadImageRepository;
    }

//    public List<ThreadImage> createThreadImages(List<ThreadImage> threadImages) {
//        return threadImages.stream()
//                .map(threadImage -> threadImageRepository.save(threadImage))
//                .collect(Collectors.toList());
//    }

//    public void deleteThreadImages(Thread thread) {
//        long threadId = thread.getThreadId();
//
//        List<ThreadImage> threadImages = threadImageRepository.findAllByThreadId(threadId); // 해당 thread의 이미지를 다 가져오기
//        threadImages.stream().forEach(threadImage ->
//        {
//            System.out.println("삭제된 사진 :" + threadImage.getThreadImageId());
//            threadImage.setThreadImageStatus(ThreadImage.ThreadImageStatus.THREAD_IMAGE_NOT_EXIST);
//            threadImageRepository.save(threadImage);
//        });
//    }

    public List<ThreadImage> findVerifiedThreadImages(Thread thread) {
        List<ThreadImage> findThreadImages = threadImageRepository.findAllByThreadAndThreadImageStatus(
                thread, ThreadImage.ThreadImageStatus.THREAD_IMAGE_EXIST);
        return findThreadImages;
    }

}
