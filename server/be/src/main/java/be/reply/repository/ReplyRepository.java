package be.reply.repository;

import be.reply.entity.Reply;
import be.thread.entity.Thread;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    Page<Reply> findByThreadAndReplyStatus(Pageable pageable, Thread thread, Reply.ReplyStatus replyStatus);

}
