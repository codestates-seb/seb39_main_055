package be.config.auth.handler;

import be.user.entity.User;
import be.user.repository.UserRepository;
import be.user.service.UserService;
import be.utils.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {   // (1)
    private final JwtTokenizer jwtTokenizer;
    private final UserService userService;
    private final UserRepository userRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info("onAuthenticationSuccess 진입");

        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String registrationId =response.getHeader("registrationId"); //response 헤더에 registrationId 등록

        String email;

        log.info("authentication.getPrincipal():"+oAuth2User);
        if(registrationId.equals("kakao")){
            // kakao는 kakao_account에 유저정보가 있다. (email)
            Map<String, Object> kakaoAccount = (Map<String, Object>)oAuth2User.getAttributes().get("kakao_account");
            email = String.valueOf(kakaoAccount.get("email")); // (3)
        }else{
            email = String.valueOf(oAuth2User.getAttributes().get("email")); // (3)
        }



        log.info("현재 email:"+email);
        log.info("현재 registrationId:"+registrationId);

        //앞에서 소셜 로그인 된 유저-> 신규 회원일때 회원가입/ 기존 회원일때 회원 업데이트 시켜줌 -> 무조건 Optional 객체안은 null이 아님!
        User user = userRepository.findByEmailAndUserStatusAndSocialLogin(email, User.UserStatus.USER_EXIST,registrationId).get();

        log.info("user="+user);

        String accessToken = delegateAccessToken(user);   // (4-2)delegateAccessToken(user) 메서드를 이용해 Access Token을 생성

        log.info("accessToken 생성");

        String refreshToken = delegateRefreshToken(user); // (4-3)delegateRefreshToken(user) 메서드를 이용해 Refresh Token을 생성

        log.info("refreshToken 생성");

        String uri = createURI(accessToken,refreshToken).toString();//uri 생성성

        log.info("uri 생성");



//       response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("Refresh", refreshToken);
        getRedirectStrategy().sendRedirect(request,response,uri);

        log.info("onAuthenticationSuccess 실행 완료\nuri="+uri);
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", "Bearer "+accessToken);
        queryParams.add("refresh_token", refreshToken);

//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host("localhost")
//                .port(3000)
//                .path("/login/oauth")
//                .queryParams(queryParams)
//                .build()
//                .toUri();

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("withpet-two.vercel.app")
                .port(443)
                .path("/login/oauth")
                .queryParams(queryParams)
                .build()
                .toUri();
    }


    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId",user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("userRole", user.getUserRole());

        String subject = user.getUserId().toString(); //Jwt 의 제목
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getAccessSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId",user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("userRole", user.getUserRole());

        String subject = user.getUserId().toString(); //Jwt 의 제목
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getRefreshSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(claims,subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }


}