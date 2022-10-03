package be.config.auth.filter;

import be.config.auth.userdetails.MemberDetails;
import be.user.repository.UserRepository;
import be.utils.jwt.JwtTokenizer;
import be.user.dto.UserLoginDto;
import be.user.entity.User;
import be.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//새로생성!!
//스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있음
// 로그인 요청에서 username,password 전송하면 (post)
//UsernamePasswordAuthenticationFilter 동작을 함
@AllArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {// (1)UsernamePasswordAuthenticationFilter를 상속하고 있습니다.
    // UsernamePasswordAuthenticationFilter는 폼로그인 방식에서 사용하는 디폴트 Security Filter로써,
    // 폼로그인이 아니더라도 Username/Password 기반의 인증을 처리하기 위해
    // UsernamePasswordAuthenticationFilter를 확장해서 구현할 수 있습니다.

    // /login 요청이 오면 -> UsernamePass~Filter가 가로채서 attemptAuthentication 함수가 자동 실행)
    // Authentication 객체 만들어서 리턴 => 의존 : AuthenticationManager
    // 인증 요청시에 실행되는 함수 => /login
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;

    //로그인 요청을 하면 로그인 시도를 위해서 실행되는 함수 /login
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException { //(3)attemptAuthentication()는 메서드 이름에서도 알 수 있듯이 메서드 내부에서 인증을 시도하는 로직을 구현하면 됩니다.
        log.info("JwtAuthenticationFilter:로그인 시도함");

        ObjectMapper om = new ObjectMapper();// (3-1)클라이언트에서 전송한 Username과 Password를 DTO 클래스로 역직렬화(Deserialization)하기 위해 ObjectMapper 인스턴스를 생성
        UserLoginDto userLoginDto =null;
        try{
            userLoginDto = om.readValue(request.getInputStream(),UserLoginDto.class);
            // (3-2)objectMapper.readValue(request.getInputStream(), LoginDto.class)를 통해 ServletInputStream 을 LoginDto 클래스의 객체로 역직렬화(Deserialization)

        }catch(Exception e){
            e.printStackTrace();
        }

        log.info("JwtAuthenticationFilter : "+userLoginDto);

        userService.verifyExistUserByEmailAndOriginal(userLoginDto.getEmail()); //현재 활동중인 일반 회원가입으로 가입한 유저중 email 파라미터로 조회
        // DB에 없는 유저거나 이전에 탈퇴한 유저면 예외처리함

        //(3-3)User email과 Password 정보를 포함한 UsernamePasswordAuthenticationToken을 생성
        UsernamePasswordAuthenticationToken authenticationToken=
                new UsernamePasswordAuthenticationToken(
                        userLoginDto.getEmail(),
                        userLoginDto.getPassword()
                );
        log.info("JwtAuthenticationFilter : 토큰생성완료");

        Authentication authentication = authenticationManager.
                authenticate(authenticationToken);// (3-4) UsernamePasswordAuthenticationToken을 AuthenticationManager에게 전달하면서 인증 처리를 위임

        MemberDetails memberDetails = (MemberDetails)authentication.
                getPrincipal();
        log.info("Authentication : "+memberDetails.getUser().getEmail());

        return authentication;
    }
    //attemptAuthentication 위 함수 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 실행됌
    // JWT Token 생성해서 response에 담아주기
    @Override
    @Transactional
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        MemberDetails memberDetails = (MemberDetails) authResult.getPrincipal();// (4-1)authResult.getPrincipal()로 User 엔티티 클래스의 객체를 얻습니다.

        String accessToken = delegateAccessToken(memberDetails);   // (4-2)delegateAccessToken(member) 메서드를 이용해 Access Token을 생성
        String refreshToken = delegateRefreshToken(memberDetails); // (4-3)delegateRefreshToken(member) 메서드를 이용해 Refresh Token을 생성

        User user = userRepository.findById(memberDetails.getUser().getUserId()).get();
        user.setRefreshToken(refreshToken);
        userRepository.save(user); //리프레시 토큰 디비 저장

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }

    // (5)
    private String delegateAccessToken(MemberDetails memberDetails) {
        Map<String, Object> claims = new HashMap<>();
        User user = memberDetails.getUser();
        claims.put("userId",user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("userRole", user.getUserRole());

        String subject = user.getUserId().toString(); //Jwt 의 제목
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getAccessSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // (6)
    private String delegateRefreshToken(MemberDetails memberDetails) {

        Map<String, Object> claims = new HashMap<>();
        User user = memberDetails.getUser();
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

