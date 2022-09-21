package be.heart.controller;

import be.heart.dto.HeartPatchDto;
import be.heart.dto.HeartPostDto;
import be.heart.entity.Heart;
import be.heart.mapper.HeartMapper;
import be.heart.service.HeartService;
import be.response.SingleResponseDto;
import be.store.mapper.StoreMapper;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1")
@Validated
@Slf4j
@AllArgsConstructor
public class HeartController {
    private final HeartService heartService;
    private final HeartMapper mapper;
    private final UserService userService;
    private final StoreService storeService;
    private final StoreMapper storeMapper;
    private final UserMapper userMapper;
    private final StoreImageService storeImageService;

    /**
     * 가게 하트등록 API
     * **/
    @PostMapping("user/heart/register")
    public ResponseEntity postHeart(@Valid @RequestBody HeartPostDto heartPostDto){
        Heart heart = mapper.heartPostDtoToHeart(storeService,userService,heartPostDto);
        Heart createdHeart = heartService.createHeart(heart);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.heartToHeartResponseDto(storeMapper,userMapper,storeImageService,createdHeart)),
                HttpStatus.CREATED
        );
    }

    /**
     * 가게 하트등록 취소 API
     * **/
    @PatchMapping("user/heart/cancel")
    public ResponseEntity patchHeart(@Valid @RequestBody HeartPatchDto heartPatchDto){

        Heart heart = mapper.heartPatchDtoToHeart(storeService,userService,heartPatchDto);

        Heart updatedHeart = heartService.updateHeart(heart);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.heartToHeartResponseDto(storeMapper,userMapper,storeImageService,updatedHeart)),
                HttpStatus.CREATED
        );

    }





}
