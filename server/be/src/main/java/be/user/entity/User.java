package be.user.entity;

import be.audit.BaseEntity;
import be.heart.entity.Heart;
import be.thread.entity.Thread;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "USER")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private UserStatus userStatus = UserStatus.USER_EXIST;

    @OneToMany(mappedBy = "user",cascade = CascadeType.PERSIST)
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.PERSIST)
    private List<Thread> threads = new ArrayList<>();

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private String userRole;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String image;

    public enum UserStatus {
        USER_EXIST("존재하는 유저"),
        USER_NOT_EXIST("존재하지 않는 유저");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }
}
