package be.heart.repository;

import be.heart.entity.Heart;
import be.store.entity.Store;
import be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HeartRepository extends JpaRepository<Heart, Long> {

    Optional<Heart> findByUserAndStoreAndHeartStatus(User user, Store store, Heart.HeartStatus heartStatus);
}
