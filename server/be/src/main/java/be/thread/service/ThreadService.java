package be.thread.service;

import be.thread.entity.Thread;
import be.thread.repository.ThreadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ThreadService {

    private final ThreadRepository threadRepository;

    public Thread createThread(Thread thread) {
        // 같은 thread이 있는지 확인할 방법이 없다. (thread는 제목 field가 없어서, 동일 제목이 있는지 비교할 수도 없다.)

        return threadRepository.save(thread);
    }
}
