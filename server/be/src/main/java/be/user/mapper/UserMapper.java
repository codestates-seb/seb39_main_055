package be.user.mapper;

import be.user.dto.UserPatchDto;
import be.user.dto.UserPostDto;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.service.UserService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    default User userPostDtoToUser(UserPostDto userPostDto) {
        User user = new User();

        user.setEmail(userPostDto.getEmail());
        user.setNickname(userPostDto.getNickname());
        user.setPassword(userPostDto.getPassword());
        user.setLongitude(userPostDto.getLongitude());
        user.setLatitude(userPostDto.getLatitude());
        user.setUserRole(userPostDto.getUserRole());

        return user;
    }

    default UserResponseDto userToUserResponseDto(User user) {

        UserResponseDto userResponseDto = new UserResponseDto();

//        userResponseDto.setUserId(user.getUserId());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setNickname(user.getNickname());
//        userResponseDto.setPassword(user.getPassword());
        userResponseDto.setImage(user.getImage());
        userResponseDto.setUserStatus(user.getUserStatus());
        userResponseDto.setLongitude(user.getLongitude());
        userResponseDto.setLatitude(user.getLatitude());
        userResponseDto.setUserRole(user.getUserRole());

        return userResponseDto;
    }

    default User userPatchDtoToUser(UserService userService,UserPatchDto userPatchDto){

        long userId = userService.getLoginUser().getUserId();// 토큰에 해당하는 userId 값 가져오기
        User user = new User();
        user.setUserId(userId);
        user.setEmail(userPatchDto.getEmail());
        user.setImage(userPatchDto.getImage());
        user.setLatitude(userPatchDto.getLatitude());
        user.setLongitude(userPatchDto.getLongitude());
        user.setNickname(userPatchDto.getNickname());
        user.setUserStatus(userPatchDto.getUserStatus());

        return user;
    }

}