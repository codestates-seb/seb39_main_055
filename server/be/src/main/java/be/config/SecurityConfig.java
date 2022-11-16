package be.config;

//import be.config.jwt.JwtAuthenticationFilter;
//import be.config.jwt.JwtAuthorizationFilter;
//import be.user.repository.UserRepository;
//import be.user.service.UserService;
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;

//@Configuration
//@EnableWebSecurity
//public class SecurityConfig{
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private CorsConfig corsConfig; //@CroosOrigin(인증 X) 시큐리티 필터에 등록(인증 O)
//
//    @Autowired
//    private UserService userService;
//
//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity http) throws  Exception{
//
//        return http
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .apply(new MyCustomDsl()) // 커스텀 필터 등록
//                .and()
//                .authorizeRequests(authroize -> authroize.antMatchers("/v1/user/**")
//                        .access("hasRole('ROLE_USER') or hasRole('ROLE_OWNER')")
//                        .antMatchers("/v1/owner/**")
//                        .access("hasRole('ROLE_OWNER')")
//                        .anyRequest().permitAll())
//                .build();
//
//
//    }
//
//    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
//
//        @Override
//        public void configure(HttpSecurity http) throws Exception {
//            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
//            http
//                    .addFilter(corsConfig.corsFilter())
//                    .addFilter(new JwtAuthenticationFilter(authenticationManager,userService))
//                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
//        }
//    }
//}
//


import be.config.auth.filter.JwtAuthenticationFilter;
//import be.config.auth.filter.JwtExceptionFilter;
import be.config.auth.handler.*;
import be.utils.jwt.JwtTokenizer;
import be.config.auth.filter.JwtVerificationFilter;
import be.user.repository.UserRepository;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// 새로 구현하려는 SecurityConfig
@Configuration
@EnableWebSecurity
@AllArgsConstructor
@Slf4j
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;

    private final UserService userService;

    private final UserRepository userRepository;

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception{

        return http
                .headers().frameOptions().sameOrigin() // (1)
                .and()
                .csrf().disable()        // (2) CSRF(Cross-Site Request Forgery) 공격에 대한 Spring Security에 대한 설정을 비활성화
                .cors().configurationSource(corsConfigurationSource())    // (3) CORS 설정을 추가합니다. .cors(withDefaults()) 일 경우, corsConfigurationSource라는 이름으로 등록된 Bean을 이용
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //(1)세션을 생성하지 않도록 설정
                .and()
                .formLogin().disable()   // (4) JSON 포맷으로 Username과 Password를 전송하는 방식을 사용할 것이므로 (4)와 같이 폼 로그인 방식을 비활성화
                .httpBasic().disable()   // (5)HTTP Basic 인증은 request를 전송할 때 마다 Username/Password 정보를 HTTP Header에 실어서 인증을 하는 방식
                .apply(new CustomFilterConfigurer()) //(1)apply() 메서드에 Custom Configurer를 추가해 커스터마이징(customizations)된 Configuration을 추가할 수 있습니다.
                .and()
                .authorizeRequests(authroize -> authroize
                        .antMatchers("/v1/user/**")
                        .access("hasRole('ROLE_USER') or hasRole('ROLE_OWNER')")
                        .antMatchers("/v1/owner/**")
                        .access("hasRole('ROLE_OWNER')")
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> {
                    oauth2.userInfoEndpoint().userService(customOAuth2UserService);
                    log.info("customOAuth2UserService 완료하고 다시 filterChain 진입");
                    oauth2.successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, userService,userRepository));
                })
                .build();


    }



    // (8) CorsConfigurationSource Bean 생성을 통해 구체적인 CORS 정책을 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true); //내 서버 응답 할때 제이슨을 자바스크립트에서 처리할 수 있게 할지 결정
        configuration.addAllowedOriginPattern("*");// 모든 ip 응답 허용
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addAllowedHeader("*");// 모든 헤더에 응답 허용
        configuration.addAllowedMethod("*");// 모든 http 메소드 응답 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();   // (8-3)CorsConfigurationSource 인터페이스의 구현 클래스인 UrlBasedCorsConfigurationSource 클래스의 객체를 생성
        source.registerCorsConfiguration("/**", configuration); //(8-4)에서는 모든 URL에 앞에서 구성한 CORS 정책(CorsConfiguration)을 적용
        return source;
    }

    // (2)Custom Configurer인 CustomFilterConfigurer 클래스입니다. CustomFilterConfigurer는 우리가 구현한 JwtAuthenticationFilter를 등록하는 역할을 합니다.
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)AbstractHttpConfigurer를 상속해서 Custom Configurer를 구현할 수 있습니다.
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)configure() 메서드를 오버라이드해서 Configuration을 커스터마이징할 수 있습니다.
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)getSharedObject(AuthenticationManager.class)를 통해 AuthenticationManager의 객체를 얻을 수 있습니다.

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, userService,jwtTokenizer,userRepository);  // (2-4)JwtAuthenticationFilter를 생성하면서 JwtAuthenticationFilter에서 사용되는 AuthenticationManager와 userService,JwtTokenizer를 DI 해줍니다.
//            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
//            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, userRepository);  // (2) JwtVerificationFilter의 인스턴스를 생성하면서 JwtVerificationFilter에서 사용되는 객체들을 생성자로 DI

//            JwtExceptionFilter jwtExceptionFilter = new JwtExceptionFilter();

            builder.addFilter(jwtAuthenticationFilter) // (2-6)addFilter() 메서드를 통해 JwtAuthenticationFilter를 Spring Security Filter Chain에 추가
                    .addFilterAfter(jwtVerificationFilter,JwtAuthenticationFilter.class); //(3) JwtVerificationFilter가 JwtAuthenticationFilter가 수행된 바로 다음에 동작하도록 JwtAuthenticationFilter 뒤에 추가
//                    .addFilterBefore(jwtExceptionFilter,JwtAuthenticationFilter.class);
        }
    }
}

