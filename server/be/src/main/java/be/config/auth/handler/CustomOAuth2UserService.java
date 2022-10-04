package be.config.auth.handler;

import be.config.auth.dto.OAuthAttributes;
import be.user.entity.User;
import be.user.repository.UserRepository;
import be.user.service.UserService;
import be.utils.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletWebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>{
    private final UserRepository userRepository;
    @Autowired
    private HttpServletResponse response;



    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // OAuth2 서비스 id (구글, 카카오, 네이버)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        response.setHeader("registrationId", registrationId);

        // OAuth2 로그인 진행 시 키가 되는 필드 값(PK)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // OAuth2UserService
        Map<String, Object> attribute = oAuth2User.getAttributes();
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, attribute);
        User user = saveOrUpdate(attributes); // 새로 소셜로그인 시도하는 유저면 회원가입 시켜주고
                                                //기존 유저라면 그냥 DB에 저장된 값 반환

        OAuth2User printUser = new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getUserRole())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
        log.info(printUser.toString());

        return printUser;
    }


    private User saveOrUpdate(OAuthAttributes attributes) {
        User user = userRepository.findByEmailAndUserStatusAndSocialLogin(attributes.getEmail(),User.UserStatus.USER_EXIST,attributes.getRegistrationId())
               .orElse(attributes.toEntity());//새로 가입하는 유저라면 새로 가입
                                            //기존 해당 소셜 로그인으로 가입한 유저가 있다면 DB에 있는 것 return

        return userRepository.save(user);
    }





}
