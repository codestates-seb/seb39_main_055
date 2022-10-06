package be.user.dto;

import be.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class UserPatchDto {

    //유저수정
    private String nickname;

    @Email(message = "이메일 형식이 맞는 지 확인해주세요")
    private String email;

    private Double longitude;

    private Double latitude;

    private String image;

    //회원 탈퇴
    private User.UserStatus userStatus;

}
