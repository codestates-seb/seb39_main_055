package be.user.service;

//import be.config.auth.PrincipalDetails;
//import be.exception.BusinessLogicException;
//import be.exception.ExceptionCode;
//import be.store.service.StoreService;
//import be.user.entity.User;
//import be.user.repository.UserRepository;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Optional;

//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    public UserService(UserRepository userRepository,
//                       BCryptPasswordEncoder bCryptPasswordEncoder){
//
//        this.userRepository = userRepository;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//    }
//
//    public User getLoginUser(){ //로그인된 유저가 옳바른 지 확인하고 정보 가져옴
//        return findUser(getUserByToken());
//    }
//
//
//    private User findUser(User user){// 아래 getUserByToken 쓸거임
//        return findVerifiedUser(user.getUserId());
//    }
//
//
//    public User findVerifiedUser(long userId){
//        Optional<User> optionalUser = userRepository.findById(userId);
//
//        User findUser=optionalUser.orElseThrow(()-> //만일 db에 저장된 유저 정보 없으면 예외발생
//                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
//
//        if(findUser.getUserStatus() == User.UserStatus.USER_NOT_EXIST){// 만일 탈퇴한 유저라면 예외발생
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//        return findUser;
//    }
//
//    @Transactional
//    public User createUser(User user) {
//        // 현재 활동중인 유저의 이미 등록된 이메일인지 확인
//        verifyExistsEmail(user.getEmail());
//
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//
//        //처음 회원가입 하고나서는 기본이미지가 기본프로필사진
//        user.setImage("https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800");
//
//        return userRepository.save(user);
//
//    }
//
//    private void verifyExistsEmail(String email) { // 현재 활동중인 유저의 이미 등록된 이메일인지 확인
//        Optional<User> user = userRepository.findByEmailAndUserStatus(email, User.UserStatus.USER_EXIST);
//        if (user.isPresent()){
//            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
//        }
//    }
//
//    public void verifyExistUserByEmail(String email) { //현재 활동중인 유저중 email 파라미터로 조회
//        Optional<User> user = userRepository.findByEmailAndUserStatus(email, User.UserStatus.USER_EXIST);
//        if (user.isEmpty()){//DB에 없는 유저거나 이전에 탈퇴한 유저면 예외처리함
//            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
//        }
//    }
//
//
//    public User getUserByToken(){
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        PrincipalDetails principalDetails = (PrincipalDetails)principal;
//
//        return principalDetails.getUser();
//    }
//
//    @Transactional
//    public User updateUser(StoreService storeService,User user){
//        User findUser = findVerifiedUser(user.getUserId());
//        Optional.ofNullable(user.getUpdatedAt())//업데이트 날짜 수정
//                .ifPresent(userUpdatedAt ->findUser.setUpdatedAt(userUpdatedAt));
//
//        Optional.ofNullable(user.getImage())//유저 프로필이미지 수정
//                .ifPresent(userImage ->findUser.setImage(userImage));
//
//        Optional.ofNullable(user.getNickname())//유저 닉네임 수정
//                .ifPresent(userNickname ->findUser.setNickname(userNickname));
//
//        Optional.ofNullable(user.getEmail())//유저 이메일 수정
//                .ifPresent(userEmail ->findUser.setEmail(userEmail));
//
//        Optional.ofNullable(user.getLongitude())//유저 longitude 수정
//                .ifPresent(userLongitude ->findUser.setLongitude(userLongitude));
//
//        Optional.ofNullable(user.getLatitude())//유저 latitude 수정
//                .ifPresent(userLatitude ->findUser.setLatitude(userLatitude));
//
//        Optional.ofNullable(user.getUserStatus())//유저 탈퇴
//                .ifPresent(userStatus -> {
//                    if(findUser.getUserRole().equals("ROLE_OWNER")){ //탈퇴하려는 회원이 오너일때
//                        storeService.deleteTheOwnerStores(findUser);//매개변수로 들어가는 유저가 가지고 있는 Store를 전부 삭제
//                    }
//                    findUser.setUserStatus(userStatus); //유저 탈퇴
//                    });
//
//        return findUser;
//    }
//}


