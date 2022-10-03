package be.config.auth.userdetails;

import be.config.auth.userdetails.MemberDetails;
import be.user.entity.User;
import be.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
@Slf4j
public class MemberDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
//    private final CustomAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("MemberDetailsService : 진입");
        Optional<User> userEntity  = userRepository.findByEmailAndUserStatusAndSocialLogin(email, User.UserStatus.USER_EXIST,"original");


        return new MemberDetails(userEntity.get());
    }


}
