package be.thread.repository;

import be.thread.entity.Thread;
import be.thread.entity.ThreadImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThreadImageRepository extends JpaRepository<ThreadImage, Long> {

//    @Query(value = "select * from thread_image where thread_id = :threadId", nativeQuery = true)
//    List<ThreadImage> findAllByThreadId(@Param("threadId") long threadId);

    List<ThreadImage> findAllByThreadAndThreadImageStatus(Thread thread, ThreadImage.ThreadImageStatus threadImageStatus);
}

