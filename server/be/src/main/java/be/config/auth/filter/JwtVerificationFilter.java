package be.config.auth.filter;


import be.config.auth.userdetails.MemberDetails;
import be.utils.jwt.JwtTokenizer;
import be.user.entity.User;
import be.user.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import io.jsonwebtoken.security.SignatureException;

@AllArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {  // (1)OncePerRequestFilter를 확장해서
                                                            // request 당 한번만 실행되는 Security Filter를 구현
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // try~catch 문으로 특정 예외 타입의 Exception이 catch 되면 해당 Exception을 request.setAttribute("exception", Exception 객체)와 같이 HttpServletRequest의 애트리뷰트(Attribute)로 추가됩니다.
        try{
            Map<String, Object> claims = verifyJws(request); // (3)verifyJws() 메서드는 JWT를 검증하는데 사용되는 private 메서드
            setAuthenticationToContext(claims);      // (4)Authentication 객체를 SecurityContext에 저장하기 위한 private 메서드

        } catch(SignatureException se){
            throw new JwtException("사용자 인증 실패");

        } catch (ExpiredJwtException ee) {
            throw new JwtException("토큰 기한 만료");
        } catch (Exception e) {
        }

        filterChain.doFilter(request, response); // (5) 위에서 문제없이 JWT의 서명 검증에 성공하고, Security Context에 Authentication을 저장한 뒤에는 (5)와 같이 다음(Next) Security Filter를 호출
    }


    // (6) OncePerRequestFilter의 shouldNotFilter()를 오버라이드 한 것으로,
    // 특정 조건에 부합하면(true이면) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰도록 해줍니다.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");  // (6-1)Authorization header의 값을 얻은 후에

        return authorization == null || !authorization.startsWith("Bearer");  // (6-2) Authorization header의 값이 null이거나 Authorization header의 값이 “Bearer”로 시작하지 않는다면 해당 Filter의 동작을 수행하지 않도록 정의
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // (3-1)request의 header에서 JWT를 얻고 있습니다
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getAccessSecretKey()); // (3-2)JWT 서명(Signature)을 검증하기 위한 Secret Key를 얻습니다.

        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();   // (3-3) JWT에서 Claims를 파싱합니다.
        // 여기서 기억해야 할 부분은 JWT에서 Claims를 파싱할 수 있다는 의미는 내부적으로 서명(Signature) 검증에 성공했다는 의미

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        Long userId = Long.parseLong(claims.get("userId").toString());
        log.info("서명이 정상적으로 됌"+userId);
        User user = userRepository.findById(userId).get();

        MemberDetails memberDetails = new MemberDetails(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(memberDetails, null, memberDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