import be.config.auth.userdetails.MemberDetails;
import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.store.service.StoreService;
import be.user.entity.User;
import be.user.repository.UserRepository;
import be.utils.jwt.JwtTokenizer;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    // (1) 추가
    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtTokenizer jwtTokenizer;


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

    @Transactional
    public User createUser(User user) {
        // 현재 활동중인 일반 회원가입으로 가입한 유저의 이미 등록된 이메일인지 확인
        verifyExistsEmailByOriginal(user.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));


        return userRepository.save(user);

    }

    private void verifyExistsEmailByOriginal(String email) { // 현재 활동중인 일반 회원가입으로 가입한 유저의 이미 등록된 이메일인지 확인
        Optional<User> user = userRepository.findByEmailAndUserStatusAndSocialLogin(email, User.UserStatus.USER_EXIST,"original");
        if (user.isPresent()){
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
    }

    public void verifyExistUserByEmailAndOriginal(String email) { //현재 활동중인 일반 회원가입으로 가입한 유저중 email 파라미터로 조회
        Optional<User> user = userRepository.findByEmailAndUserStatusAndSocialLogin(email, User.UserStatus.USER_EXIST,"original");
        if (user.isEmpty()){//DB에 없는 유저거나 이전에 탈퇴한 유저면 예외처리함
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
    }


    public User getUserByToken(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MemberDetails memberDetails = (MemberDetails) principal;

        return memberDetails.getUser();
    }

    @Transactional
    public User updateUser(StoreService storeService, User user){
        User findUser = findVerifiedUser(user.getUserId());
        Optional.ofNullable(user.getUpdatedAt())//업데이트 날짜 수정
                .ifPresent(userUpdatedAt ->findUser.setUpdatedAt(userUpdatedAt));

        Optional.ofNullable(user.getImage())//유저 프로필이미지 수정
                .ifPresent(userImage ->findUser.setImage(userImage));

        Optional.ofNullable(user.getNickname())//유저 닉네임 수정
                .ifPresent(userNickname ->findUser.setNickname(userNickname));

        Optional.ofNullable(user.getEmail())//유저 이메일 수정
                .ifPresent(userEmail ->findUser.setEmail(userEmail));

        Optional.ofNullable(user.getLongitude())//유저 longitude 수정
                .ifPresent(userLongitude ->findUser.setLongitude(userLongitude));

        Optional.ofNullable(user.getLatitude())//유저 latitude 수정
                .ifPresent(userLatitude ->findUser.setLatitude(userLatitude));

        Optional.ofNullable(user.getUserStatus())//유저 탈퇴
                .ifPresent(userStatus -> {
                    if(findUser.getUserRole().equals("ROLE_OWNER")){ //탈퇴하려는 회원이 오너일때
                        storeService.deleteTheOwnerStores(findUser);//매개변수로 들어가는 유저가 가지고 있는 Store를 전부 삭제
                    }
                    findUser.setUserStatus(userStatus); //유저 탈퇴
                });

        Optional.ofNullable(user.getUserRole())//유저 권한 수정
                .ifPresent(userRole ->findUser.setUserRole(userRole));

        return findUser;
    }

    public String createAccessToken(String refreshToken){
        Map<String, Object> claims = null;
        User user=null;
        try{
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getRefreshSecretKey()); // (3-2)JWT 서명(Signature)을 검증하기 위한 Secret Key를 얻습니다.
            claims= jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();   // (3-3) JWT에서 Claims를 파싱합니다.
            // 여기서 기억해야 할 부분은 JWT에서 Claims를 파싱할 수 있다는 의미는 내부적으로 서명(Signature) 검증에 성공했다는 의미
            System.out.println(claims);
            Long userId = Long.parseLong(claims.get("userId").toString());
            user= userRepository.findById(userId).get();
            

        }catch(SignatureException se){
            throw new JwtException("사용자 인증 실패");

        } catch (ExpiredJwtException ee) {
            throw new JwtException("토큰 기한 만료");
        } catch (Exception e) {
            throw e;
        }//이걸 통과하면 리프레시 토큰이 DB의 리프레시 토큰과 같다면 어세스 토큰 갱신


        ////////////어세스 토큰 갱신 부분/////////////////////////////////////////////////////////////////
        String subject = user.getUserId().toString(); //Jwt 의 제목
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getAccessSecretKey());
        String accessToken = "Bearer "+jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        ///////////////////////////////////////////////////////////////////////////////////////////////////

        return accessToken;
    }
}