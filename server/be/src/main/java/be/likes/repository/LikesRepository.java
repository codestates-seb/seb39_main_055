package be.likes.repository;

import be.likes.entity.Likes;
import be.thread.entity.Thread;
import be.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    Optional<Likes> findByUserAndThreadAndLikesStatus(User user, Thread thread, Likes.LikesStatus likesStatus);

    Page<Likes> findByUserAndLikesStatus(Pageable pageable, User user, Likes.LikesStatus likesStatus);

    List<Likes> findByThreadAndLikesStatus(Thread thread, Likes.LikesStatus likesStatus);

}
