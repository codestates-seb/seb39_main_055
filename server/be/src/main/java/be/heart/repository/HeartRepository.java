package be.heart.repository;

import be.heart.entity.Heart;
import be.store.entity.Store;
import be.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart, Long> {

    Optional<Heart> findByUserAndStoreAndHeartStatus(User user, Store store, Heart.HeartStatus heartStatus);

    Page<Heart> findByUserAndHeartStatus(Pageable pageable, User user, Heart.HeartStatus heartStatus);

    List<Heart> findByStoreAndHeartStatus(Store store,Heart.HeartStatus heartStatus);
}
