package be.user.service;

import be.config.auth.PrincipalDetails;
import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.user.entity.User;
import be.user.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder){

        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User getLoginUser(){ //로그인된 유저가 옳바른 지 확인하고 정보 가져옴
        return findUser(getUserByToken());
    }

    private User findUser(User user){// 아래 getUserByToken 쓸거임
        return findVerifiedUser(user.getUserId());
    }

    public User findVerifiedUser(long userId){
        Optional<User> optionalUser = userRepository.findById(userId);

        User findUser=optionalUser.orElseThrow(()-> //만일 db에 저장된 유저 정보 없으면 예외발생
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        if(findUser.getUserStatus() == User.UserStatus.USER_NOT_EXIST){// 만일 탈퇴한 유저라면 예외발생
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        return findUser;
    }

    public User createUser(User user) {
        // 이미 등록된 이메일인지 확인
        verifyExistsEmail(user.getEmail());

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        //처음 회원가입 하고나서는 기본이미지가 기본프로필사진
        user.setImage("https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800");

        return userRepository.save(user);
    }

    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public User getUserByToken(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails)principal;

        return principalDetails.getUser();
    }
}