package be.thread.repository;

import be.thread.entity.ThreadImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadImageRepository extends JpaRepository<ThreadImage, Long> {
}
