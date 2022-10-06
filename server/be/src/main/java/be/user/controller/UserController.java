package be.user.controller;

import be.response.SingleResponseDto;
import be.store.service.StoreService;
import be.user.dto.AccessTokenDto;
import be.user.dto.RefreshTokenDto;
import be.user.dto.UserPatchDto;
import be.user.dto.UserPostDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1")
@Validated
@Slf4j
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;
    private final StoreService storeService;


//    public UserController(UserService userService, UserMapper mapper) {
//        this.userService = userService;
//        this.mapper = mapper;
//    }

    /**
     * 회원가입 API
     * **/
    @PostMapping("/sign-up")
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userDto) {
        User user = mapper.userPostDtoToUser(userDto);
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(createdUser)),
                HttpStatus.CREATED);
    }

    /**
     * 토근에 해당하는 User 정보를
     * 클라이언트에게 전달
     **/
    @GetMapping("/user")
    public ResponseEntity getUser(){
        User user =  userService.getLoginUser();

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(user)),
                HttpStatus.OK);
    }

    /**
     * 회원정보 수정 API
     * **/
    @PatchMapping("/user/update")
    public ResponseEntity patchUser(@Valid @RequestBody UserPatchDto userPatchDto){

        User user = mapper.userPatchDtoToUser(userService,userPatchDto);
        User updatedUser = userService.updateUser(storeService,user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(updatedUser)),
                HttpStatus.OK);
    }

    /**
     * 어세스 토큰 재발급 API
     * **/
    @PostMapping("/token-refresh")
    public ResponseEntity getToken(@RequestBody RefreshTokenDto refreshToken){
        log.info("getToken 컨트롤러 실행");

        String accessToken = userService.createAccessToken(refreshToken.getRefreshToken());

        AccessTokenDto accessTokenDto = new AccessTokenDto();

        accessTokenDto.setAccessToken(accessToken);

        return new ResponseEntity<>(
                new SingleResponseDto<>(accessTokenDto),
                HttpStatus.OK
        );
    }



}
