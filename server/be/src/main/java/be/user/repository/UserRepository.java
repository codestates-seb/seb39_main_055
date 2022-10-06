package be.user.repository;

import be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmailAndUserStatusAndSocialLogin(String email,User.UserStatus userStatus,String socialLogin);
}
