package be.user.dto;

import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private Long userId;
    private String nickname;
    private String email;
    //    private String password;
    private String image;
    private User.UserStatus userStatus;
    private Double longitude;
    private Double latitude;
    private String userRole;
    private String socialLogin;

}

