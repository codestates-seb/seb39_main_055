package be.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPostDto {
//    private int i;

    @NotBlank(message = "이메일을 입력해주세요")
    @Email(message = "이메일 형식이 맞는 지 확인해주세요")
    private String email;

    @NotBlank(message = "닉네임을 입력해주세요")
    private String nickname;

    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

    @NotNull(message = "경도를 입력해주세요")
    private Double longitude;

    @NotNull(message = "위도를 입력해주세요")
    private Double latitude;

    @NotBlank(message = "유저의 권한을 입력해주세요[ROLE_USER/ROLE_OWNER]")
    @Pattern(regexp = "(^ROLE_USER$)|(^ROLE_OWNER$)",message = "ROLE_USER or ROLE_OWNER중에 선택해주세요")
    private String userRole;
}