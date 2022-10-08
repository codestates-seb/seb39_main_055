package be.thread.repository;

import be.heart.entity.Heart;
import be.thread.entity.Thread;
import be.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepository extends JpaRepository<Thread, Long> {

    Page<Thread> findByUserAndThreadStatus(Pageable pageable, User user, Thread.ThreadStatus threadStatus);

    Page<Thread> findByThreadStatus(Pageable pageable, Thread.ThreadStatus threadStatus);
}
