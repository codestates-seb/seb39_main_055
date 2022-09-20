package be.heart.dto;

import be.heart.entity.Heart;
import be.store.dto.StoreResponseDto;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class HeartResponseDto {

    private long heartId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Heart.HeartStatus heartStatus;
    private UserResponseDto user;
    private StoreResponseDto store;
}
